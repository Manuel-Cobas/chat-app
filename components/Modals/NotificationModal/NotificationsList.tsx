import { Notification } from "@prisma/client"

interface NotificationsListProps {
  notifications: Notification[]
}

function NotificationsList({ notifications }: NotificationsListProps) {
  return (
    <ul className="flex flex-col w-screen h-screen px-2 pt-20 pb-20 gap-4 overflow-y-scroll">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="text-white p-4 bg-rose-500 w-full"
        >
          {n.message}
        </div>
      ))}
    </ul>
  )
}

export default NotificationsList