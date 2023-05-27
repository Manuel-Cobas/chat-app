import List, { ContactPayload } from "@/components/ChatsPage/List";
import Navigation from "@/components/ChatsPage/Navigation"
import UserBox from "@/components/UserBox";
import useContacts from "@/hooks/useContacts";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { pusherClient } from "@/libs/pusher";
import { useSearchStore } from "@/store/store";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

function ChatsPage() {
  const {
    data: currentUser,
    isLoading: loadingCurrentUser,
  } = useCurrentUser()
  const { data: contacts, isLoading, error } = useContacts()
  const { search } = useSearchStore((state) => state)
  const { data: user } = useUser(search)
  const [contactsList, setContactsList] = useState<ContactPayload[] | []>([])

  useEffect(() => {
    contacts && setContactsList([...contacts])
  }, [contacts])

  useEffect(() => {
    if (currentUser && currentUser.id && !loadingCurrentUser && contacts) {
      pusherClient.subscribe(currentUser.id!)
      pusherClient.bind("contact:add", (data: ContactPayload) => {
        setContactsList([...contacts, data])
      })
    }

    return () => {
      if (currentUser && currentUser.id && !loadingCurrentUser) {
        pusherClient.unsubscribe(currentUser.id)
        pusherClient.unbind("contact:add")
      }
    }
  }, [currentUser, loadingCurrentUser, contacts, contactsList])

  return (
    <main className="w-screen h-full">
      <Navigation />

      {user && (
        <div className="w-screen h-full pt-10">
          <UserBox
            user={user}
            contact={null}
            image={
              user.image
            }
          />
        </div>
      )}

      {!error && !contacts && !user && isLoading && (
        <div className="pt-10 text-2xl text-gray-700">
          Cargando Contactos
        </div>
      )}

      {!isLoading && !error && !user && contactsList && (
        <List list={contactsList} />
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