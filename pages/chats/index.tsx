import clsx from "clsx";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import Search from "@/components/ChatsPage/Search";
import ActiveStatus from "@/components/ChatsPage/ActiveStatus";
import ChatList from "@/components/ChatsPage/ChatList";
import Navigation from "@/components/ChatsPage/Navigation"
import UserBox from "@/components/ChatsPage/UserBox";
import Loading from "@/components/Loading/Loading";
import QuestionModal from "@/components/Modals/QuestionModal";
import NotificationsModal from "@/components/Modals/NotificationModal/NotificationsModal";

import { useSearch } from "@/store/useSearch";
import { useFetchChats } from "@/hooks/useFetchChats";
import { useFetchUser } from "@/hooks/useFetchUser";
import isEmail from "@/libs/isEmail";

function ChatsPage() {
  const { search } = useSearch()

  const { chats, loadingChats } = useFetchChats()
  const { user, loadingUser } = useFetchUser()
  const verifyEmail = isEmail(search)

  if (loadingUser || loadingChats) {
    return <Loading />
  }

  return (
    <main className="w-screen h-full">
      <ActiveStatus />

      <section
        className={clsx(
          "flex flex-col gap-2 w-screen px-2 ",
          "transition-all",
          verifyEmail && user ? "scale-y-100 pt-20" : "scale-y-0 pt-0"
        )}
      >
        <div className="relative border border-gray-100 rounded-lg shadow p-2">
          <h2 className="absolute -top-4 left-6 text-lg px-2 bg-white font-semibold text-gray-600">
            Busqueda
          </h2>
          {verifyEmail && user && (
            <div className="">
              <UserBox
                user={user}
                image={user.image}
              />
            </div>
          )}
        </div>
      </section>

      {chats && chats.length > 0 && (
        <section
          className={clsx(
            "transition-all",
            verifyEmail && user ? "relative px-2 mt-8" : "pt-16"
          )}
        >
          <div
            className={clsx(
              "transition-all border border-transparent rounded-lg",
              verifyEmail && user && "border-gray-100 shadow py-2"
            )}
          >
            <h2
              className={clsx(
                "absolute -top-4 left-6 text-lg px-2 bg-white font-semibold text-gray-600",
                verifyEmail && user ? "block" : "hidden"
              )}
            >
              Chats
            </h2>
            <ChatList chats={chats} />
          </div>
        </section>
      )}

      <Navigation />
      <Search />

      <NotificationsModal />
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