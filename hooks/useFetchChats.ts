import useSWR from "swr";
import fetcher from "@/libs/fetcher";

export function useFetchChats() {
  const { data, isLoading, error, mutate } = useSWR("/api/chats/all", fetcher);

  return {
    chats: data ? data : [],
    loadingChats: isLoading,
    error,
    mutate,
  };
}
