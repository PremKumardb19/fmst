import React, { useEffect } from "react";
import useDesignationStore from "../../store/useDesignationStore";

const DesignationDetails: React.FC<{ register: any; setValue: any; watch: any }> = ({
  register,
  setValue,
  watch,
}) => {
  const { designations, employmentTypes, fetchDesignations, fetchEmploymentTypes, details, setDetails, rehydrateState } =
    useDesignationStore();

  useEffect(() => {
    rehydrateState(); 
    if (designations.length === 0) fetchDesignations();
    if (employmentTypes.length === 0) fetchEmploymentTypes();
  }, [fetchDesignations, fetchEmploymentTypes, rehydrateState, designations.length, employmentTypes.length]);

  useEffect(() => {
    Object.keys(details).forEach((key) => {
      if (details[key as keyof typeof details]) {
        setValue(key, details[key as keyof typeof details]);
      }
    });
  }, []); // ✅ Runs only once to prevent infinite loop

  useEffect(() => {
    const subscription = watch((value: any) => {
      Object.keys(value).forEach((key) => {
        setDetails(key as keyof typeof details, value[key] || "");
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, setDetails, details]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold">Designation</label>
      <select {...register("designation")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400">
        {designations.length > 0 ? (
          designations.map((designation) => (
            <option key={designation.id} value={designation.name}>
              {designation.name}
            </option>
          ))
        ) : (
          <option value="Professor">Professor</option>
        )}
      </select>

      <label className="block text-lg font-semibold">Employment Type</label>
      <select {...register("employment_type")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400">
        {employmentTypes.length > 0 ? (
          employmentTypes.map((type) => (
            <option key={type.id} value={type.type_name}>
              {type.type_name}
            </option>
          ))
        ) : (
          <option value="Full-Time">Full-Time</option>
        )}
      </select>

      <label className="block text-lg font-semibold">Employment Number</label>
      <input
        {...register("employment_number")}
        type="text"
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Employment Number"
      />

      <label className="block text-lg font-semibold">PAN</label>
      <input
        {...register("pan")}
        type="text"
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter PAN Number"
      />

      <label className="block text-lg font-semibold">Aadhar</label>
      <input
        {...register("aadhar")}
        type="text"
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Aadhar Number"
      />

      <label className="block text-lg font-semibold">Passport Number</label>
      <input
        {...register("passport_number")}
        type="text"
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Passport Number"
      />
    </div>
  );
};

export default DesignationDetails;
