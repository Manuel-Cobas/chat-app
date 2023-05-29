import { Message, User } from "@prisma/client";

export interface ChatNavProps {
  chat: ChatPayload;
  currentUserId: string;
}

export interface ChatPayload {
  id: string;
  name: string;
  members: User[];
  membersIds: string[];
  messages: Message[];
  createAt: string;
}

export interface ChatBoxProps {
  chat: ChatPayload;
  currentUserId: string;
}

export interface MessagesList {
  messages: Message[];
  currentUserId: string;
}

export interface MessageInputProps {
  chatId: string;
}
