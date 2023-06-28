import { create } from "zustand";
import type { SearchState } from "@/zustand/types";

export const useSearchModal = create<SearchState>()((set) => ({
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
