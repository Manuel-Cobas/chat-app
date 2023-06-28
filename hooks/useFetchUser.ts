import axios from "axios";

import { useState, useCallback } from "react";
import { useSearchUserStore } from "@/store/store";

export function useFetchUser(email: string = "") {
  const { user, setUser } = useSearchUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const SearchUser = useCallback(() => {
    if (email !== "") {
      return axios
        .get(`/api/users/${email}`)
        .then((res) => {
          setIsLoading(true);
          res && setUser(res.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [email, setUser]);

  const clearUserSearch = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return {
    user,
    loadingUser: isLoading,
    SearchUser,
    clearUserSearch,
  };
}
