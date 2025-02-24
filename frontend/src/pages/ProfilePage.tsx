import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PersonalInfo from "../components/PersonalInfo";
import FamilyDetails from "../components/FamilyDetails";
import AddressDetails from "../components/AddressDetails";
import PermanentAddress from "../components/PermanentAddress";
import ContactInfo from "../components/ContactInfo";
import MedicalAndWork from "../components/MedicalAndWork";
import DesignationDetails from "../components/DesignationDetails";
import BankDetails from "../components/BankDetails";
const ProfileForm: React.FC = () => {
   const [sameAsCurrent, setSameAsCurrent] = useState(() => {
      return JSON.parse(localStorage.getItem("sameAsCurrent") || "false");
    });
  
  const { register, handleSubmit, watch, setValue } = useForm();
  const [step, setStep] = useState(0);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const sections = [
    { label: "Personal Info", component: <PersonalInfo register={register} watch={watch} setValue={setValue} /> },
    { label: "Family Details", component: <FamilyDetails register={register} watch={watch} setValue={setValue} /> },
    { label: "Address Details", component: <AddressDetails  sameAsCurrent={sameAsCurrent} setSameAsCurrent={setSameAsCurrent} register={register} setValue={setValue} /> },
    { label: "Permanent Address", component: <PermanentAddress sameAsCurrent={sameAsCurrent} setSameAsCurrent={setSameAsCurrent} register={register} watch={watch} setValue={setValue} /> },
    { label: "Contact Info", component: <ContactInfo register={register} watch={watch} setValue={setValue} /> },
    { label: "Medical & Work", component: <MedicalAndWork register={register} watch={watch} setValue={setValue} /> },
    { label: "Designation", component: <DesignationDetails register={register} watch={watch} setValue={setValue} /> },
    { label: "Bank Details", component: <BankDetails register={register} watch={watch} setValue={setValue} /> },
  ];

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 border rounded-2xl shadow-2xl w-full max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-100"
    >
      <div className="flex space-x-4 mb-8">
        {sections.map((section, index) => (
          index % 2 === 0 && (
            <button
              key={index}
              type="button"
              onClick={() => setStep(index)}
              className={`px-4 py-2 rounded-lg transition ${step === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              {section.label}
            </button>
          )
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-xl shadow-md">
        {sections[step].component}
        {sections[step + 1] && sections[step + 1].component}
      </div>

      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 2)}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Previous
          </button>
        )}

        {step < sections.length - 2 ? (
          <button
            type="button"
            onClick={() => setStep(step + 2)}
            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default ProfileForm;
