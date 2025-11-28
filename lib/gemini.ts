import { GoogleGenerativeAI } from '@google/generative-ai';
import { Place, UserPreferences } from '@/types';

if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function generateItinerary(preferences: UserPreferences): Promise<Place[]> {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-pro',
        generationConfig: {
            temperature: 0.9,
            topP: 0.95,
            maxOutputTokens: 8192,
        },
    });

    const durationMap = {
        'half-day': '4-5 hours (half day)',
        'full-day': '8-10 hours (full day)',
        '2-days': '2 full days',
        '3-days': '3 full days',
    };

    const paceMap = {
        'relaxed': 'relaxed pace with plenty of rest time',
        'moderate': 'moderate pace with balanced activities',
        'packed': 'packed schedule with maximum activities',
    };

    const prompt = `You are a travel expert specializing in discovering hidden gems and creating personalized itineraries.

**USER REQUEST:**
- Location: ${preferences.location}
- Duration: ${durationMap[preferences.duration]}
- Food Preferences: ${preferences.foodPreferences.join(', ')}
- Interests: ${preferences.interests.join(', ')}
- Pace: ${paceMap[preferences.pace]}

**YOUR TASK:**
Create a detailed, personalized itinerary focusing on UNIQUE, LESSER-KNOWN places in ${preferences.location}. Avoid overly touristy spots. Include local favorites, hidden gems, and authentic experiences.

**IMPORTANT:** Respond in ${preferences.language === 'tr' ? 'TURKISH language (Türkçe)' : 'ENGLISH language'}.

**CRITICAL OUTPUT FORMAT:**
You MUST respond with ONLY a valid JSON array. No markdown, no explanations, no additional text.
Each place must follow this exact structure:

[
  {
    "name": "Exact name of the place",
    "coordinates": [latitude, longitude],
    "description": "Engaging 2-sentence description explaining why this place is special",
    "type": "food" or "sight" or "nature",
    "image_keyword": "specific search term for unsplash (e.g., 'istanbul street food' or 'cappadocia sunrise')"
  }
]

**RULES:**
1. Include ${preferences.foodPreferences.length > 0 ? '3-5 food places' : '1-2 food places'} based on meal preferences
2. Include 5-8 sights/attractions based on interests
3. Coordinates MUST be accurate (use real latitude/longitude for ${preferences.location})
4. Each description should be exactly 2 sentences, engaging and informative
5. image_keyword should be specific and descriptive (include location for better results)
6. Balance the itinerary according to the ${paceMap[preferences.pace]}
7. Order places logically by time of day and geographical proximity
8. ONLY return the JSON array, nothing else

Generate the itinerary now:`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();

        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Parse the JSON
        const places: Place[] = JSON.parse(text);

        // Validate the structure
        if (!Array.isArray(places)) {
            throw new Error('Response is not an array');
        }

        // Validate each place has required fields
        places.forEach((place, index) => {
            if (!place.name || !place.coordinates || !place.description || !place.type || !place.image_keyword) {
                throw new Error(`Place at index ${index} is missing required fields`);
            }
            if (!Array.isArray(place.coordinates) || place.coordinates.length !== 2) {
                throw new Error(`Place at index ${index} has invalid coordinates`);
            }
            if (!['food', 'sight', 'nature'].includes(place.type)) {
                throw new Error(`Place at index ${index} has invalid type: ${place.type}`);
            }
        });

        return places;
    } catch (error) {
        console.error('Error generating itinerary:', error);

        if (error instanceof SyntaxError) {
            throw new Error('AI returned invalid JSON format. Please try again.');
        }

        if (error instanceof Error) {
            throw new Error(`Failed to generate itinerary: ${error.message}`);
        }

        throw new Error('Failed to generate itinerary. Please try again.');
    }
}
