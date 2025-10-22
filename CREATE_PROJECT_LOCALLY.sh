#!/bin/bash

# ============================================
# ParkStay Pass - Local Project Setup Script
# ============================================

echo "🚀 Creating ParkStay Pass project locally..."

# Create main project directory
mkdir -p parkstay-pass
cd parkstay-pass

echo "📁 Creating directory structure..."

# Create directory structure
mkdir -p components/ui
mkdir -p components/figma
mkdir -p services
mkdir -p providers
mkdir -p hooks
mkdir -p types
mkdir -p config
mkdir -p styles
mkdir -p backend/src
mkdir -p solana-programs/programs/parkstay-platform/src

echo "✅ Directory structure created!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Copy files from Figma Make to these folders:"
echo "   - Copy App.tsx to root"
echo "   - Copy main.tsx to root"
echo "   - Copy index.html to root"
echo "   - Copy package.json to root"
echo "   - Copy all components to components/"
echo "   - Copy all services to services/"
echo "   - etc."
echo ""
echo "2. Install dependencies:"
echo "   npm install"
echo ""
echo "3. Create .env file:"
echo "   cp .env.example .env"
echo ""
echo "4. Run development server:"
echo "   npm run dev"
echo ""
echo "5. Deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "✨ Project structure is ready!"
echo "📂 Location: $(pwd)"
