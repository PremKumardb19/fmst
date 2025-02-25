import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PersonalInfo from "../components/PersonalInfo";
import FamilyDetails from "../components/FamilyDetails";
import AddressDetails from "../components/AddressDetails";
import PermanentAddress from "../components/PermanentAddress";
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
    {
      label: "Personal Info",
      component: <PersonalInfo register={register} watch={watch} setValue={setValue} />,
    },
    {
      label: "Family Details",
      component: <FamilyDetails register={register} watch={watch} setValue={setValue} />,
    },
    {
      label: "Address Details",
      component: (
        <AddressDetails sameAsCurrent={sameAsCurrent} setSameAsCurrent={setSameAsCurrent} register={register} setValue={setValue} />
      ),
    },
    {
      label: "Permanent Address",
      component: <PermanentAddress sameAsCurrent={sameAsCurrent} register={register} watch={watch} setValue={setValue} />,
    },
    {
      label: "Bank Details",
      component: <BankDetails register={register} watch={watch} setValue={setValue} />,
    },
  ];
  
  const progressPercentage = Math.min(((step + 2) / sections.length) * 100, 100);

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-10 bg-white rounded-xl shadow-xl"
    >
      {/* Navigation & Progress Bar */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {sections.map((section, index) =>
            index % 2 === 0 ? (
              <button
                key={index}
                type="button"
                onClick={() => setStep(index)}
                className={`py-2 px-6 text-sm font-medium transition rounded-lg shadow-md ${
                  step === index ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {section.label}
              </button>
            ) : null
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-indigo-600 h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </div>

      {/* Form Content */}
      <div className={`p-6 bg-gray-50 rounded-lg ${step === sections.length - 1 ? "flex justify-center" : "grid grid-cols-1 md:grid-cols-2 gap-8"}`}>
        {sections[step].component}
        {sections[step + 1] && sections[step + 1].component}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 2)}
            className="py-3 px-8 text-white rounded-lg shadow-lg transition bg-gray-500 hover:bg-gray-600"
          >
            Previous
          </button>
        ) : (
          <div />
        )}

        {step < sections.length - 2 ? (
          <button
            type="button"
            onClick={() => setStep(step + 2)}
            className="py-3 px-8 text-white rounded-lg shadow-lg transition bg-indigo-600 hover:bg-indigo-700 ml-auto"
          >
            Next
          </button>
        ) : (
          <button type="submit" className="py-3 px-8 text-white rounded-lg shadow-lg transition bg-green-600 hover:bg-green-700 ml-auto">
            Submit
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default ProfileForm;
