import { create } from "zustand";
import axios from "axios";

interface DropdownStore {
  salutations: { id: number; name: string }[];
  genders: { id: number; name: string }[];
  maritalStatuses: { id: number; name: string }[];
  name: string;
  dob: string;
  fetchDropdowns: () => void;
  rehydrateState: () => void;
  setName: (name: string) => void;
  setDob: (dob: string) => void;
}

const useDropdownStore = create<DropdownStore>((set) => {
  const rehydrateState = () => {
    const storedSalutations = localStorage.getItem("salutations");
    const storedGenders = localStorage.getItem("genders");
    const storedMaritalStatuses = localStorage.getItem("maritalStatuses");
    const storedName = localStorage.getItem("defaultName");
    const storedDob = localStorage.getItem("defaultDob");

    set({
      salutations: storedSalutations ? JSON.parse(storedSalutations) : [],
      genders: storedGenders ? JSON.parse(storedGenders) : [],
      maritalStatuses: storedMaritalStatuses ? JSON.parse(storedMaritalStatuses) : [],
      name: storedName || "",
      dob: storedDob || "",
    });
  };

  return {
    salutations: [],
    genders: [],
    maritalStatuses: [],
    name: "",
    dob: "",
    fetchDropdowns: async () => {
      try {
        const [salutationsRes, gendersRes, maritalStatusesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/salutations"),
          axios.get("http://localhost:5000/api/genders"),
          axios.get("http://localhost:5000/api/marital-statuses"),
        ]);

        const salutations = salutationsRes.data || [];
        const genders = gendersRes.data || [];
        const maritalStatuses = maritalStatusesRes.data || [];

        localStorage.setItem("salutations", JSON.stringify(salutations));
        localStorage.setItem("genders", JSON.stringify(genders));
        localStorage.setItem("maritalStatuses", JSON.stringify(maritalStatuses));

        set({ salutations, genders, maritalStatuses });
      } catch (error) {
        console.error("Error fetching dropdowns:", error);
      }
    },
    rehydrateState,

    setName: (name: string) => {
      localStorage.setItem("defaultName", name);
      set({ name });
    },

    setDob: (dob: string) => {
      localStorage.setItem("defaultDob", dob);
      set({ dob });
    },
  };
});

// ** Call `rehydrateState()` immediately before component mounts **
useDropdownStore.getState().rehydrateState();

export default useDropdownStore;
