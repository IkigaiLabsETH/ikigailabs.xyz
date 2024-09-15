import { Message } from "../messages/messages-types";

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  model: "o1-preview" | "o1-mini" | "gpt-4o-2024-08-06";
}
