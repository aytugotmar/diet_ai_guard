import { NextRequest, NextResponse } from 'next/server';
import { generateWithGemini } from '@/lib/gemini';
import type { ItineraryRequest, Itinerary } from '@/types/itinerary';

// Mock data for when API key is not available
const getMockItinerary = (request: ItineraryRequest): Itinerary => {
    const { destination, startDate, endDate, budget, vibe, weatherAdjustment } = request;

    return {
        destination,
        startDate,
        endDate,
        budget,
        vibe,
        totalBudget: budget,
        hiddenGems: 3,
        travelTips: [
            "Always carry a reusable water bottle",
            "Download offline maps before you go",
            "Try local street food for authentic experiences"
        ],
        days: [
            {
                day: 1,
                date: startDate,
                theme: weatherAdjustment ? "Indoor Exploration Day" : "City Discovery",
                totalEstimatedCost: "$150",
                activities: {
                    morning: [
                        {
                            time: "08:00",
                            title: "Breakfast at Local Café",
                            description: "Start your day with traditional pastries and coffee",
                            location: "Old Town Café District",
                            estimatedCost: "$15",
                            type: "breakfast"
                        },
                        {
                            time: "09:30",
                            title: weatherAdjustment ? "Visit Indoor Museum" : "Walking Tour",
                            description: weatherAdjustment
                                ? "Explore the local history museum to escape the rain"
                                : "Explore the historic center with a local guide",
                            location: "City Center",
                            estimatedCost: "$25",
                            type: "activity"
                        }
                    ],
                    afternoon: [
                        {
                            time: "12:30",
                            title: "Lunch at Hidden Gem",
                            description: "Family-run restaurant known only to locals",
                            location: "Secret Alley, District 5",
                            estimatedCost: "$30",
                            type: "lunch",
                            hiddenGem: true
                        },
                        {
                            time: "14:00",
                            title: vibe === 'adventure' ? "Rock Climbing Experience" : "Art Gallery Visit",
                            description: vibe === 'adventure'
                                ? "Try indoor climbing with stunning city views"
                                : "Contemporary art from local artists",
                            location: "Adventure Zone / Art District",
                            estimatedCost: "$40",
                            type: "activity"
                        }
                    ],
                    evening: [
                        {
                            time: "18:00",
                            title: "Sunset at Viewpoint",
                            description: "Watch the city lights come alive",
                            location: "Hidden Viewpoint Hill",
                            estimatedCost: "$0",
                            type: "hidden-gem",
                            hiddenGem: true
                        },
                        {
                            time: "19:30",
                            title: "Dinner with Locals",
                            description: vibe === 'foodie'
                                ? "Multi-course tasting menu at chef's table"
                                : "Traditional dinner in authentic setting",
                            location: "Local Quarter",
                            estimatedCost: "$40",
                            type: "dinner"
                        }
                    ]
                }
            }
        ]
    };
};

