# 🏗️ Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE (Next.js)                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Header (Theme + Language Toggle)                      │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌──────────────────┐  ┌─────────────────────────────────┐ │
│  │  InputForm       │  │     ResultsPanel                 │ │
│  │  ├─ Location     │  │  ┌──────────┐  ┌──────────────┐ │ │
│  │  ├─ Duration     │  │  │   Map    │  │  Timeline    │ │ │
│  │  ├─ Food Prefs   │  │  │ (Leaflet)│  │   Cards      │ │ │
│  │  ├─ Interests    │  │  │          │  │              │ │ │
│  │  └─ Pace         │  │  └────┬─────┘  └──────┬───────┘ │ │
│  │       │          │  │       │                │         │ │
│  │       ▼          │  │       └────────┬───────┘         │ │
│  │  [Generate]      │  │           Synchronized          │ │
│  └────────┬─────────┘  └─────────────────────────────────┘ │
│           │                                                  │
└───────────┼──────────────────────────────────────────────────┘
            │
            ▼
┌───────────────────────────────────────────────────────────┐
│              SERVER ACTION (app/actions.ts)               │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  async function generateItineraryAction()           │ │
│  │    ├─ Validate user preferences                     │ │
│  │    ├─ Call Gemini API                               │ │
│  │    └─ Return JSON result or error                   │ │
│  └──────────────────────┬──────────────────────────────┘ │
└─────────────────────────┼────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│           GEMINI AI SERVICE (lib/gemini.ts)               │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Prompt Engineering:                                │ │
│  │  "You MUST return ONLY a valid JSON array..."       │ │
│  │                                                     │ │
│  │  Enforces structure:                                │ │
│  │  [{                                                 │ │
│  │    name: string,                                    │ │
│  │    coordinates: [lat, lng],                         │ │
│  │    description: string,                             │ │
│  │    type: "food"|"sight"|"nature",                   │ │
│  │    image_keyword: string                            │ │
│  │  }]                                                 │ │
│  └──────────────────────┬──────────────────────────────┘ │
└─────────────────────────┼────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│                 GOOGLE GEMINI API                         │
│                  (Free Tier)                              │
│                 60 req/min                                │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼ Returns JSON Array
┌───────────────────────────────────────────────────────────┐
│            STATE MANAGEMENT (Zustand Store)               │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  useAppStore()                                      │ │
│  │  ├─ places: Place[]                                 │ │
│  │  ├─ selectedPlaceIndex: number | null              │ │
│  │  ├─ preferences: UserPreferences                    │ │
│  │  ├─ language: 'en' | 'tr'                           │ │
│  │  ├─ isLoading: boolean                              │ │
│  │  └─ error: string | null                            │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────┬───────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
    ┌──────────────────┐      ┌──────────────────┐
    │   MapComponent   │      │  Timeline Cards  │
    │   (Leaflet Map)  │◄────►│  (Framer Motion) │
    │                  │      │                  │
    │  • OpenStreetMap │      │  • Unsplash Imgs │
    │  • Custom Markers│      │  • Click to Sync │
    │  • Click to Sync │      │                  │
    └──────────────────┘      └──────────────────┘
```

## Data Flow Sequence

```
1. USER FILLS FORM
   └─> preferences: {location, duration, food, interests, pace}

2. CLICK "GENERATE"
   └─> setIsLoading(true)
   └─> Call generateItineraryAction(preferences)

3. SERVER ACTION
   └─> Call generateItinerary(preferences)

4. GEMINI API
   └─> Prompt with strict JSON format requirements
   └─> Returns JSON array of places

5. VALIDATION
   └─> Parse JSON
   └─> Validate structure (coordinates, type, etc.)
   └─> Handle errors

6. UPDATE STATE
   └─> setPlaces(result.places)
   └─> setIsLoading(false)

7. RENDER RESULTS
   ├─> MapComponent renders markers
   └─> ResultsPanel renders cards

8. USER INTERACTION
   ├─> Click marker → highlight card + scroll
   └─> Click card → center map + highlight
