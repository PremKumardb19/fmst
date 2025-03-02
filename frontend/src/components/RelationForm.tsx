// import React from "react";

// const RelationshipForm = ({ form, editIndex, errorMessage, handleInputChange, handleSubmit, handleCancel }:any) => {
//   return (
//     <>
//       {errorMessage && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
//           <p>{errorMessage}</p>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter name"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relation">
//               Relation
//             </label>
//             <select
//               id="relation"
//               name="relation"
//               value={form.relation}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Relation</option>
//               <option value="Father">Father</option>
//               <option value="Mother">Mother</option>
//               <option value="Sibling">Sibling</option>
//               <option value="Spouse">Spouse</option>
//               <option value="Child">Child</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
//               Age
//             </label>
//             <input
//               id="age"
//               type="number"
//               name="age"
//               value={form.age}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter age"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occupation">
//               Occupation
//             </label>
//             <input
//               id="occupation"
//               type="text"
//               name="occupation"
//               value={form.occupation}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter occupation"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="income">
//               Income
//             </label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
//                 $
//               </span>
//               <input
//                 id="income"
//                 type="number"
//                 name="income"
//                 value={form.income}
//                 onChange={handleInputChange}
//                 className="w-full pl-7 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter income"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <button
//             type="submit"
//             className={`px-4 py-2 rounded text-white font-medium ${
//               editIndex !== null ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
//             } transition-colors`}
//           >
//             {editIndex !== null ? "Update Relationship" : "Add Relationship"}
//           </button>
//           {editIndex !== null && (
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="ml-2 px-4 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600 transition-colors"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </>
//   );
// };

// export default RelationshipForm;