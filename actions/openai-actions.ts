import { Message } from "../ama/types/messages/messages-types";

export async function generateMessage(
  model: "o1-preview" | "o1-mini",
  messages: Message[]
) {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to generate message: ${errorData.message}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error generating message:", error);
    throw error;
  }
}
