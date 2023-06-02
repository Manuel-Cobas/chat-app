import { create } from "zustand";
import { QuestionModal } from "./types";

export const useChatMenu = create<QuestionModal>()((set) => ({
  isOpen: false,
  openModal: () => set((state) => ({ ...state, isOpen: true })),
  closeModal: () => set((state) => ({ ...state, isOpen: false })),
}));