export async function POST(request: NextRequest) {
    try {
        const body: ItineraryRequest = await request.json();
        const { destination, startDate, endDate, budget, vibe, language, weatherAdjustment } = body;

        // Validate input
        if (!destination || !startDate || !endDate || !budget || !vibe) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Calculate number of days
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        // Vibe descriptions for the AI
        const vibeDescriptions = {
            'chill': language === 'tr'
                ? 'Rahat ve huzurlu aktiviteler, yavaş tempolu keşif, spa ve rahatlama'
                : 'Relaxed and peaceful activities, slow-paced exploration, spa and wellness',
            'adventure': language === 'tr'
                ? 'Adrenalin dolu aktiviteler, outdoor spor, heyecan verici deneyimler'
                : 'Adrenaline-pumping activities, outdoor sports, thrilling experiences',
            'foodie': language === 'tr'
                ? 'Gastronomi turları, yerel yemekler, mutfak deneyimleri, gizli restoranlar'
                : 'Culinary tours, local cuisine, cooking experiences, hidden restaurants',
            'local-secret': language === 'tr'
                ? 'Turistik olmayan yerler, yerel halkın gittiği mekanlar, otantik deneyimler'
                : 'Non-touristy spots, places where locals go, authentic experiences'
        };

        const weatherNote = weatherAdjustment
            ? (language === 'tr'
                ? '\n\n⚠️ ÖNEMLI: Yağmurlu hava bekleniyor. Lütfen kapalı alan aktivitelerine öncelik ver, müze, kapalı pazar, alışveriş merkezi, kafelerde uzun vakit geçirme gibi alternatifleri öner.'
                : '\n\n⚠️ IMPORTANT: Rainy weather expected. Please prioritize indoor activities, suggest alternatives like museums, indoor markets, shopping centers, spending time in cafes.')
            : '';

        // Construct the prompt for Gemini
        const prompt = language === 'tr' ? `
Sen profesyonel bir seyahat planlama asistanısın. ${destination} için ${days} günlük detaylı bir seyahat planı oluştur.

**Kullanıcı Bilgileri:**
- Destinasyon: ${destination}
- Başlangıç: ${startDate}
- Bitiş: ${endDate}
- Bütçe: ${budget}
- Vibe/Ruh Hali: ${vibe} (${vibeDescriptions[vibe]})
${weatherNote}

**ÖNEMLI TALİMATLAR:**
1. Sadece geçerli JSON formatında yanıt ver - başka metin ekleme
2. Kullanıcının "${vibe}" ruh haline göre öneriler sun
3. En az 3 "Hidden Gem" (gizli hazine - turistik olmayan, yerel halkın bildiği yerler) ekle
4. Her günü Morning (Sabah), Afternoon (Öğleden Sonra), Evening (Akşam) olarak yapılandır
5. Her aktivite için konum, maliyet tahmini ve detaylı açıklama ekle
6. Maliyetleri gerçekçi tut ve toplam bütçeye uy

**JSON Yapısı (Bu yapıya tam uygun şekilde doldur):**
{
  "destination": "${destination}",
  "startDate": "${startDate}",
  "endDate": "${endDate}",
  "budget": "${budget}",
  "vibe": "${vibe}",
  "totalBudget": "tahmini toplam maliyet",
  "hiddenGems": gizli_hazine_sayısı,
  "travelTips": ["ipucu 1", "ipucu 2", "ipucu 3"],
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "theme": "Günün teması",
      "totalEstimatedCost": "$XXX",
      "activities": {
        "morning": [
          {
            "time": "08:00",
            "title": "Aktivite başlığı",
            "description": "Detaylı açıklama",
            "location": "Konum bilgisi",
            "estimatedCost": "$XX",
            "type": "breakfast|lunch|dinner|activity|hidden-gem|transport",
            "hiddenGem": true (sadece gizli hazineler için)
          }
        ],
        "afternoon": [...],
        "evening": [...]
      }
    }
  ]
}

Sadece JSON yanıtını ver, başka açıklama ekleme.
` : `
You are a professional travel planning assistant. Create a detailed ${days}-day itinerary for ${destination}.

**User Information:**
- Destination: ${destination}
- Start Date: ${startDate}
- End Date: ${endDate}
- Budget: ${budget}
- Vibe/Mood: ${vibe} (${vibeDescriptions[vibe]})
${weatherNote}

**CRITICAL INSTRUCTIONS:**
1. Return ONLY valid JSON format - no additional text
2. Tailor suggestions to the user's "${vibe}" vibe
3. Include at least 3 "Hidden Gems" (non-touristy spots, places locals know)
4. Structure each day as Morning, Afternoon, Evening
5. Include location, cost estimate, and detailed description for each activity
6. Keep costs realistic and within total budget

**JSON Structure (Fill this structure exactly):**
{
  "destination": "${destination}",
  "startDate": "${startDate}",
  "endDate": "${endDate}",
  "budget": "${budget}",
  "vibe": "${vibe}",
  "totalBudget": "estimated total cost",
  "hiddenGems": number_of_hidden_gems,
  "travelTips": ["tip 1", "tip 2", "tip 3"],
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "theme": "Day's theme",
      "totalEstimatedCost": "$XXX",
      "activities": {
        "morning": [
          {
            "time": "08:00",
            "title": "Activity title",
            "description": "Detailed description",
            "location": "Location info",
            "estimatedCost": "$XX",
            "type": "breakfast|lunch|dinner|activity|hidden-gem|transport",
            "hiddenGem": true (only for hidden gems)
          }
        ],
        "afternoon": [...],
        "evening": [...]
      }
    }
  ]
}

Return ONLY the JSON response, no other explanation.
`;

        let itinerary: Itinerary;

        try {
            // Try to generate with Gemini
            const response = await generateWithGemini(prompt);

            // Extract JSON from response (remove markdown code blocks if present)
            let jsonText = response.trim();
            if (jsonText.startsWith('```json')) {
                jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            } else if (jsonText.startsWith('```')) {
                jsonText = jsonText.replace(/```\n?/g, '');
            }

            itinerary = JSON.parse(jsonText);
        } catch (error) {
            console.error('Error generating with Gemini, using mock data:', error);
            // Fallback to mock data if Gemini fails
            itinerary = getMockItinerary(body);
        }

        return NextResponse.json(itinerary);

    } catch (error) {
        console.error('Error in generate route:', error);
        return NextResponse.json(
            { error: 'Failed to generate itinerary' },
            { status: 500 }
        );
    }
}
