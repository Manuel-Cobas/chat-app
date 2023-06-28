import fetcher from "@/libs/fetcher";
import useSWR from "swr";

export function useFetchChat(chatId: any) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/chats/${chatId.toString()}`,
    fetcher
  );

  return {
    chat: data,
    loadingChat: isLoading,
    chatError: error,
    chatMutate: mutate,
  };
}
