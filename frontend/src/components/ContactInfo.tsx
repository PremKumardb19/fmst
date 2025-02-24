import React, { useEffect } from "react";

const ContactInfo: React.FC<{ register: any; setValue: any; watch: any }> = ({ register, setValue, watch }) => {
  // Load from localStorage on mount
  useEffect(() => {
    const storedMobile = localStorage.getItem("mobile");
    const storedEmail = localStorage.getItem("email");

    if (storedMobile) setValue("mobile", storedMobile);
    if (storedEmail) setValue("email", storedEmail);
  }, [setValue]);

  // Watch fields and store changes in localStorage
  useEffect(() => {
    const subscription = watch((value:any) => {
      localStorage.setItem("mobile", value.mobile || "");
      localStorage.setItem("email", value.email || "");
    });

    return () => subscription.unsubscribe(); // Cleanup subscription
  }, [watch]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold">Mobile Number</label>
      <input
        type="tel"
        {...register("mobile")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-lg font-semibold">Email ID</label>
      <input
        type="email"
        {...register("email")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default ContactInfo;
