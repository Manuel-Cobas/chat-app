import fetcher from "@/libs/fetcher";
import useSWR from "swr";
import axios from "axios";

function useChat(receiverId: string[]) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/chats/${receiverId}`,
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
