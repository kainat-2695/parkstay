import React, { createContext, useContext, useState, ReactNode } from 'react';

// Mock Solana context for environments that don't support wallet adapters
interface SolanaContextType {
  connected: boolean;
  publicKey: any;
  balance: number;
  solEarned: number;
  userAccount: any;
  userData: any;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  airdropSOL: (amount: number) => Promise<void>;
}

const defaultContext: SolanaContextType = {
  connected: false,
  publicKey: null,
  balance: 0,
  solEarned: 0,
  userAccount: null,
  userData: null,
  loading: false,
  error: null,
  refreshData: async () => {},
  airdropSOL: async () => {},
};

const SolanaContext = createContext<SolanaContextType>(defaultContext);

export const useSolanaContext = () => {
  return useContext(SolanaContext);
};

interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider: React.FC<SolanaProviderProps> = ({ children }) => {
  const [balance] = useState(0);
  const [solEarned] = useState(0);
  const [userAccount] = useState(null);
  const [userData] = useState(null);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const refreshData = async () => {
    // Mock implementation
    console.log('Mock refreshData called');
  };

  const airdropSOL = async (amount: number) => {
    // Mock implementation
    console.log('Mock airdropSOL called with amount:', amount);
  };

  const value: SolanaContextType = {
    connected: false,
    publicKey: null,
    balance,
    solEarned,
    userAccount,
    userData,
    loading,
    error,
    refreshData,
    airdropSOL,
  };

  return <SolanaContext.Provider value={value}>{children}</SolanaContext.Provider>;
};
