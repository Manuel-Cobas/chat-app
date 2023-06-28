import useSWR from "swr";
import fetcher from "@/libs/fetcher";

export function useFetchNotifs() {
  const { data, isLoading, error } = useSWR(
    "/api/chats/notifications",
    fetcher,
    {
      revalidateOnMount: false,
    }
  );

  return {
    notifications: data ? data.chatWithNotifs : [],
    totalNotifs: data ? data.totalNotifs : 0,
    loadingNotifications: isLoading,
    notificationsError: error,
  };
}
