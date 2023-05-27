import { Message } from "@prisma/client"
import clsx from "clsx"

interface MessagesList {
  messages: Message[]
  currentUserId: string
}

function MessagesList({ messages, currentUserId }: MessagesList) {
  return (
    <ul className="flex flex-col w-full h-full pt-20">
      {messages.map((message) => (
        <li
          key={message.id}
          className={clsx(
            "flex w-full items-center",
            message.senderId === currentUserId ?
              "flex-row-reverse bg-red-500 text-white p-1 rounded-lg" :
              "flex-row bg-gray-300 text-gray-700"
          )}>
          {message.content}
        </li>
      ))}
    </ul>
  )
}

export default MessagesList