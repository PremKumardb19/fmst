import { create } from "zustand";
import axios from "axios";

interface BloodGroupStore {
  bloodGroups: { id: number; name: string }[];
  fetchBloodGroups: () => Promise<void>;
  rehydrateState: () => void;
}

const useBloodGroupStore = create<BloodGroupStore>((set) => {
  const rehydrateState = () => {
    const storedBloodGroups = localStorage.getItem("bloodGroups");
    set({ bloodGroups: storedBloodGroups ? JSON.parse(storedBloodGroups) : [] });
  };

  return {
    bloodGroups: [],
    fetchBloodGroups: async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blood-groups");
        const bloodGroups = response.data || [];

        localStorage.setItem("bloodGroups", JSON.stringify(bloodGroups)); 
        set({ bloodGroups });
      } catch (error) {
        console.error("Error fetching blood groups:", error);
      }
    },
    rehydrateState,
  };
});

useBloodGroupStore.getState().rehydrateState();

export default useBloodGroupStore;
