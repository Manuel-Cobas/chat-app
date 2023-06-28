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
import AddContactModal from "@/components/Modals/AddContactModal";
import NotificationsModal from "@/components/Modals/NotificationModal/NotificationsModal";

import { useSearchModal } from "@/zustand/useSearchModal";
import { useFetchChats } from "@/hooks/useFetchChats";
import { useFetchUser } from "@/hooks/useFetchUser";
import isEmail from "@/libs/isEmail";
import { useFetchContacts } from "@/hooks/useFetchContacts";
import ContactList from "@/components/ContactList";

/**Pendientes Para Jueves 29 de Junio (Mañana)
 * Arreglar la maquetacion de los contactos
 * Decidir como se gestionará la creación de chats
 * agregar el campo lastMessage al modelo de la DB
 * hacer pruebas con el fetching de datos
 */

function ChatsPage() {
  const { search } = useSearchModal()

  const { chats, loadingChats } = useFetchChats()
  const { contacts, loadingContacts } = useFetchContacts()
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
          "flex flex-col gap-4 w-screen px-2 ",
          "transition-all",
          verifyEmail && user ? "scale-y-100 pt-20" : "scale-y-0 pt-0"
        )}
      >
        <div className="relative rounded-lg shadow-md mt-4 mb-4 p-2">
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
            verifyEmail && user ? "relative px-2 mt-8" : "pt-8"
          )}
        >
          <div
            className={clsx(
              "transition-all border border-transparent rounded-lg",
              verifyEmail && user && "border-gray-100 shadow-md py-2"
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

      {contacts && contacts.length > 0 && (
        <section className="transition-all relative px-2 mt-8">
          <div className="py-2 border border-gray-100 rounded-lg shadow-md transition-all">
            <h2 className="absolute -top-4 left-6 text-lg px-2 bg-white font-semibold text-gray-600">
              Contactos
            </h2>

            <ContactList contacts={contacts} />
          </div>
        </section>
      )}

      <Navigation />
      <Search />

      {user && (
        <AddContactModal
          user={user}
        />
      )}

      < NotificationsModal />
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