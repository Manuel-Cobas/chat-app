import useSWR from "swr";
import fetcher from "@/libs/fetcher";

function useCurrentUser() {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/users/current",
    fetcher,
    {
      revalidateOnReconnect: true,
      revalidateIfStale: true,
      revalidateOnMount: false,
    }
  );

  return {
    currentUser: data,
    loadingCurrentUser: isLoading,
    currentUserError: error,
    currentUserMutate: mutate,
  };
}

export default useCurrentUser;
