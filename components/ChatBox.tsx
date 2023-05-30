import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ChatBoxProps } from "./types";
import { useActiveListStore } from "@/store/store";
import clsx from "clsx";

function ChatBox({ chat, currentUserId }: ChatBoxProps) {
  const router = useRouter()
  const { members } = useActiveListStore(state => state)

  const receiver = useMemo(() => {
    return chat && chat.members.find((member) => member.id !== currentUserId)
  }, [chat, currentUserId])

  const isActive = receiver && members.indexOf(receiver.email) !== -1

  const image = useMemo(() => {
    if (!receiver) return null
    return receiver.image
  }, [receiver])

  const lastMessage = useMemo(() => {
    if (chat && chat.messages.length > 0) {
      return chat.messages[-1]
    }
    return null
  }, [chat])

  console.log("isActive", isActive)
  return (
    <div className="flex items-center justify-evenly">
      {image !== null ? (
        <div className="relative p-[2px]">
          <Image
            onClick={() => {
              router.push(`/chats/${chat.id}`)
            }}
            src={`${image.toString()}`}
            alt="Usuario Chat App"
            height={40}
            width={40}
            className="rounded-full shadow cursor-pointer"
          />
          <div
            className={clsx(
              "absolute top-0 right-0 border border-white bg-green-500 p-[6px] rounded-full",
              isActive === true ? "block" : "hidden"
            )}
          ></div>
        </div>
      ) : (
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
        className="flex flex-col justify-center h-16 w-full max-w-[65%] cursor-pointer"
      >
        <h2 className="text-lg text-gray-800">
          {receiver && receiver.name}
        </h2>
        <p className="text-sm text-gray-400">
          {
            lastMessage ?
              lastMessage.content :
              "Mensaje"
          }
        </p>
      </div>
    </div>
  )
}

export default ChatBox