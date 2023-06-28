import Image from "next/image";
import { useRouter } from "next/router";
import type { User } from "@prisma/client";

function Contact({ contact }: { contact: User }) {
  const router = useRouter()

  if (!contact) return null

  return (
    <div className="flex items-center justify-around w-full px-4 sm:w-1/2">
      <div
        className="flex items-center gap-4"
        onClick={() => console.log("ir a chat")}
      >
        {contact.image && (
          <Image
            src={contact.image.toString()}
            alt="foto de perfil chat app"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}

        <div className="flex flex-col justify-center items-center h-16 cursor-pointer">
          <div>
            <h2 className="text-lg text-gray-800">
              {contact.name}
            </h2>
          </div>
          <div className="w-3/4 overflow-hidden">
            {/* Hay que poner aqui el ultimo mensaje de la conversacion */}
            {/* <LastMessage
              currentUserId={contact.id}
              messages={chat.messages}
            /> */}
          </div>
        </div>
      </div>
      {/* Aqui va el total de notificaciones o de mensajes sin ver */}
      {/* {chat.notifications.length > 0 && (
        <div
          className="relative flex items-center justify-center bg-red-500 rounded-full p-3"
        >
          <p className="absolute text-white text-sm">
            {chat.notifications.length}
          </p>
        </div>
      )} */}
    </div>
  )
}

export default Contact