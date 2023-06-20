import { create } from "zustand";
import type { GenericModal } from "@/zustand/types";

export const useSearchModal = create<GenericModal>()((set) => ({
  isOpen: false,
  closeModal: () => {
    set((state) => ({ ...state, isOpen: false }));
  },
  openModal: () => {
    set((state) => ({ ...state, isOpen: true }));
  },
}));
