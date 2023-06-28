import Image from "next/image";
import ChatMenu from "./ChatMenu";

import { useRouter } from "next/router";
import { useReceiver } from "@/hooks/useReceiver";
import type { ChatNavProps } from "../types";

import { BiArrowBack } from "react-icons/bi"

function ChatNav({ chat }: ChatNavProps) {
  const router = useRouter()
  const { receiver } = useReceiver(chat?.members)

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
              {receiver && receiver.name}
            </li>
          </ul>

          <li className="">
            <ChatMenu />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default ChatNav