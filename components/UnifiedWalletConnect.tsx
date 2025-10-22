import { RealWalletConnect } from './RealWalletConnect';
import { WalletConnect } from './WalletConnect';

interface UnifiedWalletConnectProps {
  isDemoMode: boolean;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function UnifiedWalletConnect({ 
  isDemoMode, 
  isConnected, 
  setIsConnected, 
  size = 'default' 
}: UnifiedWalletConnectProps) {
  if (isDemoMode) {
    // Demo Mode - Use mock wallet
    return (
      <WalletConnect 
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        size={size}
      />
    );
  }

  // Live Mode - Use real Solana wallet
  return <RealWalletConnect size={size} setIsWalletConnected={setIsConnected} />;
}
