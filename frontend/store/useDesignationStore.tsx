import { create } from "zustand";
import axios from "axios";

interface Designation {
  id: number;
  name: string;
}

interface EmploymentType {
  id: number;
  type_name: string;
}

interface DesignationStore {
  designations: Designation[];
  employmentTypes: EmploymentType[];
  details: {
    designation: string;
    employment_type: string;
    employment_number: string;
    pan: string;
    aadhar: string;
    passport_number: string;
  };
  fetchDesignations: () => Promise<void>;
  fetchEmploymentTypes: () => Promise<void>;
  setDetails: (key: keyof DesignationStore["details"], value: string) => void;
  rehydrateState: () => void;
}

const useDesignationStore = create<DesignationStore>((set) => {
  const rehydrateState = () => {
    const storedDesignations = localStorage.getItem("designations");
    const storedEmploymentTypes = localStorage.getItem("employmentTypes");
    const storedDetails = localStorage.getItem("designationDetails");

    set({
      designations: storedDesignations ? JSON.parse(storedDesignations) : [],
      employmentTypes: storedEmploymentTypes ? JSON.parse(storedEmploymentTypes) : [],
      details: storedDetails
        ? JSON.parse(storedDetails)
        : {
            designation: "Professor",
            employment_type: "Full-Time",
            employment_number: "",
            pan: "",
            aadhar: "",
            passport_number: "",
          },
    });
  };

  return {
    designations: [],
    employmentTypes: [],
    details: {
      designation: "Professor",
      employment_type: "Full-Time",
      employment_number: "",
      pan: "",
      aadhar: "",
      passport_number: "",
    },

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

    fetchEmploymentTypes: async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employment-types");
        const employmentTypes = response.data || [];

        localStorage.setItem("employmentTypes", JSON.stringify(employmentTypes));
        set({ employmentTypes });
      } catch (error) {
        console.error("Error fetching employment types:", error);
      }
    },

    setDetails: (key, value) => {
      set((state) => {
        const updatedDetails = { ...state.details, [key]: value };
        localStorage.setItem("designationDetails", JSON.stringify(updatedDetails));
        return { details: updatedDetails };
      });
    },

    rehydrateState,
  };
});

useDesignationStore.getState().rehydrateState();

export default useDesignationStore;
