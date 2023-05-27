import useSWR from "swr";
import fetcher from "@/libs/fetcher";

function useUser(email: string) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/users/${email}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}

export default useUser;
