import React, { useEffect } from "react";
import useReligionStore from "../../store/useReligionStore";
import useCommunityStore from "../../store/useCommunityStore";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface FamilyDetailsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({ register, watch, setValue }) => {
  const { religions, fetchReligions } = useReligionStore();
  const { community, fetchCommunity } = useCommunityStore();

  // ✅ Load saved values from localStorage on mount
  useEffect(() => {
    const savedFatherName = localStorage.getItem("defaultFatherName") || "";
    const savedMotherName = localStorage.getItem("defaultMotherName") || "";
    const savedReligion = localStorage.getItem("defaultReligion") || "Hindu";
    const savedCommunity = localStorage.getItem("defaultCommunity") || "BC";
    const savedCaste = localStorage.getItem("defaultCaste") || "";

    setValue("fatherName", savedFatherName);
    setValue("motherName", savedMotherName);
    setValue("religion", savedReligion);
    setValue("community", savedCommunity);
    setValue("caste", savedCaste);
  }, [setValue]);

  // ✅ Fetch religion and community dropdown data on mount
  useEffect(() => {
    fetchReligions();
    fetchCommunity();
  }, []);

  // ✅ Store selected values in localStorage
  useEffect(() => {
    if (watch("fatherName")) localStorage.setItem("defaultFatherName", watch("fatherName"));
    if (watch("motherName")) localStorage.setItem("defaultMotherName", watch("motherName"));
    if (watch("religion")) localStorage.setItem("defaultReligion", watch("religion"));
    if (watch("community")) localStorage.setItem("defaultCommunity", watch("community"));
    if (watch("caste")) localStorage.setItem("defaultCaste", watch("caste"));
  }, [watch("fatherName"), watch("motherName"), watch("religion"), watch("community"), watch("caste")]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold">Father's Name</label>
      <input {...register("fatherName")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400" />

      <label className="block text-lg font-semibold">Mother's Name</label>
      <input {...register("motherName")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400" />

      <label className="block text-lg font-semibold">Religion</label>
      <select {...register("religion")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400">
        {religions.map((religion) => (
          <option key={religion.id} value={religion.name}>
            {religion.name}
          </option>
        ))}
      </select>

      <label className="block text-lg font-semibold">Community</label>
      <select {...register("community")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400">
        {community.map((comm) => (
          <option key={comm.id} value={comm.name}>
            {comm.name}
          </option>
        ))}
      </select>

      <label className="block text-lg font-semibold">Caste</label>
      <input {...register("caste")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400" />
    </div>
  );
};

export default FamilyDetails;
