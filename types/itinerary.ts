export interface Activity {
    time: string;
    title: string;
    description: string;
    location: string;
    estimatedCost: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'activity' | 'hidden-gem' | 'transport';
    hiddenGem?: boolean;
}

export interface TimeBlock {
    morning: Activity[];
    afternoon: Activity[];
    evening: Activity[];
}

export interface DayItinerary {
    day: number;
    date: string;
    theme: string;
    activities: TimeBlock;
    totalEstimatedCost: string;
}

export interface Itinerary {
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    vibe: string;
    days: DayItinerary[];
    totalBudget: string;
    hiddenGems: number;
    travelTips: string[];
}

export type Vibe = 'chill' | 'adventure' | 'foodie' | 'local-secret';

export interface ItineraryRequest {
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    vibe: Vibe;
    language: 'en' | 'tr';
    weatherAdjustment?: boolean;
}
