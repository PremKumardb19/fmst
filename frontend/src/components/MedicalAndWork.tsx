import React, { useEffect } from "react";
import useBloodGroupStore from "../../store/useBloodGroupStore"; // Import the updated store

const MedicalAndWork: React.FC<{ register: any; setValue: any; watch: any }> = ({ register, setValue, watch }) => {
  const { bloodGroups, fetchBloodGroups, rehydrateState } = useBloodGroupStore();

  useEffect(() => {
    rehydrateState(); // Ensure stored state is loaded first
  }, [rehydrateState]);

  useEffect(() => {
    if (bloodGroups.length === 0) {
      fetchBloodGroups(); // Fetch if no data available
    }

    // Ensure stored value is set correctly
    const storedBloodGroup = localStorage.getItem("bloodGroup");
    if (storedBloodGroup) {
      setValue("bloodGroup", storedBloodGroup);
    }
  }, [fetchBloodGroups, bloodGroups.length, setValue]);

  // Watch for changes and store in localStorage
  useEffect(() => {
    const subscription = watch((value: any) => {
      if (value.bloodGroup) {
        localStorage.setItem("bloodGroup", value.bloodGroup);
      }
    });

    return () => subscription.unsubscribe(); // Cleanup
  }, [watch]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold">Blood Group</label>
      <select
        {...register("bloodGroup")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
      >
        {bloodGroups.length > 0 ? (
          bloodGroups.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))
        ) : (
          <option value="A+">A+</option> // Default if API fails
        )}
      </select>
    </div>
  );
};

export default MedicalAndWork;
