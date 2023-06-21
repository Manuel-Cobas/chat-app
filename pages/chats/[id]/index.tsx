import { useRouter } from "next/router";
import useChat from "@/hooks/useChat";
import useCurrentUser from "@/hooks/useCurrentUser";
import ChatNav from "@/components/ChatView/ChatNav";
import MessagesList from "@/components/ChatView/MessageList";
import MessageInput from "@/components/ChatView/MessageInput";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useMessageList from "@/hooks/useMessageList";
import Loading from "@/components/Loading/Loading";
import QuestionModal from "@/components/Modals/QuestionModal";

function Chat() {
  const { id: chatId } = useRouter().query
  const { currentUser } = useCurrentUser();
  const { data: chat, isLoading: loadingChat } = useChat(chatId?.toString())
  const { messagesState: messages } = useMessageList(
    chat?.messages,
    currentUser?.id
  )

  return (
    <main className="">
      <ChatNav
        chat={chat}
        currentUserId={currentUser?.id}
      />

      {loadingChat && (
        <Loading />
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