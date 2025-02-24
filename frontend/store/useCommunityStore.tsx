import { create } from "zustand";
import axios from "axios";

interface CommunityStore {
  community: { id: number; name: string }[];
  fetchCommunity: () => Promise<void>;
  rehydrateState: () => void;
}

const useCommunityStore = create<CommunityStore>((set) => {
  const rehydrateState = () => {
    const storedCommunity = localStorage.getItem("community");
    set({ community: storedCommunity ? JSON.parse(storedCommunity) : [] });
  };

  return {
    community: [], // ✅ Fixed: Use 'community' instead of 'religions'
    fetchCommunity: async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/community");
        const community = response.data || [];

        // ✅ Fixed: Store fetched data in localStorage under the correct key
        localStorage.setItem("community", JSON.stringify(community));
        set({ community });
      } catch (error) {
        console.error("Error fetching community:", error);
      }
    },
    rehydrateState,
  };
});

// ** Call `rehydrateState()` before first render **
useCommunityStore.getState().rehydrateState();

export default useCommunityStore;
