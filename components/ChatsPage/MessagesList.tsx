import { Message } from "@prisma/client"
import clsx from "clsx"

interface MessagesList {
  messages: Message[]
  currentUserId: string
}

function MessagesList({ messages, currentUserId }: MessagesList) {
  return (
    <ul className="flex flex-col w-full h-full pt-20 gap-4 px-4">
      {messages.map((message) => (
        <li
          key={message.id}
          className={clsx(
            "flex w-full items-center",
            message.senderId === currentUserId ?
              "flex-row-reverse" :
              "flex-row"
          )}>
          <div
            className={clsx(
              "px-2 py-1 rounded-md",
              message.senderId === currentUserId ?
                "bg-red-500 text-white" :
                "bg-gray-200 text-gray-700"
            )}
          >
            {message.content}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MessagesList