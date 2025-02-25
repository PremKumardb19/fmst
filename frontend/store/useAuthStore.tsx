import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  setUser: (user: { id: string; email: string; name: string }) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // Key for local storage
      storage: createJSONStorage(() => localStorage), // Corrected storage setup
    }
  )
);
