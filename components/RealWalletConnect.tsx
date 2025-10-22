import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

interface RealWalletConnectProps {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  setIsWalletConnected?: (connected: boolean) => void;
}

export function RealWalletConnect({ size = 'default', setIsWalletConnected }: RealWalletConnectProps) {
  const { connected } = useWallet();
  
  useEffect(() => {
    if (setIsWalletConnected) {
      setIsWalletConnected(connected);
    }
  }, [connected, setIsWalletConnected]);

  const className = `wallet-adapter-button ${
    size === 'sm' ? 'wallet-adapter-button-sm' :
    size === 'lg' ? 'wallet-adapter-button-lg' :
    'wallet-adapter-button-default'
  }`;

  return (
    <div className="real-wallet-connect">
      <WalletMultiButton className={className} />
      <style>{`
        .wallet-adapter-button {
          background: linear-gradient(to right, rgb(147 51 234), rgb(219 39 119)) !important;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .wallet-adapter-button:hover {
          background: linear-gradient(to right, rgb(126 34 206), rgb(190 24 93)) !important;
        }
        
        .wallet-adapter-button-trigger {
          background: linear-gradient(to right, rgb(147 51 234), rgb(219 39 119)) !important;
        }
        
        .wallet-adapter-modal-wrapper {
          background: rgba(0, 0, 0, 0.8) !important;
        }
        
        .wallet-adapter-modal {
          background: rgb(15 23 42) !important;
          border: 1px solid rgb(100 116 139) !important;
          border-radius: 1rem !important;
        }
        
        .wallet-adapter-modal-title {
          color: white !important;
        }
        
        .wallet-adapter-modal-list {
          background: rgb(15 23 42) !important;
        }
        
        .wallet-adapter-modal-list-more {
          color: rgb(168 85 247) !important;
        }
        
        .wallet-adapter-button-sm {
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        }
        
        .wallet-adapter-button-lg {
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        }
      `}</style>
    </div>
  );
}
