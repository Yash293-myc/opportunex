import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Opportunity, Category, Interest } from '@/lib/opportunities';

export interface StudentProfile {
  name: string;
  college: string;
  degree: string;
  year: string;
  skills: string[];
  interests: Interest[];
}

interface AppState {
  // Profile
  profile: StudentProfile | null;
  setProfile: (profile: StudentProfile) => void;

  // Saved opportunities
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;

  // Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: Category;
  setActiveCategory: (c: Category) => void;
  activeInterests: Interest[];
  toggleInterest: (i: Interest) => void;
  showRemoteOnly: boolean;
  toggleRemoteOnly: () => void;

  // UI state
  showProfileModal: boolean;
  setShowProfileModal: (v: boolean) => void;
  showSavedDrawer: boolean;
  setShowSavedDrawer: (v: boolean) => void;
  selectedOpportunity: Opportunity | null;
  setSelectedOpportunity: (o: Opportunity | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),

      savedIds: [],
      toggleSave: (id) => {
        const { savedIds } = get();
        set({
          savedIds: savedIds.includes(id)
            ? savedIds.filter(s => s !== id)
            : [...savedIds, id]
        });
      },
      isSaved: (id) => get().savedIds.includes(id),

      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      activeCategory: 'All',
      setActiveCategory: (c) => set({ activeCategory: c }),
      activeInterests: [],
      toggleInterest: (i) => {
        const { activeInterests } = get();
        set({
          activeInterests: activeInterests.includes(i)
            ? activeInterests.filter(x => x !== i)
            : [...activeInterests, i]
        });
      },
      showRemoteOnly: false,
      toggleRemoteOnly: () => set(s => ({ showRemoteOnly: !s.showRemoteOnly })),

      showProfileModal: false,
      setShowProfileModal: (v) => set({ showProfileModal: v }),
      showSavedDrawer: false,
      setShowSavedDrawer: (v) => set({ showSavedDrawer: v }),
      selectedOpportunity: null,
      setSelectedOpportunity: (o) => set({ selectedOpportunity: o }),
    }),
    {
      name: 'student-matcher-store',
      partialize: (state) => ({
        profile: state.profile,
        savedIds: state.savedIds,
      }),
    }
  )
);
