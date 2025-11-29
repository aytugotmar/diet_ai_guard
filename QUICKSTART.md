# 🚀 Quick Start Guide - TravelGenie AI

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Get Google Gemini API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Create an API key (free)
3. Copy the key

### Step 3: Configure Environment
Open `.env.local` and replace `your_api_key_here` with your actual key:
```env
GOOGLE_GEMINI_API_KEY=AIzaSyD...your-actual-key
```

### Step 4: Run the App
```powershell
npm run dev
```

### Step 5: Open Browser
Navigate to: http://localhost:3000

---

## 🎯 How to Use

1. **Enter Destination**: Type where you want to go (e.g., "Tokyo", "Paris")
2. **Select Dates**: Choose start and end dates
3. **Set Budget**: Enter your budget (e.g., "$2000")
4. **Pick Your Vibe**:
   - 🧘 **Chill**: Relaxed, spa, cafes
   - 🏔️ **Adventure**: Hiking, sports, thrill
   - 🍜 **Foodie**: Restaurants, food tours
   - 🗺️ **Local Secret**: Hidden gems, non-touristy
5. **Generate**: Click "Generate My Itinerary"
6. **Explore**: View your personalized day-by-day plan

---

## 🌟 Key Features to Demo

### 1. Weather Check Button
After generating an itinerary, click **"Weather Check (Rainy Day)"** to get alternative indoor activities.

### 2. Language Toggle
Click the language button (EN/TR) in the header to switch between English and Turkish.

### 3. Theme Toggle
Click the sun/moon icon to switch between light and dark modes.

### 4. Hidden Gems
Look for the 💎 badge on activities - these are special local spots!

---

## 🎨 UI Highlights

- **Glassmorphism**: Frosted glass effect on cards
- **Smooth Animations**: Framer Motion transitions
- **Loading Facts**: Educational content while generating
- **Gradient Accents**: Modern color scheme
- **Mobile-First**: Responsive on all devices

---

## 🐛 Troubleshooting

### No API Key?
**No problem!** The app works with mock data if you don't set an API key. Perfect for quick demos.

### API Key Not Working?
1. Check the key is correct in `.env.local`
2. Restart the dev server: `Ctrl+C` then `npm run dev`
3. Clear browser cache

### Port 3000 Already in Use?
```powershell
npm run dev -- -p 3001
```

### Dark Mode Not Saving?
Clear browser localStorage and refresh.

---

## 📊 Demo Script (for Presentation)

**[1 minute] Problem**
> "Planning trips is overwhelming. Too many websites, no personalization, miss hidden gems."

**[2 minutes] Solution Demo**
1. Show form - "Just 4 inputs + vibe selection"
2. Fill in: Paris, 3 days, $1500, Foodie vibe
3. Generate - "AI creates personalized plan in seconds"
4. Scroll through itinerary - "Day-by-day, hidden gems, costs"

**[1 minute] Unique Features**
1. Click Weather Check - "Real-time adaptation"
2. Toggle EN/TR - "Full internationalization"
3. Toggle theme - "Beautiful in any mode"

**[1 minute] Technical Edge**
> "Next.js 14, Google Gemini, TypeScript. Production-ready. Mobile-first."

---

## 🏆 Hackathon Judging Points

✅ **Innovation**: AI + mood analysis + weather adaptation  
✅ **Design**: Glassmorphism, animations, dark mode  
✅ **Technical**: Modern stack, type-safe, scalable  
✅ **UX**: Simple form, engaging loading, beautiful results  
✅ **Market Fit**: Solves real problem, 2 languages, accessible  

---

## 📦 What's Included

- ✅ Full Next.js 14 app with App Router
- ✅ Google Gemini AI integration
- ✅ TypeScript throughout
- ✅ Dark/Light theme system
- ✅ English/Turkish support
- ✅ Framer Motion animations
- ✅ Tailwind CSS styling
- ✅ Mock data fallback
- ✅ Responsive design
- ✅ Production-ready code

---

## 🚢 Deploy to Production

### Vercel (Recommended)
```powershell
npm install -g vercel
vercel
```

Add your `GOOGLE_GEMINI_API_KEY` in Vercel dashboard → Settings → Environment Variables.

### Build Locally
```powershell
npm run build
npm start
```

---

## 💡 Tips for Winning

1. **Practice Demo**: Run through 2-3 times before presenting
2. **Have Backup**: Screenshot of working version
3. **Prepare Examples**: "Paris foodie", "Tokyo adventure", "Istanbul local"
4. **Emphasize Value**: "Saves hours of research", "Discover hidden spots"
5. **Show Polish**: Theme switch, language toggle, smooth animations

---

## 🎤 Elevator Pitch

*"TravelGenie AI is your personal travel planner that uses AI to create custom itineraries based on your mood. Pick your vibe - chill, adventure, foodie, or local secret hunter - and get a day-by-day plan with hidden gems locals know. It adapts to weather, speaks your language, and looks beautiful. Built with the latest tech for the modern traveler."*

---

**Good luck at the Startup Weekend! 🚀✨**
