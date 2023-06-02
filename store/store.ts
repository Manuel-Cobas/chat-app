import { create } from "zustand";
import { User } from "@prisma/client";
import { ActiveStore, SearchState, SearchUser } from "./types";



export const useActiveListStore = create<ActiveStore>()((set) => ({
  members: [],
  add: (id) => set((state) => ({ members: [...state.members, id] })),
  remove: (id) =>
    set((state) => ({
      members: state.members.filter((memberId) => memberId !== id),
    })),
  set: (ids) => set({ members: ids }),
}));

export const useSearchUserStore = create<SearchUser>()((set) => ({
  user: null,
  setUser: (data: User | null) => set((state) => ({ ...state, user: data })),
}));
