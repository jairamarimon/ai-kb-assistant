import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createCompletion = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI completion error:", err);
    throw new Error("Failed to generate completion from OpenAI.");
  }
};
