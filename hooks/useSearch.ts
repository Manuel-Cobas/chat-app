import { useState, useCallback, useEffect, type ChangeEvent } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    return () => {
      cleanSearch();
    };
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  }, []);

  const cleanSearch = () => setSearch("");

  return {
    search,
    onChange,
    cleanSearch,
  };
};
