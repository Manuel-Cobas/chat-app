import useSWR from "swr";
import fetcher from "@/libs/fetcher";

function useChats() {
  const { data, isLoading, mutate, error } = useSWR(
    "/api/chats/all",
    fetcher
  );
  // console.log(data);
  return {
    data,
    isLoading,
    mutate,
    error,
  };
}

export default useChats;
