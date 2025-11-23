import express from "express";
import initPinecone from "../services/pinecone.js";
import { createEmbedding } from "../services/embeddings.js";
import { createCompletion } from "../services/openai.js";
import { supabase } from "../services/supabase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json(
      { success: false, error: "Query is required." }
    );
  }

  try {
    console.log("Incoming user query:", query);

    const index = initPinecone();
    const queryEmbedding = await createEmbedding(query);

    // Retrieve chunks
    const pineconeResponse = await index.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    console.log("Retrieved matches:", pineconeResponse.matches?.length);

    // Group by parent page
    const parentMap = new Map();
    for (const match of pineconeResponse.matches) {
      const parentUrl = match.metadata.parentUrl;
      if (!parentMap.has(parentUrl)) {
        parentMap.set(parentUrl, {
          label: match.metadata.label,
          text: match.metadata.text,
        });
      } else {
        // Optional: append additional chunk text if needed
        parentMap.get(parentUrl).text += " " + match.metadata.text;
      }
    }
    // Build context for LLM
    let context = "";
    for (const [url, data] of parentMap.entries()) {
      context += `
      Source: ${url}
      Label: ${data.label}
      Content: ${data.text}
      `;
    }

    console.log("Context passed to LLM:\n", context);

    // Build the RAG prompt
    const prompt = `
    You are a helpful travel assistant, human-like travel expert.
    Using the context provided, generate a concise, structured, and informative answer. 

    Requirements:
    - Include main facts. Do NOT invent facts.
    - Keep it readable and logically organized
    - Merge information from multiple sources if needed.
    - If a reference URL is in the CONTEXT BLOCK, cite it using a numbered link format ([1](url)).
   
    Follow the user’s instructions and style:
    - If the user asks for a list, output a bullet or numbered list.
    - If the user asks for a summary, use a paragraph.
    - Always use a friendly, approachable tone.

    Context:
    ${context}

    User question:
    ${query}

    If the information is not in the context, reply in a friendly tone: 
    "Oh! I don’t have that information right now, but I’d love to help if I find it!"
    `;

    // Generate completion using OpenAI
    const answer = await createCompletion(prompt);

    console.log("Final Answer:", answer);

    const sources = Array.from(parentMap.keys());

    // Save chat to Supabase
    const { data, error } = await supabase
    .from("history")
    .insert([
      {
        question: query,
        answer,
        sources,
      },
    ])
    .select();
    
    if (error) {
      console.error("Error saving chat history:", error);
    } else {
      console.log("Chat history saved:", data);
    }

    res.json({ success: true, answer, sources });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
