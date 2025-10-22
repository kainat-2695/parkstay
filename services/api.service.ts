// Backend API Service - Mock Implementation
import {
  User,
  Booking,
  Recommendation,
  UserAnalytics,
  Partner,
  RewardActivity,
  StakingPosition,
  ApiResponse,
  AuthResponse,
} from '../types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private token: string | null = null;

  // Set authentication token
  setAuthToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Get authentication token
  getAuthToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  // Clear authentication
  clearAuth() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Make authenticated request
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      // In production, this would be a real API call
      // For now, we'll simulate API responses
      return this.mockApiCall<T>(endpoint, options);
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'API_ERROR',
          message: error.message || 'An error occurred',
        },
      };
    }
  }

  // Mock API responses (simulates backend using in-memory mock server)
  private async mockApiCall<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
    // Import mock backend server
    const { backendMockServer } = await import('./backend-mock.service');
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // Parse request body
      const body = options.body ? JSON.parse(options.body as string) : {};

      // Route to appropriate mock server method
      if (endpoint.includes('/auth/login')) {
        const walletAddress = body.publicKey;
        const user = await backendMockServer.getUser(walletAddress);
        return {
          success: true,
          data: {
            token: 'mock_jwt_token_' + Date.now(),
            user,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          } as any,
        };
      }

      if (endpoint.includes('/user/profile')) {
        const match = endpoint.match(/wallet=([^&]+)/);
        const walletAddress = match ? match[1] : '';
        const user = await backendMockServer.getUser(walletAddress);
        return {
          success: true,
          data: user as any,
        };
      }

      if (endpoint.includes('/bookings') && options.method === 'POST') {
        const booking = await backendMockServer.createBooking(body.userId, body);
        return {
          success: true,
          data: booking as any,
        };
      }

      if (endpoint.includes('/bookings') && !options.method) {
        const match = endpoint.match(/userId=([^&]+)/);
        const userId = match ? match[1] : '';
        const bookings = await backendMockServer.getBookings(userId);
        return {
          success: true,
          data: bookings as any,
        };
      }

      if (endpoint.includes('/recommendations/parking')) {
        const params = this.parseQueryParams(endpoint);
        const recommendations = await backendMockServer.getParkingRecommendations(params as any);
        return {
          success: true,
          data: recommendations as any,
        };
      }

      if (endpoint.includes('/recommendations/hotel')) {
        const params = this.parseQueryParams(endpoint);
        const recommendations = await backendMockServer.getHotelRecommendations(params as any);
        return {
          success: true,
          data: recommendations as any,
        };
      }

      if (endpoint.includes('/analytics')) {
        const match = endpoint.match(/user\/([^?]+)/);
        const userId = match ? match[1] : '';
        const analytics = await backendMockServer.getUserAnalytics(userId);
        return {
          success: true,
          data: analytics as any,
        };
      }

      if (endpoint.includes('/rewards/history')) {
        const match = endpoint.match(/userId=([^&]+)/);
        const userId = match ? match[1] : '';
        const rewards = await backendMockServer.getRewards(userId);
        return {
          success: true,
          data: rewards as any,
        };
      }

      if (endpoint.includes('/rewards/daily-checkin')) {
        const reward = await backendMockServer.claimDailyReward(body.userId);
        return {
          success: true,
          data: reward as any,
        };
      }

      if (endpoint.includes('/staking/positions')) {
        const match = endpoint.match(/userId=([^&]+)/);
        const userId = match ? match[1] : '';
        const positions = await backendMockServer.getStakingPositions(userId);
        return {
          success: true,
          data: positions as any,
        };
      }

      if (endpoint.includes('/staking/stake')) {
        const position = await backendMockServer.createStakingPosition(
          body.userId,
          body.amount,
          body.duration
        );
        return {
          success: true,
          data: position as any,
        };
      }

      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Endpoint not found',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: error.message || 'Internal server error',
        },
      };
    }
  }

  private parseQueryParams(url: string): Record<string, any> {
    const params: Record<string, any> = {};
    const queryString = url.split('?')[1];
    if (!queryString) return params;

    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      params[key] = decodeURIComponent(value);
    });

    return params;
  }

  // ============= AUTH ENDPOINTS =============

  async authenticateWallet(
    publicKey: string,
    signature: string,
    message: string
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ publicKey, signature, message }),
    });
  }

  async logout(): Promise<void> {
    this.clearAuth();
  }

  // ============= USER ENDPOINTS =============

  async getUserProfile(walletAddress: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/user/profile?wallet=${walletAddress}`);
  }

  async updateUserProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // ============= BOOKING ENDPOINTS =============

  async getBookings(userId: string): Promise<ApiResponse<Booking[]>> {
    return this.request<Booking[]>(`/bookings?userId=${userId}`);
  }

  async createBooking(bookingData: Partial<Booking>): Promise<ApiResponse<Booking>> {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookingDetails(bookingId: string): Promise<ApiResponse<Booking>> {
    return this.request<Booking>(`/bookings/${bookingId}`);
  }

  async cancelBooking(bookingId: string): Promise<ApiResponse<Booking>> {
    return this.request<Booking>(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
  }

  // ============= AI RECOMMENDATIONS =============

  async getParkingRecommendations(
    location: { lat: number; lng: number },
    dateTime: string,
    duration: number
  ): Promise<ApiResponse<Recommendation[]>> {
    return this.request<Recommendation[]>(
      `/recommendations/parking?lat=${location.lat}&lng=${location.lng}&dateTime=${dateTime}&duration=${duration}`
    );
  }

  async getHotelRecommendations(
    location: { lat: number; lng: number },
    checkIn: string,
    checkOut: string,
    guests: number
  ): Promise<ApiResponse<Recommendation[]>> {
    return this.request<Recommendation[]>(
      `/recommendations/hotel?lat=${location.lat}&lng=${location.lng}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  }

  // ============= ANALYTICS =============

  async getUserAnalytics(userId: string): Promise<ApiResponse<UserAnalytics>> {
    return this.request<UserAnalytics>(`/analytics/user/${userId}`);
  }

  // ============= REWARDS =============

  async getRewardHistory(userId: string): Promise<ApiResponse<RewardActivity[]>> {
    return this.request<RewardActivity[]>(`/rewards/history?userId=${userId}`);
  }

  async claimDailyReward(userId: string): Promise<ApiResponse<RewardActivity>> {
    return this.request<RewardActivity>('/rewards/daily-checkin', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // ============= STAKING =============

  async getStakingPositions(userId: string): Promise<ApiResponse<StakingPosition[]>> {
    return this.request<StakingPosition[]>(`/staking/positions?userId=${userId}`);
  }

  async createStakingPosition(
    userId: string,
    amount: number,
    duration: number
  ): Promise<ApiResponse<StakingPosition>> {
    return this.request<StakingPosition>('/staking/stake', {
      method: 'POST',
      body: JSON.stringify({ userId, amount, duration }),
    });
  }

  // ============= MOCK DATA GENERATORS =============

  private getMockUser(): User {
    return {
      id: 'user_' + Date.now(),
      walletAddress: 'DemoWallet1111111111111111111111111111111',
      email: 'demo@parkstaypass.com',
      profile: {
        firstName: 'Demo',
        lastName: 'User',
        phone: '+1234567890',
        preferredLanguage: 'en',
        timezone: 'America/New_York',
      },
      preferences: {
        parkingPreferences: {
          maxWalkingDistance: 500,
          prefersCoveredParking: true,
          preferredSpotTypes: ['covered', 'ev_charging'],
          priceRange: { min: 5, max: 25 },
        },
        hotelPreferences: {
          preferredChains: ['Hilton', 'Marriott'],
          roomTypes: ['standard', 'deluxe'],
          amenities: ['wifi', 'breakfast', 'gym'],
          priceRange: { min: 100, max: 300 },
          businessTraveler: true,
        },
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
      },
      solanaData: {
        userAccountPDA: 'UserPDA111111111111111111111111111111111',
        subscriptionPDA: 'SubPDA1111111111111111111111111111111111',
        totalSOLEarned: 5.75,
        currentSOLBalance: 12.3,
      },
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  private getMockBookings(): Booking[] {
    return [
      {
        id: 'booking_1',
        userId: 'user_1',
        partnerId: 'partner_1',
        type: 'parking',
        status: 'completed',
        details: {
          location: {
            name: 'Downtown Parking Plaza',
            address: '123 Main St, New York, NY',
            coordinates: { lat: 40.7128, lng: -74.006 },
            spotNumber: 'A-42',
          },
          duration: 180,
          spotType: 'covered',
          startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 180 * 60 * 1000).toISOString(),
        },
        pricing: {
          basePrice: 15,
          discounts: [{ type: 'subscription', amount: 3, reason: 'Silver tier discount' }],
          totalPrice: 12,
          currency: 'USD',
        },
        solRewardsEarned: 0.002,
        transactionSignature: 'tx_mock_signature_1',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'booking_2',
        userId: 'user_1',
        partnerId: 'partner_2',
        type: 'hotel',
        status: 'active',
        details: {
          property: {
            name: 'Grand Plaza Hotel',
            address: '456 Park Ave, New York, NY',
            coordinates: { lat: 40.7589, lng: -73.9851 },
            roomNumber: '1205',
          },
          roomType: 'Deluxe King',
          guests: 2,
          checkIn: new Date().toISOString(),
          checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          nights: 3,
        },
        pricing: {
          basePrice: 450,
          discounts: [{ type: 'subscription', amount: 90, reason: 'Silver tier 20% off' }],
          totalPrice: 360,
          currency: 'USD',
        },
        solRewardsEarned: 0.03,
        transactionSignature: 'tx_mock_signature_2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  private getMockRecommendations(): Recommendation[] {
    return [
      {
        id: 'rec_1',
        type: 'parking',
        name: 'Central Parking Garage',
        address: '789 Broadway, New York, NY',
        price: 18,
        rating: 4.5,
        distance: 250,
        walkingTime: 3,
        amenities: ['covered', 'security', '24/7 access'],
        score: 0.92,
        solReward: 0.002,
        reasons: ['Close to destination', 'High security rating', 'Covered parking'],
        availability: 'available',
        imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400',
      },
      {
        id: 'rec_2',
        type: 'hotel',
        name: 'Metropolitan Suites',
        address: '321 5th Ave, New York, NY',
        price: 220,
        rating: 4.8,
        distance: 500,
        walkingTime: 6,
        amenities: ['wifi', 'breakfast', 'gym', 'pool'],
        score: 0.88,
        solReward: 0.015,
        reasons: ['Excellent reviews', 'Business-friendly', 'Great amenities'],
        availability: 'available',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      },
    ];
  }

  private getMockAnalytics(): UserAnalytics {
    return {
      totalBookings: 47,
      totalSpent: 2340,
      totalSOLEarned: 5.75,
      averageRating: 4.7,
      bookingsByType: {
        parking: 32,
        hotel: 15,
      },
      monthlyActivity: [
        { month: '2024-10', bookings: 8, spent: 450, solEarned: 1.2 },
        { month: '2024-11', bookings: 12, spent: 680, solEarned: 1.8 },
        { month: '2024-12', bookings: 15, spent: 890, solEarned: 2.1 },
        { month: '2025-01', bookings: 12, spent: 620, solEarned: 0.65 },
      ],
      topLocations: [
        { city: 'New York', country: 'USA', visits: 25, lastVisit: new Date().toISOString() },
        { city: 'Los Angeles', country: 'USA', visits: 12, lastVisit: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
        { city: 'San Francisco', country: 'USA', visits: 10, lastVisit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
      ],
    };
  }

  private getMockRewards(): RewardActivity[] {
    return [
      {
        id: 'reward_1',
        userId: 'user_1',
        type: 'booking_reward',
        amount: 0.03,
        description: 'Hotel booking completion bonus',
        timestamp: new Date().toISOString(),
        transactionSignature: 'tx_reward_1',
        status: 'completed',
      },
      {
        id: 'reward_2',
        userId: 'user_1',
        type: 'daily_checkin',
        amount: 0.001,
        description: 'Daily check-in bonus',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        transactionSignature: 'tx_reward_2',
        status: 'completed',
      },
      {
        id: 'reward_3',
        userId: 'user_1',
        type: 'referral_bonus',
        amount: 0.1,
        description: 'Friend referral bonus',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        transactionSignature: 'tx_reward_3',
        status: 'completed',
      },
    ];
  }

  private getMockStakingPositions(): StakingPosition[] {
    return [
      {
        id: 'stake_1',
        userId: 'user_1',
        amount: 5,
        duration: 90,
        apy: 7,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        estimatedRewards: 0.0863,
        earnedRewards: 0.0287,
        transactionSignature: 'tx_stake_1',
      },
      {
        id: 'stake_2',
        userId: 'user_1',
        amount: 2,
        duration: 30,
        apy: 6,
        startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        estimatedRewards: 0.01,
        earnedRewards: 0.01,
        transactionSignature: 'tx_stake_2',
      },
    ];
  }
}

// Export singleton instance
export const apiService = new ApiService();
