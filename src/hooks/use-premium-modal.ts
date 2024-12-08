import { create } from "zustand";

type PremiumModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const usePremiumModal = create<PremiumModalProps>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
