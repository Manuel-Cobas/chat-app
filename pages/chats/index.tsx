import ChatBox, { ChatPayload } from "@/components/ChatBox";
import Navigation from "@/components/ChatsPage/Navigation"
import UserBox from "@/components/UserBox";
import useChats from "@/hooks/useChats";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { pusherClient } from "@/libs/pusher";
import { useSearchStore } from "@/store/store";
import { Chat } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

function ChatsPage() {
  const {
    data: currentUser,
    isLoading: loadingCurrentUser,
  } = useCurrentUser()

  const { data: chats, isLoading, error } = useChats()
  const { search } = useSearchStore((state) => state)
  const { data: user } = useUser(search)
  const [chatsList, setChatsList] = useState<ChatPayload[]>()

  // chats && console.log(chatsList)

  useEffect(() => {
    chats && chats.length > 0 && setChatsList([...chats])
  }, [chats])

  useEffect(() => {
    if (currentUser && currentUser.id && !loadingCurrentUser) {
      pusherClient.subscribe(currentUser.id!)
      pusherClient.bind("chat:new", (data: Chat) => {
        if (chats.length > 0) {
          setChatsList([...chats, data])
        } else setChatsList([data])
      })
    }

    return () => {
      if (currentUser && currentUser.id && !loadingCurrentUser) {
        pusherClient.unsubscribe(currentUser.id)
        pusherClient.unbind("contact:add")
      }
    }
  }, [currentUser, loadingCurrentUser, chats, setChatsList])

  return (
    <main className="w-screen h-full">
      <Navigation />

      {user && (
        <div className="w-screen h-full pt-10">
          <UserBox
            user={user}
            image={
              user.image
            }
          />
        </div>
      )}

      {!error && !chatsList && !user && isLoading && (
        <div className="pt-10 text-2xl text-gray-700">
          Cargando Contactos
        </div>
      )}

      <ul className="w-full pt-4">
        {!isLoading && !error && !user && chatsList && currentUser &&
          chatsList.map((chat: ChatPayload) => (
            <li
              key={chat.id}
              className="text-2xl"
            >
              <ChatBox
                chat={chat}
                currentUserId={currentUser.id}
              />
            </li>
          ))
        }
      </ul>
    </main>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default ChatsPage