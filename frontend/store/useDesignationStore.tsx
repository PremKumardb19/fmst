import { create } from "zustand";
import axios from "axios";

interface DesignationStore {
  designations: { id: number; name: string }[];
  fetchDesignations: () => Promise<void>;
  rehydrateState: () => void;
}

const useDesignationStore = create<DesignationStore>((set) => {
  const rehydrateState = () => {
    const storedDesignations = localStorage.getItem("designations");
    set({ designations: storedDesignations ? JSON.parse(storedDesignations) : [] });
  };

  return {
    designations: [],
    fetchDesignations: async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/designation");
        const designations = response.data || [];

        localStorage.setItem("designations", JSON.stringify(designations));
        set({ designations });
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    },
    rehydrateState,
  };
});

useDesignationStore.getState().rehydrateState();

export default useDesignationStore;
