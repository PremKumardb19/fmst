import React from 'react';
import {
  Edit,

  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CreditCard,
  FileText
} from "lucide-react";

export interface FacultyData {
  [key: string]: string | number | null | undefined;
  name?: string;
  gender_id_text?: string;
  date_of_birth?: string;
  age?: number;
  marital_status_id_text?: string;
  father_name?: string;
  mother_name?: string;
  blood_group_id_text?: string;
  religion_id_text?: string;
  community_id_text?: string;
  caste?: string;
  anniversary_date?: string;
  current_address?: string;
  permanent_address?: string;
  country_id_text?: string;
  state_id_text?: string;
  district_id_text?: string;
  taluk_id_text?: string;
  personal_email?: string;
  official_email?: string;
  personal_mobile?: string;
  official_mobile?: string;
  emergency_email?: string;
  emergency_mobile?: string;
  employee_number?: string;
  designation_id_text?: string;
  employment_type_id_text?: string;
  date_of_joining?: string;
  date_of_retirement?: string;
  salutation_id_text?: string;
  aadhar_no?: string;
  pan_no?: string;
  passport_no?: string;
  account_no?: string;
  bank_name?: string;
  bank_address?: string;
  ifsc?: string;
  branch_code?: string;
  micr?: string;
  account_type_id_text?: string;
}
interface FacultyDetailsDisplayProps {
    facultyData: FacultyData;
    onEdit: () => void;
  }

const FacultyDetailsDisplay: React.FC<FacultyDetailsDisplayProps> = ({ facultyData, onEdit }) => {
    // Group fields into logical sections
    const personalFields = [
      'name', 'gender_id_text', 'date_of_birth', 'age', 'marital_status_id_text',
      'father_name', 'mother_name', 'blood_group_id_text', 'religion_id_text',
      'community_id_text', 'caste', 'anniversary_date'
    ];
  
    const contactFields = [
      'current_address', 'permanent_address', 'country_id_text', 'state_id_text',
      'district_id_text', 'taluk_id_text', 'personal_email', 'official_email',
      'personal_mobile', 'official_mobile', 'emergency_email', 'emergency_mobile'
    ];
  
    const professionalFields = [
      'employee_number', 'designation_id_text', 'employment_type_id_text',
      'date_of_joining', 'date_of_retirement', 'salutation_id_text'
    ];
  
    const documentFields = [
      'aadhar_no', 'pan_no', 'passport_no'
    ];
  
    const bankFields = [
      'account_no', 'bank_name', 'bank_address', 'ifsc',
      'branch_code', 'micr', 'account_type_id_text'
    ];
  
    // Function to format field labels
    const formatLabel = (key: string): string => {
      return key.replace(/id_text$/, '')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
  
    // Function to format field values
    const formatValue = (key: string, value: string | number | null | undefined): string => {
      if (value === null || value === undefined) return 'Not provided';
  
      // Format dates
      if (key.includes('date') && value) {
        try {
          return new Date(String(value)).toLocaleDateString();
        } catch (e) {
          return String(value);
        }
      }
  
      return String(value);
    };
  
    // Function to get icon for field
    const getFieldIcon = (key: string) => {
      if (key.includes('date')) return <Calendar className="w-4 h-4" />;
      if (key.includes('email')) return <Mail className="w-4 h-4" />;
      if (key.includes('mobile')) return <Phone className="w-4 h-4" />;
      if (key.includes('address')) return <MapPin className="w-4 h-4" />;
      if (key.includes('employee') || key.includes('designation')) return <Briefcase className="w-4 h-4" />;
      if (key.includes('account') || key.includes('bank')) return <CreditCard className="w-4 h-4" />;
      if (key.includes('aadhar') || key.includes('pan') || key.includes('passport')) return <FileText className="w-4 h-4" />;
      return null;
    };
  
    // Render a section of fields
    const renderSection = (title: string, fields: string[], bgGradient: string) => (
      <div className="mb-10">
        <div className={`${bgGradient} rounded-lg p-4 mb-6 shadow-md`}>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fields.map(key => (
            facultyData[key] && (
              <div key={key} className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0">
                    {getFieldIcon(key)}
                  </span>
                  <div className="text-sm font-semibold text-indigo-600 truncate">{formatLabel(key)}</div>
                </div>
                <div className="font-medium text-gray-800 ml-9 break-words">{formatValue(key, facultyData[key])}</div>
              </div>
            )
          ))}
        </div>
      </div>
    );
  
    return (
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Faculty Profile</h2>
            <p className="text-gray-500 mt-1">Complete information about your academic profile</p>
          </div>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 w-full sm:w-auto justify-center sm:justify-start"
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
  
        {renderSection("Personal Information", personalFields, "bg-gradient-to-r from-indigo-600 to-purple-600")}
        {renderSection("Contact Information", contactFields, "bg-gradient-to-r from-blue-600 to-cyan-600")}
        {renderSection("Professional Details", professionalFields, "bg-gradient-to-r from-emerald-600 to-teal-600")}
        {renderSection("Identity Documents", documentFields, "bg-gradient-to-r from-amber-600 to-orange-600")}
        {renderSection("Bank Information", bankFields, "bg-gradient-to-r from-rose-600 to-pink-600")}
      </div>
    );
  };

  export default FacultyDetailsDisplay