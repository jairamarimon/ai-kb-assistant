import express from "express";
import { exec } from "child_process";
import { createEmbedding } from "../services/embeddings.js";
import initPinecone from "../services/pinecone.js";
import crypto from "crypto";

const router = express.Router();
const CHUNK_SIZE = 500;
const BATCH_SIZE = 20; // Number of vectors per batch

// Helper to run Python scraper and parse JSON
const runPythonScraper = () => {
  return new Promise((resolve, reject) => {
    exec("python3 ../scraper/scrape.py", (err, stdout, stderr) => {
      if (err) return reject(err);
      if (stderr) console.error(stderr);
      try {
        const data = JSON.parse(stdout);
        resolve(data);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
};

// Upsert vectors in batches
const upsertBatches = async (index, vectors) => {
  for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
    const batch = vectors.slice(i, i + BATCH_SIZE);
    try {
      await index.upsert(batch);
    } catch (err) {
      console.error("Batch upsert failed:", err);
    }
  }
};

router.post("/", async (req, res) => {
  try {
    // Initialize Pinecone
    const index = initPinecone();

    const pages = await runPythonScraper();
    let totalInserted = 0;

    // Process all pages concurrently
    const pagePromises = pages.map(async (page) => {
      const textChunks = [];
      for (let i = 0; i < page.text.length; i += CHUNK_SIZE) {
        const chunk = page.text.slice(i, i + CHUNK_SIZE);
        const id = crypto
          .createHash("sha256")
          .update(page.url + i)
          .digest("hex");
        textChunks.push({ id, chunk, parentUrl: page.url, label: page.label });
      }

      // Generate embeddings concurrently
      const embeddings = await Promise.all(
        textChunks.map((tc) => createEmbedding(tc.chunk))
      );

      // Prepare vectors payload
      const vectorsPayload = embeddings.map((embedding, idx) => ({
        id: textChunks[idx].id,
        values: embedding,
        metadata: {
          parentUrl: textChunks[idx].parentUrl,
          label: textChunks[idx].label,
          text: textChunks[idx].chunk,
        },
      }));

      await upsertBatches(index, vectorsPayload);
      totalInserted += vectorsPayload.length;
    });

    await Promise.all(pagePromises);

    res.json({ success: true, inserted: totalInserted });
  } catch (err) {
    console.error("Scrape error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
