import { useRouter } from "next/router";
import useChat from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { Message } from "@prisma/client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { pusherClient } from "@/libs/pusher";
import ChatNav from "@/components/ChatsPage/ChatNav";
import MessagesList from "@/components/ChatsPage/MessagesList";
import MessageInput from "@/components/ChatsPage/MessageInput";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

function Chat() {
  const { id: chatId } = useRouter().query
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const { data: chat, isLoading } = useChat(chatId)
  const [messages, setMessages] = useState<Message[]>()

  useEffect(() => {
    if (chat && !isLoading) {
      setMessages([...chat.messages])
    }
  }, [chat, isLoading])

  useEffect(() => {
    if (currentUser && !loadingUser) {
      pusherClient.subscribe(currentUser.id)
      pusherClient.bind("message:send", (data: Message) => {
        if (chat.messages.length > 0) {
          setMessages([...chat.messages, data])
        } else setMessages([data])
      })
    }

    () => {
      if (currentUser && !loadingUser) {
        pusherClient.unsubscribe(currentUser.id)
        pusherClient.unbind("message:send")
      }
    }
  }, [chat, loadingUser, chatId, currentUser])

  return (
    <main className="">
      <ChatNav chat={chat} currentUserId={currentUser.id} />
      {chat && (
        <MessageInput chatId={chat.id} />
      )}
      {isLoading && (
        <div className="text-lg flex items-center w-full">
          Cargando Mensajes
        </div>
      )}

      {messages && messages.length === 0 && (
        <div className="w-full text-center text-gray-700 text-lg pt-20">
          Saluda a (Nombre del contacto)
        </div>
      )}

      {messages && messages.length > 0 && currentUser && (
        <MessagesList
          messages={messages}
          currentUserId={currentUser.id}
        />
      )}
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

export default Chat


/*
DATABASE_URL="mongodb+srv://cobasguerram:BpQUOSUh8vb4RckA@cluster0.xy6sf7k.mongodb.net/mongodbchat"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="fB557teg8495T/8SvDKVAl+GClm3dJRyiF0UvVXbAiE="

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

# Next Auth GitHub Provider
GITHUB_CLIENT_ID="023afbfc5f3d0b12ccc5"
GITHUB_CLIENT_SECRET="ca7f5e4959361c393f88c947c7236aa4ec8de22b"

# Next Auth Google Provider
GOOGLE_CLIENT_ID="585707782886-svkbs0viud677s1jc4ri8eqdk1ucut2c.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"

PUSHER_APP_ID="1607423"
NEXT_PUBLIC_PUSHER_APP_KEY="96f7f03092be8c9ae38d"
PUSHER_SECRET="096afa43b421ebfe7f6b"


*/