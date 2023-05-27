import React, { useMemo } from 'react'
import { User } from '@prisma/client';
import { useSearchStore } from '@/store/store';
import UserBox from '../UserBox';

export interface ContactPayload {
  id: string;
  userId: string;
  contactId: string;
  user: User;
  contact: User;
}

interface ListProps {
  list: ContactPayload[]
}

function List({ list }: ListProps) {
  const { search } = useSearchStore(state => state)
  const filteredContacts = useMemo(() => {
    if (search && list.length > 0) {
      return list.filter(({ contact }: ContactPayload) => {
        return contact.name!
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      })
    }

    return list
  }, [search, list])

  // console.log(filteredContacts)

  return (
    <ul className="flex flex-col w-screen h-full pt-6">
      {
        filteredContacts && filteredContacts.length > 0 && filteredContacts.map((el: ContactPayload) => (
          <li
            key={el.id}
            className=""
          >
            <UserBox
              contact={el}
              user={null}
              image={
                el.contact.image
              }
            />
          </li>
        ))
      }
    </ul>
  )
}

export default List