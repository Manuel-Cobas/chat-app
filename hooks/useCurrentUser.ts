import useSWR from "swr";
import fetcher from "@/libs/fetcher";

export function useCurrentUser() {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/users/current",
    fetcher,
    {
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
