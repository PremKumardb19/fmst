  import { useState, useEffect } from "react";
  import { useStore } from "../../store/useStore";
  import RelationshipForm from "./RelationForm";
  import { Edit, Trash2, Users } from "lucide-react";

  type Relationship = {
    id: number;
    name: string;
    relation: string;
    age: number;
    occupation: string;
    income: number;
    user_id: number;
  };

  type Props = { user_id: number };

  const RelationshipTable = ({ user_id }: Props) => {
    const { relationships, fetchRelationships, deleteRelationship } = useStore();
    const [editData, setEditData] = useState<Relationship | null>(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState<number | null>(null);

    useEffect(() => {
      if (user_id) {
        console.log("Fetching relationships for user:", user_id);
        fetchRelationships(user_id);
      }
    }, [user_id,fetchRelationships,setEditData,setIsConfirmingDelete]);

    const handleDelete = (id: number) => {
      if (isConfirmingDelete === id) {
        deleteRelationship(id);
        setIsConfirmingDelete(null);
      } else {
        setIsConfirmingDelete(id);
      }
    };

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(amount);
    };

    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Relationships</h2>
              </div>
              <div className="text-sm text-blue-100">
                {relationships.length} {relationships.length === 1 ? 'person' : 'people'} in your network
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
            <RelationshipForm 
              user_id={user_id} 
              editData={editData} 
              onSuccess={() => {
                fetchRelationships(user_id);
                setEditData(null);
              }} 
            />
          </div>

          <div className="overflow-x-auto">
            {relationships.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Occupation</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Income</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {relationships.map((r: Relationship) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{r.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {r.relation}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {r.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {r.occupation || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {r.income ? formatCurrency(r.income) : "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => setEditData(r)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button 
                            onClick={() => handleDelete(r.id)}
                            className={`p-1 rounded-full transition-colors ${
                              isConfirmingDelete === r.id 
                                ? "text-red-600 bg-red-50" 
                                : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 px-4">
                <Users className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No relationships found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding a new relationship above.</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile view for each relationship (visible on small screens) */}
        <div className="mt-4 sm:hidden">
          {relationships.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {relationships.map((r: Relationship) => (
                <div key={r.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{r.name}</h3>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {r.relation}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="text-gray-500">Age</div>
                      <div className="text-gray-900">{r.age}</div>
                      <div className="text-gray-500">Occupation</div>
                      <div className="text-gray-900">{r.occupation || "—"}</div>
                      <div className="text-gray-500">Income</div>
                      <div className="text-gray-900">{r.income ? formatCurrency(r.income) : "—"}</div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button 
                        onClick={() => setEditData(r)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(r.id)}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                          isConfirmingDelete === r.id 
                            ? "text-red-700 bg-red-100 hover:bg-red-200" 
                            : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        {isConfirmingDelete === r.id ? "Confirm" : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default RelationshipTable;          