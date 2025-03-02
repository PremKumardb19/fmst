import { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";
import { UserPlus, Save, X } from "lucide-react";

type Props = {
  user_id: number;
  editData?: any;
  onSuccess: () => void;
};

const RelationshipForm = ({ user_id, editData, onSuccess }: Props) => {
  const { addRelationship, updateRelationship } = useStore();
  const [form, setForm] = useState({
    name: "",
    relation: "",
    age: "",
    occupation: "",
    income: "",
  });

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        relation: editData.relation || "",
        age: editData.age ? String(editData.age) : "0",
        occupation: editData.occupation || "",
        income: editData.income ? String(editData.income) : "0",
      });
    } else {
      // Reset form when not editing
      setForm({
        name: "",
        relation: "",
        age: "",
        occupation: "",
        income: "",
      });
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" || name === "income" ? value.replace(/\D/, "") : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert age and income to numbers before sending
    const relationshipData = {
      name: form.name,
      relation: form.relation,
      age: form.age ? Number(form.age) : 0,
      occupation: form.occupation,
      income: form.income ? Number(form.income) : 0,
      user_id,
    };

    if (editData) {
      updateRelationship(editData.id, relationshipData);
    } else {
      addRelationship(relationshipData);
    }

    onSuccess(); // Refresh list after submit
    setForm({ name: "", relation: "", age: "", occupation: "", income: "" }); // Reset form
  };

  const handleCancel = () => {
    setForm({ name: "", relation: "", age: "", occupation: "", income: "" });
    if (editData) {
      onSuccess(); // This will clear editData in parent component
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          {editData ? (
            <>
              <Save className="h-5 w-5 mr-2 text-indigo-500" />
              Edit Relationship
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5 mr-2 text-indigo-500" />
              Add New Relationship
            </>
          )}
        </h3>
        {editData && (
          <p className="mt-1 text-sm text-gray-500">
            Editing information for {editData.name}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                         bg-white border px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="relation" className="block text-sm font-medium text-gray-700">
              Relation
            </label>
            <input
              id="relation"
              name="relation"
              type="text"
              placeholder="e.g. Friend, Family, Colleague"
              value={form.relation}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                         bg-white border px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="text"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              inputMode="numeric"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                         bg-white border px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <input
              id="occupation"
              name="occupation"
              type="text"
              placeholder="Occupation (optional)"
              value={form.occupation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                         bg-white border px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label htmlFor="income" className="block text-sm font-medium text-gray-700">
              Income
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Annual income (optional)"
                value={form.income}
                onChange={handleChange}
                inputMode="numeric"
                className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                           bg-white border px-3 py-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <X className="h-4 w-4 mr-1.5" />
            Clear
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editData ? (
              <>
                <Save className="h-4 w-4 mr-1.5" />
                Update
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-1.5" />
                Add Person
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RelationshipForm;