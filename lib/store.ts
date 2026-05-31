import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language, UserRole, Priority, ResourceNote, ChatMessage, TabType } from "./types";

interface AppState {
  // Onboarding
  hasOnboarded: boolean;
  setHasOnboarded: (value: boolean) => void;

  // Language
  activeLanguage: Language;
  setActiveLanguage: (lang: Language) => void;

  // User profile
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
  priorities: Priority[];
  setPriorities: (priorities: Priority[]) => void;
  togglePriority: (priority: Priority) => void;

  // Bookmarks
  bookmarkedResources: string[];
  toggleBookmark: (resourceId: string) => void;

  // Resource notes
  resourceNotes: Record<string, ResourceNote>;
  setResourceNote: (resourceId: string, note: string) => void;
  toggleResourceComplete: (resourceId: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearChat: () => void;

  // Navigation
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  // Emergency modal
  showEmergency: boolean;
  setShowEmergency: (show: boolean) => void;

  // Active category filter
  activeCategory: UserRole | "all";
  setActiveCategory: (category: UserRole | "all") => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Onboarding
      hasOnboarded: false,
      setHasOnboarded: (value) => set({ hasOnboarded: value }),

      // Language
      activeLanguage: "en",
      setActiveLanguage: (lang) => set({ activeLanguage: lang }),

      // User profile
      selectedRole: null,
      setSelectedRole: (role) => set({ selectedRole: role }),
      priorities: [],
      setPriorities: (priorities) => set({ priorities }),
      togglePriority: (priority) =>
        set((state) => ({
          priorities: state.priorities.includes(priority)
            ? state.priorities.filter((p) => p !== priority)
            : [...state.priorities, priority],
        })),

      // Bookmarks
      bookmarkedResources: [],
      toggleBookmark: (resourceId) =>
        set((state) => ({
          bookmarkedResources: state.bookmarkedResources.includes(resourceId)
            ? state.bookmarkedResources.filter((id) => id !== resourceId)
            : [...state.bookmarkedResources, resourceId],
        })),

      // Resource notes
      resourceNotes: {},
      setResourceNote: (resourceId, note) =>
        set((state) => ({
          resourceNotes: {
            ...state.resourceNotes,
            [resourceId]: {
              ...state.resourceNotes[resourceId],
              note,
              completed: state.resourceNotes[resourceId]?.completed ?? false,
            },
          },
        })),
      toggleResourceComplete: (resourceId) =>
        set((state) => ({
          resourceNotes: {
            ...state.resourceNotes,
            [resourceId]: {
              note: state.resourceNotes[resourceId]?.note ?? "",
              completed: !state.resourceNotes[resourceId]?.completed,
            },
          },
        })),

      // Chat
      chatMessages: [],
      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            {
              ...message,
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
        })),
      clearChat: () => set({ chatMessages: [] }),

      // Navigation
      activeTab: "home",
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Emergency modal
      showEmergency: false,
      setShowEmergency: (show) => set({ showEmergency: show }),

      // Active category filter
      activeCategory: "all",
      setActiveCategory: (category) => set({ activeCategory: category }),

      // Search
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "calgary-connect-storage",
      partialize: (state) => ({
        hasOnboarded: state.hasOnboarded,
        activeLanguage: state.activeLanguage,
        selectedRole: state.selectedRole,
        priorities: state.priorities,
        bookmarkedResources: state.bookmarkedResources,
        resourceNotes: state.resourceNotes,
      }),
    }
  )
);
