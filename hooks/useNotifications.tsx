import { useEffect, useState } from "react";
import fetcher from "@/libs/fetcher";
import useSWR from "swr";

import { User } from "@prisma/client";
import { pusherClient } from "@/libs/pusher";


function useNotifications(currentUser: User) {
  const { data, isLoading, error } = useSWR("/api/notifications", fetcher)
  const [notifications, setNotifications] = useState<Notification[]>([])

  notifications && console.log("NOTIS", notifications)
  // data && console.log(data)

  useEffect(() => {
    if (data && data.length > 0) {
      setNotifications(data);
    }
  }, [data]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser.id);
      pusherClient.bind("notification:send", (data: Notification) => {
        setNotifications([...notifications, data]);
      });
    }
  }, [currentUser, notifications])

  return {
    notifications: data,
    loadingNotifications: isLoading,
    error
  }
}

export default useNotifications