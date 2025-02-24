import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContactState {
  officialMobile: string;
  officialEmail: string;
  personalMobile: string;
  personalEmail: string;
  setContactInfo: (info: Partial<ContactState>) => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      officialMobile: "",
      officialEmail: "",
      personalMobile: "",
      personalEmail: "",
      setContactInfo: (info) => set((state) => ({ ...state, ...info })),
    }),
    {
      name: "contact-storage", // Local Storage key
    }
  )
);
