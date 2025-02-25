import React, { useEffect } from "react";
import useBankStore from "../../store/useBankStore";

const BankDetails: React.FC<{ register: any; watch: any; setValue: any }> = ({ register, watch, setValue }) => {
  const { accountTypes, fetchAccountTypes, bankDetails, setBankDetails } = useBankStore();

  useEffect(() => {
    fetchAccountTypes();
  }, [fetchAccountTypes]);

  return (
    <div className="space-y-6">
      {/* Account Number & Account Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Account Number</label>
          <input
            {...register("account_number")}
            type="text"
            value={watch("account_number") || bankDetails.account_number}
            onChange={(e) => {
              setBankDetails("account_number", e.target.value);
              setValue("account_number", e.target.value);
            }}
            placeholder="Enter Account Number"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Account Type</label>
          <select
            {...register("account_type")}
            value={watch("account_type") || bankDetails.account_type}
            onChange={(e) => {
              setBankDetails("account_type", e.target.value);
              setValue("account_type", e.target.value);
            }}
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400 text-black bg-white"
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
        </div>
      </div>

      {/* Bank Name & Bank Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">Bank Name</label>
          <input
            {...register("bank_name")}
            type="text"
            value={watch("bank_name") || bankDetails.bank_name}
            onChange={(e) => {
              setBankDetails("bank_name", e.target.value);
              setValue("bank_name", e.target.value);
            }}
            placeholder="Enter Bank Name"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Bank Address</label>
          <input
            {...register("bank_address")}
            type="text"
            value={watch("bank_address") || bankDetails.bank_address}
            onChange={(e) => {
              setBankDetails("bank_address", e.target.value);
              setValue("bank_address", e.target.value);
            }}
            placeholder="Enter Bank Address"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* IFSC Code, Branch Code & MICR Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-base font-medium mb-1">IFSC Code</label>
          <input
            {...register("ifsc_code")}
            type="text"
            value={watch("ifsc_code") || bankDetails.ifsc_code}
            onChange={(e) => {
              setBankDetails("ifsc_code", e.target.value);
              setValue("ifsc_code", e.target.value);
            }}
            placeholder="Enter IFSC Code"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Branch Code</label>
          <input
            {...register("branch_code")}
            type="text"
            value={watch("branch_code") || bankDetails.branch_code}
            onChange={(e) => {
              setBankDetails("branch_code", e.target.value);
              setValue("branch_code", e.target.value);
            }}
            placeholder="Enter Branch Code"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">MICR Code</label>
          <input
            {...register("micr_code")}
            type="text"
            value={watch("micr_code") || bankDetails.micr_code}
            onChange={(e) => {
              setBankDetails("micr_code", e.target.value);
              setValue("micr_code", e.target.value);
            }}
            placeholder="Enter MICR Code"
            className="border p-2 text-sm rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
