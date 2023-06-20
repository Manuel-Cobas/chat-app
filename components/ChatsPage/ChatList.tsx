import ChatBox from "./ChatBox";
import type { ChatListProps, ChatPayload } from "../types";

function ChatList({ chats }: ChatListProps) {
  return (
    <ul className="w-full pt-16">
      {chats &&
        chats.map((chat: ChatPayload) => (
          <li
            key={chat.id}
            className="text-2xl"
          >
            <ChatBox chat={chat} />
          </li>
        ))
      }
    </ul>
  )
}

export default ChatList