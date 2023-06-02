import { create } from "zustand";
import { SearchState } from "./types";

export const useSearch = create<SearchState>()((set) => ({
  search: "",
  isOpen: false,
  setSearch: (current: string) => {
    set((state) => ({ ...state, search: current }));
  },
  closeSearch: () => {
    set((state) => ({ ...state, isOpen: false }));
  },
  openSearch: () => {
    set((state) => ({ ...state, isOpen: true }));
  },
}));
