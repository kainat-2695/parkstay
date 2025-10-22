# ParkStay Pass - Production Setup Guide

## 🚀 Quick Start for Production

The app is now configured to use **Live Mode with real Solana wallets** by default.

### Current Configuration

- **Default Mode**: Live Mode (real Solana blockchain)
- **Network**: Devnet (for testing)
- **Supported Wallets**: Phantom, Solflare, Torus, Ledger

## 🔧 Configuration Options

### 1. Network Selection

Edit `.env` file to change the Solana network:

```bash
# For testing (recommended for development)
VITE_SOLANA_NETWORK=devnet

# For production (real SOL transactions)
VITE_SOLANA_NETWORK=mainnet-beta

# For staging/testing
VITE_SOLANA_NETWORK=testnet
```

### 2. Custom RPC Endpoints

For better performance and reliability in production, use a dedicated RPC provider:

**Recommended Providers:**
- [Helius](https://helius.dev) - Fast, reliable, generous free tier
- [QuickNode](https://quicknode.com) - Enterprise-grade infrastructure
- [Alchemy](https://alchemy.com) - Developer-friendly with analytics
- [GenesysGo](https://genesysgo.com) - High-performance RPC

**Setup:**
1. Sign up for an RPC provider
2. Get your API endpoint URL
3. Update `.env`:

```bash
VITE_SOLANA_RPC_MAINNET=https://your-provider.com/your-api-key
```

### 3. Demo Mode Toggle

The app includes a demo mode toggle for testing without a wallet:

```bash
# Enable demo mode toggle in UI
VITE_ENABLE_DEMO_MODE=true

# Disable demo mode toggle (production)
VITE_ENABLE_DEMO_MODE=false
```

## 📱 Wallet Setup Instructions

### For Users:

1. **Install a Solana Wallet**:
   - [Phantom Wallet](https://phantom.app) (Most popular, beginner-friendly)
   - [Solflare Wallet](https://solflare.com) (Advanced features)
   - [Torus Wallet](https://tor.us) (Social login)
   - [Ledger](https://ledger.com) (Hardware wallet for maximum security)

2. **Connect Your Wallet**:
   - Click "Connect Wallet" in the top right
   - Select your wallet from the list
   - Approve the connection in your wallet extension
   - Your wallet address and SOL balance will appear

3. **Add Test SOL (Devnet)**:
   - Visit [Solana Faucet](https://faucet.solana.com)
   - Enter your wallet address
   - Request 1-2 SOL for testing

## 🔐 Production Security Checklist

### Before Going to Mainnet:

- [ ] Set `VITE_SOLANA_NETWORK=mainnet-beta`
- [ ] Use a paid RPC provider (not public endpoints)
- [ ] Set `VITE_ENABLE_DEMO_MODE=false` (disable demo mode)
- [ ] Test all transactions on devnet first
- [ ] Implement proper error handling for failed transactions
- [ ] Add transaction confirmation UI
- [ ] Set up monitoring for wallet connection issues
- [ ] Review all smart contract interactions
- [ ] Enable HTTPS/SSL certificates
- [ ] Add rate limiting for API calls
- [ ] Implement transaction retry logic

## 🎯 Current Status

✅ **Ready for Testing**: App connects to Solana Devnet with real wallets  
⚠️ **Not Production Ready**: Still using Devnet, needs mainnet configuration  

## 📝 Deployment to Production

### Option 1: Deploy on Replit

1. Set environment variables in Replit Secrets:
   ```
   VITE_SOLANA_NETWORK=mainnet-beta
   VITE_SOLANA_RPC_MAINNET=your-rpc-endpoint
   VITE_ENABLE_DEMO_MODE=false
   ```

2. Click "Deploy" in Replit

### Option 2: Deploy on Vercel/Netlify

1. Build the project:
   ```bash
   pnpm build
   ```

2. Set environment variables in your hosting platform

3. Deploy the `dist` folder

## 🆘 Troubleshooting

### Wallet Won't Connect

1. Make sure you're on the correct network (devnet/mainnet)
2. Check if wallet extension is installed and unlocked
3. Clear browser cache and reload
4. Try a different wallet provider

### "Insufficient Funds" Error

- On **Devnet**: Get test SOL from the faucet
- On **Mainnet**: Purchase SOL from an exchange and transfer to your wallet

### RPC Connection Issues

- Public RPC endpoints can be slow/unreliable
- Upgrade to a paid RPC provider for production
- Check your RPC endpoint URL is correct

## 📚 Additional Resources

- [Solana Documentation](https://docs.solana.com)
- [Wallet Adapter Docs](https://github.com/solana-labs/wallet-adapter)
- [Phantom Wallet Guide](https://phantom.app/learn)
- [Solana Dev Resources](https://solana.com/developers)

---

**Need Help?** Check the console logs for detailed error messages when debugging wallet connection issues.
