import { create } from "zustand";

type Relationship = {
  id: number;
  user_id: number;
  name: string;
  relation: string;
  age: number;
  occupation: string;
  income: number;
};

type State = {
  relationships: Relationship[];
  fetchRelationships: (user_id: number) => Promise<void>;
  addRelationship: (data: Omit<Relationship, "id">) => Promise<void>;
  updateRelationship: (id: number, data: Omit<Relationship, "id" | "user_id">) => Promise<void>;
  deleteRelationship: (id: number) => Promise<void>;
};

export const useStore = create<State>((set) => ({
  relationships: [],
  

  fetchRelationships: async (user_id) => {
    try {
      if (!user_id || isNaN(user_id)) {
        console.error("Invalid user_id provided:", user_id);
        return;
      }
  
      console.log("Fetching relationships for user:", user_id);
  
      const res = await fetch(`http://localhost:5000/api/relationships/${user_id}`);
      if (!res.ok) throw new Error(`Failed to fetch relationships - Status: ${res.status}`);
  
      const data = await res.json();
      set({ relationships: data });
      console.log("Fetched relationships:", data);
    } catch (error) {
      console.error("Error fetching relationships:", error);
    }
  },
  

  addRelationship: async (data) => {
    try {
      console.log("Adding relationship:", data);
      const res = await fetch("http://localhost:5000/api/relationships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add relationship");
      }

      const newRelationship = await res.json();
      set((state) => ({
        relationships: [...state.relationships, { id: newRelationship.id, ...data }],
      }));

      console.log("Relationship added successfully:", newRelationship);
    } catch (error) {
      console.error("Error adding relationship:", error);
    }
  },

  updateRelationship: async (id, data) => {
    try {
      console.log("Updating relationship:", id, data);
      const res = await fetch(`http://localhost:5000/api/relationships/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update relationship");
      }

      set((state) => ({
        relationships: state.relationships.map((rel) =>
          rel.id === id ? { ...rel, ...data } : rel
        ),
      }));

      console.log("Relationship updated successfully");
    } catch (error) {
      console.error("Error updating relationship:", error);
    }
  },

  deleteRelationship: async (id) => {
    try {
      console.log("Deleting relationship with ID:", id);
      const res = await fetch(`http://localhost:5000/api/relationships/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete relationship");

      set((state) => ({
        relationships: state.relationships.filter((rel) => rel.id !== id),
      }));

      console.log("Relationship deleted successfully");
    } catch (error) {
      console.error("Error deleting relationship:", error);
    }
  },
}));  
