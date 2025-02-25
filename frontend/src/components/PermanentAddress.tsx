import React, { useEffect } from "react";
import Select from "react-select";
import { useAddressStore } from "../../store/addressStore"; // For current address
import { usePermanentAddressStore } from "../../store/permanentAddress"; // Separate store for permanent address

interface PermanentAddressProps {
  sameAsCurrent: any;
  register: any;
  watch: any;
  setValue: any;
}

const PermanentAddress: React.FC<PermanentAddressProps> = ({
  sameAsCurrent,
  register,
  watch,
  setValue,
}) => {
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

  // Load data from localStorage when component mounts
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
  }, [fetchStates, setPermanentState, setPermanentDistrict, setPermanentTaluk, setValue]);

  useEffect(() => {
    if (permanentState) {
      fetchDistricts(permanentState.id);
    }
  }, [permanentState, fetchDistricts]);

  useEffect(() => {
    if (permanentDistrict) {
      fetchTaluks(permanentDistrict.id);
    }
  }, [permanentDistrict, fetchTaluks]);

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
  }, [
    sameAsCurrent,
    currentAddress,
    currentState,
    currentDistrict,
    currentTaluk,
    setPermanentState,
    setPermanentDistrict,
    setPermanentTaluk,
    setValue,
  ]);

  useEffect(() => {
    localStorage.setItem("permanentAddress", watch("permanentAddress") || "");
  }, [watch("permanentAddress")]);

  useEffect(() => {
    if (permanentState)
      localStorage.setItem("permanentState", JSON.stringify(permanentState));
  }, [permanentState]);

  useEffect(() => {
    if (permanentDistrict)
      localStorage.setItem("permanentDistrict", JSON.stringify(permanentDistrict));
  }, [permanentDistrict]);

  useEffect(() => {
    if (permanentTaluk)
      localStorage.setItem("permanentTaluk", JSON.stringify(permanentTaluk));
  }, [permanentTaluk]);

  return (
    <div className="space-y-6">
      {/* Permanent Address */}
      <div>
        <label className="block text-base font-medium mb-1">
          Permanent Address
        </label>
        <textarea
          {...register("permanentAddress")}
          className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          disabled={sameAsCurrent}
        ></textarea>
      </div>

      {/* Country and State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Country</label>
          <select
            {...register("permanentCountry")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
            disabled={sameAsCurrent}
          >
            <option value="India">India</option>
          </select>
        </div>
        <div>
          <label className="block text-base font-medium mb-1">State</label>
          <Select
            options={states.map((state) => ({
              value: state.id,
              label: state.name,
            }))}
            value={
              permanentState
                ? { value: permanentState.id, label: permanentState.name }
                : null
            }
            onChange={(selected) =>
              setPermanentState(
                selected ? { id: selected.value, name: selected.label } : null
              )
            }
            placeholder="Select State"
            isClearable
            isDisabled={sameAsCurrent}
          />
        </div>
      </div>

      {/* District and Taluk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">District</label>
          <Select
            options={districts.map((district) => ({
              value: district.id,
              label: district.name,
            }))}
            value={
              permanentDistrict
                ? { value: permanentDistrict.id, label: permanentDistrict.name }
                : null
            }
            onChange={(selected) =>
              setPermanentDistrict(
                selected ? { id: selected.value, name: selected.label } : null
              )
            }
            placeholder="Select District"
            isDisabled={!permanentState || sameAsCurrent}
            isClearable
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Taluk</label>
          <Select
            options={taluks.map((taluk) => ({
              value: taluk.id,
              label: taluk.name,
            }))}
            value={
              permanentTaluk
                ? { value: permanentTaluk.id, label: permanentTaluk.name }
                : null
            }
            onChange={(selected) =>
              setPermanentTaluk(
                selected ? { id: selected.value, name: selected.label } : null
              )
            }
            placeholder="Select Taluk"
            isDisabled={!permanentDistrict || sameAsCurrent}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default PermanentAddress;
