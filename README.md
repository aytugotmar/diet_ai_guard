# TravelGenie AI 🧞✈️

An AI-Powered Travel Itinerary App built for Techstars Startup Weekend hackathon.

## Features

- 🤖 **AI-Powered Planning**: Uses Google Gemini API to generate personalized itineraries
- 🎭 **Mood-Based Suggestions**: Choose your vibe (Chill, Adventure, Foodie, Local Secret Hunter)
- 💎 **Hidden Gems**: Discover non-touristy spots locals know about
- ☔ **Weather Adaptation**: Real-time itinerary adjustment for rainy days
- 🌍 **Internationalization**: Full support for English and Turkish
- 🌓 **Theme Support**: Beautiful light and dark modes
- ✨ **Glassmorphism UI**: Modern, polished design with smooth animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Google Gemini API (gemini-1.5-pro-latest)
- **Language**: TypeScript

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

**Note**: The app works with mock data if no API key is provided.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
rote_app_ai_v2/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint for itinerary generation
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Main page with form and display logic
├── components/
│   └── ItineraryDisplay.tsx      # Beautiful itinerary display component
├── contexts/
│   ├── ThemeContext.tsx          # Dark/Light mode provider
│   └── LanguageContext.tsx       # i18n provider (EN/TR)
├── lib/
│   └── gemini.ts                 # Google Gemini API helper
├── types/
│   └── itinerary.ts              # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## How It Works

1. **User Input**: Fill in destination, dates, budget, and select your vibe
2. **AI Processing**: The app sends a structured prompt to Google Gemini
3. **Smart Generation**: Gemini creates a day-by-day itinerary with:
   - Morning, Afternoon, Evening activities
   - Hidden gems (non-touristy spots)
   - Cost estimates
   - Location details
4. **Beautiful Display**: Results shown with glassmorphism cards and smooth animations
5. **Weather Adaptation**: Click "Weather Check" to get rainy-day alternatives

## Key Features

### Mood/Vibe System
- **Chill**: Relaxed, peaceful activities
- **Adventure**: Thrilling, adrenaline-pumping experiences
- **Foodie**: Culinary tours and hidden restaurants
- **Local Secret**: Authentic, non-touristy experiences

### Internationalization
Toggle between English and Turkish with full translation support.

### Theme System
Switch between light and dark modes with glassmorphism effects.

## API Endpoint

**POST** `/api/generate`

Request body:
```json
{
  "destination": "Paris",
  "startDate": "2024-06-01",
  "endDate": "2024-06-05",
  "budget": "$2000",
  "vibe": "foodie",
  "language": "en",
  "weatherAdjustment": false
}
```

## Customization

### Adding New Vibes
Edit `app/page.tsx` and add to the `vibes` array:

```typescript
{ value: 'new-vibe', emoji: '🎨', labelKey: 'newVibe', descKey: 'newVibeDesc' }
```

Then add translations in `contexts/LanguageContext.tsx`.

### Changing Theme Colors
Edit `tailwind.config.ts` to customize the color palette.

### Mock Data Mode
If no Gemini API key is set, the app automatically uses mock data defined in `app/api/generate/route.ts`.

## Performance Tips

- The app uses client-side rendering for interactive components
- API calls are optimized with proper error handling
- Loading states show interesting facts to keep users engaged
- Framer Motion animations are GPU-accelerated

## Troubleshooting

**Problem**: API key not working
- Verify your key at https://makersuite.google.com/app/apikey
- Check `.env.local` file is in the root directory
- Restart the development server

**Problem**: Dark mode not persisting
- Clear localStorage and refresh
- Check browser console for errors

## License

Built for Techstars Startup Weekend Hackathon 2024

---

Built with ❤️ using Next.js and Google Gemini AI
