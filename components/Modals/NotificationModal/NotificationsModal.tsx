import clsx from "clsx"
import { BiArrowBack } from "react-icons/bi"

import useNotifications from "@/hooks/useNotifications";
import { useNotificationModal } from "@/store/useNotificationsModal";
import Spinner from "@/components/Loading/Spinner";
import Notification from "./Notification";
import { ChatPayload } from "@/components/types";

function NotificationsModal() {
  const {
    notifications,
    loadingNotifications
  } = useNotifications()

  const { closeModal, isOpen } = useNotificationModal(state => state)

  return (
    <div className={clsx(
      "fixed top-0 left-0 bottom-0 right-0 bg-white overflow-y-scroll pb-16",
      "transition-transform duration-300",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <header className="fixed top-0 left-0 right-0">
        <nav className="object-cover">
          <ul className="flex items-center shadow p-2 bg-gray-50">
            <li className="flex items-center gap-3">
              <BiArrowBack
                onClick={closeModal}
                className="text-2xl text-gray-600 cursor-pointer"
              />

              <h2 className="text-[1.4em] text-gray-600">
                Notificaciones
              </h2>
            </li>
          </ul>
        </nav>
      </header>

      {loadingNotifications && (
        <div className="flex items-center justify-center bg-white h-full w-full">
          <Spinner />
        </div>
      )}

      {notifications && (
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