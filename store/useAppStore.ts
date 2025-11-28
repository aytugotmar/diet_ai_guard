import { create } from 'zustand';
import { Place, UserPreferences, Language } from '@/types';

interface AppState {
    // Language & Theme
    language: Language;
    setLanguage: (lang: Language) => void;

    // User Input
    preferences: UserPreferences;
    updatePreferences: (prefs: Partial<UserPreferences>) => void;

    // Generated Itinerary
    places: Place[];
    setPlaces: (places: Place[]) => void;

    // UI State
    selectedPlaceIndex: number | null;
    setSelectedPlaceIndex: (index: number | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const defaultPreferences: UserPreferences = {
    location: '',
    duration: 'full-day',
    foodPreferences: [],
    interests: [],
    pace: 'moderate',
    startTime: '09:00',
};

// Get saved language from localStorage or default to 'tr'
const getSavedLanguage = (): Language => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('app-language');
        return (saved === 'en' || saved === 'tr') ? saved : 'tr';
    }
    return 'tr';
};

// Get saved preferences from localStorage
const getSavedPreferences = (): UserPreferences => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('app-preferences');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return defaultPreferences;
            }
        }
    }
    return defaultPreferences;
};

export const useAppStore = create<AppState>((set) => ({
    // Language & Theme
    language: getSavedLanguage(),
    setLanguage: (lang) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('app-language', lang);
        }
        set({ language: lang });
    },

    // User Input
    preferences: getSavedPreferences(),
    updatePreferences: (prefs) =>
        set((state) => {
            const newPreferences = { ...state.preferences, ...prefs };
            if (typeof window !== 'undefined') {
                localStorage.setItem('app-preferences', JSON.stringify(newPreferences));
            }
            return { preferences: newPreferences };
        }),

    // Generated Itinerary
    places: [],
    setPlaces: (places) => set({ places }),

    // UI State
    selectedPlaceIndex: null,
    setSelectedPlaceIndex: (index) => set({ selectedPlaceIndex: index }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
}));
