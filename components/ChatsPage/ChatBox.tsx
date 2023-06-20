import { useRouter } from "next/router";
import { ChatBoxProps } from "../types";

import Avatar from "../AuthPage/Avatar";
import LastMessage from "./LastMessage";
import useReceiver from "@/hooks/useReceiver";

function ChatBox({ chat }: ChatBoxProps) {
  const { receiver, currentUser } = useReceiver(chat.members)
  const router = useRouter()

  if (!receiver || !chat) return null

  return (
    <div className="flex items-center justify-evenly">
      <Avatar
        ImageUrl={receiver.image}
        user={receiver}
        chatId={chat.id}
      />

      <div
        onClick={() => {
          router.push(`/chats/${chat.id}`)
        }}
        className="flex flex-col justify-center h-16 w-full max-w-[65%] cursor-pointer"
      >
        <h2 className="text-lg text-gray-800">
          {receiver && receiver.name}
        </h2>
        <LastMessage
          currentUserId={currentUser.id}
          messages={chat.messages}
        />
      </div>
    </div>
  )
}

export default ChatBox