import express from "express";
import initPinecone from "../services/pinecone.js";
import { createEmbedding } from "../services/embeddings.js";
import { buildPrompt } from "../services/promptTemplate.js";
import { createCompletion } from "../services/openai.js";
import { supabase } from "../services/supabase.js";

const router = express.Router();

// In-memory conversation history (for this session only)
let conversationHistory = [];
const MAX_HISTORY = 10;

// Retrieve relevant chunks from Pinecone
async function getRagContext(query, topK = 5) {
  const index = initPinecone();
  const queryEmbedding = await createEmbedding(query);

  const response = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  const parentMap = new Map();
  for (const match of response.matches || []) {
    const parentUrl = match.metadata.parentUrl;
    if (!parentMap.has(parentUrl)) {
      parentMap.set(parentUrl, {
        label: match.metadata.label,
        text: match.metadata.text,
      });
    } else {
      parentMap.get(parentUrl).text += " " + match.metadata.text;
    }
  }

  let context = "";
  for (const [url, data] of parentMap.entries()) {
    context += `
Source: ${url}
Label: ${data.label}
Content: ${data.text}
`;
  }

  return { context, sources: Array.from(parentMap.keys()) };
}

// Route Handler
router.post("/", async (req, res) => {
  const { query, resetHistory } = req.body;

  if (resetHistory) conversationHistory = [];

  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json(
      { success: false, error: "Query is required." }
    );
  }

  try {
    const { context, sources } = await getRagContext(query);
    // Build the RAG prompt
    const prompt = buildPrompt(query, conversationHistory, context);
    // Generate completion using OpenAI
    const answer = await createCompletion(prompt);

    // Save chat to Supabase
    const { data, error } = await supabase
    .from("history")
    .insert([{ question: query, answer, sources }])
    .select();
    
    if (error) {
      console.error("Error saving chat history:", error);
    } else {
      console.log("Chat history saved:", data);
    }

    // Update in-memory conversation history
    conversationHistory.push({ role: "user", content: query });
    conversationHistory.push({ role: "assistant", content: answer });

    // Keep only last N messages
    if (conversationHistory.length > MAX_HISTORY * 2) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY * 2);
    }
  
    res.json({success: true, answer, sources });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
