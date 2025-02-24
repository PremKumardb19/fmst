import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PersonalInfo from "../components/PersonalInfo";
import FamilyDetails from "../components/FamilyDetails";
import AddressDetails from "../components/AddressDetails";
import PermanentAddress from "../components/PermanentAddress";
import ContactInfo from "../components/ContactInfo";
import MedicalAndWork from "../components/MedicalAndWork";
import DesignationDetails from "../components/DesignationDetails";

const ProfileForm: React.FC = () => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const sections = [
    <PersonalInfo register={register} watch={watch} setValue={setValue} />,
    <FamilyDetails register={register} watch={watch} setValue={setValue} />,
    <AddressDetails register={register}   setValue={setValue}/>,
    <PermanentAddress register={register} watch={watch} setValue={setValue} />,
    <ContactInfo register={register} watch={watch} setValue={setValue} />,
    <MedicalAndWork register={register} watch={watch} setValue={setValue} />,
    <DesignationDetails register={register}  watch={watch} setValue={setValue} />,
  ];

  const chunkSize = 5;
  const columnCount = Math.ceil(sections.length / chunkSize);

  const groupedSections = [];
  for (let i = 0; i < sections.length; i += chunkSize) {
    groupedSections.push(sections.slice(i, i + chunkSize));
  }

  const gridClass = `grid grid-cols-1 md:grid-cols-${Math.min(columnCount, 3)} gap-6`;

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border rounded-xl shadow-lg w-full max-w-screen-lg mx-auto bg-white"
    >
      <div className={gridClass}>
        {groupedSections.map((column, colIndex) => (
          <div key={colIndex} className="space-y-4">
            {column.map((Component, index) => (
              <div key={index}>{Component}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </motion.form>
  );
};

export default ProfileForm;