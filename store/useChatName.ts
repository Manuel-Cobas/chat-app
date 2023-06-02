import { create } from "zustand";
import { ChatNameModal } from "./types";

export const useChatName = create<ChatNameModal>()((set) => ({
  isOpen: false,
  openModal: () => set((state) => ({ ...state, isOpen: true })),
  closeModal: () => set((state) => ({ ...state, isOpen: false })),
}));
