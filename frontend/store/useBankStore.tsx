import { create } from "zustand";
import axios from "axios";

interface BankDetails {
  account_number: string;
  account_type: string;
  bank_name: string;
  bank_address: string;
  ifsc_code: string;
  branch_code: string;
  micr_code: string;
}

interface AccountType {
  id: number;
  name?: string;
  type_name?: string;
}

interface BankStore {
  accountTypes: AccountType[];
  bankDetails: BankDetails;
  fetchAccountTypes: () => Promise<void>;
  setBankDetails: (key: keyof BankDetails, value: string) => void;
  rehydrateState: () => void;
}

const useBankStore = create<BankStore>((set) => {
  const rehydrateState = () => {
    const storedAccountTypes = localStorage.getItem("account_types");
    const storedBankDetails = localStorage.getItem("bank_details");

    set({
      accountTypes: storedAccountTypes ? JSON.parse(storedAccountTypes) : [],
      bankDetails: storedBankDetails
        ? JSON.parse(storedBankDetails)
        : {
            account_number: "",
            account_type: "Savings",
            bank_name: "",
            bank_address: "",
            ifsc_code: "",
            branch_code: "",
            micr_code: "",
          },
    });
  };

  return {
    accountTypes: [],
    bankDetails: {
      account_number: "",
      account_type: "Savings",
      bank_name: "",
      bank_address: "",
      ifsc_code: "",
      branch_code: "",
      micr_code: "",
    },

    fetchAccountTypes: async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/account-types");
        const accountTypes = response.data || [];
        localStorage.setItem("account_types", JSON.stringify(accountTypes));
        set({ accountTypes });
      } catch (error) {
        console.error("Error fetching account types:", error);
      }
    },

    setBankDetails: (key, value) => {
      set((state) => {
        const updatedBankDetails = { ...state.bankDetails, [key]: value };
        localStorage.setItem("bank_details", JSON.stringify(updatedBankDetails));
        return { bankDetails: updatedBankDetails };
      });
    },

    rehydrateState,
  };
});

useBankStore.getState().rehydrateState();

export default useBankStore;
