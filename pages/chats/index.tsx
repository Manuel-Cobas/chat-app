import ActiveStatus from "@/components/ActiveStatus";
import ChatList from "@/components/ChatsPage/ChatList";
import Navigation from "@/components/ChatsPage/Navigation"
import UserBox from "@/components/UserBox";
import useChatList from "@/hooks/useChatList";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useSearchStore } from "@/store/store";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

function ChatsPage() {
  const { data: currentUser } = useCurrentUser()
  const { data: chats, isLoading, error } = useChatList(currentUser?.id)
  const { search } = useSearchStore((state) => state)
  const { data: user } = useUser(search)

  return (
    <main className="w-screen h-full">
      <ActiveStatus />
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

      {!error && !chats && isLoading && (
        <div className="pt-10 text-2xl text-gray-700">
          Cargando Contactos
        </div>
      )}


      {!isLoading && !error && chats && currentUser && (
        <ChatList
          currentUserId={currentUser.id}
          chats={chats}
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

export default ChatsPage