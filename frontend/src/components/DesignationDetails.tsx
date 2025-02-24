import React, { useEffect } from "react";
import useDesignationStore from "../../store/useDesignationStore"; // Import the updated store

const DesignationDetails: React.FC<{ register: any; setValue: any; watch: any }> = ({ register, setValue, watch }) => {
  const { designations, fetchDesignations, rehydrateState } = useDesignationStore();

  useEffect(() => {
    rehydrateState(); // Load stored designations before fetching
    if (designations.length === 0) {
      fetchDesignations(); // Fetch only if not available
    }

    // Load from localStorage or set default to "Professor"
    const storedDesignation = localStorage.getItem("designation") || "Professor";
    setValue("designation", storedDesignation);
  }, [fetchDesignations, rehydrateState, designations.length, setValue]);

  // Watch for changes and store in localStorage
  useEffect(() => {
    const subscription = watch((value: any) => {
      localStorage.setItem("designation", value.designation || "Professor");
    });

    return () => subscription.unsubscribe(); // Cleanup
  }, [watch]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold">Designation</label>
      <select
        {...register("designation")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
      >
        {designations.length > 0 ? (
          designations.map((designation) => (
            <option key={designation.id} value={designation.name}>
              {designation.name}
            </option>
          ))
        ) : (
          <option value="Professor">Professor</option> // Default if API fails
        )}
      </select>
    </div>
  );
};

export default DesignationDetails;
