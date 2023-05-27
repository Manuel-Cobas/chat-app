import { useRouter } from "next/router";
import useChat from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { Message } from "@prisma/client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { pusherClient } from "@/libs/pusher";
import ChatNav from "@/components/ChatsPage/ChatNav";
import MessagesList from "@/components/ChatsPage/MessagesList";
import MessageInput from "@/components/ChatsPage/MessageInput";

function Chat() {
  const { id: contactId } = useRouter().query
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const { data: chat, isLoading } = useChat(contactId)
  const [messages, setMessages] = useState<Message[]>()

  useEffect(() => {
    if (chat && !isLoading) {
      setMessages([...chat.messages])
    }
  }, [chat, isLoading])

  useEffect(() => {
    if (currentUser && !loadingUser && chat) {
      pusherClient.subscribe(currentUser.id)
      pusherClient.bind("message:send", (data: Message) => {
        setMessages([...chat.messages, data])
      })
    }

    () => {
      if (currentUser && !loadingUser) {
        pusherClient.unsubscribe(currentUser.id)
        pusherClient.unbind("message:send")
      }
    }
  }, [chat, loadingUser, contactId, currentUser])

  return (
    <main className="">
      <ChatNav />
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

export default Chat