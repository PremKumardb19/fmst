import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaGraduationCap, FaNewspaper, FaCog, FaChartLine, FaBook } from "react-icons/fa";
import ProfileForm from "./ProfilePage";
//import Profile from "../components/Profile";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');

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
    { icon: <FaChartLine className="w-5 h-5" />, label: "Dashboard", id: 'dashboard' },
    { icon: <FaUserCircle className="w-5 h-5" />, label: "Profile", id: 'profile' },
    { icon: <FaGraduationCap className="w-5 h-5" />, label: "Education", id: 'education' },
    { icon: <FaNewspaper className="w-5 h-5" />, label: "Journal", id: 'journal' },
    { icon: <FaBook className="w-5 h-5" />, label: "Publications", id: 'publications' },
    { icon: <FaCog className="w-5 h-5" />, label: "Settings", id: 'settings' }
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <ProfileForm />;
      case 'dashboard':
        return (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Recent Publications</h3>
                  <p className="text-gray-600">View your latest research publications</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Journal Entries</h3>
                  <p className="text-gray-600">Track your journal submissions</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <p className="text-gray-600">Manage your qualifications</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold">{activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}</h2>
            <p className="text-gray-600 mt-4">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        {/* User Profile Section */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <FaUserCircle className="text-5xl text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">User Name</h2>
              <p className="text-sm text-gray-500">user@example.com</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveComponent(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeComponent === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Welcome, User!</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default HomePage;