```

## Component Tree

```
App
├── ThemeProvider (next-themes)
│   └── RootLayout
│       └── page.tsx
│           ├── Header
│           │   ├── ThemeToggle
│           │   └── LanguageToggle
│           ├── InputForm
│           │   ├── Location Input
│           │   ├── Duration Select
│           │   ├── Food Chips
│           │   ├── Interest Chips
│           │   ├── Pace Selector
│           │   └── Generate Button
│           └── ResultsPanel
│               ├── MapWrapper (SSR safe)
│               │   └── MapComponent (dynamic import)
│               │       ├── MapContainer
│               │       ├── TileLayer
│               │       ├── MapController
│               │       └── Marker[] with Popup
│               └── Timeline Cards
│                   └── motion.div[] (Framer Motion)
│                       ├── Image (Unsplash)
│                       ├── Type Badge
│                       ├── Name & Description
│                       └── Coordinates
```

## API Integration Points

### 1. Google Gemini API
- **Endpoint**: `generativeai.googleapis.com`
- **Model**: `gemini-1.5-flash`
- **Cost**: FREE (60 req/min)
- **Input**: User preferences as prompt
- **Output**: JSON array of places

### 2. OpenStreetMap
- **Tiles**: `tile.openstreetmap.org/{z}/{x}/{y}.png`
- **Cost**: FREE (unlimited with fair use)
- **Library**: react-leaflet
- **Features**: Markers, popups, zoom, pan

### 3. Unsplash Source
- **URL**: `source.unsplash.com/800x600/?{keyword}`
- **Cost**: FREE (no limits)
- **Input**: image_keyword from AI
- **Output**: Random matching image

## State Management Flow

```
┌─────────────────────────────────────────┐
│         Zustand Store (Global)          │
├─────────────────────────────────────────┤
│ Persisted State:                        │
│  • language: 'en' | 'tr'                │
│                                         │
│ Session State:                          │
│  • preferences: UserPreferences         │
│  • places: Place[]                      │
│  • selectedPlaceIndex: number | null    │
│  • isLoading: boolean                   │
│  • error: string | null                 │
│                                         │
│ Actions:                                │
│  • setLanguage(lang)                    │
│  • updatePreferences(prefs)             │
│  • setPlaces(places)                    │
│  • setSelectedPlaceIndex(index)         │
│  • setIsLoading(loading)                │
│  • setError(error)                      │
└─────────────────────────────────────────┘
        │        │        │
        ▼        ▼        ▼
   [Header] [InputForm] [ResultsPanel]
```

## SSR Handling (Critical!)

```
Problem:
  react-leaflet uses browser APIs (window, document)
  ❌ Server-side rendering fails with "window is not defined"

Solution:
  Dynamic import with ssr: false

Implementation:
  // MapWrapper.tsx
  const MapComponentInner = dynamic(
    () => import('./MapComponent'),
    { 
      ssr: false,
      loading: () => <LoadingSpinner />
    }
  );
```

## Theme System

```
┌─────────────────────────────────────────┐
│         next-themes Provider            │
├─────────────────────────────────────────┤
│  • Reads system preference              │
│  • Manages 'dark' class on <html>       │
│  • Persists user choice to localStorage │
└─────────────────────────────────────────┘
              │
              ▼
    Tailwind CSS Classes
    ├── dark:bg-gray-900
    ├── dark:text-white
    ├── glass / glass-dark
    └── Automatic switching
```

## i18n Strategy

```
┌─────────────────────────────────────────┐
│     translations.ts (Dictionary)        │
├─────────────────────────────────────────┤
│  {                                      │
│    en: { title: "...", ... },          │
│    tr: { title: "...", ... }           │
│  }                                      │
└─────────────────────────────────────────┘
              │
              ▼
    const t = translations[language];
    <h1>{t.title}</h1>
```

## File Size Budget

```
Total Build Size: ~500KB (gzipped)
├── Next.js Core: ~85KB
├── React + React-DOM: ~40KB
├── Leaflet: ~140KB
├── Framer Motion: ~60KB
├── Other libs: ~50KB
└── App Code: ~125KB
```

## Performance Optimizations

✅ Next.js 14 App Router (automatic code splitting)
✅ Dynamic imports for map (reduce initial bundle)
✅ Framer Motion lazy loading
✅ Tailwind CSS purging
✅ Image optimization (Unsplash CDN)
✅ Server Actions (no API routes needed)

---

**This architecture ensures:**
- Fast initial load
- Smooth interactions
- Zero cost APIs
- Easy deployment
- Hackathon-ready!
