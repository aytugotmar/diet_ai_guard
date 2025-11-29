# 🚀 Installation & First Run Guide

## Prerequisites

Before starting, ensure you have:
- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **npm** or **yarn** package manager
- ✅ **VS Code** (recommended) or any code editor
- ✅ **Modern browser** (Chrome, Firefox, Edge, Safari)

Check your versions:
```powershell
node --version    # Should be v18.0.0 or higher
npm --version     # Should be 9.0.0 or higher
```

---

## 📦 Installation Steps

### Option 1: Automated Setup (Recommended)

**Windows:**
```powershell
cd "d:\Project\Hackathon MVPs\techstars_startup_weekend\rote_app_ai_v2"
.\setup.bat
```

**Mac/Linux:**
```bash
cd "d:/Project/Hackathon MVPs/techstars_startup_weekend/rote_app_ai_v2"
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

```powershell
# 1. Navigate to project directory
cd "d:\Project\Hackathon MVPs\techstars_startup_weekend\rote_app_ai_v2"

# 2. Install dependencies (takes 2-3 minutes)
npm install

# 3. Verify installation
npm list --depth=0

# You should see:
# ├── @google/generative-ai@0.21.0
# ├── framer-motion@11.0.8
# ├── lucide-react@0.344.0
# ├── next@14.1.0
# ├── react@18.2.0
# └── react-dom@18.2.0
```

---

## 🔑 API Key Setup

### Get Google Gemini API Key (Free)

1. **Visit**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click** "Create API Key"
4. **Copy** the key (starts with `AIzaSy...`)

### Add to Environment

Open `.env.local` file and replace:
```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

With your actual key:
```env
GOOGLE_GEMINI_API_KEY=AIzaSyD_your_actual_key_here_1234567890
```

**Important**: Don't commit this file to Git! (Already in `.gitignore`)

---

## ▶️ Running the Application

### Development Mode

```powershell
npm run dev
```

You should see:
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.5s
```

**Open browser**: http://localhost:3000

### Production Build

```powershell
# Build optimized version
npm run build

# Start production server
npm start
```

---

## ✅ Verification Checklist

### 1. Homepage Loads
- [ ] Beautiful gradient background visible
- [ ] "TravelGenie AI" logo in header
- [ ] Theme toggle (sun/moon icon) works
- [ ] Language toggle (EN/TR) works
- [ ] Form appears with all fields

### 2. Form Validation
- [ ] Destination input accepts text
- [ ] Date pickers show calendar
- [ ] Budget input accepts values
- [ ] All 4 vibe cards are clickable
- [ ] Selected vibe shows blue border
- [ ] Submit button enabled when form filled

### 3. Generate Itinerary
- [ ] Loading animation shows (spinning plane)
- [ ] Facts rotate every 3 seconds
- [ ] After 5-10 seconds, itinerary appears
- [ ] Day-by-day cards display
- [ ] Activities have icons and descriptions
- [ ] Hidden gem badges (💎) visible
- [ ] Costs shown for each activity

### 4. Action Buttons
- [ ] "Weather Check" button regenerates
- [ ] "Back to Form" button returns to input
- [ ] Results show different activities for rain

### 5. Theme Toggle
- [ ] Click moon icon → switches to dark mode
- [ ] All text remains readable
- [ ] Cards have dark backgrounds
- [ ] Gradient colors adjust
- [ ] Refresh page → theme persists

### 6. Language Toggle
- [ ] Click "EN" → switches to "TR"
- [ ] All UI text changes to Turkish
- [ ] Form labels translate
- [ ] Button text translates
- [ ] Generated itinerary in Turkish

### 7. Responsive Design
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Select "iPhone 12 Pro"
- [ ] Layout adapts to mobile
- [ ] Buttons stack vertically
- [ ] Text remains readable

---

## 🐛 Troubleshooting

### Problem: Dependencies won't install

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and lockfile
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install --legacy-peer-deps
```

---

### Problem: Port 3000 already in use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution 1** - Kill process:
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with actual number)
taskkill /PID <PID> /F
```

**Solution 2** - Use different port:
```powershell
npm run dev -- -p 3001
# Open http://localhost:3001
```

---

### Problem: API key not working

**Error**: Itinerary uses mock data or API errors

**Checklist**:
1. ✅ API key in `.env.local` (not `.env`)
2. ✅ Key starts with `AIzaSy`
3. ✅ No extra spaces or quotes
4. ✅ File saved
5. ✅ Server restarted (Ctrl+C then `npm run dev`)

**Test API Key**:
```powershell
# Check if key is loaded
npm run dev
# Look for console message:
# "✓ GOOGLE_GEMINI_API_KEY loaded"
```

**Still not working?**
- Verify key at https://makersuite.google.com/app/apikey
- Check quota limits
- Try generating new key
- Use mock data mode for demo

---

### Problem: Dark mode doesn't persist

**Solution**:
```javascript
// Open browser console (F12)
localStorage.clear()
location.reload()
```

---

### Problem: Build fails

**Error**: `Type error: Cannot find module...`

**Solution**:
```powershell
# Check TypeScript config
npm run build -- --verbose

