import { User } from "@prisma/client";
import { createContext, type ChangeEvent } from "react";

interface SearchContext {
  search: string;
  user: User | null;
  loadingUser: boolean;
  userError: any | null;

  fetchUser: () => void;
  cleanSearch: () => void;
  filteredChats: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchContext = createContext<SearchContext>({
  search: "",
  user: null,
  loadingUser: false,
  userError: null,
  fetchUser: () => {},
  onChange: (e: ChangeEvent<HTMLInputElement>) => {},
  cleanSearch: () => {},
  filteredChats: () => {},
});
