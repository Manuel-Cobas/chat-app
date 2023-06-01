import { BiArrowBack } from "react-icons/bi"
import { useRouter } from "next/router";
import { ChatNavProps } from "../types";
import { useMemo } from "react";
import Image from "next/image";

import { FaUserCircle } from "react-icons/fa";

function ChatNav({ chat, currentUserId }: ChatNavProps) {
  const router = useRouter()

  const receiver = useMemo(() => {
    return chat && chat.members.find(r => r.id !== currentUserId)
  }, [chat, currentUserId])

  return (
    <header className="fixed top-0 right-0 left-0 h-14">
      <nav>
        <ul className="flex items-center justify-between bg-red-500 w-screen h-14 px-4">
          <ul className="flex items-center gap-4">
            <li className="">
              <BiArrowBack
                onClick={() => {
                  router.push("/chats")
                }}
                className="text-2xl text-white cursor-pointer"
              />
            </li>
            <li className="flex items-center gap-2 text-lg text-white">
              {receiver && receiver.image && (
                <Image
                  src={receiver.image}
                  className="rounded-full"
                  alt="foto de perfil"
                  height={35}
                  width={35}
                />
              )}
              <p className="text-[16px]">
                {receiver && receiver.name}
              </p>
            </li>
          </ul>
          <li className="">
            <FaUserCircle
              className="text-white text-2xl lg:mr-4"
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default ChatNav