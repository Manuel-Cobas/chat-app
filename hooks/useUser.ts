import { useSearchUserStore } from "@/store/store";
import { useState, useCallback } from "react";
import axios from "axios";

function useSearchUser(email: string = "") {
  const { user, setUser } = useSearchUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const SearchUser = useCallback(() => {
    email !== "" &&
      axios
        .get(`/api/users/${email}`)
        .then((res) => {
          setIsLoading(true);
          res && setUser(res.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
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

export default useSearchUser;
