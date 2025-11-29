#!/bin/bash

echo "===================================="
echo "TravelGenie AI - Setup Script"
echo "===================================="
echo ""

echo "[1/4] Installing dependencies..."
npm install

echo ""
echo "[2/4] Checking for .env.local file..."
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cat > .env.local << EOF
# Get your API key from https://makersuite.google.com/app/apikey
GOOGLE_GEMINI_API_KEY=your_api_key_here
EOF
    echo ""
    echo "⚠️  IMPORTANT: Please add your Google Gemini API key to .env.local"
    echo "   Get it from: https://makersuite.google.com/app/apikey"
    echo ""
else
    echo "✓ .env.local already exists"
fi

echo ""
echo "[3/4] Building the application..."
npm run build

echo ""
echo "[4/4] Setup complete!"
echo ""
echo "===================================="
echo "Next Steps:"
echo "===================================="
echo "1. Add your Google Gemini API key to .env.local"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "Note: App works with mock data if no API key is provided."
echo "===================================="
