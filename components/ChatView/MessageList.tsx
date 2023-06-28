import clsx from "clsx"

import { useRef, useEffect } from "react"
import { useChatMenu } from "@/store/useChatMenu"
import { useCurrentUser } from "@/hooks/useCurrentUser"

import type { MessagesList } from "@/components/types"

function MessagesList({ messages }: MessagesList) {
  const { currentUser } = useCurrentUser();
  const { closeModal } = useChatMenu()

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
      onClick={closeModal}
      className="flex flex-col w-screen transition-all h-full pt-20 pb-28 gap-4 px-4"
    >
      {messages.map((message) => (
        <li
          key={message.id}
          className={clsx(
            "flex flex-wrap w-full items-center",
            message.senderId === currentUser.id ?
              "flex-row-reverse" :
              "flex-row"
          )}>

          <div
            className={clsx(
              "max-w-[95%] px-2 py-1 rounded-md",
              message.senderId === currentUser.id ?
                "bg-red-500 text-gray-50" :
                "bg-gray-200 text-gray-700"
            )}
          >
            <p className="break-words">
              {message.content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MessagesList