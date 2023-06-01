import clsx from "clsx"
import { MessagesList } from "../types"
import { useRef, useEffect } from "react"

function MessagesList({ messages, currentUserId }: MessagesList) {
  const scrollRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    })
  }, [messages])

  return (
    <ul
      ref={scrollRef}
      className="flex flex-col w-full h-full pt-20 pb-28 gap-4 px-4"
    >
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