# Netlify Deployment Guide - ParkStay Pass

This guide walks you through deploying ParkStay Pass to Netlify with Solana Devnet connectivity.

## 🎯 Overview

This deployment configuration:
- ✅ Connects to **Solana Devnet** (safe for testing with real wallets)
- ✅ Allows users to toggle between **Demo Mode** and **Live Wallet Mode**
- ✅ Optimized production build with code splitting
- ✅ SPA routing configured for React
- ✅ Security headers and caching configured

---

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Netlify Account** - Sign up at [netlify.com](https://netlify.com) (free tier available)
3. **Node.js 20+** installed locally (for testing builds)

---

## 🚀 Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

#### Step 1: Connect to GitHub
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your **ParkStay Pass** repository

#### Step 2: Configure Build Settings
The build settings are already configured in `netlify.toml`, but verify:

- **Build command**: `pnpm install && pnpm run build`
- **Publish directory**: `dist`
- **Node version**: `20`

#### Step 3: Environment Variables
The following variables are already set in `netlify.toml`:
- `VITE_SOLANA_NETWORK=devnet`
- `VITE_ENABLE_DEMO_MODE=true`
- `VITE_SOLANA_RPC_DEVNET=https://api.devnet.solana.com`

If you want to override them:
1. Go to **Site settings** → **Environment variables**
2. Add or modify variables as needed

#### Step 4: Deploy
1. Click **"Deploy site"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at `https://random-name-123.netlify.app`

#### Step 5: Custom Domain (Optional)
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow Netlify's instructions to configure DNS

---

### Option 2: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Initialize Site
```bash
netlify init
```

Follow the prompts:
- Create a new site or link to existing
- Select your team
- Set build command: `pnpm install && pnpm run build`
- Set publish directory: `dist`

#### Step 4: Deploy
```bash
# Deploy to production
netlify deploy --prod

# Or deploy to preview first
netlify deploy
```

---

## 🧪 Testing Your Build Locally

Before deploying, test the production build locally:

### 1. Build the Project
```bash
pnpm run build
```

This creates an optimized production build in the `dist` folder.

### 2. Preview the Build
```bash
pnpm run preview
```

This serves the production build at `http://localhost:5000`

### 3. Test Functionality
- ✅ Wallet connection works (Phantom, Solflare, etc.)
- ✅ Demo mode toggle functions correctly
- ✅ All pages and routes load properly
- ✅ No console errors
- ✅ Responsive on mobile devices

---

## 🔧 Configuration Details

### Solana Network Settings

The app is configured to use **Devnet** by default:

```toml
# In netlify.toml
VITE_SOLANA_NETWORK = "devnet"
VITE_SOLANA_RPC_DEVNET = "https://api.devnet.solana.com"
```

**Devnet Benefits:**
- ✅ Safe for testing with real wallets
- ✅ Free test SOL available from faucets
- ✅ All wallet features work (Phantom, Solflare, etc.)
- ✅ No real money at risk

**To upgrade to Mainnet later:**
1. Change `VITE_SOLANA_NETWORK` to `mainnet-beta`
2. Consider using a premium RPC provider (Helius, QuickNode, Alchemy)
3. Update in Site Settings → Environment Variables

### Demo Mode

Demo mode allows users to test the platform without connecting a wallet:

- **Enabled by default**: `VITE_ENABLE_DEMO_MODE=true`
- Users can toggle between Demo and Live modes via the button in the header
- Demo mode uses mock data and simulated transactions

### Build Optimizations

The `vite.config.ts` includes:
- **Code splitting** - Separate chunks for React, UI components, and Solana libraries
- **Minification** - Terser minification for smaller bundle sizes
- **Caching** - Vendor chunks cached separately for faster updates
- **Target ES2015** - Broad browser compatibility

---

## 🔒 Security Considerations

### What's Secure:
- ✅ Security headers configured (X-Frame-Options, CSP, etc.)
- ✅ HTTPS enforced by Netlify automatically
- ✅ Devnet connection (no real funds at risk)
- ✅ CORS configured for Solana RPC calls

### What's NOT Production-Ready:
- ⚠️ **Authentication**: Client-side only (simulated login)
- ⚠️ **Backend**: No server-side validation
- ⚠️ **Database**: No persistent data storage
- ⚠️ **Payments**: No real payment processing
- ⚠️ **QR Codes**: Client-generated (can be tampered with)

**This deployment is perfect for:**
- Demos and presentations
- User testing and feedback
- Wallet integration testing on Devnet
- Frontend development

**NOT suitable for:**
- Real user bookings with real money
- Production use with Mainnet (unless backend is added)
- Storing sensitive user data

---

## 🛠 Troubleshooting

### Build Fails with "Command not found: pnpm"

**Solution**: Netlify doesn't have pnpm by default. The build command installs it:
```toml
command = "pnpm install && pnpm run build"
```

If this doesn't work, you can use npm instead:
1. Delete `pnpm-lock.yaml`
2. Update build command to: `npm install && npm run build`

### Wallet Connection Fails

**Check:**
1. Network is set to `devnet` in environment variables
2. Browser console for specific error messages
3. Wallet extension is installed and up to date
4. Try switching between wallets (Phantom, Solflare, etc.)

### Routes Don't Work (404 Errors)

**Solution**: The `_redirects` file should contain:
```
/*  /index.html  200
```

This is already configured in your project.

### Environment Variables Not Loading

**Check:**
1. Variables are prefixed with `VITE_` (required for Vite)
2. Variables are set in Netlify UI or `netlify.toml`
3. Redeploy after changing variables

---

## 📊 Monitoring Your Deployment

### Netlify Dashboard
- **Site overview**: Build status, deploy previews
- **Analytics**: Page views, bandwidth usage (paid feature)
- **Functions**: Serverless function logs (for future backend)
- **Forms**: Form submissions (if you add contact forms)

### Performance
- Use [PageSpeed Insights](https://pagespeed.web.dev/) to test performance
- Check bundle size in build logs
- Monitor Solana RPC latency in browser console

---

## 🔄 Continuous Deployment

Netlify automatically deploys when you push to GitHub:

1. **Production**: Pushes to `main` branch → Auto-deploy to production
2. **Preview**: Pull requests → Deploy preview URLs for testing
3. **Branches**: Deploy specific branches via Netlify settings

### Deploy Previews
Every pull request gets a unique preview URL:
- Test changes before merging
- Share with team for review
- Automatic cleanup when PR is closed

---

## 🎯 Next Steps After Deployment

### Immediate:
1. ✅ Test wallet connections on Devnet
2. ✅ Get test SOL from [Solana Faucet](https://faucet.solana.com/)
3. ✅ Share demo link with stakeholders
4. ✅ Gather user feedback

### Future Enhancements:
1. **Add Backend**: Build authentication, booking, and payment APIs
2. **Database**: Set up PostgreSQL or MongoDB for data persistence
3. **Smart Contracts**: Deploy Solana programs for rewards and staking
4. **Premium RPC**: Upgrade to Helius/QuickNode for better performance
5. **Mainnet Migration**: Move to Mainnet when backend is ready

---

## 📚 Resources

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Solana Devnet Faucet**: [faucet.solana.com](https://faucet.solana.com)
- **Solana Explorer (Devnet)**: [explorer.solana.com?cluster=devnet](https://explorer.solana.com?cluster=devnet)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)

---

## 🆘 Support

If you encounter issues:
1. Check the **Netlify deploy logs** in the dashboard
2. Review browser console for client-side errors
3. Test locally with `pnpm run build && pnpm run preview`
4. Check Netlify community forums or documentation

---

**Your ParkStay Pass deployment is now live on Netlify with Solana Devnet connectivity!** 🎉

Share your demo link and start collecting feedback from users.
