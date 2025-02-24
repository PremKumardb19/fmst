import React, { useEffect, useState } from "react";
import useDropdownStore from "../../store/useDropDownStore";
import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";

interface PersonalInfoProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ register, watch, setValue }) => {
  const { salutations, genders, maritalStatuses, fetchDropdowns } = useDropdownStore();
  const [filteredGenders, setFilteredGenders] = useState<{ id: number; name: string }[]>([]);
  const [selectedSalutation, setSelectedSalutation] = useState<string>(watch("salutation") || "");

  useEffect(() => {
    const savedSalutation = localStorage.getItem("defaultSalutation") || "Dr.";
    const savedGender = localStorage.getItem("defaultGender") || "Male";
    const savedMaritalStatus = localStorage.getItem("defaultMaritalStatus") || "Single";
    const savedName = localStorage.getItem("defaultName") || "";
    const savedDob = localStorage.getItem("defaultDob") || "";
    const savedJDob = localStorage.getItem("defaultJDob") || "";
    const savedRDob = localStorage.getItem("defaultRDob") || "";

    setValue("rdob", savedRDob);
    setValue("salutation", savedSalutation);
    setValue("gender", savedGender);
    setValue("maritalStatus", savedMaritalStatus);
    setValue("name", savedName);
    setValue("dob", savedDob);
    setValue("jdob", savedJDob);
  }, [setValue]);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (watch("salutation")) localStorage.setItem("defaultSalutation", watch("salutation"));
    if (watch("gender")) localStorage.setItem("defaultGender", watch("gender"));
    if (watch("maritalStatus")) localStorage.setItem("defaultMaritalStatus", watch("maritalStatus"));
    if (watch("name")) localStorage.setItem("defaultName", watch("name"));
    if (watch("dob")) localStorage.setItem("defaultDob", watch("dob"));
    if (watch("jdob")) localStorage.setItem("defaultJDob", watch("jdob"));
    if (watch("rdob")) localStorage.setItem("defaultRDob", watch("rdob"));
  }, [watch("salutation"), watch("gender"), watch("maritalStatus"), watch("name"), watch("dob"), watch("jdob"), watch("rdob")]);

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

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-lg font-semibold mb-4">Salutation</label>
          <select
            {...register("salutation")}
            className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          >
            {salutations.map((salutation) => (
               <option key={salutation.id} value={salutation.name}>
               {salutation.name}
             </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-lg font-semibold mb-4">Name</label>
          <input
            {...register("name")}
            style={{ textTransform: "uppercase" }}
            className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <label className="block text-lg font-semibold">Gender</label>
      <select {...register("gender")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400">
        {filteredGenders.map((gender) => (
          <option key={gender.id} value={gender.name}>
            {gender.name}
          </option>
        ))}
      </select>

      <label className="block text-lg font-semibold">Marital Status</label>
      <select {...register("maritalStatus")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400">
        {maritalStatuses.map((status) => (
          <option key={status.id} value={status.name}>
            {status.name}
          </option>
        ))}
      </select>

      <label className="block text-lg font-semibold">Date of Birth</label>
      <input type="date" {...register("dob")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400" />

      <label className="block text-lg font-semibold">Date of Joining</label>
      <input type="date" {...register("jdob")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400" />

      <label className="block text-lg font-semibold">Date of Retirement</label>
      <input type="date" {...register("rdob")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400" />
    </div>
  );
};

export default PersonalInfo;
