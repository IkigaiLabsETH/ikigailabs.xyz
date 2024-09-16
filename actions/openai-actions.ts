import { Message } from "../ama/types/messages/messages-types";
import { AbortSignal } from "abort-controller";
// Remove the unused import
// import { getMemories } from "./memo-actions";

// If you have control over the Message type, update it like this:
// interface Message {
//   role: 'user' | 'assistant' | 'system';
//   content: string;
// }

// If you can't modify the original type, you can extend it:
type ExtendedMessage = Message | { role: 'system'; content: string };

const mem0ApiKey = process.env.MEM0_API_KEY;

async function fetchMemories(query: string, userId: string) {
  if (!mem0ApiKey) {
    console.error('Missing Mem0 API key');
    return '';
  }

  try {
    const mem0Response = await fetch('https://api.mem0.ai/v1/memories/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${mem0ApiKey}`,
      },
      body: JSON.stringify({
        query: `What do you know about ${query}`,
        user_id: userId,
      }),
    });

    if (!mem0Response.ok) {
      console.error('Error fetching memories:', await mem0Response.text());
      return '';
    }

    const memories = await mem0Response.json() as { memory: string }[];
    return memories.map(memory => memory.memory).join('\n\n');
  } catch (error) {
    console.error('Error fetching memories:', error);
    return '';
  }
}

export async function generateMessage(
  model: string,
  messages: Message[],
  userId: string,
  signal?: AbortSignal
): Promise<string> {
  try {
    console.log("Generating message for model:", model);

    const lastUserMessage = messages.findLast(msg => msg.role === 'user')?.content || '';
    const memories = await fetchMemories(lastUserMessage, userId);

    const systemMessage = {
      role: 'system',
      content: `You are a search assistant that answers the user query based on search results. We already know this about the user, try to tell the user about this showing up!: ${memories}`
    };

    const updatedMessages = [systemMessage, ...messages];

    console.log("Sending request to /api/openai with model:", model);
    console.log("Messages:", JSON.stringify(updatedMessages, null, 2));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages: updatedMessages }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from server:", errorText);
      throw new Error(`Failed to generate message: ${errorText}`);
    }

    const data = await response.json();
    console.log("Received response:", data);
    return data.text;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was aborted due to timeout');
      throw new Error('Request timed out after 30 seconds');
    }
    console.error("Detailed error in generateMessage:", error);
    throw error;
  }
}
