import { create } from "zustand";
import axios from "axios";

interface PermanentAddressStore {
  permanentAddress: string;
  states: { id: number; name: string }[];
  districts: { id: number; name: string }[];
  taluks: { id: number; name: string }[];
  selectedCountry: string;
  selectedState: { id: number; name: string } | null;
  selectedDistrict: { id: number; name: string } | null;
  selectedTaluk: { id: number; name: string } | null;
  fetchStates: () => void;
  fetchDistricts: (stateId: number) => void;
  fetchTaluks: (districtId: number) => void;
  setSelectedCountry: (country: string) => void;
  setPermanentAddress: (address: string) => void;
  setSelectedState: (state: { id: number; name: string } | null) => void;
  setSelectedDistrict: (district: { id: number; name: string } | null) => void;
  setSelectedTaluk: (taluk: { id: number; name: string } | null) => void;
  rehydrateState: () => void;
}

export const usePermanentAddressStore = create<PermanentAddressStore>((set) => {
  const rehydrateState = () => {
    const storedCountry = localStorage.getItem("permanentCountry") || "India";
    const storedState = localStorage.getItem("permanentState");
    const storedDistrict = localStorage.getItem("permanentDistrict");
    const storedTaluk = localStorage.getItem("permanentTaluk");
    const storedAddress = localStorage.getItem("PermanentAddress") || "";

    set({
      selectedCountry: storedCountry,
      selectedState: storedState ? JSON.parse(storedState) : null,
      selectedDistrict: storedDistrict ? JSON.parse(storedDistrict) : null,
      selectedTaluk: storedTaluk ? JSON.parse(storedTaluk) : null,
      permanentAddress: storedAddress, // Fix: Ensure this is included
    });
  };

  return {
    states: [],
    districts: [],
    taluks: [],
    permanentAddress: "", // Fix: Ensure the permanent address is part of the state
    selectedCountry: "India",
    selectedState: null,
    selectedDistrict: null,
    selectedTaluk: null,

    fetchStates: async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/states");
        set({ states: response.data || [] });
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    },

    fetchDistricts: async (stateId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/districts/${stateId}`);
        set({ districts: response.data || [] });
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    },

    fetchTaluks: async (districtId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/taluks/${districtId}`);
        set({ taluks: response.data || [] });
      } catch (error) {
        console.error("Error fetching taluks:", error);
      }
    },

    setSelectedCountry: (country) => {
      localStorage.setItem("permanentCountry", country);
      set({ selectedCountry: country });
    },

    setPermanentAddress: (address) => {
      localStorage.setItem("PermanentAddress", address); 
      set({ permanentAddress: address });
    },

    setSelectedState: (state) => {
      if (state) localStorage.setItem("permanentState", JSON.stringify(state));
      else localStorage.removeItem("permanentState");
      set({ selectedState: state, selectedDistrict: null, selectedTaluk: null });
    },

    setSelectedDistrict: (district) => {
      if (district) localStorage.setItem("permanentDistrict", JSON.stringify(district));
      else localStorage.removeItem("permanentDistrict");
      set({ selectedDistrict: district, selectedTaluk: null });
    },

    setSelectedTaluk: (taluk) => {
      if (taluk) localStorage.setItem("permanentTaluk", JSON.stringify(taluk));
      else localStorage.removeItem("permanentTaluk");
      set({ selectedTaluk: taluk });
    },

    rehydrateState,
  };
});

// Rehydrate stored values on load
usePermanentAddressStore.getState().rehydrateState();
