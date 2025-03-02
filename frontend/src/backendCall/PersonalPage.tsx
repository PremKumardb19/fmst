import axios from "axios";

interface LocalData {
  salutation?: string;
  name?: string;
  gender?: string;
  maritalStatus?: string;
  dob?: string;
  fatherName?: string;
  motherName?: string;
  religion?: string;
  community?: string;
  caste?: string;
  currentAddress?: string;
  curentCountry_id?:number;
  permanentCountry_id?:number;
  selectedState?: { id: number };
  selectedDistrict?: { id: number };
  selectedTaluk?: { id: number };
  pselectedState?: { id: number };
  pselectedDistrict?: { id: number };
  pselectedTaluk?: { id: number };
  permanentAddress?: string;
  bloodGroup?: string;
  designation?: string;
  employment_type?: string;
  employment_number?: string;
  emergencyEmail?:string;
  emergencyMobile?:string;
  jdob?: string;
  rdob?: string;
  anniversaryDate?: string;
  Persemail?: string;
  email?: string;
  Persmobile?: string;
  mobile?: string;
  aadhar?: string;
  pan?: string;
  passport_number?: string;
  account_number?: string;
  account_type?: string;
  bank_name?: string;
  bank_address?: string;
  ifsc_code?: string;
  branch_code?: string;
  micr_code?: string;
}

interface UserState {
  user: { id: number; email: string; name: string };
}

interface CurrentDistrictState {
  id: number;
 name: string ;
}


const getIdFromName = (name: string, key: string): number | null => {
  const storedData: { id: number; name: string }[] = JSON.parse(localStorage.getItem(key) || "[]");
  const item = storedData.find((item) => item.name === name);
  return item ? item.id : null;
};


const getIdFromTypeName = (type_name: string, key: string): number | null => {
    const storedData: { id: number; type_name: string }[] = JSON.parse(localStorage.getItem(key) || "[]");
    const item = storedData.find((item) => item.type_name === type_name);
    return item ? item.id : null;
     
  };


const calculateAge = (dob: string | undefined): number | null => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

export const saveUserData = async (): Promise<void> => {
  const localData: LocalData = JSON.parse(localStorage.getItem("designationDetails") || "{}");
  const userState: { state: UserState } = JSON.parse(localStorage.getItem("auth-storage") || "{}");
  const currentDistrict: CurrentDistrictState = JSON.parse(localStorage.getItem("selectedDistrict") || "{}");
  const currentState: CurrentDistrictState = JSON.parse(localStorage.getItem("selectedState") || "{}");
  const currentTaluk: CurrentDistrictState = JSON.parse(localStorage.getItem("selectedTaluk") || "{}");
  const pcurrentDistrict: CurrentDistrictState = JSON.parse(localStorage.getItem("permanentDistrict") || "{}");
  const pcurrentState: CurrentDistrictState = JSON.parse(localStorage.getItem("permanentState") || "{}");
  const pcurrentTaluk: CurrentDistrictState = JSON.parse(localStorage.getItem("permanentTaluk") || "{}");

  if (!userState?.state?.user) {
    console.error("User not found in localStorage");
    return;
  }

  const payload = {
    id: 1,
    user_id: Number(userState.state.user.id),
    salutation_id: localData.salutation ? Number(getIdFromName(localData.salutation, "salutations")) : null,
    name: localData.name || "",
    gender_id: localData.gender ? Number(getIdFromName(localData.gender, "genders")) : null,
    marital_status_id: localData.maritalStatus ? Number(getIdFromName(localData.maritalStatus, "maritalStatuses")) : null,
    date_of_birth: localData.dob || null,
    age: calculateAge(localData.dob),
    father_name: localData.fatherName || "",
    mother_name: localData.motherName || "",
    religion_id: localData.religion ? Number(getIdFromName(localData.religion, "religions")) : null,
    community_id: localData.community ? Number(getIdFromName(localData.community, "community")) : null,
    caste: localData.caste || "",
    current_address: localData.currentAddress || "",
    country_id: Number(localData.curentCountry_id) || 1,
    p_country_id: Number(localData.permanentCountry_id) || 1,
    state_id: currentState?.id ? Number(currentState.id) : null,
    district_id: currentDistrict?.id ? Number(currentDistrict.id) : null,
    taluk_id: currentTaluk?.id ? Number(currentTaluk.id) : null,
    p_state_id: pcurrentState?.id ? Number(pcurrentState.id) : null,
    p_district_id: pcurrentDistrict?.id ? Number(pcurrentDistrict.id) : null,
    p_taluk_id: pcurrentTaluk?.id ? Number(pcurrentTaluk.id) : null,
    permanent_address: localData.permanentAddress || null,
    blood_group_id: localData.bloodGroup ? Number(getIdFromName(localData.bloodGroup, "bloodGroups")) : null,
    designation_id: localData.designation ? Number(getIdFromName(localData.designation, "designations")) : null,
    employment_type_id: localData.employment_type ? Number(getIdFromTypeName(localData.employment_type, "employmentTypes")) : null,
    employee_number: localData.employment_number || "",
    date_of_joining: localData.jdob || null,
    date_of_retirement: localData.rdob || null,
    anniversary_date: localData.anniversaryDate || null,
    personal_email: localData.Persemail || "",
    official_email: localData.email || "",
    personal_mobile: localData.Persmobile || "",
    official_mobile: localData.mobile || "",
    emergency_email: localData.emergencyEmail || "",
    emergency_mobile: localData.emergencyMobile || "",
    aadhar_no: localData.aadhar || "",
    pan_no: localData.pan || "",
    passport_no: localData.passport_number || "",
    account_no: localData.account_number || "",
    account_type_id: localData.account_type ? Number(getIdFromTypeName(localData.account_type, "account_types")) : null,
    bank_name: localData.bank_name || "",
    bank_address: localData.bank_address || "",
    ifsc: localData.ifsc_code || "",
    branch_code: localData.branch_code || "",
    micr: localData.micr_code || "",
  };

  try {
    console.log(payload);
    const response = await axios.post("http://localhost:5000/ap/faculty", payload);
    console.log("Data saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
