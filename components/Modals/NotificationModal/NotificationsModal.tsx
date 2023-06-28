import clsx from "clsx"

import Notification from "./Notification";
import Spinner from "@/components/Loading/Spinner";
import { BiArrowBack } from "react-icons/bi"
import { MdNotificationsActive } from "react-icons/md"
import { IoMdNotificationsOutline } from "react-icons/io";

import { useFetchNotifs } from "@/hooks/useFetchNotifs";
import { useNotificationModal } from "@/store/useNotificationsModal";

import type { ChatPayload } from "@/components/types";

function NotificationsModal() {
  const { closeModal, isOpen } = useNotificationModal(state => state)
  const { notifications, loadingNotifications, totalNotifs } = useFetchNotifs()

  return (
    <div className={clsx(
      "fixed top-0 left-0 bottom-0 right-0 bg-white overflow-y-scroll pb-16",
      "transition-transform duration-300",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <header className="fixed top-0 left-0 right-0">
        <nav className="object-cover">
          <ul className="flex justify-between items-center shadow px-3 py-2 bg-gray-50">
            <li className="flex items-center gap-2">
              <BiArrowBack
                onClick={closeModal}
                className="text-2xl text-gray-600 cursor-pointer"
              />

              <div className="flex items-center gap-2">
                <h2 className="text-[1.4em] text-gray-600">
                  Notificaciones
                </h2>
              </div>
            </li>
            <li className="">
              <div className="bg-rose-500 flex items-center rounded-xl py-1 px-3 gap-2">
                {
                  totalNotifs === 0 ? (
                    <IoMdNotificationsOutline
                      className="text-[1.5em] text-white"
                    />
                  ) : (
                    <MdNotificationsActive
                      className="text-[1.5em] text-white"
                    />
                  )
                }
                <p className="text-white font-medium text-sm">
                  {totalNotifs}
                </p>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      {loadingNotifications && (
        <div className="flex items-center justify-center bg-white h-full w-full">
          <Spinner />
        </div>
      )}

      {notifications && notifications.length > 0 && (
        <ul className="flex flex-col pt-20 w-full gap-5 px-2">
          {notifications.map((n: ChatPayload) => (
            <li key={n.id}>
              <Notification chatWithNotifs={n} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NotificationsModal