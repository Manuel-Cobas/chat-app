import { useEffect } from "react";
import { ChangeEvent } from "react";
import clsx from "clsx";

import useUser from "@/hooks/useUser";
import { useSearch } from "@/store/useSearch";
import isEmail from "@/libs/isEmail";

import { MdPersonSearch } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { HiBackspace } from "react-icons/hi";

function Search() {
  const { search, isOpen, setSearch, closeSearch } = useSearch((state) => state)
  const verifyEmail = isEmail(search)
  const { SearchUser, clearUserSearch } = useUser(search)

  useEffect(() => {
    return () => {
      clearUserSearch()
    }
  }, [clearUserSearch])


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (verifyEmail) SearchUser()
      }}
      className={clsx(
        "justify-between absolute top-0 right-0 left-0 h-14 bg-red-500 px-4",
        isOpen ? "flex" : "hidden"
      )}>
      <div className="flex items-center gap-2 w-11/12">
        <BiArrowBack
          onClick={() => {
            setSearch("")
            closeSearch()
          }}
          className="text-2xl text-white cursor-pointer"
        />
        <input
          className="bg-transparent w-full text-white outline-none placeholder:text-gray-50 py-4 px-2"
          placeholder="Buscar"
          value={search}
          type="text"
          autoFocus={true}
          onChange={
            (e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              setSearch(e.target.value)
            }
          }
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className={clsx(
            verifyEmail ? "block" : "hidden"
          )}
          type="submit"
        >
          <MdPersonSearch
            className="text-white mr-2 text-4xl p-1 cursor-pointer"
          />
        </button>
        <button>
          <HiBackspace
            onClick={(e) => {
              e.preventDefault()
              setSearch("")
            }}
            className="text-white text-4xl p-1 cursor-pointer"
          />
        </button>
      </div>
    </form>
  )
}

export default Search
