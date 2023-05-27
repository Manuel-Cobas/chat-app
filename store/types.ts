export interface SearchState {
  search: string;
  isOpen: boolean;
  setSearch: (current: string) => void;
  closeSearch: () => void;
  openSearch: () => void;
}
