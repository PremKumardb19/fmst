import React, { useEffect } from "react";
import useReligionStore from "../../store/useReligionStore";
import useCommunityStore from "../../store/useCommunityStore";
import { useForm, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ContactInfo from "./ContactInfo";

interface FamilyDetailsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({ register, watch, setValue }) => {
  const {  formState: { errors } } = useForm();
  const { religions, fetchReligions } = useReligionStore();
  const { community, fetchCommunity } = useCommunityStore();

  useEffect(() => {
    const savedFatherName = localStorage.getItem("defaultFatherName") || "";
    const savedMotherName = localStorage.getItem("defaultMotherName") || "";
    const savedReligion = localStorage.getItem("defaultReligion") || "Hindu";
    const savedCommunity = localStorage.getItem("defaultCommunity") || "BC";
    const savedCaste = localStorage.getItem("defaultCaste") || "";
    const savedAnniversary = localStorage.getItem("defaultAnniversary") || "";

    setValue("fatherName", savedFatherName);
    setValue("motherName", savedMotherName);
    setValue("religion", savedReligion);
    setValue("community", savedCommunity);
    setValue("caste", savedCaste);
    setValue("anniversary", savedAnniversary);
  }, [setValue]);

  useEffect(() => {
    fetchReligions();
    fetchCommunity();
  }, []);

  useEffect(() => {
    if (watch("fatherName")) localStorage.setItem("defaultFatherName", watch("fatherName"));
    if (watch("motherName")) localStorage.setItem("defaultMotherName", watch("motherName"));
    if (watch("religion")) localStorage.setItem("defaultReligion", watch("religion"));
    if (watch("community")) localStorage.setItem("defaultCommunity", watch("community"));
    if (watch("caste")) localStorage.setItem("defaultCaste", watch("caste"));
    if (watch("anniversary")) localStorage.setItem("defaultAnniversary", watch("anniversary"));
  }, [
    watch("fatherName"),
    watch("motherName"),
    watch("religion"),
    watch("community"),
    watch("caste"),
    watch("anniversary"),
  ]);

  return (
    <div className="space-y-6">
      {/* Father's and Mother's Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Father's Name</label>
          <input
            {...register("fatherName")}
            style={{ textTransform: "uppercase" }}
            onFocus={(e) => (e.target.style.textTransform = "uppercase")}
            onBlur={(e) => (e.target.style.textTransform = "none")}
            placeholder="Enter Father name"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Mother's Name</label>
          <input
            {...register("motherName")}
            style={{ textTransform: "uppercase" }}
            onFocus={(e) => (e.target.style.textTransform = "uppercase")}
            onBlur={(e) => (e.target.style.textTransform = "none")}
            placeholder="Enter Mother name"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Religion and Community */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Religion</label>
          <select
            {...register("religion")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          >
            {religions.map((religion) => (
              <option key={religion.id} value={religion.name}>
                {religion.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Community</label>
          <select
            {...register("community")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          >
            {community.map((comm) => (
              <option key={comm.id} value={comm.name}>
                {comm.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Caste and Anniversary Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Caste</label>
          <input
            {...register("caste")}
            style={{ textTransform: "uppercase" }}
            onFocus={(e) => (e.target.style.textTransform = "uppercase")}
            onBlur={(e) => (e.target.style.textTransform = "none")}
            placeholder="Enter Caste"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Date of Anniversary</label>
          <input
            type="date"
            {...register("anniversaryDate")}
            disabled={watch("maritalStatus") === "Single"}
            className="border p-2 text-sm rounded w-full focus:ring-2 focus:ring-blue-400 disabled:bg-gray-200"
          />
        </div>

      </div>
      <div>
      <ContactInfo register={register} watch={watch} setValue={setValue} errors={errors} />
      </div>
    </div>
  );
};

export default FamilyDetails;
