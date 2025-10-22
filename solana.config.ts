// Solana Configuration
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

// Network configuration
export const SOLANA_NETWORK = import.meta.env.VITE_SOLANA_NETWORK as WalletAdapterNetwork || WalletAdapterNetwork.Devnet;

// RPC endpoints
export const SOLANA_RPC_ENDPOINTS = {
  mainnet: import.meta.env.VITE_SOLANA_RPC_MAINNET || 'https://api.mainnet-beta.solana.com',
  devnet: import.meta.env.VITE_SOLANA_RPC_DEVNET || clusterApiUrl('devnet'),
  testnet: import.meta.env.VITE_SOLANA_RPC_TESTNET || clusterApiUrl('testnet'),
};

// Get current RPC URL based on network
export const SOLANA_RPC_URL = SOLANA_RPC_ENDPOINTS[SOLANA_NETWORK as keyof typeof SOLANA_RPC_ENDPOINTS] || SOLANA_RPC_ENDPOINTS.devnet;

// Program IDs (replace with actual deployed program IDs)
export const PROGRAM_IDS = {
  parkstayPlatform: 'ParkStayPassProgramID11111111111111111111',
  solRewardsPool: 'SolRewardsPool1111111111111111111111111111',
  pspToken: 'PSPTokenMint1111111111111111111111111111111',
  stakingProgram: 'StakingProgram11111111111111111111111111111',
};

// Transaction confirmation commitment level
export const COMMITMENT_LEVEL = 'confirmed' as const;

// SOL conversion
export const LAMPORTS_PER_SOL = 1_000_000_000;

// Reward configuration
export const REWARDS_CONFIG = {
  registrationBonus: 0.05, // SOL
  referralBonus: 0.1, // SOL
  dailyCheckInBonus: 0.001, // SOL
  reviewBonus: 0.005, // SOL
  
  // Booking rewards by tier
  bookingRewards: {
    parking: {
      bronze: 0.001,
      silver: 0.002,
      gold: 0.003,
      platinum: 0.005,
    },
    hotel: {
      bronze: 0.01,
      silver: 0.02,
      gold: 0.03,
      platinum: 0.05,
    },
  },
  
  // Staking APY by duration (in days)
  stakingAPY: {
    30: 0.06,  // 6%
    90: 0.07,  // 7%
    180: 0.075, // 7.5%
    365: 0.08, // 8%
  },
};

// Subscription pricing (in SOL)
export const SUBSCRIPTION_PRICING = {
  bronze: {
    monthly: 0.2, // ~$29 at $150/SOL
    yearly: 2.0,  // ~$299
  },
  silver: {
    monthly: 0.53, // ~$79
    yearly: 5.3,   // ~$799
  },
  gold: {
    monthly: 1.33, // ~$199
    yearly: 13.3,  // ~$1999
  },
  platinum: {
    monthly: 2.66, // ~$399
    yearly: 26.6,  // ~$3999
  },
};

// Wallet adapter configuration
export const WALLET_CONFIG = {
  autoConnect: true,
  network: SOLANA_NETWORK,
  wallets: [
    // Supported wallets will be auto-detected by wallet-adapter
  ],
};
