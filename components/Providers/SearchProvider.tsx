import axios from 'axios';
import { SearchContext } from "@/context/SearchContext";

import { useState, useCallback, type ChangeEvent } from 'react'
import { useChatList } from '@/hooks/useChatList';
import { useUser } from '@/hooks/useUser';
import isEmail from "@/libs/isEmail"
import { User } from '@prisma/client';

interface SearchContextProps {
  children: JSX.Element | JSX.Element[]
}

export function SearchProvider({ children }: SearchContextProps) {
  const { user, loadingUser } = useUser()
  const { chats, loadingChats } = useChatList()

  const [search, setSearch] = useState<string>("")
  const [userFound, setUser] = useState<User | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)


  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const filteredChats = useCallback(() => {
    if (!loadingUser && !loadingChats) {
      const filteredArray = chats.map((chat) => {
        chat.members.filter((m) => m.name !== user.name)
      })

      console.log(filteredArray)
    }

  }, [chats, user, loadingChats, loadingUser])

  const cleanSearch = useCallback(() => {
    setSearch("")
  }, [])

  const fetchUser = useCallback(() => {
    if (isEmail(search)) {
      axios.get(`/api/users/${search}`)
        .then((res) => {
          setIsLoading(true)
          console.log("fetchUser!!!!!!", res.data)
          setUser(res.data)
        })
        .catch((err) => {
          setIsLoading(false)
          setError(err)
        })
        .finally(() => setIsLoading(false))
    }
  }, [search])

  return (
    <SearchContext.Provider value={{
      search,
      user: userFound,
      loadingUser: isLoading,
      userError: error,
      onChange,
      fetchUser,
      cleanSearch,
      filteredChats
    }}>
      {children}
    </SearchContext.Provider>
  )
}