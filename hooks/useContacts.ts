import useSWR from "swr";
import fetcher from "@/libs/fetcher";

function useContacts() {
  const { data, isLoading, mutate, error } = useSWR(
    "/api/contacts/all",
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

export default useContacts;
