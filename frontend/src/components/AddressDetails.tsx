import React, { useEffect } from "react";
import Select from "react-select";
import { useAddressStore } from "../../store/addressStore";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface AddressDetailsProps {
  register: UseFormRegister<any>;
  sameAsCurrent: any;
  setSameAsCurrent: any;
  setValue: UseFormSetValue<any>;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({
  register,
  sameAsCurrent,
  setSameAsCurrent,
  setValue,
}) => {
  const {
    states,
    districts,
    taluks,
    fetchStates,
    fetchDistricts,
    fetchTaluks,
    selectedCountry,
    selectedState,
    selectedDistrict,
    selectedTaluk,
    setSelectedCountry,
    setSelectedState,
    setSelectedDistrict,
    setSelectedTaluk,
    currentAddress,
    setCurrentAddress,
  } = useAddressStore();

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState.id);
    }
  }, [selectedState, fetchDistricts]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchTaluks(selectedDistrict.id);
    }
  }, [selectedDistrict, fetchTaluks]);

  useEffect(() => {
    setValue("country", selectedCountry);
  }, [setValue, selectedCountry]);

  return (
    <div className="space-y-6">
      {/* Current Address */}
      <div>
        <label className="block text-base font-medium mb-1">
          Current Address
        </label>
        <textarea
          {...register("currentAddress")}
          value={currentAddress}
          onChange={(e) => setCurrentAddress(e.target.value)}
          className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>

      {/* Country and State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Country</label>
          <select
            {...register("country")}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
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
              selectedState
                ? { value: selectedState.id, label: selectedState.name }
                : null
            }
            onChange={(selected) =>
              setSelectedState(
                selected ? { id: selected.value, name: selected.label } : null
              )
            }
            placeholder="Select State"
            isClearable
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
              selectedDistrict
                ? { value: selectedDistrict.id, label: selectedDistrict.name }
                : null
            }
            onChange={(selected) =>
              setSelectedDistrict(
                selected ? { id: selected.value, name: selected.label } : null
              )
            }
            placeholder="Select District"
            isDisabled={!selectedState}
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
              selectedTaluk
                ? { value: selectedTaluk.id, label: selectedTaluk.name }
                : null
            }
            onChange={(selected) =>
              setSelectedTaluk(
                selected ? { id: selected.value, name: selected.label } : null
              )
            }
            placeholder="Select Taluk"
            isDisabled={!selectedDistrict}
            isClearable
          />
        </div>
      </div>

      {/* Checkbox for Same as Current Address */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sameAsCurrent"
          checked={sameAsCurrent}
          onChange={() => setSameAsCurrent(!sameAsCurrent)}
          className="w-5 h-5"
        />
        <label htmlFor="sameAsCurrent" className="text-base font-medium">
          Same as Current Address
        </label>
      </div>
    </div>
  );
};

export default AddressDetails;
