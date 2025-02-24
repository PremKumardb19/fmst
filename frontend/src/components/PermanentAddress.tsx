import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useAddressStore } from "../../store/addressStore"; 
import { usePermanentAddressStore } from "../../store/permanentAddress"; 

const PermanentAddress: React.FC<{ register: any; watch: any; setValue: any }> = ({ register, watch, setValue }) => {
  const [sameAsCurrent, setSameAsCurrent] = useState(() => {
    return JSON.parse(localStorage.getItem("sameAsCurrent") || "false");
  });

  const {
    selectedState: currentState,
    selectedDistrict: currentDistrict,
    selectedTaluk: currentTaluk,
  } = useAddressStore();

  const {
    states,
    districts,
    taluks,
    fetchStates,
    fetchDistricts,
    fetchTaluks,
    selectedState: permanentState,
    selectedDistrict: permanentDistrict,
    selectedTaluk: permanentTaluk,
    setSelectedState: setPermanentState,
    setSelectedDistrict: setPermanentDistrict,
    setSelectedTaluk: setPermanentTaluk,
  } = usePermanentAddressStore();

  const currentAddress = watch("currentAddress");

  useEffect(() => {
    fetchStates();

    const storedAddress = localStorage.getItem("permanentAddress") || "";
    const storedState = localStorage.getItem("permanentState");
    const storedDistrict = localStorage.getItem("permanentDistrict");
    const storedTaluk = localStorage.getItem("permanentTaluk");

    setValue("permanentAddress", storedAddress);
    if (storedState) setPermanentState(JSON.parse(storedState));
    if (storedDistrict) setPermanentDistrict(JSON.parse(storedDistrict));
    if (storedTaluk) setPermanentTaluk(JSON.parse(storedTaluk));
  }, []);

  useEffect(() => {
    if (permanentState) {
      fetchDistricts(permanentState.id);
    }
  }, [permanentState]);

  useEffect(() => {
    if (permanentDistrict) {
      fetchTaluks(permanentDistrict.id);
    }
  }, [permanentDistrict]);

  useEffect(() => {
    if (sameAsCurrent) {
      setValue("permanentAddress", currentAddress);
      setPermanentState(currentState);
      setPermanentDistrict(currentDistrict);
      setPermanentTaluk(currentTaluk);
      localStorage.setItem("sameAsCurrent", "true");
    } else {
      const storedAddress = localStorage.getItem("permanentAddress") || "";
      const storedState = localStorage.getItem("permanentState");
      const storedDistrict = localStorage.getItem("permanentDistrict");
      const storedTaluk = localStorage.getItem("permanentTaluk");
  
      if (storedAddress) setValue("permanentAddress", storedAddress);
      if (storedState) setPermanentState(JSON.parse(storedState)); 
      if (storedDistrict) setPermanentDistrict(JSON.parse(storedDistrict));
      if (storedTaluk) setPermanentTaluk(JSON.parse(storedTaluk));
  
      localStorage.setItem("sameAsCurrent", "false");
    }
  }, [sameAsCurrent, currentAddress, currentState, currentDistrict, currentTaluk, setValue]);
  
    
  useEffect(() => {
    localStorage.setItem("permanentAddress", watch("permanentAddress") || "");
  }, [watch("permanentAddress")]);

  useEffect(() => {
    if (permanentState) localStorage.setItem("permanentState", JSON.stringify(permanentState));
  }, [permanentState]);

  useEffect(() => {
    if (permanentDistrict) localStorage.setItem("permanentDistrict", JSON.stringify(permanentDistrict));
  }, [permanentDistrict]);

  useEffect(() => {
    if (permanentTaluk) localStorage.setItem("permanentTaluk", JSON.stringify(permanentTaluk));
  }, [permanentTaluk]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sameAsCurrent"
          checked={sameAsCurrent}
          onChange={() => setSameAsCurrent(!sameAsCurrent)}
          className="w-5 h-5"
        />
        <label htmlFor="sameAsCurrent" className="text-lg font-semibold">
          Same as Current Address
        </label>
      </div>

      <label className="block text-lg font-semibold">Permanent Address</label>
      <textarea
        {...register("permanentAddress")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        disabled={sameAsCurrent}
      ></textarea>

      <label className="block text-lg font-semibold">Country</label>
      <select
        {...register("permanentCountry")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        disabled={sameAsCurrent}
      >
        <option value="India">India</option>
      </select>

      <label className="block text-lg font-semibold">State</label>
      <Select
        options={states.map((state) => ({ value: state.id, label: state.name }))}
        value={permanentState ? { value: permanentState.id, label: permanentState.name } : null}
        onChange={(selected) => setPermanentState(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select State"
        isClearable
        isDisabled={sameAsCurrent}
      />

      <label className="block text-lg font-semibold">District</label>
      <Select
        options={districts.map((district) => ({ value: district.id, label: district.name }))}
        value={permanentDistrict ? { value: permanentDistrict.id, label: permanentDistrict.name } : null}
        onChange={(selected) => setPermanentDistrict(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select District"
        isDisabled={!permanentState || sameAsCurrent}
        isClearable
      />

      <label className="block text-lg font-semibold">Taluk</label>
      <Select
        options={taluks.map((taluk) => ({ value: taluk.id, label: taluk.name }))}
        value={permanentTaluk ? { value: permanentTaluk.id, label: permanentTaluk.name } : null}
        onChange={(selected) => setPermanentTaluk(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select Taluk"
        isDisabled={!permanentDistrict || sameAsCurrent}
        isClearable
      />
    </div>
  );
};

export default PermanentAddress;
