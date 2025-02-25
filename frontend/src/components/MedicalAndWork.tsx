import React, { useEffect } from "react";
import useBloodGroupStore from "../../store/useBloodGroupStore"; 

const MedicalAndWork: React.FC<{ register: any; setValue: any; watch: any }> = ({ register, setValue, watch }) => {
  const { bloodGroups, fetchBloodGroups, rehydrateState } = useBloodGroupStore();

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

  return (
    <div className="space-y-6">
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
  );
};

export default MedicalAndWork;
