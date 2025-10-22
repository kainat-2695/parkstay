// Solana Blockchain Service - Mock Implementation for Figma Make
// This provides a mock implementation that doesn't require @solana/web3.js

import {
  UserAccount,
  BookingAccount,
  StakingAccount,
  TransactionRecord,
  SubscriptionTier,
} from '../types/solana.types';

// Mock PublicKey type
type MockPublicKey = {
  toString(): string;
  toBase58(): string;
};

export class SolanaService {
  private mockMode: boolean = true;

  constructor(rpcUrl?: string) {
    console.log('SolanaService initialized in mock mode');
  }

  // Mock: Get SOL balance
  async getBalance(publicKey: MockPublicKey | any): Promise<number> {
    console.log('Mock getBalance called');
    return 2.5; // Mock 2.5 SOL balance
  }

  // Mock: Airdrop SOL (devnet only)
  async airdrop(publicKey: MockPublicKey | any, amount: number): Promise<string> {
    console.log('Mock airdrop called:', amount, 'SOL');
    return 'mock_transaction_signature';
  }

  // Mock: Get user account
  async getUserAccount(publicKey: MockPublicKey | any): Promise<UserAccount | null> {
    console.log('Mock getUserAccount called');
    return {
      authority: publicKey.toString(),
      subscriptionTier: SubscriptionTier.Silver,
      subscriptionExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000,
      totalBookings: 15,
      loyaltyPoints: 1500,
      solEarned: 500_000_000, // 0.5 SOL in lamports
      solStaked: 2_000_000_000, // 2 SOL in lamports
      referralCode: 'MOCK1234',
      createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
    };
  }

  // Mock: Register new user
  async registerUser(publicKey: MockPublicKey | any, referralCode?: string): Promise<string> {
    console.log('Mock registerUser called');
    return 'mock_register_signature';
  }

  // Mock: Subscribe to tier
  async subscribe(
    publicKey: MockPublicKey | any,
    tier: SubscriptionTier,
    duration: 'monthly' | 'yearly',
    paymentAmount: number
  ): Promise<string> {
    console.log('Mock subscribe called:', tier, duration);
    return 'mock_subscribe_signature';
  }

  // Mock: Create booking
  async createBooking(
    publicKey: MockPublicKey | any,
    bookingType: 'parking' | 'hotel',
    details: any,
    price: number
  ): Promise<string> {
    console.log('Mock createBooking called:', bookingType);
    return 'mock_booking_signature';
  }

  // Mock: Get bookings
  async getBookings(publicKey: MockPublicKey | any): Promise<BookingAccount[]> {
    console.log('Mock getBookings called');
    return [
      {
        user: publicKey as any,
        partner: publicKey as any,
        bookingType: 'parking',
        status: 'completed',
        solRewardsEarned: 50_000,
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        details: { location: 'Downtown', duration: 120, spotType: 'standard', price: 5_000_000 } as any
      },
      {
        user: publicKey as any,
        partner: publicKey as any,
        bookingType: 'hotel',
        status: 'active',
        solRewardsEarned: 500_000,
        createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        details: { property: 'Grand Hotel', roomType: 'Deluxe', nights: 2, guests: 2, checkIn: Date.now(), checkOut: Date.now() + 86400000, price: 50_000_000 } as any
      },
    ];
  }

  // Mock: Stake SOL
  async stakeSOL(
    publicKey: MockPublicKey | any,
    amount: number,
    durationDays: number
  ): Promise<string> {
    console.log('Mock stakeSOL called:', amount, 'SOL for', durationDays, 'days');
    return 'mock_stake_signature';
  }

  // Mock: Unstake SOL
  async unstakeSOL(publicKey: MockPublicKey | any, stakingAccountKey: string): Promise<string> {
    console.log('Mock unstakeSOL called');
    return 'mock_unstake_signature';
  }

  // Mock: Get staking accounts
  async getStakingAccounts(publicKey: MockPublicKey | any): Promise<StakingAccount[]> {
    console.log('Mock getStakingAccounts called');
    return [
      {
        user: publicKey as any,
        stakedAmount: 2_000_000_000, // 2 SOL
        stakingStart: Date.now() - 30 * 24 * 60 * 60 * 1000,
        stakingDuration: 90,
        estimatedRewards: 120_000_000, // 0.12 SOL
        status: 'active',
      },
    ];
  }

  // Mock: Claim daily reward
  async claimDailyReward(publicKey: MockPublicKey | any): Promise<string> {
    console.log('Mock claimDailyReward called');
    return 'mock_daily_reward_signature';
  }

  // Mock: Get transaction history
  async getTransactionHistory(publicKey: MockPublicKey | any): Promise<TransactionRecord[]> {
    console.log('Mock getTransactionHistory called');
    return [
      {
        signature: 'mock_sig_1',
        type: 'reward',
        amount: 50_000,
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        status: 'success',
      },
      {
        signature: 'mock_sig_2',
        type: 'staking',
        amount: 120_000_000,
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
        status: 'success',
      },
    ];
  }

  // Mock: Get subscription info
  async getSubscriptionInfo(publicKey: MockPublicKey | any) {
    console.log('Mock getSubscriptionInfo called');
    return {
      tier: SubscriptionTier.Silver,
      autoRenewal: false,
      parkingCredits: 35,
      hotelCredits: 3,
      nextBillingDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };
  }
}

// Export singleton instance
export const solanaService = new SolanaService();
