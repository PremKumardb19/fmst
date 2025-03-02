import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserData } from "../backendCall/PersonalPage";
import axios from "axios";
import {
  LayoutDashboard,
  UserCircle,
  GraduationCap,
  ScrollText,
  Settings,
  BookOpen,
  LogOut,
  Menu,
  X,
  Edit,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CreditCard,
  FileText
} from "lucide-react";
import ProfileForm from "./ProfilePage";
import { useAuthStore } from "../../store/useAuthStore";
import RelationShipPage from './RelationshipPage';

interface FacultyData {
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

interface DashboardCardProps {
  title: string;
  description: string;
  bgColor: string;
  icon: React.ReactNode;
}

interface FacultyDetailsDisplayProps {
  facultyData: FacultyData;
  onEdit: () => void;
}

// Faculty Details Display Component
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

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [facultyData, setFacultyData] = useState<FacultyData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch faculty details when profile section is accessed
  useEffect(() => {
    if (activeComponent === 'profile' && user?.id) {
      fetchFacultyDetails();
    }
  }, [activeComponent, user?.id]);

  // Function to fetch faculty details
  const fetchFacultyDetails = async (): Promise<void> => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const response = await axios.get<FacultyData>(`http://localhost:5000/api/faculty-details/${user.id}`);
      setFacultyData(response.data);
      setIsEditing(false); // Reset editing state
    } catch (error: any) {
      console.error('Error fetching faculty details:', error);
      // If 404, it means faculty details don't exist yet
      if (error.response && error.response.status === 404) {
        setFacultyData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", id: 'dashboard' },
    { icon: <UserCircle className="w-5 h-5" />, label: "Profile", id: 'profile' },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Education", id: 'education' },
    { icon: <ScrollText className="w-5 h-5" />, label: "Journal", id: 'journal' },
    { icon: <BookOpen className="w-5 h-5" />, label: "Publications", id: 'publications' },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", id: 'settings' }
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        if (isLoading) {
          return (
            <div className="flex justify-center items-center p-16">
              <div className="relative">
                <div className="w-20 h-20 border-purple-200 border-4 rounded-full"></div>
                <div className="w-20 h-20 border-indigo-600 border-t-4 animate-spin rounded-full absolute top-0 left-0"></div>
              </div>
            </div>
          );
        }

        // If we have faculty data and not in editing mode, show the details display
        if (facultyData && !isEditing) {
          return (
            <div className="px-2 py-4 sm:px-6 lg:px-8">
              <FacultyDetailsDisplay 
                facultyData={facultyData} 
                onEdit={() => setIsEditing(true)} 
              />
            </div>
          );
        }
        
        // If edit is touched or no data exists, go directly to ProfileForm
        return (
          <div className="px-2 py-4 sm:px-6 lg:px-8">
            <ProfileForm />
          </div>
        );
        case 'journal':
          if (isLoading) {
            return (
              <div className="flex justify-center items-center p-16">
                <div className="relative">
                  <div className="w-20 h-20 border-purple-200 border-4 rounded-full"></div>
                  <div className="w-20 h-20 border-indigo-600 border-t-4 animate-spin rounded-full absolute top-0 left-0"></div>
                </div>
              </div>
            );
          }
          return (
            <div className="px-2 py-4 sm:px-6 lg:px-8">
              <RelationShipPage/>
            </div>
          );
      case 'dashboard':
        return (
          <div className="px-2 py-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 border border-gray-100 transition-all duration-300 hover:shadow-2xl">
              <div className="mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Dashboard Overview</h2>
                <p className="text-gray-500">Manage your academic activities and track your progress</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                <DashboardCard 
                  title="Recent Publications"
                  description="View and manage your latest research publications and academic papers"
                  bgColor="bg-gradient-to-br from-indigo-500 to-purple-600"
                  icon={<BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />}
                />
                <DashboardCard 
                  title="Journal Entries"
                  description="Track your journal submissions and review their current status"
                  bgColor="bg-gradient-to-br from-emerald-500 to-teal-600"
                  icon={<ScrollText className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />}
                />
                <DashboardCard 
                  title="Education"
                  description="Manage your qualifications, certifications and academic achievements"
                  bgColor="bg-gradient-to-br from-amber-500 to-orange-600"
                  icon={<GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />}
                />
              </div>
              
              <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate">Profile updated</p>
                          <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 sm:p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                      <p className="text-xs sm:text-sm text-indigo-600 font-medium">Publications</p>
                      <p className="text-xl sm:text-2xl font-bold text-indigo-800">12</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                      <p className="text-xs sm:text-sm text-emerald-600 font-medium">Journals</p>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-800">8</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-lg bg-amber-50 border border-amber-100">
                      <p className="text-xs sm:text-sm text-amber-600 font-medium">Degrees</p>
                      <p className="text-xl sm:text-2xl font-bold text-amber-800">3</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-lg bg-rose-50 border border-rose-100">
                      <p className="text-xs sm:text-sm text-rose-600 font-medium">Experience</p>
                      <p className="text-xl sm:text-2xl font-bold text-rose-800">7 yrs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 sm:p-8">
            <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}
              </h2>
              <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Settings className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-600" />
                </div>
                <p className="text-lg sm:text-xl text-gray-600 mb-4">This section is currently under development</p>
                <p className="text-gray-500 max-w-md">We're working hard to bring you the best experience. This feature will be available soon.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, bgColor, icon }) => (
    <div className={`${bgColor} p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white text-opacity-90 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3">{description}</p>
      <div className="mt-auto">
        <button className="flex items-center gap-1 text-sm font-medium text-white hover:gap-2 transition-all">
          View Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg text-white hover:shadow-xl transition-all duration-300"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static w-64 sm:w-80 bg-white shadow-2xl min-h-screen z-40 transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-4 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <UserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{user?.name || "Faculty User"}</h2>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{user?.email || "faculty@example.com"}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="space-y-2 sm:space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveComponent(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl transition-all duration-300 ${
                    activeComponent === item.id 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>
                    {item.icon}
                  </span>
                  <span className="font-medium truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-4 sm:p-6 mt-auto border-t border-gray-100">
            <button
              onClick={() => saveUserData()}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 sm:px-5 py-3 sm:py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 sm:p-6 lg:p-8 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">Welcome, {user?.name || "Faculty User"}</h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Manage your academic profile, publications, and research activities</p>
          </div>
        </header>

        <main className="flex-1 bg-gray-50 p-2 sm:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {renderComponent()}
            
          </div>
        </main>

        <footer className="bg-white p-4 sm:p-6 text-center border-t border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs sm:text-sm">© {new Date().getFullYear()} Faculty Management System. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0 text-xs sm:text-sm">
              <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Privacy Policy</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Terms of Service</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;