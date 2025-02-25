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
    <div className="space-y-6">
      {/* Official Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Official Mobile Number</label>
          <input
            type="tel"
            {...register("mobile")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Official Email ID</label>
          <input
            type="email"
            {...register("email")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Personal Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Personal Mobile Number</label>
          <input
            type="tel"
            {...register("Persmobile")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Personal Email ID</label>
          <input
            type="email"
            {...register("Persemail")}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
