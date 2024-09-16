import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { model, messages } = req.body;

    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.status(200).json({ text: completion.choices[0].message?.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ message: 'Error generating response', error: error.message });
  }
}