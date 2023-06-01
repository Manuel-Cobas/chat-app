import ActiveStatus from "@/components/ActiveStatus";
import ChatList from "@/components/ChatsPage/ChatList";
import Navigation from "@/components/ChatsPage/Navigation"
import UserBox from "@/components/UserBox";
import Spinner from "@/components/Spinner";
import useChatList from "@/hooks/useChatList";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSearchUser from "@/hooks/useUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import isEmail from "@/libs/isEmail";
import { useSearchStore } from "@/store/store";
import LogoutModal from "@/components/Modals/LogoutModal";

function ChatsPage() {
  const { data: currentUser } = useCurrentUser()
  const { search } = useSearchStore()
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
      <LogoutModal />
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