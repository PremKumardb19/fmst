import { useAuthStore } from "../../store/useAuthStore";
import RelationshipTable from "../components/RelationshipTable";
import { Users, LogIn } from "lucide-react";

function RelationShipPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-xl sm:text-2xl font-bold text-gray-900">
                RelationshipManager
              </h1>
            </div>
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-sm sm:text-base text-gray-700">
                  Welcome, <span className="font-medium">{user.name || user.email}</span>
                </div>
                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-medium text-indigo-800">
                    {(user.name || user.email || "?").charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {user ? (
          <div className="w-full max-w-7xl">
            <RelationshipTable user_id={Number(user.id)} />
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto mt-10 sm:mt-16">
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
              <div className="text-center">
                <LogIn className="mx-auto h-12 w-12 text-indigo-500" />
                <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
                  Authentication Required
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Please log in to view and manage your relationships.
                </p>
                <button
                  className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default RelationShipPage;
