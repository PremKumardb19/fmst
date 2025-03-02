// import RelationshipTable from "./RelationshipTable";
// import RelationshipForm from "./RelationForm";
// import { SetStateAction, useState } from "react";

// const RelationshipPage = () => {
//   const [relationships, setRelationships] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     relation: "",
//     age: "",
//     occupation: "",
//     income: "",
//   });
//   const [editIndex, setEditIndex] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     if (!form.name || !form.relation || !form.age || !form.occupation || !form.income) {
//       setErrorMessage("All fields are required.");
//       return;
//     }
//     setErrorMessage("");

//     let updatedRelationships;
//     if (editIndex !== null) {
//       updatedRelationships = [...relationships];
//       updatedRelationships[editIndex] = form;
//       setEditIndex(null);
//     } else {
//       updatedRelationships = [...relationships, form];
//     }

//     setRelationships(updatedRelationships);
//     setForm({ name: "", relation: "", age: "", occupation: "", income: "" });
//   };

//   const handleEdit = (index: string | number | SetStateAction<null>) => {
//     setForm(relationships[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index: number) => {
//     setRelationships(relationships.filter((_, i) => i !== index));
//   };

//   const handleCancel = () => {
//     setEditIndex(null);
//     setForm({ name: "", relation: "", age: "", occupation: "", income: "" });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Relationship Form</h1>
        
//         <RelationshipForm
//           form={form}
//           editIndex={editIndex}
//           errorMessage={errorMessage}
//           handleInputChange={handleInputChange}
//           handleSubmit={handleSubmit}
//           handleCancel={handleCancel}
//         />
        
//         <RelationshipTable 
//           relationships={relationships} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete} 
//         />
//       </div>
//     </div>
//   );
// };

// export default RelationshipPage;