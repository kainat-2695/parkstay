import { useState } from 'react';
import { Button } from './ui/button';
import { Wallet, Check } from 'lucide-react';
import { toast } from 'sonner';

interface WalletConnectProps {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function WalletConnect({ isConnected, setIsConnected, size = 'default' }: WalletConnectProps) {
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setConnecting(false);
      toast.success('Wallet Connected!', {
        description: 'Demo mode - Using mock wallet',
        duration: 3000,
      });
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info('Wallet Disconnected');
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-green-300 text-sm">
            Demo...Mode
          </span>
        </div>
        <Button
          onClick={handleDisconnect}
          variant="outline"
          size={size}
          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={connecting}
      size={size}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {connecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
