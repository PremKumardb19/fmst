import React, { useEffect } from "react";
import { useContactStore } from "../../store/contactStore";

const ContactInfo: React.FC<{ register: any; setValue: any; watch: any }> = ({ register, setValue, watch }) => {
  const { officialMobile, officialEmail, personalMobile, personalEmail, setContactInfo } = useContactStore();

  useEffect(() => {
    // Set default values from Zustand store
    setValue("mobile", officialMobile);
    setValue("email", officialEmail);
    setValue("Persmobile", personalMobile);
    setValue("Persemail", personalEmail);
  }, [officialMobile, officialEmail, personalMobile, personalEmail, setValue]);

  useEffect(() => {
    const subscription = watch((value: any) => {
      setContactInfo({
        officialMobile: value.mobile,
        officialEmail: value.email,
        personalMobile: value.Persmobile,
        personalEmail: value.Persemail,
      });
    });

    return () => subscription.unsubscribe(); 
  }, [watch, setContactInfo]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold">Official Mobile Number</label>
      <input
        type="tel"
        {...register("mobile")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-lg font-semibold">Official Email ID</label>
      <input
        type="email"
        {...register("email")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-lg font-semibold">Personal Mobile Number</label>
      <input
        type="tel"
        {...register("Persmobile")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-lg font-semibold">Personal Email ID</label>
      <input
        type="email"
        {...register("Persemail")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default ContactInfo;
