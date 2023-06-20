import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import ActiveStatus from "@/components/ChatsPage/ActiveStatus";
import ChatList from "@/components/ChatsPage/ChatList";
import Navigation from "@/components/ChatsPage/Navigation"
import UserBox from "@/components/ChatsPage/UserBox";
import Loading from "@/components/Loading/Loading";
import QuestionModal from "@/components/Modals/QuestionModal";
import NotificationsModal from "@/components/Modals/NotificationModal/NotificationsModal";

import { useSearch } from "@/store/useSearch";
import useChatList from "@/hooks/useChatList";
import useSearchUser from "@/hooks/useUser";
import isEmail from "@/libs/isEmail";

function ChatsPage() {
  const { chats, loadingChats } = useChatList()
  
  const { search } = useSearch()
  const { user, loadingUser } = useSearchUser()
  const verifyEmail = isEmail(search)

  if (loadingUser || loadingChats) {
    return <Loading />
  }

  return (
    <main className="w-screen h-full">
      <ActiveStatus />

      {verifyEmail && user && (
        <div className="w-screen h-full pt-8 pb-2 border-b gray-300">
          <UserBox
            user={user}
            image={
              user.image
            }
          />
        </div>
      )}

      {chats && (
        <ChatList chats={chats} />
      )}

      <Navigation />

      <QuestionModal
        title={"Desea Cerrar Sesión?"}
        buttonTitle="Cerrar"
        method={signOut}
      />

      <NotificationsModal />
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