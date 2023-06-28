import clsx from "clsx"

import Image from "next/image"
import { MdExpandMore } from "react-icons/md";

import { useState } from "react"
import { useReceiver } from "@/hooks/useReceiver"

import type { ChatPayload } from "@/components/types"

interface NotificationProps {
  chatWithNotifs: ChatPayload
}

function Notification({ chatWithNotifs }: NotificationProps) {
  const { receiver } = useReceiver(chatWithNotifs.members)
  const [show, setShow] = useState<boolean>(false)

  if (!receiver || chatWithNotifs.notifications.length === 0) return null

  return (
    <div
      className={clsx(
        "flex flex-col w-full px-4 shadow pt-2 pb-8 rounded-lg",
        "transition-all duration-300",
        show && chatWithNotifs.notifications.length > 0 ? "gap-6 shadow-lg" : "gap-0"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {receiver.image && (
            <Image
              src={receiver.image}
              width={40}
              height={40}
              alt="Foto de perfil Chat App"
              className="rounded-full"
            />
          )}
          <div className="flex items-center gap-4">
            <h2 className="text-gray-800 text-lg">
              {receiver.name}
            </h2>
            <div className="">
              <p className="bg-rose-500 text-white font-medium text-[15px] px-3 rounded-full">
                {chatWithNotifs.notifications.length}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setShow(!show)
          }}
        >
          <MdExpandMore
            className={clsx(
              "text-2xl text-gray-700 transition-transform",
              show ? "rotate-180" : ""
            )}
          />
        </button>
      </div>

      <ul
        className={clsx(
          "flex flex-col px-6 gap-3 transition-all duration-300 overflow-y-scroll",
          !show ? "max-h-0 p-0 m-0 gap-0" : "max-h-screen",
        )}
      >
        {chatWithNotifs.notifications.map(n => (
          <li
            key={n.id}
            className="flex flex-wrap w-full items-center"
          >
            <div
              className="max-w-full px-2 py-1 rounded-md bg-gray-200 text-gray-700"
            >
              <p className="break-words">
                {n.message.content}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notification