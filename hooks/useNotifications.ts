import useSWR from "swr";
import { useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

import fetcher from "@/libs/fetcher";
import { pusherClient } from "@/libs/pusher";

function useNotifications() {
  const { currentUser } = useCurrentUser();
  const { data, isLoading, error } = useSWR("/api/notifications", fetcher, {
    revalidateOnMount: false,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
  }, [currentUser, notifications]);

  return {
    notifications: data,
    loadingNotifications: isLoading,
    notificationsError: error,
  };
}

export default useNotifications;
