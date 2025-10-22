import { ReactNode, useMemo, useCallback } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

interface RealSolanaProviderProps {
  children: ReactNode;
}

export function RealSolanaProvider({ children }: RealSolanaProviderProps) {
  // Use environment variable for network selection, default to devnet for testing
  // For production: Set VITE_SOLANA_NETWORK=mainnet-beta in environment
  const networkFromEnv = import.meta.env.VITE_SOLANA_NETWORK || 'devnet';
  const network = networkFromEnv === 'mainnet-beta' 
    ? WalletAdapterNetwork.Mainnet 
    : networkFromEnv === 'testnet'
    ? WalletAdapterNetwork.Testnet
    : WalletAdapterNetwork.Devnet;

  // Use custom RPC endpoint from environment or fallback to public endpoint
  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Mainnet && import.meta.env.VITE_SOLANA_RPC_MAINNET) {
      return import.meta.env.VITE_SOLANA_RPC_MAINNET;
    }
    if (network === WalletAdapterNetwork.Testnet && import.meta.env.VITE_SOLANA_RPC_TESTNET) {
      return import.meta.env.VITE_SOLANA_RPC_TESTNET;
    }
    if (network === WalletAdapterNetwork.Devnet && import.meta.env.VITE_SOLANA_RPC_DEVNET) {
      return import.meta.env.VITE_SOLANA_RPC_DEVNET;
    }
    return clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  // Error handler for wallet errors
  const onError = useCallback((error: Error) => {
    console.error('Wallet error:', error);
    // Don't throw - just log the error
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
