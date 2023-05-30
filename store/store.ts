import { create } from "zustand";
import { ActiveStoreProps, SearchState } from "./types";

export const useSearchStore = create<SearchState>()((set) => ({
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

export const useActiveListStore = create<ActiveStoreProps>()((set) => ({
  members: [],
  add: (id) => set((state) => ({ members: [...state.members, id] })),
  remove: (id) =>
    set((state) => ({
      members: state.members.filter((memberId) => memberId !== id),
    })),
  set: (ids) => set({ members: ids }),
}));
