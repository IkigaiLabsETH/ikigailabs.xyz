import { Message } from "../ama/types/messages/messages-types";

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
  model: "o1-preview" | "o1-mini" | "gpt-4o-2024-08-06",
  messages: Message[],
  userId: string
) {
  try {
    console.log("Generating message for model:", model);

    const lastUserMessage = messages.findLast(msg => msg.role === 'user')?.content || '';
    const memories = await fetchMemories(lastUserMessage, userId);

    const systemMessage: ExtendedMessage = {
      role: 'system',
      content: `You are a search assistant that answers the user query based on search results. We already know this about the user, try to tell the user about this showing up!: ${memories}`
    };

    const updatedMessages: ExtendedMessage[] = [systemMessage, ...messages];

    console.log("Sending request to /api/openai with model:", model);
    console.log("Messages:", JSON.stringify(updatedMessages, null, 2));

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages: updatedMessages }),
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
