import { Message as ImportedMessage } from "../messages/messages-types";

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface Chat {
  id: string;
  name: string; // Add this line
  messages: ImportedMessage[];
  createdAt: Date;
  updatedAt: Date;
  model: "o1-preview" | "o1-mini" | "gpt-4o-2024-08-06"; // Add this line
}
