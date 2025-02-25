import React, { useEffect, useState } from "react";
import useDropdownStore from "../../store/useDropdownStore";
import useBloodGroupStore from "../../store/useBloodGroupStore";
import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";

interface PersonalInfoProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ register, watch, setValue }) => {
  const { salutations, genders, maritalStatuses, fetchDropdowns } = useDropdownStore();
  const { bloodGroups, fetchBloodGroups, rehydrateState } = useBloodGroupStore();
  const [filteredGenders, setFilteredGenders] = useState<{ id: number; name: string }[]>([]);
  const [selectedSalutation, setSelectedSalutation] = useState<string>(watch("salutation") || "");

  // Set default personal info values from localStorage
  useEffect(() => {
    const savedSalutation = localStorage.getItem("defaultSalutation") || "Dr.";
    const savedGender = localStorage.getItem("defaultGender") || "Male";
    const savedMaritalStatus = localStorage.getItem("defaultMaritalStatus") || "Single";
    const savedName = localStorage.getItem("defaultName") || "";
    const savedDob = localStorage.getItem("defaultDob") || "";
    const savedJDob = localStorage.getItem("defaultJDob") || "";
    const savedRDob = localStorage.getItem("defaultRDob") || "";

    setValue("salutation", savedSalutation);
    setValue("gender", savedGender);
    setValue("maritalStatus", savedMaritalStatus);
    setValue("name", savedName);
    setValue("dob", savedDob);
    setValue("jdob", savedJDob);
    setValue("rdob", savedRDob);
  }, [setValue]);

  // Fetch dropdown data
  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  // Save changes to localStorage for personal info
  useEffect(() => {
    if (watch("salutation")) localStorage.setItem("defaultSalutation", watch("salutation"));
    if (watch("gender")) localStorage.setItem("defaultGender", watch("gender"));
    if (watch("maritalStatus")) localStorage.setItem("defaultMaritalStatus", watch("maritalStatus"));
    if (watch("name")) localStorage.setItem("defaultName", watch("name"));
    if (watch("dob")) localStorage.setItem("defaultDob", watch("dob"));
    if (watch("jdob")) localStorage.setItem("defaultJDob", watch("jdob"));
    if (watch("rdob")) localStorage.setItem("defaultRDob", watch("rdob"));
  }, [watch("salutation"), watch("gender"), watch("maritalStatus"), watch("name"), watch("dob"), watch("jdob"), watch("rdob")]);

  // Update salutation-dependent genders
  useEffect(() => {
    const subscription = watch((data: any) => {
      setSelectedSalutation(data.salutation);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!genders.length) return;
    if (selectedSalutation === "Ms.") {
      setFilteredGenders(genders.filter((g) => g.name === "Female"));
    } else if (selectedSalutation === "Mr.") {
      setFilteredGenders(genders.filter((g) => g.name === "Male"));
    } else {
      setFilteredGenders(genders);
    }
  }, [selectedSalutation, genders]);

  // --- Blood Group Logic ---
  useEffect(() => {
    rehydrateState();
  }, [rehydrateState]);

  useEffect(() => {
    if (bloodGroups.length === 0) {
      fetchBloodGroups();
    }
    const storedBloodGroup = localStorage.getItem("bloodGroup");
    if (storedBloodGroup) {
      setValue("bloodGroup", storedBloodGroup);
    }
  }, [fetchBloodGroups, bloodGroups.length, setValue]);

  useEffect(() => {
    const subscription = watch((value: any) => {
      if (value.bloodGroup) {
        localStorage.setItem("bloodGroup", value.bloodGroup);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  // --- End Blood Group Logic ---

  return (
    <div className="space-y-6">
      {/* Salutation and Name */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-base font-medium mb-1">Salutation</label>
          <select
            {...register("salutation")}
            className="border p-2 text-sm rounded w-full focus:ring-2 focus:ring-blue-400"
          >
            {salutations.map((salutation) => (
              <option key={salutation.id} value={salutation.name}>
                {salutation.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-base font-medium mb-1">Name</label>
          <input
            {...register("name")}
            style={{ textTransform: "uppercase" }}
            className="border p-2 text-sm rounded w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Gender and Marital Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Gender</label>
          <select
            {...register("gender")}
            className="border p-2 text-sm rounded w-full focus:ring-2 focus:ring-blue-400"
          >
            {filteredGenders.map((gender) => (
              <option key={gender.id} value={gender.name}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Marital Status</label>
          <select
            {...register("maritalStatus")}
            className="border p-2 text-sm rounded w-full focus:ring-2 focus:ring-blue-400"
          >
            {maritalStatuses.map((status) => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            {...register("dob")}
            className="border p-2 text-sm rounded w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Date of Joining</label>
          <input
            type="date"
            {...register("jdob")}
            className="border p-2 text-sm rounded w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Date of Retirement</label>
          <input
            type="date"
            {...register("rdob")}
            className="border p-2 text-sm rounded w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Blood Group */}
      <div>
        <label className="block text-base font-medium mb-1">Blood Group</label>
        <select
          {...register("bloodGroup")}
          className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          {bloodGroups.length > 0 ? (
            bloodGroups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))
          ) : (
            <option value="A+">A+</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default PersonalInfo;
