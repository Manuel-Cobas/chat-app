import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";

import ActiveStatus from "@/components/ChatsPage/ActiveStatus";
import ChatList from "@/components/ChatsPage/ChatList";
import Navigation from "@/components/ChatsPage/Navigation"
import UserBox from "@/components/ChatsPage/UserBox";
import Spinner from "@/components/Loading/Spinner";
import QuestionModal from "@/components/Modals/QuestionModal";

import { useSearch } from "@/store/useSearch";
import useChatList from "@/hooks/useChatList";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSearchUser from "@/hooks/useUser";
import isEmail from "@/libs/isEmail";

function ChatsPage() {
  const { data: currentUser } = useCurrentUser()
  const { search } = useSearch()
  const { data: chats, isLoading: loadingChats, error } = useChatList(currentUser?.id)
  const { user, isLoading: loadingUser } = useSearchUser()
  const verifyEmail = isEmail(search)

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

      {loadingChats || loadingUser && (
        <div className="flex justify-center items-center w-screen pb-16 h-screen">
          <Spinner />
        </div>
      )}

      {!error && chats && currentUser && (
        <ChatList
          currentUserId={currentUser.id}
          chats={chats}
        />
      )}

      <Navigation />

      <QuestionModal
        title={"Desea Cerrar Sesión?"}
        buttonTitle="Cerrar"
        method={signOut}
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

export default ChatsPage