export interface Place {
    name: string;
    coordinates: [number, number]; // [lat, lng]
    description: string;
    type: 'food' | 'sight' | 'nature';
    image_keyword: string;
}

export interface UserPreferences {
    location: string;
    duration: 'half-day' | 'full-day' | '2-days' | '3-days';
    foodPreferences: ('breakfast' | 'lunch' | 'dinner' | 'street-food')[];
    interests: ('historical' | 'nature' | 'museums' | 'hidden-gems' | 'adventure' | 'culture')[];
    pace: 'relaxed' | 'moderate' | 'packed';
    startTime?: string;
    language?: 'en' | 'tr';
}

export type Language = 'en' | 'tr';
