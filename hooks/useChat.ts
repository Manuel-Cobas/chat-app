import fetcher from "@/libs/fetcher";
import useSWR from "swr";

function useChat(chatId: any) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/chats/${chatId.toString()}`,
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
