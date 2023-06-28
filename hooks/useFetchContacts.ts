import fetcher from "@/libs/fetcher";
import useSWR from "swr";

export function useFetchContacts() {
  const { data, isLoading, error, mutate } = useSWR("/api/contacts/", fetcher);
  data && console.log("CONTACTS!!", data);
  return {
    contacts: data,
    loadingContacts: isLoading,
    contactsError: error,
    contactMutate: mutate,
  };
}
