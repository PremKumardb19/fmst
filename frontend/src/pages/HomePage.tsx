import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard,
  UserCircle, 
  GraduationCap, 
  ScrollText, 
  Settings, 
  BookOpen,
  LogOut,
  Menu,
  X
} from "lucide-react";
import ProfileForm from "./ProfilePage";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
        return <ProfileForm />;
      case 'dashboard':
        return (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard 
                  title="Recent Publications"
                  description="View your latest research publications"
                  bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
                  icon={<BookOpen className="w-8 h-8 text-blue-600" />}
                />
                <DashboardCard 
                  title="Journal Entries"
                  description="Track your journal submissions"
                  bgColor="bg-gradient-to-br from-green-50 to-green-100"
                  icon={<ScrollText className="w-8 h-8 text-green-600" />}
                />
                <DashboardCard 
                  title="Education"
                  description="Manage your qualifications"
                  bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
                  icon={<GraduationCap className="w-8 h-8 text-purple-600" />}
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}
            </h2>
            <p className="text-gray-600 mt-4">This section is under development.</p>
          </div>
        );
    }
  };

  const DashboardCard = ({ title, description, bgColor, icon }:any) => (
    <div className={`${bgColor} p-6 rounded-xl shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {icon}
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md text-gray-600 hover:bg-gray-50"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static w-64 bg-white shadow-lg min-h-screen z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <UserCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">User Name</h2>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveComponent(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeComponent === item.id 
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 mt-auto border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, User!</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {renderComponent()}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;