import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { FaUser, FaUsers, FaHome, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";
import PersonalInfo from "../components/PersonalInfo";
import FamilyDetails from "../components/FamilyDetails";
import AddressDetails from "../components/AddressDetails";
import PermanentAddress from "../components/PermanentAddress";
import BankDetails from "../components/BankDetails";
import { FormSection } from "./types/form";

const ProfileForm: React.FC = () => {
  // State Management
  const { register, handleSubmit, watch, setValue } = useForm();
  const [step, setStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);
  const [sameAsCurrent, setSameAsCurrent] = useState(() => 
    JSON.parse(localStorage.getItem("sameAsCurrent") || "false")
  );

  // Form Sections Configuration
  const sections: FormSection[] = [
    {
      label: "Personal Info",
      icon: FaUser,
      component: <PersonalInfo register={register} watch={watch} setValue={setValue} />,
    },
    {
      label: "Family Details",
      icon: FaUsers,
      component: <FamilyDetails register={register} watch={watch} setValue={setValue} />,
    },
    {
      label: "Address Details",
      icon: FaHome,
      component: (
        <AddressDetails 
          sameAsCurrent={sameAsCurrent} 
          setSameAsCurrent={setSameAsCurrent} 
          register={register} 
          setValue={setValue} 
        />
      ),
    },
    {
      label: "Permanent Address",
      icon: FaMapMarkerAlt,
      component: (
        <PermanentAddress 
          sameAsCurrent={sameAsCurrent} 
          register={register} 
          watch={watch} 
          setValue={setValue} 
        />
      ),
    },
    {
      label: "Bank Details",
      icon: FaUniversity,
      component: <BankDetails register={register} watch={watch} setValue={setValue} />,
    },
  ];

  // Computed Values
  const progressPercentage = Math.min(((step + 2) / sections.length) * 100, 100);
  const isLastStep = step >= sections.length - 2;

  // Event Handlers
  const handleStepChange = (newStep: number) => {
    if (!visitedSteps.includes(newStep)) {
      setVisitedSteps([...visitedSteps, newStep]);
    }
    setStep(newStep);
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  // UI Components
  const ProgressIndicator = () => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex space-x-2 text-sm text-gray-600">
        <span>Progress:</span>
        <span className="font-medium">{Math.round(progressPercentage)}%</span>
      </div>
      <div className="flex space-x-2">
        {sections.map((_section, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              visitedSteps.includes(Math.floor(index / 2) * 2) 
                ? "bg-indigo-600" 
                : "bg-gray-200"
            }`}
            initial={false}
            animate={{ scale: index === step || index === step + 1 ? 1.2 : 1 }}
          />
        ))}
      </div>
    </div>
  );

  const NavigationTabs = () => (
    <div className="flex overflow-x-auto px-6 pb-4 hide-scrollbar">
      {sections.map((section, index) => {
        const Icon = section.icon;
        const sectionStep = Math.floor(index / 2) * 2;
        const isVisited = visitedSteps.includes(sectionStep);
        const isCurrent = sectionStep === step;
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStepChange(sectionStep)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg mr-2 transition-all ${
              isCurrent
                ? "bg-indigo-600 text-white shadow-lg"
                : isVisited
                ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                : "text-gray-400 hover:bg-gray-50 cursor-not-allowed"
            }`}
            disabled={!isVisited && sectionStep !== step + 2}
          >
            <Icon className="w-5 h-5" />
            <span className="whitespace-nowrap font-medium">{section.label}</span>
            {isVisited && (
              <CheckCircle 
                className={`w-4 h-4 ${isCurrent ? "text-white" : "text-green-500"} ml-1`} 
              />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8"
    >
      <motion.form
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Complete Your Profile</h1>
          <p className="text-indigo-100 mt-2">Please fill in all the required information</p>
        </header>

        {/* Navigation & Progress */}
        <nav className="border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="px-6 py-4">
            <ProgressIndicator />
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <NavigationTabs />
        </nav>

        {/* Form Content */}
        <main className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`grid grid-cols-1 ${
                isLastStep ? "md:grid-cols-1" : "md:grid-cols-2"
              } gap-8`}
            >
              {sections[step].component}
              {sections[step + 1] && sections[step + 1].component}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Navigation Buttons */}
        <footer className="border-t border-gray-100 p-6 md:p-8 bg-gray-50">
          <div className="flex justify-between items-center">
            <motion.button
              type="button"
              onClick={() => handleStepChange(step - 2)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                step > 0
                  ? "bg-white text-gray-700 shadow-md hover:shadow-lg"
                  : "opacity-0 pointer-events-none"
              }`}
              initial={false}
              animate={{ opacity: step > 0 ? 1 : 0 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </motion.button>

            <motion.button
              type={isLastStep ? "submit" : "button"}
              onClick={() => !isLastStep && handleStepChange(step + 2)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-white shadow-md hover:shadow-lg transition-all"
              style={{
                background: isLastStep
                  ? "linear-gradient(to right, #059669, #10b981)"
                  : "linear-gradient(to right, #4f46e5, #7c3aed)"
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{isLastStep ? "Save Profile" : "Next"}</span>
              {isLastStep ? (
                <Save className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </footer>
      </motion.form>
    </motion.div>
  );
};

export default ProfileForm;