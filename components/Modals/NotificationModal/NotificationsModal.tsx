import clsx from "clsx"
import { BiArrowBack } from "react-icons/bi"
import NotificationsList from "./NotificationsList"

import useNotifications from "@/hooks/useNotifications";
import Loading from "@/components/Loading/Loading";
import { useNotificationModal } from "@/store/useNotificationsModal";
import { User } from "@prisma/client";

interface NotificationsModalProps {
  currentUser: User
}

function NotificationsModal({ currentUser }: NotificationsModalProps) {
  const {
    notifications,
    loadingNotifications
  } = useNotifications(currentUser)

  const { closeModal, isOpen } = useNotificationModal(state => state)

  return (
    <div className={clsx(
      "fixed top-0 left-0 bottom-0 right-0 bg-white",
      isOpen ? "block" : "hidden"
    )}>
      <header className="fixed top-0 left-0 right-0">
        <nav className="object-cover">
          <ul className="flex items-center shadow p-2">
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

      {!loadingNotifications ? (
        <NotificationsList
          notifications={notifications}
        />
      ) : (<Loading />)}
    </div>
  )
}

export default NotificationsModal