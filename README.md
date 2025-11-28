# 🗺️ Travel Discovery - AI-Powered Itinerary Generator

A modern, hackathon-winning travel discovery web app that suggests personalized itineraries for unknown and unseen places using **100% FREE tools and APIs**.

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🤖 **AI-Powered Recommendations** - Google Gemini API generates personalized itineraries
- 🗺️ **Interactive Maps** - OpenStreetMap via React-Leaflet (NO GOOGLE MAPS API COST)
- 🎨 **Modern Glassmorphism UI** - Beautiful Bento Grid layout with Tailwind CSS
- 🌓 **Dark/Light Mode** - Seamless theme switching with next-themes
- 🌍 **Bilingual Support** - Turkish/English language toggle
- 📱 **Fully Responsive** - Mobile-first design approach
- 🎭 **Smooth Animations** - Framer Motion for delightful interactions
- 🔄 **Real-time Sync** - Map and timeline cards are synchronized
- 🖼️ **Free Images** - Unsplash Source for high-quality place imagery

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14+ (App Router, TypeScript) |
| **Styling** | Tailwind CSS |
| **Maps** | react-leaflet + OpenStreetMap (FREE) |
| **AI** | Google Gemini API (Free Tier) |
| **Images** | Unsplash Source (FREE) |
| **State** | Zustand |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |
| **Theme** | next-themes |

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API Key ([Get it for FREE](https://makersuite.google.com/app/apikey))

### Steps

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Edit the `.env.local` file and add your Gemini API key:
   ```env
   GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Fill in the form:**
   - Enter a location (e.g., "Istanbul, Turkey")
   - Select trip duration
   - Choose food preferences
   - Pick your interests
   - Set your travel pace

2. **Generate Itinerary:**
   - Click "Generate Itinerary"
   - Wait 10-20 seconds for AI to create your personalized plan

3. **Explore Results:**
   - View places on the interactive map
   - Scroll through timeline cards
   - Click markers or cards to sync views
   - See beautiful images and descriptions

## 🏗️ Project Structure

```
rote_app_ai/
├── app/
│   ├── actions.ts          # Server actions for AI integration
│   ├── globals.css         # Global styles + Leaflet fixes
│   ├── layout.tsx          # Root layout with ThemeProvider
│   └── page.tsx            # Main page component
├── components/
│   ├── Header.tsx          # Header with theme & language toggles
│   ├── InputForm.tsx       # User input form
│   ├── MapComponent.tsx    # Leaflet map component
│   ├── MapWrapper.tsx      # Dynamic import wrapper (SSR fix)
│   └── ResultsPanel.tsx    # Results display with map & cards
├── lib/
│   ├── gemini.ts           # Gemini API integration
│   └── translations.ts     # i18n dictionary (TR/EN)
├── store/
│   └── useAppStore.ts      # Zustand state management
├── types/
│   └── index.ts            # TypeScript interfaces
└── public/                 # Static assets
```

## 🔧 Key Implementation Details

### SSR Fix for React-Leaflet

The app uses dynamic imports to prevent "window is not defined" errors:

```typescript
// MapWrapper.tsx
const MapComponentInner = dynamic(
  () => import('./MapComponent').then((mod) => mod.MapComponentInner),
  { ssr: false }
);
```

### AI Prompt Engineering

The Gemini prompt is carefully crafted to **enforce JSON output**:

```typescript
// lib/gemini.ts
const prompt = `You MUST respond with ONLY a valid JSON array...`;
```

### Free Image API

Using Unsplash Source for zero-cost images:

```typescript
const imageUrl = `https://source.unsplash.com/800x600/?${keyword}`;
```

## 🎨 Design Philosophy

- **Glassmorphism**: Modern, translucent UI elements
- **Bento Grid**: Card-based layout for visual hierarchy
- **Responsive**: Mobile-first with Tailwind breakpoints
- **Accessible**: Semantic HTML and ARIA labels
- **Performance**: Optimized with Next.js 14 features

## 🌐 Zero-Cost API Strategy

| Service | Purpose | Cost | Limit |
|---------|---------|------|-------|
| Google Gemini | AI Itinerary Generation | **FREE** | 60 requests/min |
| OpenStreetMap | Map Tiles | **FREE** | Unlimited (fair use) |
| Unsplash Source | Place Images | **FREE** | No limits |

## 🐛 Troubleshooting

### "window is not defined" error
✅ **Solved**: Dynamic imports with `ssr: false`

### TypeScript errors during development
The errors shown are pre-install warnings. Run `npm install` to resolve.

### Gemini API returns invalid JSON
The prompt includes strict formatting rules and validation. If issues persist, check your API key and quota.

### Map not showing
Ensure Leaflet CSS is loaded in `layout.tsx` and check browser console for errors.

## 📝 Environment Variables

```env
# Required
GOOGLE_GEMINI_API_KEY=your_key_here

# Optional (already configured)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add `GOOGLE_GEMINI_API_KEY` in Environment Variables
4. Deploy!

### Other Platforms

Works with any Node.js hosting:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 📄 License

MIT License - feel free to use for hackathons, learning, or production!

## 🏆 Hackathon Tips

- **Pitch Point**: "Zero API costs = infinite scalability"
- **Demo Strategy**: Pre-generate 2-3 examples to show during presentation
- **Wow Factor**: Show the map-card synchronization live
- **Business Angle**: "Democratizing travel planning with free AI"

## 🤝 Contributing

This is a hackathon MVP, but contributions are welcome!

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push and open a PR

## 📧 Support

For issues or questions, open a GitHub issue.

---

**Built with ❤️ for Techstars Startup Weekend**

Good luck with your hackathon! 🚀
