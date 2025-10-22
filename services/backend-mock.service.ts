/**
 * Mock Backend Server Simulation
 * Simulates a full backend API with in-memory data storage
 * In production, this would be replaced with actual API calls
 */

import { 
  User, 
  Booking, 
  Recommendation, 
  UserAnalytics, 
  RewardActivity,
  StakingPosition,
  Partner 
} from '../types/api.types';

class BackendMockServer {
  // In-memory data storage
  private users: Map<string, User> = new Map();
  private bookings: Map<string, Booking[]> = new Map();
  private rewards: Map<string, RewardActivity[]> = new Map();
  private stakingPositions: Map<string, StakingPosition[]> = new Map();
  private partners: Map<string, Partner> = new Map();

  constructor() {
    this.initializeMockData();
  }

  // Initialize with demo data
  private initializeMockData() {
    // Create demo partners
    this.createDemoPartners();
  }

  // ============= USER OPERATIONS =============

  async createUser(walletAddress: string): Promise<User> {
    const user: User = {
      id: `user_${Date.now()}`,
      walletAddress,
      email: undefined,
      profile: {
        firstName: undefined,
        lastName: undefined,
        phone: undefined,
        preferredLanguage: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      preferences: {
        parkingPreferences: {
          maxWalkingDistance: 500,
          prefersCoveredParking: false,
          preferredSpotTypes: [],
          priceRange: { min: 0, max: 50 },
        },
        hotelPreferences: {
          preferredChains: [],
          roomTypes: [],
          amenities: [],
          priceRange: { min: 50, max: 300 },
          businessTraveler: false,
        },
        notifications: {
          email: false,
          push: true,
          sms: false,
        },
      },
      solanaData: {
        userAccountPDA: `UserPDA_${walletAddress.slice(0, 8)}`,
        totalSOLEarned: 0,
        currentSOLBalance: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.set(walletAddress, user);
    this.bookings.set(user.id, []);
    this.rewards.set(user.id, []);
    this.stakingPositions.set(user.id, []);

    // Award registration bonus
    await this.createReward(user.id, {
      type: 'booking_reward',
      amount: 0.05,
      description: 'Welcome bonus! 🎉',
    });

    return user;
  }

  async getUser(walletAddress: string): Promise<User | null> {
    let user = this.users.get(walletAddress);
    
    // Auto-create user if doesn't exist
    if (!user) {
      user = await this.createUser(walletAddress);
    }
    
    return user;
  }

  async updateUser(walletAddress: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(walletAddress);
    if (!user) throw new Error('User not found');

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.users.set(walletAddress, updatedUser);
    return updatedUser;
  }

  // ============= BOOKING OPERATIONS =============

  async createBooking(userId: string, bookingData: Partial<Booking>): Promise<Booking> {
    const bookings = this.bookings.get(userId) || [];
    
    const booking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      partnerId: bookingData.partnerId || 'partner_demo',
      type: bookingData.type || 'parking',
      status: 'confirmed',
      details: bookingData.details as any,
      pricing: bookingData.pricing || {
        basePrice: 0,
        discounts: [],
        totalPrice: 0,
        currency: 'USD',
      },
      solRewardsEarned: this.calculateBookingRewards(bookingData.type || 'parking'),
      transactionSignature: `tx_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.push(booking);
    this.bookings.set(userId, bookings);

    // Award booking reward
    await this.createReward(userId, {
      type: 'booking_reward',
      amount: booking.solRewardsEarned,
      description: `${booking.type === 'parking' ? 'Parking' : 'Hotel'} booking reward`,
    });

    return booking;
  }

  async getBookings(userId: string): Promise<Booking[]> {
    return this.bookings.get(userId) || [];
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    for (const bookings of this.bookings.values()) {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) return booking;
    }
    return null;
  }

  async cancelBooking(bookingId: string): Promise<Booking> {
    for (const [userId, bookings] of this.bookings.entries()) {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = 'cancelled';
        booking.updatedAt = new Date().toISOString();
        return booking;
      }
    }
    throw new Error('Booking not found');
  }

  // ============= REWARD OPERATIONS =============

  async createReward(userId: string, rewardData: {
    type: RewardActivity['type'];
    amount: number;
    description: string;
  }): Promise<RewardActivity> {
    const rewards = this.rewards.get(userId) || [];
    
    const reward: RewardActivity = {
      id: `reward_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: rewardData.type,
      amount: rewardData.amount,
      description: rewardData.description,
      timestamp: new Date().toISOString(),
      transactionSignature: `tx_reward_${Date.now()}`,
      status: 'completed',
    };

    rewards.unshift(reward); // Add to beginning
    this.rewards.set(userId, rewards);

    // Update user's total SOL earned
    const user = Array.from(this.users.values()).find(u => u.id === userId);
    if (user) {
      user.solanaData.totalSOLEarned += rewardData.amount;
      user.solanaData.currentSOLBalance += rewardData.amount;
      this.users.set(user.walletAddress, user);
    }

    return reward;
  }

  async getRewards(userId: string): Promise<RewardActivity[]> {
    return this.rewards.get(userId) || [];
  }

  async claimDailyReward(userId: string): Promise<RewardActivity> {
    const rewards = this.rewards.get(userId) || [];
    const today = new Date().toDateString();
    
    // Check if already claimed today
    const alreadyClaimed = rewards.some(r => 
      r.type === 'daily_checkin' && 
      new Date(r.timestamp).toDateString() === today
    );

    if (alreadyClaimed) {
      throw new Error('Daily reward already claimed today');
    }

    return await this.createReward(userId, {
      type: 'daily_checkin',
      amount: 0.001,
      description: 'Daily check-in bonus ⭐',
    });
  }

  // ============= STAKING OPERATIONS =============

  async createStakingPosition(
    userId: string,
    amount: number,
    duration: number
  ): Promise<StakingPosition> {
    const stakingPositions = this.stakingPositions.get(userId) || [];
    
    const apy = this.getStakingAPY(duration);
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    const estimatedRewards = (amount * apy * duration) / 365;

    const position: StakingPosition = {
      id: `stake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount,
      duration,
      apy: apy * 100, // Convert to percentage
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'active',
      estimatedRewards,
      earnedRewards: 0,
      transactionSignature: `tx_stake_${Date.now()}`,
    };

    stakingPositions.push(position);
    this.stakingPositions.set(userId, stakingPositions);

    return position;
  }

  async getStakingPositions(userId: string): Promise<StakingPosition[]> {
    const positions = this.stakingPositions.get(userId) || [];
    
    // Update earned rewards based on time passed
    const now = Date.now();
    return positions.map(pos => {
      if (pos.status === 'active') {
        const elapsed = now - new Date(pos.startDate).getTime();
        const totalDuration = new Date(pos.endDate).getTime() - new Date(pos.startDate).getTime();
        const progress = Math.min(elapsed / totalDuration, 1);
        pos.earnedRewards = pos.estimatedRewards * progress;
      }
      return pos;
    });
  }

  // ============= ANALYTICS =============

  async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    const bookings = this.bookings.get(userId) || [];
    const rewards = this.rewards.get(userId) || [];

    const totalSpent = bookings.reduce((sum, b) => sum + b.pricing.totalPrice, 0);
    const totalSOLEarned = rewards.reduce((sum, r) => sum + r.amount, 0);

    // Calculate monthly activity
    const monthlyMap = new Map<string, { bookings: number; spent: number; solEarned: number }>();
    
    bookings.forEach(booking => {
      const month = new Date(booking.createdAt).toISOString().slice(0, 7);
      const existing = monthlyMap.get(month) || { bookings: 0, spent: 0, solEarned: 0 };
      monthlyMap.set(month, {
        bookings: existing.bookings + 1,
        spent: existing.spent + booking.pricing.totalPrice,
        solEarned: existing.solEarned + booking.solRewardsEarned,
      });
    });

    const monthlyActivity = Array.from(monthlyMap.entries())
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => b.month.localeCompare(a.month))
      .slice(0, 6);

    return {
      totalBookings: bookings.length,
      totalSpent,
      totalSOLEarned,
      averageRating: 4.7,
      bookingsByType: {
        parking: bookings.filter(b => b.type === 'parking').length,
        hotel: bookings.filter(b => b.type === 'hotel').length,
      },
      monthlyActivity,
      topLocations: [
        { city: 'New York', country: 'USA', visits: 5, lastVisit: new Date().toISOString() },
        { city: 'San Francisco', country: 'USA', visits: 3, lastVisit: new Date().toISOString() },
      ],
    };
  }

  // ============= AI RECOMMENDATIONS =============

  async getParkingRecommendations(params: {
    location: { lat: number; lng: number };
    dateTime: string;
    duration: number;
    userId?: string;
  }): Promise<Recommendation[]> {
    // Simulate AI processing delay
    await this.delay(800);

    const recommendations: Recommendation[] = [
      {
        id: 'park_1',
        type: 'parking',
        name: 'Downtown Premium Garage',
        address: '123 Main St, Downtown',
        price: 20,
        rating: 4.8,
        distance: 150,
        walkingTime: 2,
        amenities: ['covered', 'security', 'ev_charging', '24/7'],
        score: 0.95,
        solReward: 0.003,
        reasons: [
          'Closest to your destination',
          'Excellent security rating',
          'EV charging available',
        ],
        availability: 'available',
        imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400',
      },
      {
        id: 'park_2',
        type: 'parking',
        name: 'City Center Parking',
        address: '456 Commerce Ave',
        price: 15,
        rating: 4.5,
        distance: 300,
        walkingTime: 4,
        amenities: ['covered', 'security'],
        score: 0.87,
        solReward: 0.002,
        reasons: [
          'Great value for money',
          'High user satisfaction',
        ],
        availability: 'available',
        imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400',
      },
    ];

    return recommendations;
  }

  async getHotelRecommendations(params: {
    location: { lat: number; lng: number };
    checkIn: string;
    checkOut: string;
    guests: number;
    userId?: string;
  }): Promise<Recommendation[]> {
    await this.delay(1000);

    const recommendations: Recommendation[] = [
      {
        id: 'hotel_1',
        type: 'hotel',
        name: 'Grand Plaza Hotel',
        address: '789 Business District',
        price: 250,
        rating: 4.9,
        distance: 200,
        walkingTime: 3,
        amenities: ['wifi', 'breakfast', 'gym', 'pool', 'spa'],
        score: 0.96,
        solReward: 0.025,
        reasons: [
          'Highest rated in area',
          'All premium amenities',
          'Excellent for business',
        ],
        availability: 'available',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      },
      {
        id: 'hotel_2',
        type: 'hotel',
        name: 'Modern City Suites',
        address: '321 Downtown Boulevard',
        price: 180,
        rating: 4.7,
        distance: 350,
        walkingTime: 5,
        amenities: ['wifi', 'breakfast', 'gym'],
        score: 0.89,
        solReward: 0.018,
        reasons: [
          'Great value',
          'Modern amenities',
        ],
        availability: 'limited',
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
      },
    ];

    return recommendations;
  }

  // ============= HELPER METHODS =============

  private calculateBookingRewards(type: 'parking' | 'hotel'): number {
    return type === 'parking' ? 0.002 : 0.02;
  }

  private getStakingAPY(duration: number): number {
    if (duration >= 365) return 0.08;
    if (duration >= 180) return 0.075;
    if (duration >= 90) return 0.07;
    return 0.06;
  }

  private createDemoPartners() {
    // Create some demo partners
    const partners: Partner[] = [
      {
        id: 'partner_demo_parking',
        walletAddress: 'DemoPartnerPark111111111111111111111111',
        businessInfo: {
          name: 'Downtown Premium Parking',
          type: 'parking',
          description: 'Secure covered parking in the heart of downtown',
          address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            coordinates: { lat: 40.7128, lng: -74.006 },
          },
        },
        verified: true,
        rating: {
          average: 4.8,
          count: 1250,
        },
        availability: {},
        pricing: {},
      },
    ];

    partners.forEach(partner => {
      this.partners.set(partner.id, partner);
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ============= ADMIN/DEBUG METHODS =============

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  resetDatabase() {
    this.users.clear();
    this.bookings.clear();
    this.rewards.clear();
    this.stakingPositions.clear();
    this.initializeMockData();
  }
}

// Export singleton instance
export const backendMockServer = new BackendMockServer();
