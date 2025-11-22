import express from "express";
import { exec } from "child_process";
import { createEmbedding } from "../services/embeddings.js";
import initPinecone from "../services/pinecone.js";
import crypto from "crypto";

const router = express.Router();
const CHUNK_SIZE = 500;

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

router.post("/", async (req, res) => {
  try {
    // Initialize Pinecone
    const index = initPinecone();

    const pages = await runPythonScraper();
    let totalInserted = 0;

    for (const page of pages) {
      const text = page.text;

      // Split text into chunks
      for (let i = 0; i < text.length; i += CHUNK_SIZE) {
        const chunk = text.slice(i, i + CHUNK_SIZE);

        // Create embedding
        const embedding = await createEmbedding(chunk);

        // Unique ID per chunk
        const id = crypto.createHash("sha256").update(page.url + i).digest("hex");

        const vectorsPayload = [
          {
            id,
            values: embedding,
            metadata: { url: page.url, label: page.label },
          },
        ];

        await index.upsert(vectorsPayload);
        totalInserted++;
      }
    }

    res.json({ success: true, inserted: totalInserted });
  } catch (err) {
    console.error("Scrape error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
