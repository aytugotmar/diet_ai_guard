// Demo itinerary for testing without API calls
import type { Itinerary } from '@/types/itinerary';

export const demoItinerary: Itinerary = {
    destination: "Tokyo, Japan",
    startDate: "2024-12-01",
    endDate: "2024-12-05",
    budget: "$3000",
    vibe: "adventure",
    totalBudget: "$2850",
    hiddenGems: 5,
    travelTips: [
        "Purchase a Suica or Pasmo card for convenient public transportation",
        "Many restaurants display plastic food models - point if you can't read Japanese",
        "Convenience stores (konbini) have amazing fresh food and are everywhere",
        "Remove shoes when entering traditional restaurants and temples",
        "Cash is still king - many places don't accept cards"
    ],
    days: [
        {
            day: 1,
            date: "2024-12-01",
            theme: "Tokyo Arrival & Shibuya Exploration",
            totalEstimatedCost: "$180",
            activities: {
                morning: [
                    {
                        time: "08:00",
                        title: "Breakfast at Tsukiji Outer Market",
                        description: "Start with fresh sushi and traditional Japanese breakfast at one of the oldest fish markets",
                        location: "Tsukiji Outer Market, Chuo",
                        estimatedCost: "$25",
                        type: "breakfast"
                    },
                    {
                        time: "10:00",
                        title: "Senso-ji Temple",
                        description: "Tokyo's oldest temple with stunning architecture and traditional shops on Nakamise Street",
                        location: "Asakusa, Taito",
                        estimatedCost: "$0",
                        type: "activity"
                    }
                ],
                afternoon: [
                    {
                        time: "12:30",
                        title: "Ramen at Hidden Alley Shop",
                        description: "Authentic tonkotsu ramen in a tiny 8-seat shop known only to locals",
                        location: "Golden Gai Back Alley, Shinjuku",
                        estimatedCost: "$12",
                        type: "lunch",
                        hiddenGem: true
                    },
                    {
                        time: "14:00",
                        title: "TeamLab Borderless",
                        description: "Mind-blowing digital art museum with interactive installations",
                        location: "Azabudai Hills, Minato",
                        estimatedCost: "$35",
                        type: "activity"
                    },
                    {
                        time: "16:30",
                        title: "Shibuya Sky",
                        description: "Rooftop observation deck with 360° views of Tokyo from 229m high",
                        location: "Shibuya Scramble Square",
                        estimatedCost: "$20",
                        type: "activity"
                    }
                ],
                evening: [
                    {
                        time: "18:00",
                        title: "Shibuya Crossing Experience",
                        description: "The world's busiest pedestrian crossing - pure Tokyo energy",
                        location: "Shibuya Station",
                        estimatedCost: "$0",
                        type: "activity"
                    },
                    {
                        time: "19:00",
                        title: "Izakaya Dinner",
                        description: "Traditional Japanese pub with small plates, sake, and local atmosphere",
                        location: "Nonbei Yokocho, Shibuya",
                        estimatedCost: "$45",
                        type: "dinner",
                        hiddenGem: true
                    },
                    {
                        time: "21:00",
                        title: "Karaoke Night",
                        description: "Private karaoke room experience - quintessential Tokyo nightlife",
                        location: "Karaoke Kan, Shibuya",
                        estimatedCost: "$30",
                        type: "activity"
                    }
                ]
            }
        },
        {
            day: 2,
            date: "2024-12-02",
            theme: "Harajuku & Shinjuku Adventure",
            totalEstimatedCost: "$220",
            activities: {
                morning: [
                    {
                        time: "07:00",
                        title: "Meiji Shrine Walk",
                        description: "Peaceful forest walk to Tokyo's most important Shinto shrine",
                        location: "Meiji Jingu, Shibuya",
                        estimatedCost: "$0",
                        type: "activity"
                    },
                    {
                        time: "09:00",
                        title: "Harajuku Breakfast",
                        description: "Fluffy Japanese pancakes at a trendy cafe",
                        location: "Takeshita Street, Harajuku",
                        estimatedCost: "$18",
                        type: "breakfast"
                    }
                ],
                afternoon: [
                    {
                        time: "11:00",
                        title: "Takeshita Street Shopping",
                        description: "Colorful street full of quirky fashion, crepes, and pop culture",
                        location: "Harajuku, Shibuya",
                        estimatedCost: "$50",
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        title: "Secret Garden Cafe",
                        description: "Hidden rooftop garden cafe with homemade organic lunch",
                        location: "Omotesando Hills 3F, Shibuya",
                        estimatedCost: "$28",
                        type: "lunch",
                        hiddenGem: true
                    },
                    {
                        time: "15:00",
                        title: "Tokyo Metropolitan Building Observatory",
                        description: "FREE observation deck with incredible city views from 202m",
                        location: "Shinjuku",
                        estimatedCost: "$0",
                        type: "activity"
                    }
                ],
                evening: [
                    {
                        time: "17:30",
                        title: "Golden Gai Exploration",
                        description: "Maze of tiny bars in historic district - each bar seats 5-10 people",
                        location: "Golden Gai, Shinjuku",
                        estimatedCost: "$0",
                        type: "hidden-gem",
                        hiddenGem: true
                    },
                    {
                        time: "19:00",
                        title: "Yakiniku BBQ Dinner",
                        description: "Grill premium Japanese beef at your table",
                        location: "Kabukicho, Shinjuku",
                        estimatedCost: "$65",
                        type: "dinner"
                    },
                    {
                        time: "21:00",
                        title: "Robot Restaurant Show",
                        description: "Absolutely insane neon robot performance - uniquely Tokyo",
                        location: "Kabukicho, Shinjuku",
                        estimatedCost: "$60",
                        type: "activity"
                    }
                ]
            }
        },
        {
            day: 3,
            date: "2024-12-03",
            theme: "Akihabara & Imperial Palace",
            totalEstimatedCost: "$195",
            activities: {
                morning: [
                    {
                        time: "08:30",
                        title: "Imperial Palace Gardens",
                        description: "Stroll through beautiful gardens around the Emperor's residence",
                        location: "Chiyoda",
                        estimatedCost: "$0",
                        type: "activity"
                    },
                    {
                        time: "10:30",
                        title: "Traditional Tea Ceremony",
                        description: "Authentic matcha tea ceremony in historic tea house",
                        location: "Hama-rikyu Gardens",
                        estimatedCost: "$35",
                        type: "activity"
                    }
                ],
                afternoon: [
                    {
                        time: "12:30",
                        title: "Conveyor Belt Sushi",
                        description: "Fun and fresh sushi on a rotating belt - order via tablet",
                        location: "Ginza",
                        estimatedCost: "$30",
                        type: "lunch"
                    },
                    {
                        time: "14:30",
                        title: "Akihabara Electric Town",
                        description: "Anime, manga, electronics, and gaming paradise",
                        location: "Akihabara, Chiyoda",
                        estimatedCost: "$40",
                        type: "activity"
                    },
                    {
                        time: "16:30",
                        title: "Maid Cafe Experience",
                        description: "Unique Japanese pop culture - servers in maid costumes with songs",
                        location: "Akihabara",
                        estimatedCost: "$25",
                        type: "activity"
                    }
                ],
                evening: [
                    {
                        time: "18:00",
                        title: "Retro Game Bar",
                        description: "Hidden bar filled with 80s/90s arcade games and cocktails",
                        location: "Akihabara Backstreet",
                        estimatedCost: "$20",
                        type: "hidden-gem",
                        hiddenGem: true
                    },
                    {
                        time: "19:30",
                        title: "Tempura Dinner",
                        description: "Watch chefs prepare crispy tempura at counter seating",
                        location: "Kanda, Chiyoda",
                        estimatedCost: "$45",
                        type: "dinner"
                    }
                ]
            }
        },
        {
            day: 4,
            date: "2024-12-04",
            theme: "Day Trip to Nikko",
            totalEstimatedCost: "$250",
            activities: {
                morning: [
                    {
                        time: "07:00",
                        title: "Train to Nikko",
                        description: "2-hour scenic train ride to mountain town with UNESCO sites",
                        location: "Tobu Nikko Line",
                        estimatedCost: "$25",
                        type: "transport"
                    },
                    {
                        time: "09:30",
                        title: "Toshogu Shrine",
                        description: "Elaborate shrine with gold leaf and ornate carvings",
                        location: "Nikko, Tochigi",
                        estimatedCost: "$15",
                        type: "activity"
                    }
                ],
                afternoon: [
                    {
                        time: "12:00",
                        title: "Yuba Lunch",
                        description: "Local tofu skin specialty unique to Nikko region",
                        location: "Nikko Town Center",
                        estimatedCost: "$22",
                        type: "lunch"
                    },
                    {
                        time: "14:00",
                        title: "Lake Chuzenji",
                        description: "Stunning mountain lake formed by volcanic eruption",
                        location: "Nikko National Park",
                        estimatedCost: "$0",
                        type: "activity"
                    },
                    {
                        time: "16:00",
                        title: "Kegon Falls",
                        description: "97-meter waterfall with observation platform",
                        location: "Nikko National Park",
                        estimatedCost: "$5",
                        type: "activity"
                    }
                ],
                evening: [
                    {
                        time: "18:00",
                        title: "Return Train",
                        description: "Train back to Tokyo",
                        location: "Tobu Nikko Line",
                        estimatedCost: "$25",
                        type: "transport"
                    },
                    {
                        time: "20:30",
                        title: "Late Ramen Dinner",
                        description: "Warm up with a hearty bowl after mountain adventure",
                        location: "Tokyo Station",
                        estimatedCost: "$14",
                        type: "dinner"
                    }
                ]
            }
        },
        {
            day: 5,
            date: "2024-12-05",
            theme: "Odaiba & Departure",
            totalEstimatedCost: "$150",
            activities: {
                morning: [
                    {
                        time: "08:00",
                        title: "Tsukiji Breakfast Redux",
                        description: "One last fresh sushi breakfast before departure",
                        location: "Tsukiji Outer Market",
                        estimatedCost: "$30",
                        type: "breakfast"
                    },
                    {
                        time: "10:00",
                        title: "Odaiba Shopping",
                        description: "Futuristic waterfront area with malls and attractions",
                        location: "Odaiba, Minato",
                        estimatedCost: "$50",
                        type: "activity"
                    }
                ],
                afternoon: [
                    {
                        time: "12:00",
                        title: "Ramen Museum",
                        description: "Underground recreation of 1950s Tokyo with 9 ramen shops",
                        location: "Shin-Yokohama",
                        estimatedCost: "$20",
                        type: "lunch"
                    },
                    {
                        time: "14:00",
                        title: "TeamLab Planets",
                        description: "Walk through water and flowers in this immersive art space",
                        location: "Toyosu, Koto",
                        estimatedCost: "$35",
                        type: "activity"
                    }
                ],
                evening: [
                    {
                        time: "16:30",
                        title: "Tokyo Station Shopping",
                        description: "Last-minute gifts and souvenirs in underground mall",
                        location: "Tokyo Station, Chiyoda",
                        estimatedCost: "$15",
                        type: "activity"
                    }
                ]
            }
        }
    ]
};

// Quick test destinations
export const testDestinations = [
    "Paris, France",
    "Tokyo, Japan",
    "Istanbul, Turkey",
    "New York City, USA",
    "Bali, Indonesia",
    "Barcelona, Spain",
    "Bangkok, Thailand",
    "Rome, Italy"
];

// Sample budgets
export const sampleBudgets = [
    "$500",
    "$1000",
    "$1500",
    "$2000",
    "$3000",
    "$5000"
];
