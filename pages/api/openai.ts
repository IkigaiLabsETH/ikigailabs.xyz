import type { NextApiRequest, NextApiResponse } from 'next';
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const baseURL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OpenAI API key is missing. Please set the OPENAI_API_KEY environment variable.");
}

const openai = createOpenAI({
  baseURL,
  apiKey,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { model, messages } = req.body;

  if (!apiKey) {
    return res.status(500).json({ message: "OpenAI API key is not configured. Please check your environment variables." });
  }

  try {
    console.log("Attempting to generate text with model:", model);
    console.log("Messages:", JSON.stringify(messages, null, 2));

    const { text } = await generateText({
      model: openai(model),
      messages,
    });

    console.log("Generated text:", text);
    res.status(200).json({ text });
  } catch (error) {
    console.error("Detailed error in generating message:", error);
    res.status(500).json({ 
      message: "Failed to generate message. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}