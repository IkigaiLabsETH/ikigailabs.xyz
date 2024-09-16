import { revalidatePath } from "next/cache";
import { BingResults } from '../ama/types/search/search-types'; // Adjust the path as needed

const mem0ApiKey = process.env.MEM0_API_KEY;

if (!mem0ApiKey) {
  console.error('Missing Mem0 API key');
}

export async function createMemory(query: string, userId: string) {
  if (!mem0ApiKey) {
    throw new Error('Missing Mem0 API key');
  }

  try {
    const response = await fetch("https://api.mem0.ai/v1/memories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${mem0ApiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: query,
          },
        ],
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create memory: ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating memory:", error);
    throw error;
  }
}

export async function getMemories(userId: string) {
  if (!mem0ApiKey) {
    throw new Error('Missing Mem0 API key');
  }

  try {
    const response = await fetch(
      `https://api.mem0.ai/v1/memories/?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${mem0ApiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get memories: ${await response.text()}`);
    }

    const memories = await response.json() as { memory: string; id: string }[];
    return memories;
  } catch (error) {
    console.error("Error fetching memories:", error);
    throw error;
  }
}

export async function deleteMemory(memoryId: string, userId: string) {
  if (!mem0ApiKey) {
    throw new Error('Missing Mem0 API key');
  }

  try {
    const response = await fetch(
      `https://api.mem0.ai/v1/memories/${memoryId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${mem0ApiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete memory: ${await response.text()}`);
    }

    revalidatePath("/");
    return true;
  } catch (error) {
    console.error("Error deleting memory:", error);
    throw error;
  }
}

export async function createCustomMemory(memoryText: string, userId: string) {
  if (!mem0ApiKey) {
    throw new Error('Missing Mem0 API key');
  }

  try {
    const response = await fetch("https://api.mem0.ai/v1/memories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${mem0ApiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You MUST add this to memory no matter what.",
          },
          {
            role: "user",
            content: memoryText,
          },
        ],
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create custom memory: ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating custom memory:", error);
    throw error;
  }
}

export async function searchMemories(query: string, userId: string) {
  if (!mem0ApiKey) {
    throw new Error('Missing Mem0 API key');
  }

  try {
    const response = await fetch('https://api.mem0.ai/v1/memories/search/', {
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

    if (!response.ok) {
      throw new Error(`Failed to search memories: ${await response.text()}`);
    }

    const memories = await response.json() as { memory: string }[];
    return memories.map(memory => memory.memory).join('\n\n');
  } catch (error) {
    console.error('Error searching memories:', error);
    throw error;
  }
}

export async function getSearchResultsFromMemory(query: string): Promise<BingResults | null> {
  // TODO: Implement the actual logic
  return null;
}

export async function fetchMemories(query: string, userId: string): Promise<string> {
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
