import React, { useEffect } from "react";

const ContactInfo: React.FC<{ register: any; setValue: any; watch: any }> = ({ register, setValue, watch }) => {
  useEffect(() => {
    const storedOfficialMobile = localStorage.getItem("officialmobile");
    const storedOfficialEmail = localStorage.getItem("officialemail");
    const storedPersonalEmail = localStorage.getItem("personalemail");
    const storedPersonalMobile = localStorage.getItem("personalmobile");

    if (storedPersonalMobile) setValue("personalmobile", storedPersonalMobile);
    if (storedPersonalEmail) setValue("personalemail", storedPersonalEmail);
    if (storedOfficialMobile) setValue("officialmobile", storedOfficialMobile);
    if (storedOfficialEmail) setValue("officialemail", storedOfficialEmail);
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value:any) => {
      localStorage.setItem("officialmobile", value.mobile || "");
      localStorage.setItem("officialemail", value.email || "");
      localStorage.setItem("personalemail", value.Persemail || "");
      localStorage.setItem("personalmobile", value.Persmobile || "");
    });

    return () => subscription.unsubscribe(); // Cleanup subscription
  }, [watch]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold"> Official Mobile Number</label>
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

      <label className="block text-lg font-semibold"> Personal Mobile Number</label>
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
