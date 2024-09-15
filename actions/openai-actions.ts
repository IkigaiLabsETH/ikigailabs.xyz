import { Message } from "../ama/types/messages/messages-types";

export async function generateMessage(
  model: "o1-preview" | "o1-mini",
  messages: Message[]
) {
  try {
    console.log("Sending request to /api/openai with model:", model);
    console.log("Messages:", JSON.stringify(messages, null, 2));

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error response from server:", data);
      throw new Error(`Failed to generate message: ${data.message}`);
    }

    console.log("Received response:", data);
    return data.text;
  } catch (error) {
    console.error("Detailed error in generateMessage:", error);
    throw error;
  }
}
