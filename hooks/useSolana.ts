// React Hook for Solana Integration
import { useState, useEffect, useCallback } from 'react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { solanaService } from '../services/solana.service';
import { UserAccount, TransactionRecord, SubscriptionTier } from '../types/solana.types';

interface UseSolanaReturn {
  balance: number;
  solEarned: number;
  userAccount: UserAccount | null;
  transactions: TransactionRecord[];
  loading: boolean;
  error: string | null;
  registerUser: (referralCode?: string) => Promise<string>;
  createSubscription: (tier: SubscriptionTier, duration: 'monthly' | 'yearly', amount: number) => Promise<string>;
  createBooking: (partnerPublicKey: string, bookingDetails: any) => Promise<{ signature: string; solRewards: number }>;
  stakeSOL: (amount: number, duration: number) => Promise<string>;
  refreshData: () => Promise<void>;
  airdropSOL: (amount: number) => Promise<string>;
}

export const useSolana = (
  publicKey: PublicKey | null,
  signTransaction?: (tx: Transaction) => Promise<Transaction>
): UseSolanaReturn => {
  const [balance, setBalance] = useState<number>(0);
  const [solEarned, setSolEarned] = useState<number>(0);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's SOL balance
  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;
    
    try {
      const bal = await solanaService.getBalance(publicKey);
      setBalance(bal);
    } catch (err: any) {
      console.error('Error fetching balance:', err);
      setError(err.message);
    }
  }, [publicKey]);

  // Fetch user account data
  const fetchUserAccount = useCallback(async () => {
    if (!publicKey) return;
    
    try {
      const account = await solanaService.getUserAccount(publicKey);
      setUserAccount(account);
      
      if (account) {
        setSolEarned(account.solEarned / 1_000_000_000); // Convert lamports to SOL
      }
    } catch (err: any) {
      console.error('Error fetching user account:', err);
      setError(err.message);
    }
  }, [publicKey]);

  // Fetch transaction history
  const fetchTransactions = useCallback(async () => {
    if (!publicKey) return;
    
    try {
      const txs = await solanaService.getTransactionHistory(publicKey);
      setTransactions(txs);
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
    }
  }, [publicKey]);

  // Refresh all data
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchBalance(),
        fetchUserAccount(),
        fetchTransactions(),
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchBalance, fetchUserAccount, fetchTransactions]);

  // Register user on Solana
  const registerUser = useCallback(async (referralCode?: string): Promise<string> => {
    if (!publicKey || !signTransaction) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const signature = await solanaService.registerUser(publicKey, referralCode);
      await refreshData();
      return signature;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, signTransaction, refreshData]);

  // Create subscription
  const createSubscription = useCallback(async (
    tier: SubscriptionTier,
    duration: 'monthly' | 'yearly',
    amount: number
  ): Promise<string> => {
    if (!publicKey || !signTransaction) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const signature = await solanaService.subscribe(
        publicKey,
        tier,
        duration,
        amount
      );
      await refreshData();
      return signature;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, signTransaction, refreshData]);

  // Create booking
  const createBooking = useCallback(async (
    partnerPublicKey: string,
    bookingDetails: any
  ): Promise<{ signature: string; solRewards: number }> => {
    if (!publicKey || !signTransaction) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const signature = await solanaService.createBooking(
        publicKey,
        bookingDetails.type || 'parking',
        bookingDetails,
        bookingDetails.price || 0
      );
      await refreshData();
      return { signature, solRewards: 0.1 };
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, signTransaction, refreshData]);

  // Stake SOL
  const stakeSOL = useCallback(async (
    amount: number,
    duration: number
  ): Promise<string> => {
    if (!publicKey || !signTransaction) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const signature = await solanaService.stakeSOL(
        publicKey,
        amount,
        duration
      );
      await refreshData();
      return signature;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, signTransaction, refreshData]);

  // Airdrop SOL (devnet/testnet only)
  const airdropSOL = useCallback(async (amount: number): Promise<string> => {
    if (!publicKey) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const signature = await solanaService.airdrop(publicKey, amount);
      await refreshData();
      return signature;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, refreshData]);

  // Load initial data when wallet connects
  useEffect(() => {
    if (publicKey) {
      refreshData();
    } else {
      // Reset state when wallet disconnects
      setBalance(0);
      setSolEarned(0);
      setUserAccount(null);
      setTransactions([]);
    }
  }, [publicKey, refreshData]);

  return {
    balance,
    solEarned,
    userAccount,
    transactions,
    loading,
    error,
    registerUser,
    createSubscription,
    createBooking,
    stakeSOL,
    refreshData,
    airdropSOL,
  };
};
