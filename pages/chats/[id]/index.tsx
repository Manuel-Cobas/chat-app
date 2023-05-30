import { useRouter } from "next/router";
import useChat from "@/hooks/useChat";
import useCurrentUser from "@/hooks/useCurrentUser";
import ChatNav from "@/components/ChatsPage/ChatNav";
import MessagesList from "@/components/ChatsPage/MessageList";
import MessageInput from "@/components/ChatsPage/MessageInput";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useMessages from "@/hooks/useMessages";

function Chat() {
  const { id: chatId } = useRouter().query
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const { data: chat, isLoading: loadingChat } = useChat(chatId?.toString())
  const { messagesState: messages } = useMessages(
    chat?.messages,
    currentUser?.id
  )

  return (
    <main className="">
      <ChatNav chat={chat} currentUserId={currentUser?.id} />
      {chat && (
        <MessageInput chatId={chat.id} />
      )}

      {loadingChat && (
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