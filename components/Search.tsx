import { useSearchStore } from "@/store/store";
import { ChangeEvent } from "react";
import { BiArrowBack } from "react-icons/bi";
import { HiBackspace } from "react-icons/hi";
import clsx from "clsx";

function Search() {
  const { search, isOpen, setSearch, closeSearch } = useSearchStore((state) => state)

  return (
    <ul className={clsx(
      "absolute justify-between items-center bg-red-500 w-full h-14 px-4",
      isOpen ? "flex" : "hidden"
    )}>
      <li className="flex items-center w-11/12 gap-2">
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
      </li>
      <li className="">
        <HiBackspace
          onClick={() => {
            setSearch("")
          }}
          className="text-white text-4xl p-1 cursor-pointer"
        />
      </li>
    </ul>
  )
}

export default Search