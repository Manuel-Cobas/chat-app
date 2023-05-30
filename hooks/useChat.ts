import fetcher from "@/libs/fetcher";
import useSWR from "swr";

function useChat(receiverId: any) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/chats/${receiverId.toString()}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}

export default useChat;
