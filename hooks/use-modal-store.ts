import { Post, Profile } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createPost"
  | "deletePost"
  | "editPost"
  | "editProfile"
  | "createComment";

interface ModalData {
  profile?: Profile;
  post?: Post;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  // eslint-disable-next-line no-unused-vars
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
