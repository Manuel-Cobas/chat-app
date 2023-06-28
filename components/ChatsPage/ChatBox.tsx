import clsx from "clsx";

import Avatar from "@/components/AuthPage/Avatar";
import LastMessage from "@/components/ChatsPage/LastMessage";

import { useRouter } from "next/router";
import { useReceiver } from "@/hooks/useReceiver";

import type { ChatBoxProps } from "../types";

function ChatBox({ chat }: ChatBoxProps) {
  const { receiver, currentUser } = useReceiver(chat.members)
  const router = useRouter()

  if (!receiver || !chat) return null

  return (
    <div className={clsx(
      "flex items-center justify-around w-full px-4",
      "sm:w-1/2"
    )}>
      <div
        className="flex items-center gap-2"
        onClick={() => router.push(`/chats/${chat.id}`)}
      >
        <Avatar
          ImageUrl={receiver.image}
          user={receiver}
          chatId={chat.id}
        />

        <div className="flex flex-col justify-center items-center h-16 cursor-pointer">
          <div>
            <h2 className="text-lg text-gray-800">
              {receiver && receiver.name}
            </h2>
          </div>
          <div className="w-3/4 overflow-hidden">
            <LastMessage
              currentUserId={currentUser.id}
              messages={chat.messages}
            />
          </div>
        </div>
      </div>

      {chat.notifications.length > 0 && (
        <div
          className="relative flex items-center justify-center bg-red-500 rounded-full p-3"
        >
          <p className="absolute text-white text-sm">
            {chat.notifications.length}
          </p>
        </div>
      )}
    </div>
  )
}

export default ChatBox