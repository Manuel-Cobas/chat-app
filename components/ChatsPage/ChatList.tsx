import ChatBox from "./ChatBox";
import type { ChatListProps, ChatPayload } from "../types";

function ChatList({ chats }: ChatListProps) {
  if (!chats) return null

  return (
    <ul className="flex flex-col items-center w-full gap-2">
      {chats.map((chat: ChatPayload) => (
        <li key={chat.id} className="flex justify-center items-center w-full">
          <ChatBox chat={chat} />
        </li>
      ))}
    </ul>
  )
}

export default ChatList