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
  createdAt: string;
}

export interface ChatBoxProps {
  chat: ChatPayload;
}

export interface MessagesList {
  messages: Message[];
  currentUserId: string;
}

export interface MessageInputProps {
  chatId: string;
}

export interface AuthButtonProps {
  variant: string;
  width?: string;
  padding?: string;
  title?: string;
}

export interface ChatListProps {
  chats: ChatPayload[];
}

export interface AvatarProps {
  ImageUrl: string | null;
  chatId: string;
  user: User;
}

export interface UserBoxProps {
  user: User | null;
  image: string | null;
}

export interface LastMessage {
  messages: Message[];
  currentUserId: string;
}

export interface ModalLayoutProps {
  children: JSX.Element | JSX.Element[];
  show: boolean;
}

export interface QuestionModalProps {
  buttonTitle: string;
  title: string;
  description?: string;
  method: () => void;
}

export interface ChatInfoModalProps {
  chat: ChatPayload;
}

export interface ChatNameProps {
  show: boolean;
  chatName: string;
  setChatName: (name: string) => void;
  setShowInput: (val: boolean) => void;
}
