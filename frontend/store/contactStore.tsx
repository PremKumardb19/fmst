import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContactState {
  officialMobile: string;
  officialEmail: string;
  personalMobile: string;
  personalEmail: string;
  emergencyMobile: string;
  emergencyEmail: string;
  setContactInfo: (info: Partial<ContactState>) => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      officialMobile: "",
      officialEmail: "",
      personalMobile: "",
      personalEmail: "",
      emergencyMobile: "",
      emergencyEmail: "",
      setContactInfo: (info) => set((state) => ({ ...state, ...info })),
    }),
    {
      name: "contact-storage", 
    }
  )
);