# If specific module missing:
npm install @types/node @types/react @types/react-dom --save-dev
```

---

### Problem: Styles not applying

**Symptoms**: No colors, plain HTML

**Solution**:
```powershell
# Check Tailwind is working
npm run dev

# Look for this in console:
# ✓ Compiled /app/globals.css

# If missing, reinstall Tailwind:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### Problem: Animations choppy

**Solution**:
```javascript
// Add to app/globals.css
* {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

Or reduce animations:
```javascript
// In framer-motion components, add:
transition={{ duration: 0.2 }}
```

---

## 🧪 Testing Without API Key

The app includes comprehensive mock data. To test:

1. **Don't set** `GOOGLE_GEMINI_API_KEY`
2. **Fill form**: Any destination, dates, budget
3. **Click generate**
4. **See sample** itinerary for demo purposes

Mock data locations:
- `app/api/generate/route.ts` - `getMockItinerary()`
- `lib/demoData.ts` - Full demo itinerary

---

## 📊 Performance Checks

### Lighthouse Score (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

**Run Lighthouse**:
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Desktop"
4. Click "Analyze page load"

### Bundle Size
```powershell
npm run build

# Check output:
# Route (app)                   Size     First Load JS
# ○ /                          5.2 kB         95.3 kB
# ○ /api/generate              0 B            80.1 kB
```

---

## 🎓 Developer Tools

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

Install all:
```powershell
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

### Hot Reload

Next.js supports hot reload:
- Edit any file
- Save (Ctrl+S)
- Browser updates automatically
- No manual refresh needed

### Debug Mode

Add to `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    }
  ]
}
```

---

## 📸 Screenshot Verification

Your app should look like:

### Light Mode (Desktop)
- Gradient blue/purple/pink background
- White glassmorphism cards
- Indigo/pink buttons
- Clean sans-serif font

### Dark Mode (Desktop)
- Dark gray background with purple tint
- Dark cards with light borders
- Same button colors
- White text

### Mobile (375px)
- Single column layout
- Full-width buttons
- Stacked form fields
- Readable text (16px minimum)

---

## 🚀 First Demo Run

### Test Scenario 1: Foodie in Paris
1. Destination: `Paris, France`
2. Dates: Tomorrow + 3 days
3. Budget: `$1500`
4. Vibe: **Foodie** 🍜
5. Generate → Should see French restaurants, cafes, food tours

### Test Scenario 2: Adventure in Tokyo
1. Destination: `Tokyo, Japan`
2. Dates: Next week + 5 days
3. Budget: `$3000`
4. Vibe: **Adventure** 🏔️
5. Generate → Should see active experiences, hiking, sports

### Test Scenario 3: Weather Check
1. Use any generated itinerary
2. Click **"Weather Check (Rainy Day)"**
3. Should regenerate with indoor activities
4. Museums, shopping, indoor experiences

### Test Scenario 4: Language Switch
1. Generate English itinerary
2. Click **TR** in header
3. Everything switches to Turkish
4. Click **EN** to switch back

### Test Scenario 5: Theme Toggle
1. Click **Moon** icon (top right)
2. Dark mode activates
3. Click **Sun** icon
4. Light mode activates
5. Refresh page → theme persists

---

## ✅ Ready to Demo!

If all checks pass, you're ready for the hackathon demo!

### Pre-Demo Checklist
- [ ] API key working (or mock data ready)
- [ ] App running on `localhost:3000`
- [ ] Browser window sized properly
- [ ] 2-3 test destinations prepared
- [ ] Theme set to preferred mode
- [ ] Language set to demo audience
- [ ] No console errors (F12 check)
- [ ] Fast internet connection
- [ ] Backup: Screenshots of working version

### Demo Tips
1. **Prepare Examples**: Have destinations typed in notepad
2. **Show Speed**: Highlight 30-second generation
3. **Emphasize Gems**: Point out 💎 badges
4. **Demonstrate Adaptation**: Weather check feature
5. **Showcase Design**: Toggle dark mode mid-demo
6. **Prove Global**: Switch to Turkish momentarily

---

## 📞 Still Having Issues?

### Check These Files Exist
```powershell
Get-ChildItem -Recurse | Where-Object {!$_.PSIsContainer}

# Should see:
# app/page.tsx
# app/layout.tsx
# app/globals.css
# app/api/generate/route.ts
# components/ItineraryDisplay.tsx
# lib/gemini.ts
# types/itinerary.ts
# package.json
# .env.local
```

### Verify Package.json
```powershell
Get-Content package.json | Select-String "next"
# Should show: "next": "14.1.0"
```

### Check Node Modules
```powershell
Test-Path node_modules
# Should return: True
```

---

## 🎉 Success Indicators

You'll know everything works when:

1. ✅ No red errors in console
2. ✅ Page loads in < 3 seconds
3. ✅ Itinerary generates in < 10 seconds
4. ✅ All animations smooth (60fps)
5. ✅ Theme persists on refresh
6. ✅ Mobile view looks good
7. ✅ Turkish translation complete
8. ✅ Hidden gems appear

---

**Installation Complete! 🚀**

**Next**: Read `QUICKSTART.md` for demo script  
**Then**: Review `PROJECT_SUMMARY.md` for technical details

**Good luck at the hackathon! 🏆**
