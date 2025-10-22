// React Hook for API Integration
import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api.service';
import {
  User,
  Booking,
  Recommendation,
  UserAnalytics,
  RewardActivity,
  StakingPosition,
} from '../types/api.types';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generic API call wrapper
  const apiCall = useCallback(async <T,>(
    apiFunction: () => Promise<any>,
    onSuccess?: (data: T) => void
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFunction();
      
      if (response.success) {
        if (onSuccess && response.data) {
          onSuccess(response.data);
        }
        return response.data;
      } else {
        setError(response.error?.message || 'An error occurred');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    apiCall,
    apiService,
  };
};

// Hook for user data
export const useUser = (walletAddress: string | null) => {
  const [user, setUser] = useState<User | null>(null);
  const { loading, error, apiCall } = useApi();

  const fetchUser = useCallback(async () => {
    if (!walletAddress) return;
    
    await apiCall<User>(
      () => apiService.getUserProfile(walletAddress),
      setUser
    );
  }, [walletAddress, apiCall]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refreshUser: fetchUser,
  };
};

// Hook for bookings
export const useBookings = (userId: string | null) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { loading, error, apiCall } = useApi();

  const fetchBookings = useCallback(async () => {
    if (!userId) return;
    
    await apiCall<Booking[]>(
      () => apiService.getBookings(userId),
      setBookings
    );
  }, [userId, apiCall]);

  const createBooking = useCallback(async (bookingData: Partial<Booking>) => {
    const result = await apiCall<Booking>(
      () => apiService.createBooking(bookingData)
    );
    
    if (result) {
      setBookings(prev => [...prev, result]);
    }
    
    return result;
  }, [apiCall]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    refreshBookings: fetchBookings,
    createBooking,
  };
};

// Hook for AI recommendations
export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { loading, error, apiCall } = useApi();

  const getParkingRecommendations = useCallback(async (
    location: { lat: number; lng: number },
    dateTime: string,
    duration: number
  ) => {
    await apiCall<Recommendation[]>(
      () => apiService.getParkingRecommendations(location, dateTime, duration),
      setRecommendations
    );
  }, [apiCall]);

  const getHotelRecommendations = useCallback(async (
    location: { lat: number; lng: number },
    checkIn: string,
    checkOut: string,
    guests: number
  ) => {
    await apiCall<Recommendation[]>(
      () => apiService.getHotelRecommendations(location, checkIn, checkOut, guests),
      setRecommendations
    );
  }, [apiCall]);

  return {
    recommendations,
    loading,
    error,
    getParkingRecommendations,
    getHotelRecommendations,
  };
};

// Hook for analytics
export const useAnalytics = (userId: string | null) => {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const { loading, error, apiCall } = useApi();

  const fetchAnalytics = useCallback(async () => {
    if (!userId) return;
    
    await apiCall<UserAnalytics>(
      () => apiService.getUserAnalytics(userId),
      setAnalytics
    );
  }, [userId, apiCall]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    loading,
    error,
    refreshAnalytics: fetchAnalytics,
  };
};

// Hook for rewards
export const useRewards = (userId: string | null) => {
  const [rewards, setRewards] = useState<RewardActivity[]>([]);
  const { loading, error, apiCall } = useApi();

  const fetchRewards = useCallback(async () => {
    if (!userId) return;
    
    await apiCall<RewardActivity[]>(
      () => apiService.getRewardHistory(userId),
      setRewards
    );
  }, [userId, apiCall]);

  const claimDailyReward = useCallback(async () => {
    if (!userId) return null;
    
    const reward = await apiCall<RewardActivity>(
      () => apiService.claimDailyReward(userId)
    );
    
    if (reward) {
      setRewards(prev => [reward, ...prev]);
    }
    
    return reward;
  }, [userId, apiCall]);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  return {
    rewards,
    loading,
    error,
    refreshRewards: fetchRewards,
    claimDailyReward,
  };
};

// Hook for staking
export const useStaking = (userId: string | null) => {
  const [stakingPositions, setStakingPositions] = useState<StakingPosition[]>([]);
  const { loading, error, apiCall } = useApi();

  const fetchStakingPositions = useCallback(async () => {
    if (!userId) return;
    
    await apiCall<StakingPosition[]>(
      () => apiService.getStakingPositions(userId),
      setStakingPositions
    );
  }, [userId, apiCall]);

  const createStakingPosition = useCallback(async (amount: number, duration: number) => {
    if (!userId) return null;
    
    const position = await apiCall<StakingPosition>(
      () => apiService.createStakingPosition(userId, amount, duration)
    );
    
    if (position) {
      setStakingPositions(prev => [...prev, position]);
    }
    
    return position;
  }, [userId, apiCall]);

  useEffect(() => {
    fetchStakingPositions();
  }, [fetchStakingPositions]);

  return {
    stakingPositions,
    loading,
    error,
    refreshStaking: fetchStakingPositions,
    createStakingPosition,
  };
};
