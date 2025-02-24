import { create } from "zustand";
import axios from "axios";

interface ReligionStore {
  religions: { id: number; name: string }[];
  fetchReligions: () => void;
  rehydrateState: () => void;
}

const useReligionStore = create<ReligionStore>((set) => {
  const rehydrateState = () => {
    const storedReligions = localStorage.getItem("religions");
    set({ religions: storedReligions ? JSON.parse(storedReligions) : [] });
  };

  return {
    religions: [],
    fetchReligions: async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/religion");
        const religions = response.data || [];

        localStorage.setItem("religions", JSON.stringify(religions));
        set({ religions });
      } catch (error) {
        console.error("Error fetching religions:", error);
      }
    },
    rehydrateState,
  };
});

useReligionStore.getState().rehydrateState();

export default useReligionStore;
