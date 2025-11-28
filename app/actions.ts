'use server';

import { generateItinerary } from '@/lib/gemini';
import { UserPreferences } from '@/types';

export async function generateItineraryAction(preferences: UserPreferences) {
    try {
        const places = await generateItinerary(preferences);
        return { success: true, places };
    } catch (error) {
        console.error('Server action error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate itinerary'
        };
    }
}
