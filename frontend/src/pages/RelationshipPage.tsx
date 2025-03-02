import { useAuthStore } from "../../store/useAuthStore";
import RelationshipTable from "../components/RelationshipTable";
import { Users, LogIn } from "lucide-react";

function RelationShipPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-5">
            <div className="flex items-center">
              <Users className="h-7 w-7 text-indigo-600" />
              <h1 className="ml-2 text-lg sm:text-xl font-bold text-gray-900">
                Relationship Manager
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center px-4 sm:px-6 lg:px-8">
        {user ? (
          <div className="w-full max-w-5xl">
            <RelationshipTable user_id={Number(user.id)} />
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto mt-6">
            <div className="bg-white py-6 px-5 shadow-md rounded-lg sm:px-8">
              <div className="text-center">
                <LogIn className="mx-auto h-10 w-10 text-indigo-500" />
                <h2 className="mt-3 text-lg font-semibold text-gray-900">
                  Authentication Required
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Please log in to view and manage your relationships.
                </p>
                <button
                  className="mt-5 w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
