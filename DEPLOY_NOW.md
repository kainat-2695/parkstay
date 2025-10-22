# 🚀 Deploy ParkStay Pass in 5 Minutes

## ✅ **Quick Deploy to Vercel (Recommended)**

Your frontend is **100% ready** to deploy as a demo!

### **Prerequisites:**
- GitHub account
- Vercel account (free) at [vercel.com](https://vercel.com)

---

## 📋 **Step-by-Step Deployment**

### **Option 1: Deploy via Vercel Dashboard (Easiest)**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ParkStay Pass"
   git branch -M main
   git remote add origin https://github.com/yourusername/parkstay-pass.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your `parkstay-pass` repository
   - Click "Import"

3. **Configure Build Settings** (Auto-detected)
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_ENABLE_DEMO_MODE=true
     VITE_SOLANA_NETWORK=devnet
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ Done! You'll get a URL like `parkstay-pass.vercel.app`

---

### **Option 2: Deploy via Vercel CLI (Faster)**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **parkstay-pass**
   - In which directory is your code located? **.**
   - Want to modify settings? **N**

5. **✅ Done!** Your app is live!

---

## 🌐 **Alternative Hosting Options**

### **Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### **GitHub Pages**

```bash
# Install gh-pages
npm i -D gh-pages

# Add to package.json scripts
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### **Railway**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

## ⚙️ **Environment Variables for Production**

Create a `.env.production` file or set in hosting dashboard:

```env
# Application
VITE_APP_NAME=ParkStay Pass
VITE_APP_URL=https://your-domain.com

# Demo Mode (keep true until backend is ready)
VITE_ENABLE_DEMO_MODE=true

# Solana (use devnet for testing)
VITE_SOLANA_NETWORK=devnet
VITE_SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com

# Backend (optional - not needed for demo)
VITE_API_URL=https://api.parkstaypass.com/api

# Feature Flags
VITE_ENABLE_STAKING=true
VITE_ENABLE_NFT_REWARDS=false
```

---

## ✅ **Post-Deployment Checklist**

After deploying, verify:

- [ ] App loads correctly
- [ ] Demo mode banner shows
- [ ] Mock wallet connects in demo mode
- [ ] All pages navigate properly
- [ ] Booking interfaces work
- [ ] Rewards dashboard displays
- [ ] Staking interface functions
- [ ] Mobile responsive
- [ ] No console errors (except Figma ones in dev)

---

## 🔗 **Custom Domain Setup**

### **Vercel:**
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### **Netlify:**
1. Go to "Domain Management"
2. Add custom domain
3. Configure DNS records

---

## 🚀 **What You Get**

### **Demo Mode (Current):**
✅ Fully functional UI
✅ Mock wallet for testing
✅ All features visible
✅ No blockchain required
✅ No backend required
✅ Perfect for presentations

### **Not Included (Requires Backend):**
❌ Real database storage
❌ Real authentication
❌ Real booking processing
❌ Real payment processing
❌ Email notifications

### **Not Included (Requires Smart Contracts):**
❌ Real SOL transactions
❌ On-chain rewards
❌ Real staking
❌ NFT minting

---

## 📈 **Upgrade Path**

Once deployed as demo, you can upgrade:

### **Phase 1: Add Real Wallets** (1 day)
- Deploy smart contracts to devnet
- Update program ID
- Enable live mode
- Test transactions

### **Phase 2: Add Backend** (2-4 weeks)
- Implement backend API
- Set up database
- Add authentication
- Enable real bookings

### **Phase 3: Go Mainnet** (After audit)
- Security audit
- Deploy to Solana mainnet
- Real transactions
- Production launch

---

## 🎉 **You're Ready to Deploy!**

Your frontend is **production-ready** for demo purposes.

**Just run:**
```bash
vercel --prod
```

**And you're live in 2 minutes!** 🚀

---

## 📞 **Need Help?**

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Netlify Docs: [docs.netlify.com](https://docs.netlify.com)
- Vite Deploy Guide: [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy.html)

---

**Last Updated:** October 13, 2025
