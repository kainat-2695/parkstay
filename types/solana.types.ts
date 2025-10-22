// Solana Type Definitions for ParkStay Pass
import { PublicKey } from '@solana/web3.js';

// User Account Structure (matches Solana program)
export interface UserAccount {
  authority: PublicKey;
  subscriptionTier: number; // 0=None, 1=Bronze, 2=Silver, 3=Gold, 4=Platinum
  subscriptionExpiry: number; // Unix timestamp
  totalBookings: number;
  loyaltyPoints: number;
  solEarned: number; // in lamports
  solStaked: number; // in lamports
  referralCode: string;
  createdAt: number;
}

// Subscription Tiers
export enum SubscriptionTier {
  None = 0,
  Bronze = 1,
  Silver = 2,
  Gold = 3,
  Platinum = 4,
}

export interface SubscriptionDetails {
  tier: SubscriptionTier;
  price: number; // in SOL
  duration: 'monthly' | 'yearly';
  credits: {
    parkingHours: number;
    hotelNights: number;
  };
}

// Booking Types
export interface BookingAccount {
  user: PublicKey;
  partner: PublicKey;
  bookingType: 'parking' | 'hotel';
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  solRewardsEarned: number;
  createdAt: number;
  checkInTime?: number;
  checkOutTime?: number;
  details: ParkingBooking | HotelBooking;
}

export interface ParkingBooking {
  location: string;
  duration: number; // in minutes
  spotType: 'standard' | 'covered' | 'ev_charging' | 'premium';
  price: number;
}

export interface HotelBooking {
  property: string;
  roomType: string;
  nights: number;
  guests: number;
  checkIn: number;
  checkOut: number;
  price: number;
}

// Staking
export interface StakingAccount {
  user: PublicKey;
  stakedAmount: number; // in lamports
  stakingStart: number;
  stakingDuration: number; // in days
  estimatedRewards: number; // in lamports
  status: 'active' | 'completed' | 'withdrawn';
}

// SOL Rewards Pool
export interface SOLRewardsPool {
  totalPoolSize: number;
  distributedRewards: number;
  dailyDistributionLimit: number;
  emergencyPause: boolean;
}

// Transaction Types
export interface TransactionRecord {
  signature: string;
  type: 'registration' | 'subscription' | 'booking' | 'reward' | 'staking' | 'unstaking';
  amount: number; // in lamports
  timestamp: number;
  status: 'success' | 'failed' | 'pending';
  metadata?: any;
}

// Partner Account
export interface PartnerAccount {
  authority: PublicKey;
  partnerType: 'parking' | 'hotel';
  verified: boolean;
  totalEarnings: number;
  rating: number;
  totalBookings: number;
}

// Wallet Connection State
export interface WalletState {
  connected: boolean;
  publicKey: PublicKey | null;
  balance: number; // in SOL
  connecting: boolean;
  disconnecting: boolean;
}

// Program PDAs (Program Derived Addresses)
export interface ProgramPDAs {
  userAccount: PublicKey;
  subscriptionAccount: PublicKey;
  solRewardsPool: PublicKey;
}
