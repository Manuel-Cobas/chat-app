import ChatBox from "../ChatBox";
import type { ChatListProps, ChatPayload } from "../types";

function ChatList({ chats, currentUserId }: ChatListProps) {
  return (
    <ul className="w-full pt-4">
      {chats && currentUserId &&
        chats.map((chat: ChatPayload) => (
          <li
            key={chat.id}
            className="text-2xl"
          >
            <ChatBox
              chat={chat}
              currentUserId={currentUserId}
            />
          </li>
        ))
      }
    </ul>
  )
}

export default ChatList