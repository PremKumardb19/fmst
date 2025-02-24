import { create } from "zustand";
import axios from "axios";

interface AddressStore {
  currentAddress: string;
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
  setCurrentAddress: (address: string) => void;
  setSelectedState: (state: { id: number; name: string } | null) => void;
  setSelectedDistrict: (district: { id: number; name: string } | null) => void;
  setSelectedTaluk: (taluk: { id: number; name: string } | null) => void;
  rehydrateState: () => void;
}

export const useAddressStore = create<AddressStore>((set) => {
  const rehydrateState = () => {
    const storedCountry = localStorage.getItem("selectedCountry") || "India";
    const storedState = localStorage.getItem("selectedState");
    const storedDistrict = localStorage.getItem("selectedDistrict");
    const storedTaluk = localStorage.getItem("selectedTaluk");
    const storedAddress = localStorage.getItem("currentAddress") || "";

    set({
      selectedCountry: storedCountry,
      selectedState: storedState ? JSON.parse(storedState) : null,
      selectedDistrict: storedDistrict ? JSON.parse(storedDistrict) : null,
      selectedTaluk: storedTaluk ? JSON.parse(storedTaluk) : null,
      currentAddress: storedAddress,
    });
  };

  return {
    currentAddress: "",
    states: [],
    districts: [],
    taluks: [],
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
      localStorage.setItem("selectedCountry", country);
      set({ selectedCountry: country });
    },

    setCurrentAddress: (address) => {
      localStorage.setItem("currentAddress", address);
      set({ currentAddress: address });
    },

    setSelectedState: (state) => {
      if (state) localStorage.setItem("selectedState", JSON.stringify(state));
      set({ selectedState: state, selectedDistrict: null, selectedTaluk: null });
    },

    setSelectedDistrict: (district) => {
      if (district) localStorage.setItem("selectedDistrict", JSON.stringify(district));
      set({ selectedDistrict: district, selectedTaluk: null });
    },

    setSelectedTaluk: (taluk) => {
      if (taluk) localStorage.setItem("selectedTaluk", JSON.stringify(taluk));
      set({ selectedTaluk: taluk });
    },

    rehydrateState,
  };
});

useAddressStore.getState().rehydrateState();
