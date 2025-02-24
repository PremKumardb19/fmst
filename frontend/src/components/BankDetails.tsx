import React, { useEffect } from "react";
import useBankStore from "../../store/useBankStore";

const BankDetails: React.FC<{ register: any; watch: any; setValue: any }> = ({ register, watch, setValue }) => {
  const { accountTypes, fetchAccountTypes, bankDetails, setBankDetails } = useBankStore();

  useEffect(() => {
    fetchAccountTypes();
  }, [fetchAccountTypes]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold">Account Number</label>
      <input
        {...register("account_number")}
        type="text"
        value={watch("account_number") || bankDetails.account_number}
        onChange={(e) => {
          setBankDetails("account_number", e.target.value);
          setValue("account_number", e.target.value);
        }}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Account Number"
      />

      <label className="block text-lg font-semibold">Account Type</label>
      <select
        {...register("account_type")}
        value={watch("account_type") || bankDetails.account_type}
        onChange={(e) => {
          setBankDetails("account_type", e.target.value);
          setValue("account_type", e.target.value);
        }}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 text-black bg-white"
      >
        {accountTypes.length > 0 ? (
          accountTypes.map((type) => (
            <option key={type.id} value={type.name || type.type_name} className="text-black">
              {type.name || type.type_name}
            </option>
          ))
        ) : (
          <option value="Savings" className="text-black">Savings</option>
        )}
      </select>

      <label className="block text-lg font-semibold">Bank Name</label>
      <input
        {...register("bank_name")}
        type="text"
        value={watch("bank_name") || bankDetails.bank_name}
        onChange={(e) => {
          setBankDetails("bank_name", e.target.value);
          setValue("bank_name", e.target.value);
        }}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Bank Name"
      />

      <label className="block text-lg font-semibold">Bank Address</label>
      <input
        {...register("bank_address")}
        type="text"
        value={watch("bank_address") || bankDetails.bank_address}
        onChange={(e) => {
          setBankDetails("bank_address", e.target.value);
          setValue("bank_address", e.target.value);
        }}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Bank Address"
      />

      <label className="block text-lg font-semibold">IFSC Code</label>
      <input
        {...register("ifsc_code")}
        type="text"
        value={watch("ifsc_code") || bankDetails.ifsc_code}
        onChange={(e) => {
          setBankDetails("ifsc_code", e.target.value);
          setValue("ifsc_code", e.target.value);
        }}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter IFSC Code"
      />

      <label className="block text-lg font-semibold">Branch Code</label>
      <input
        {...register("branch_code")}
        type="text"
        value={watch("branch_code") || bankDetails.branch_code}
        onChange={(e) => {
          setBankDetails("branch_code", e.target.value);
          setValue("branch_code", e.target.value);
        }}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Branch Code"
      />

      <label className="block text-lg font-semibold">MICR Code</label>
      <input
        {...register("micr_code")}
        type="text"
        value={watch("micr_code") || bankDetails.micr_code}
        onChange={(e) => {
          setBankDetails("micr_code", e.target.value);
          setValue("micr_code", e.target.value);
        }}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Enter MICR Code"
      />
    </div>
  );
};

export default BankDetails;
