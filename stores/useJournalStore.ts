import { create } from 'zustand';
import { storage } from '../utils/storage';

export type MoodType = 'happy' | 'calm' | 'perplexed' | 'jealous' | 'sad' | 'excited' | 'grateful' | 'tired' | 'anxious' | 'confident' | 'loving' | 'bored' | 'frustrated' | 'proud' | 'hopeful' | 'lonely' | 'angry';

export interface JournalEntry {
    id: string;
    text: string;
    mood: MoodType;
    date: string; // ISO string
}

interface JournalState {
    entries: JournalEntry[];
    isLoading: boolean;
    loadEntries: () => Promise<void>;
    addEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => Promise<void>;
    updateEntry: (id: string, entry: Partial<JournalEntry>) => Promise<void>;
    deleteEntry: (id: string) => Promise<void>;
}

const STORAGE_KEY = 'journal_entries';

export const useJournalStore = create<JournalState>((set, get) => ({
    entries: [],
    isLoading: true,

    loadEntries: async () => {
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 500)); // smooth loading visual
        const data = await storage.getItem<JournalEntry[]>(STORAGE_KEY);
        await minLoadTime;
        set({ entries: data || [], isLoading: false });
    },

    addEntry: async (entry) => {
        const newEntry: JournalEntry = {
            ...entry,
            id: Math.random().toString(36).substr(2, 9), // simple ID gen, or use uuid
            date: new Date().toISOString(),
        };

        // Optimistic update
        const updatedEntries = [newEntry, ...get().entries];
        set({ entries: updatedEntries });

        await storage.setItem(STORAGE_KEY, updatedEntries);
    },

    updateEntry: async (id, updatedFields) => {
        const updatedEntries = get().entries.map((e) =>
            e.id === id ? { ...e, ...updatedFields } : e
        );
        set({ entries: updatedEntries });
        await storage.setItem(STORAGE_KEY, updatedEntries);
    },

    deleteEntry: async (id) => {
        const updatedEntries = get().entries.filter((e) => e.id !== id);
        set({ entries: updatedEntries });
        await storage.setItem(STORAGE_KEY, updatedEntries);
    },
}));
