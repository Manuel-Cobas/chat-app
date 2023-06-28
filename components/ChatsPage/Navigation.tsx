import { BiLogOut } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";

import { useSearchModal } from "@/zustand/useSearchModal";
import { useQuestionModal } from "@/store/useQuestionModal";
import { useNotificationModal } from "@/store/useNotificationsModal";
import { useFetchNotifs } from "@/hooks/useFetchNotifs";


function Navigation() {
  const { openSearch } = useSearchModal((state) => state)
  const { openModal: openLogoutQuestion } = useQuestionModal(state => state)
  const { openModal: openNotifications } = useNotificationModal(state => state)

  const { totalNotifs } = useFetchNotifs()

  return (
    <header className="fixed top-0 right-0 left-0 h-14">
      <nav className="relative">
        <ul className="flex items-center justify-between bg-red-500 w-screen h-14 px-4">
          <li className="text-xl text-white font-semibold">
            Chat App
          </li>

          <ul className="flex items-center gap-1">
            <li>
              <div
                className="relative cursor-pointer"
                onClick={openNotifications}
              >
                <IoMdNotificationsOutline
                  className="text-white text-4xl p-1"
                />
                <p className="absolute top-1 left-[1.6em] px-2 bg-white text-red-700 text-center text-[12px] rounded-full">
                  {totalNotifs}
                </p>
              </div>
            </li>

            <li>
              <div>
                <HiOutlineSearch
                  onClick={openSearch}
                  className="text-white text-4xl p-1 cursor-pointer"
                />
              </div>
            </li>

            <li>
              <BiLogOut
                onClick={() => {
                  openLogoutQuestion()
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