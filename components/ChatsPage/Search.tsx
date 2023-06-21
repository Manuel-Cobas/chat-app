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
        "flex justify-between absolute top-0 right-0 left-0 h-14 bg-gray-50 gap-2 px-4 shadow",
        "transition-transform duration-200",
        isOpen ? "translate-y-0" : "-translate-y-full"
      )}>

      <div className="flex items-center gap-2 w-11/12">
        <BiArrowBack
          onClick={() => {
            setSearch("")
            closeSearch()
          }}
          className="text-2xl text-gray-700 cursor-pointer"
        />

        <input
          className="bg-gray-200 rounded-full w-11/12 text-gray-700 outline-none placeholder:text-gray-600 px-4 py-2"
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

      <div className="flex items-center gap-1">
        <button
          className={clsx(
            verifyEmail ? "block" : "hidden"
          )}
          type="submit"
        >
          <MdPersonSearch
            className="text-rose-500 text-4xl p-1 cursor-pointer"
          />
        </button>
        <button>
          <HiBackspace
            onClick={(e) => {
              e.preventDefault()
              setSearch("")
            }}
            className="text-gray-700 text-4xl p-1 cursor-pointer"
          />
        </button>
      </div>
    </form>
  )
}

export default Search
