import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ChatBoxProps } from "./types";

function ChatBox({ chat, currentUserId }: ChatBoxProps) {
  const router = useRouter()

  const image = useMemo(() => {
    const receiver = chat.members.find((member) => member.id !== currentUserId)

    if (!receiver) return null
    return receiver.image
  }, [chat, currentUserId])

  const lastMessage = useMemo(() => {
    if (chat && chat.messages.length > 0) {
      return chat.messages[-1]
    }

    return null
  }, [chat])

  return (
    <div className="flex items-center justify-evenly">
      {image !== null ? (
        <Image
          onClick={() => {
            router.push(`/chats/${chat.id}`)
          }}
          src={`${image.toString()}`}
          alt="Usuario Chat App"
          height={40}
          width={40}
          className="rounded-full shadow"
        />) : (
        <div className="relative flex items-center justify-center">
          <div className="pt-5 rounded-full bg-gray-400"></div>
          <FaUserCircle
            className="text-2xl text-white"
          />
        </div>
      )}

      <div
        onClick={() => {
          router.push(`/chats/${chat.id}`)
        }}
        className="flex flex-col justify-center h-16 w-full max-w-[65%]"
      >
        <h2 className="text-lg text-gray-800">
          {chat.name}
        </h2>
        <p className="text-sm text-gray-400">
          {
            lastMessage !== null ?
              lastMessage.content :
              "Mensaje"
          }
        </p>
      </div>
    </div>
  )
}

export default ChatBox