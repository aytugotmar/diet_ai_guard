# 🚀 Quick Start Guide

## ⚡ 3 Steps to Launch

### 1. Get Your FREE Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy your key

### 2. Add Your API Key

Open `.env.local` and replace the placeholder:

```env
GOOGLE_GEMINI_API_KEY=paste_your_actual_key_here
```

### 3. Run the App

```bash
npm run dev
```

Visit: http://localhost:3000

## ✅ What's Already Done

✅ All dependencies installed (429 packages)
✅ Next.js 14 configured with TypeScript
✅ Tailwind CSS with custom glassmorphism styles
✅ React-Leaflet with SSR fix
✅ Zustand state management
✅ Gemini AI integration with strict JSON prompt
✅ Dark/Light mode toggle
✅ TR/EN language support
✅ Framer Motion animations
✅ Responsive mobile-first design

## 🎯 Test the App

### Example Input:
- **Location**: Istanbul, Turkey
- **Duration**: Full Day
- **Food**: Breakfast, Lunch, Street Food
- **Interests**: Historical, Hidden Gems, Culture
- **Pace**: Moderate

Click "Generate Itinerary" and wait 10-20 seconds!

## 🎨 Features to Demo

1. **Form Input** - Beautiful glassmorphism UI
2. **AI Generation** - Watch the loading animation
3. **Interactive Map** - Click markers to highlight cards
4. **Synchronized Cards** - Click cards to center map
5. **Theme Toggle** - Dark/Light mode switch
6. **Language Toggle** - EN/TR button in header
7. **Responsive** - Test on mobile view

## 🐛 Common Issues

### Port Already in Use?
```bash
# Kill the process
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### TypeScript Errors?
The errors shown during setup are normal - they resolve after `npm install`.

### Map Not Loading?
Check browser console. The Leaflet CSS is loaded from CDN in `layout.tsx`.

### Gemini API Error?
1. Check your API key in `.env.local`
2. Restart the dev server after adding the key
3. Verify you have free tier quota available

## 📊 API Usage (Free Tier)

- **Gemini API**: 60 requests/minute
- **OpenStreetMap**: Unlimited (fair use)
- **Unsplash**: No limits

## 🏆 Hackathon Presentation Tips

### The Hook (30 seconds)
"We built a travel discovery app with ZERO API costs that generates personalized itineraries for hidden gems using AI."

### The Demo (2 minutes)
1. Show the beautiful UI
2. Fill in the form live
3. Generate an itinerary
4. Demonstrate map-card sync
5. Toggle dark mode and language

### The Tech (1 minute)
- Next.js 14 with TypeScript
- Google Gemini for AI (free)
- OpenStreetMap for maps (free)
- Modern glassmorphism UI

### The Wow Factor
"Everything you see - the AI, maps, images - costs $0 per month in API fees. This scales infinitely."

## 📝 Next Steps (If You Have Time)

### Quick Wins:
- [ ] Add more cities to the example
- [ ] Customize the color scheme
- [ ] Add more place types
- [ ] Export itinerary as PDF
- [ ] Share functionality

### Advanced:
- [ ] User authentication
- [ ] Save favorite itineraries
- [ ] Weather integration
- [ ] Budget calculator
- [ ] Social sharing

## 🎯 Your Mission

**Make this win the hackathon!** 🏆

The foundation is solid. Now add your unique touches:
- Customize the design
- Add your own features
- Practice the demo
- Perfect your pitch

---

**You're ready to launch! Good luck! 🚀**

Need help? Check the README.md for detailed documentation.
