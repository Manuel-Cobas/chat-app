import { useMemo } from "react";
import { useRouter } from "next/router";
import { ChatBoxProps } from "../types";

import Avatar from "../AuthPage/Avatar";
import LastMessage from "./LastMessage";

function ChatBox({ chat, currentUserId }: ChatBoxProps) {
  const router = useRouter()

  const receiver = useMemo(() => {
    return chat && chat.members.find((member) => member.id !== currentUserId)
  }, [chat, currentUserId])

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
          currentUserId={currentUserId}
          messages={chat.messages}
        />
      </div>
    </div>
  )
}

export default ChatBox