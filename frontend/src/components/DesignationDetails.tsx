import React, { useEffect } from "react";
import useDesignationStore from "../../store/useDesignationStore";

const DesignationDetails: React.FC<{ register: any; setValue: any; watch: any }> = ({
  register,
  setValue,
  watch,
}) => {
  const {
    designations,
    employmentTypes,
    fetchDesignations,
    fetchEmploymentTypes,
    details,
    setDetails,
    rehydrateState,
  } = useDesignationStore();

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
  }, []); // Runs only once

  useEffect(() => {
    const subscription = watch((value: any) => {
      Object.keys(value).forEach((key) => {
        setDetails(key as keyof typeof details, value[key] || "");
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, setDetails, details]);

  return (
    <div className="space-y-6">
      {/* Designation & Employment Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Designation</label>
          <select
            {...register("designation")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          >
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
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Employment Type</label>
          <select
            {...register("employment_type")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          >
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
        </div>
      </div>

      {/* Employment Number & PAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Employment Number</label>
          <input
            {...register("employment_number")}
            type="text"
            placeholder="Enter Employment Number"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">PAN</label>
          <input
            {...register("pan")}
            type="text"
            placeholder="Enter PAN Number"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Aadhar & Passport Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Aadhar</label>
          <input
            {...register("aadhar")}
            type="text"
            placeholder="Enter Aadhar Number"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Passport Number</label>
          <input
            {...register("passport_number")}
            type="text"
            placeholder="Enter Passport Number"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignationDetails;
