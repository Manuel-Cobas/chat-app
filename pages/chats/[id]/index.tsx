import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

import ChatNav from "@/components/ChatView/ChatNav";
import MessagesList from "@/components/ChatView/MessageList";
import MessageInput from "@/components/ChatView/MessageInput";
import QuestionModal from "@/components/Modals/QuestionModal";
import Loading from "@/components/Loading/Loading";

import { useRouter } from "next/router";
import { useChat } from "@/hooks/useFetchChat";
import { useMessages } from "@/hooks/useMessages";

function Chat() {
  const { id: chatId } = useRouter().query
  const { chat, loadingChat } = useChat(chatId?.toString())
  const { messages } = useMessages(chat?.messages)

  return (
    <main className="">
      <ChatNav
        chat={chat}
      />

      {loadingChat && (
        <Loading />
      )}

      {messages && messages.length === 0 && (
        <div className="w-full text-center text-gray-700 text-lg pt-20">
          Saluda a (Nombre del contacto)
        </div>
      )}

      {messages && messages.length > 0 && (
        <MessagesList
          messages={messages}
        />
      )}

      {chat && (
        <MessageInput chatId={chat.id} />
      )}

      <QuestionModal
        title="Esta seguro/a de borrar la conversación?"
        buttonTitle="confirmo"
        description="Solo podra recuperar el chat si el contacto le envia una solicitud de recuperacion."
        method={() => { }}
      />
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