import { User } from "@prisma/client";

export interface SearchState {
  search: string;
  isOpen: boolean;
  setSearch: (current: string) => void;
  closeSearch: () => void;
  openSearch: () => void;
}

export interface ActiveStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

export interface SearchUser {
  user: User | null;
  setUser: (data: User | null) => void;
}

export interface GenericModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
