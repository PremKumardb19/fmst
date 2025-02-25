import React, { useEffect } from "react";
import { useContactStore } from "../../store/contactStore";

const ContactInfo: React.FC<{ register: any; setValue: any; watch: any; errors: any }> = ({ register, setValue, watch, errors }) => {
  const { officialMobile, officialEmail, personalMobile, personalEmail, emergencyEmail, emergencyMobile, setContactInfo } = useContactStore();

  useEffect(() => {
    setValue("mobile", officialMobile);
    setValue("email", officialEmail);
    setValue("Persmobile", personalMobile);
    setValue("Persemail", personalEmail);
    setValue("emergencyEmail", emergencyEmail);
    setValue("emergencyMobile", emergencyMobile);
  }, [officialMobile, officialEmail, personalMobile, personalEmail, emergencyEmail, emergencyMobile, setValue]);

  useEffect(() => {
    const subscription = watch((value: any) => {
      setContactInfo({
        officialMobile: value.mobile,
        officialEmail: value.email,
        personalMobile: value.Persmobile,
        personalEmail: value.Persemail,
        emergencyEmail: value.emergencyEmail,
        emergencyMobile: value.emergencyMobile,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setContactInfo]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Official Mobile */}
        <div>
          <label className="block text-base font-medium mb-1">Official Mobile Number</label>
          <input
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
            placeholder="Enter official mobile number"
            className={`border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400 ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            }`}
            onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))}
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
        </div>

        {/* Official Email */}
        <div>
          <label className="block text-base font-medium mb-1">Official Email ID</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter official email ID"
            className={`border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Mobile */}
        <div>
          <label className="block text-base font-medium mb-1">Personal Mobile Number</label>
          <input
            type="tel"
            {...register("Persmobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
            placeholder="Enter personal mobile number"
            className={`border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400 ${
              errors.Persmobile ? "border-red-500" : "border-gray-300"
            }`}
            onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))}
          />
          {errors.Persmobile && <p className="text-red-500 text-xs mt-1">{errors.Persmobile.message}</p>}
        </div>

        {/* Personal Email */}
        <div>
          <label className="block text-base font-medium mb-1">Personal Email ID</label>
          <input
            type="email"
            {...register("Persemail", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter personal email ID"
            className={`border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400 ${
              errors.Persemail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.Persemail && <p className="text-red-500 text-xs mt-1">{errors.Persemail.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Emergency Mobile */}
        <div>
          <label className="block text-base font-medium mb-1">Emergency Mobile Number</label>
          <input
            type="tel"
            {...register("emergencyMobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
            placeholder="Enter emergency mobile number"
            className={`border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400 ${
              errors.emergencyMobile ? "border-red-500" : "border-gray-300"
            }`}
            onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))}
          />
          {errors.emergencyMobile && <p className="text-red-500 text-xs mt-1">{errors.emergencyMobile.message}</p>}
        </div>

        {/* Emergency Email */}
        <div>
          <label className="block text-base font-medium mb-1">Emergency Email ID</label>
          <input
            type="email"
            {...register("emergencyEmail", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter emergency email ID"
            className={`border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400 ${
              errors.emergencyEmail ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-300"
            }`}
          />
          {errors.emergencyEmail && <p className="text-red-500 text-xs mt-1">{errors.emergencyEmail.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;