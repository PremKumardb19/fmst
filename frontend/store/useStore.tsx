import { create } from "zustand";
import axios from "axios";

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
      const res = await axios.get(`http://localhost:5000/api/relationships/${user_id}`);

      set({ relationships: res.data });
      console.log("Fetched relationships:", res.data);
    } catch (error) {
      console.error("Error fetching relationships:", error);
    }
  },

  addRelationship: async (data) => {
    try {
      console.log("Adding relationship:", data);
      const res = await axios.post("http://localhost:5000/api/relationships", data, {
        headers: { "Content-Type": "application/json" },
      });

      const newRelationship = res.data;
      set((state) => {
        const updatedRelationships = [...state.relationships, { id: newRelationship.id, ...data }];
        console.log("Updated relationships after add:", updatedRelationships);
        return { relationships: updatedRelationships };
      });
    } catch (error) {
      console.error("Error adding relationship:", error);
    }
  },

  updateRelationship: async (id, data) => {
    try {
      console.log("Updating relationship:", id, data);
      const res = await axios.put(`http://localhost:5000/api/relationships/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
  
      const updatedRelationship = res.data;
      
      set((state) => {
        const updatedRelationships = state.relationships.map((rel) =>
          rel.id === id ? { ...rel, ...data, ...updatedRelationship } : rel
        );
        console.log("Updated relationships after update:", updatedRelationships);
        return { relationships: updatedRelationships };
            });
  
    } catch (error) {
      console.error("Error updating relationship:", error);
    }
  },
  

  deleteRelationship: async (id) => {
    try {
      console.log("Deleting relationship with ID:", id);
      await axios.delete(`http://localhost:5000/api/relationships/${id}`);

      set((state) => {
        const updatedRelationships = state.relationships.filter((rel) => rel.id !== id);
        console.log("Updated relationships after delete:", updatedRelationships);
        return { relationships: updatedRelationships };
      });
    } catch (error) {
      console.error("Error deleting relationship:", error);
    }
  },
}));
