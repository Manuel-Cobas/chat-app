import { HiOutlineSearch } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import Search from "../Search";
import { useLogoutModalStore, useSearchStore } from "@/store/store";

function Navigation() {
  const { openSearch } = useSearchStore((state) => state)
  const { openModal } = useLogoutModalStore(state => state)

  return (
    <header className="fixed top-0 right-0 left-0 h-14">
      <nav className="relative">
        <Search />
        <ul className="flex items-center justify-between bg-red-500 w-screen h-14 px-4">
          <li className="text-xl text-white font-semibold">
            Chat App
          </li>
          <ul className="flex items-center gap-1">
            <li className="">
              <HiOutlineSearch
                onClick={openSearch}
                className="text-white text-4xl p-1 cursor-pointer"
              />
            </li>
            <li className="">
              <BiLogOut
                onClick={() => {
                  openModal()
                }}
                className="text-4xl text-white cursor-pointer p-1"
              />
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation