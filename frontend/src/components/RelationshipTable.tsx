// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

// const RelationshipTable = ({ relationships, onEdit, onDelete }:any) => {
//   if (relationships.length === 0) {
//     return (
//       <div className="text-center py-6 bg-gray-50 rounded-lg mt-4">
//         <p className="text-gray-500">No relationships added yet. Add your first one above.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6 overflow-x-auto">
//       <table className="min-w-full bg-white rounded-lg shadow">
//         <thead>
//           <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
//             <th className="py-3 px-4 text-left">Name</th>
//             <th className="py-3 px-4 text-left">Relation</th>
//             <th className="py-3 px-4 text-left">Age</th>
//             <th className="py-3 px-4 text-left">Occupation</th>
//             <th className="py-3 px-4 text-left">Income</th>
//             <th className="py-3 px-4 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600">
//           {relationships.map((relation: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; relation: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; age: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; occupation: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; income: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
//             <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
//               <td className="py-3 px-4">{relation.name}</td>
//               <td className="py-3 px-4">{relation.relation}</td>
//               <td className="py-3 px-4">{relation.age}</td>
//               <td className="py-3 px-4">{relation.occupation}</td>
//               <td className="py-3 px-4">${relation.income}</td>
//               <td className="py-3 px-4 flex space-x-2">
//                 <button
//                   onClick={() => onEdit(index)}
//                   className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(index)}
//                   className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RelationshipTable;