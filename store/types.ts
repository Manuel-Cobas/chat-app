export interface SearchState {
  search: string;
  isOpen: boolean;
  setSearch: (current: string) => void;
  closeSearch: () => void;
  openSearch: () => void;
}

export interface ActiveStoreProps {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}
