// API Type Definitions for Backend Services

// User Types
export interface User {
  id: string;
  walletAddress: string;
  email?: string;
  profile: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    preferredLanguage: string;
    timezone: string;
  };
  preferences: UserPreferences;
  solanaData: {
    userAccountPDA: string;
    subscriptionPDA?: string;
    totalSOLEarned: number;
    currentSOLBalance: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  parkingPreferences: {
    maxWalkingDistance: number;
    prefersCoveredParking: boolean;
    preferredSpotTypes: string[];
    priceRange: { min: number; max: number };
  };
  hotelPreferences: {
    preferredChains: string[];
    roomTypes: string[];
    amenities: string[];
    priceRange: { min: number; max: number };
    businessTraveler: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  partnerId: string;
  type: 'parking' | 'hotel';
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  details: ParkingBookingDetails | HotelBookingDetails;
  pricing: {
    basePrice: number;
    discounts: Discount[];
    totalPrice: number;
    currency: string;
  };
  solRewardsEarned: number;
  transactionSignature?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParkingBookingDetails {
  location: {
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    spotNumber?: string;
  };
  duration: number; // in minutes
  spotType: 'standard' | 'covered' | 'ev_charging' | 'premium';
  startTime: string;
  endTime: string;
}

export interface HotelBookingDetails {
  property: {
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    roomNumber?: string;
  };
  roomType: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
}

export interface Discount {
  type: string;
  amount: number;
  reason: string;
}

// AI Recommendation Types
export interface Recommendation {
  id: string;
  type: 'parking' | 'hotel';
  name: string;
  address: string;
  price: number;
  rating: number;
  distance?: number; // in meters
  walkingTime?: number; // in minutes
  amenities: string[];
  score: number; // AI confidence score 0-1
  solReward: number;
  reasons: string[];
  availability: 'available' | 'limited' | 'unavailable';
  imageUrl?: string;
}

// Analytics Types
export interface UserAnalytics {
  totalBookings: number;
  totalSpent: number;
  totalSOLEarned: number;
  averageRating: number;
  bookingsByType: {
    parking: number;
    hotel: number;
  };
  monthlyActivity: MonthlyActivity[];
  topLocations: LocationStat[];
}

export interface MonthlyActivity {
  month: string;
  bookings: number;
  spent: number;
  solEarned: number;
}

export interface LocationStat {
  city: string;
  country: string;
  visits: number;
  lastVisit: string;
}

// Partner Types
export interface Partner {
  id: string;
  walletAddress: string;
  businessInfo: {
    name: string;
    type: 'parking' | 'hotel';
    description: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      coordinates: { lat: number; lng: number };
    };
  };
  verified: boolean;
  rating: {
    average: number;
    count: number;
  };
  availability: any;
  pricing: any;
}

// Reward Types
export interface RewardActivity {
  id: string;
  userId: string;
  type: 'booking_reward' | 'referral_bonus' | 'milestone_reward' | 'staking_reward' | 'daily_checkin';
  amount: number; // in SOL
  description: string;
  timestamp: string;
  transactionSignature?: string;
  status: 'pending' | 'completed' | 'failed';
}

// Staking Types
export interface StakingPosition {
  id: string;
  userId: string;
  amount: number; // in SOL
  duration: number; // in days
  apy: number; // percentage
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'withdrawn';
  estimatedRewards: number;
  earnedRewards: number;
  transactionSignature: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Authentication Types
export interface AuthResponse {
  token: string;
  user: User;
  expiresAt: string;
}

export interface WalletSignatureVerification {
  signature: string;
  message: string;
  publicKey: string;
  timestamp: number;
}
