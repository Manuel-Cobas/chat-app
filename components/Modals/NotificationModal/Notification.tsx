import clsx from "clsx"

import Image from "next/image"
import { MdExpandMore } from "react-icons/md";

import { useState } from "react"
import useReceiver from "@/hooks/useReceiver"

import type { ChatPayload } from "@/components/types"

interface NotificationProps {
  chatWithNotifs: ChatPayload
}

function Notification({ chatWithNotifs }: NotificationProps) {
  const { receiver } = useReceiver(chatWithNotifs.members)
  const [show, setShow] = useState<boolean>(false)

  if (!receiver) return null

  return (
    <div
      className={clsx(
        "flex flex-col w-full px-4 shadow-md pb-6 rounded-md",
        "transition-all duration-300",
        show && chatWithNotifs.notifications.length > 0 ? "gap-6 shadow-lg" : "gap-0"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center w-full gap-4">
          {receiver.image && (
            <Image
              src={receiver.image}
              width={40}
              height={40}
              alt="Foto de perfil Chat App"
              className="rounded-full"
            />
          )}

          <h2 className="text-gray-800 text-lg">
            {receiver.name}
          </h2>
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
          "flex flex-col px-6 gap-3 transition-all duration-300 overflow-hidden",
          !show ? "max-h-0 p-0 m-0 gap-0" : "max-h-screen",
        )}
      >
        {chatWithNotifs.notifications.map(n => (
          <li
            key={n.id}
            className="flex w-full items-center">
            <div
              className="px-2 py-1 rounded-md bg-gray-200 text-gray-700"
            >
              {n.message.content}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notification