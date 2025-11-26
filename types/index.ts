export type DietaryRestriction = {
    id: string;
    label: string;
    icon: string;
    category: 'allergies' | 'dietary' | 'health' | 'religious';
};

export const dietaryRestrictions: DietaryRestriction[] = [
    // Allergies
    { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾', category: 'allergies' },
    { id: 'lactose-free', label: 'Lactose-Free', icon: '🥛', category: 'allergies' },
    { id: 'nut-allergy', label: 'Nut Allergy', icon: '🥜', category: 'allergies' },
    { id: 'egg-allergy', label: 'Egg Allergy', icon: '🥚', category: 'allergies' },
    { id: 'soy-allergy', label: 'Soy Allergy', icon: '🫘', category: 'allergies' },
    { id: 'fish-allergy', label: 'Fish Allergy', icon: '🐟', category: 'allergies' },
    { id: 'shellfish-allergy', label: 'Shellfish Allergy', icon: '🦐', category: 'allergies' },
    { id: 'sesame-allergy', label: 'Sesame Allergy', icon: '🌰', category: 'allergies' },

    // Dietary Preferences
    { id: 'vegan', label: 'Vegan', icon: '🌱', category: 'dietary' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥗', category: 'dietary' },
    { id: 'keto', label: 'Keto', icon: '🥑', category: 'dietary' },
    { id: 'paleo', label: 'Paleo', icon: '🍖', category: 'dietary' },

    // Health
    { id: 'no-sugar', label: 'Sugar-Free', icon: '🍬', category: 'health' },
    { id: 'low-carb', label: 'Low Carb', icon: '🌾', category: 'health' },
    { id: 'low-sodium', label: 'Low Sodium', icon: '🧂', category: 'health' },

    // Religious
    { id: 'halal', label: 'Halal', icon: '☪️', category: 'religious' },
    { id: 'kosher', label: 'Kosher', icon: '✡️', category: 'religious' },
    { id: 'no-alcohol', label: 'Alcohol-Free', icon: '🍷', category: 'religious' },
];

export interface AnalysisResult {
    status: 'safe' | 'unsafe' | 'caution';
    reason: string;
}

export interface AnalysisResponse {
    success: boolean;
    result?: AnalysisResult;
    error?: string;
}

export interface AnalysisHistory {
    id: string;
    timestamp: number;
    result: AnalysisResult;
    restrictions: string[];
}
