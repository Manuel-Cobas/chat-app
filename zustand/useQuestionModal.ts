import { create } from "zustand";
import type { GenericModal } from "@/zustand/types";

export const useQuestionModal = create<GenericModal>()((set) => ({
  isOpen: false,
  openModal: () => set((state) => ({ ...state, isOpen: true })),
  closeModal: () => set((state) => ({ ...state, isOpen: false })),
}));
