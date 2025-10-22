import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

interface WalletCardProps {
  isConnected: boolean;
  isDemoMode: boolean;
}

export function WalletCard({ isConnected, isDemoMode }: WalletCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [realBalance, setRealBalance] = useState<number | null>(null);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (!isDemoMode && publicKey && connection) {
      connection.getBalance(publicKey)
        .then(balance => setRealBalance(balance / LAMPORTS_PER_SOL))
        .catch(err => console.error('Error fetching balance:', err));
    }
  }, [publicKey, connection, isDemoMode]);

  // Wallet data - use real data when available, otherwise mock
  const walletAddress = isDemoMode 
    ? 'Demo...Mode' 
    : (publicKey?.toBase58() || '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');
  
  const solBalance = !isDemoMode && realBalance !== null ? realBalance : 12.5432;
  
  const walletData = {
    address: walletAddress,
    solBalance,
    usdValue: solBalance * 227.5,
    pspTokens: 15420,
    recentTransactions: [
      { type: 'receive', amount: 2.5, token: 'SOL', time: '2 hours ago', usd: 568.75 },
      { type: 'send', amount: 0.5, token: 'SOL', time: '1 day ago', usd: 113.75 },
      { type: 'stake', amount: 5.0, token: 'SOL', time: '3 days ago', usd: 1137.50 },
    ]
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    toast.success('Address copied to clipboard!');
  };

  const viewOnExplorer = () => {
    if (isDemoMode) {
      toast.info('Demo mode - Explorer not available');
    } else {
      window.open(`https://solscan.io/account/${walletData.address}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Wallet className="w-12 h-12 text-slate-600 mb-4" />
          <h3 className="text-slate-400 mb-2">No Wallet Connected</h3>
          <p className="text-slate-500 text-sm mb-4">
            Connect your wallet to view balance and transactions
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white mb-1">My Wallet</h3>
            <div className="flex items-center gap-2">
              <code className="text-xs text-slate-400 bg-slate-950/50 px-2 py-1 rounded">
                {walletData.address.slice(0, 4)}...{walletData.address.slice(-4)}
              </code>
              <Button
                onClick={copyAddress}
                variant="ghost"
                size="icon"
                className="h-6 w-6"
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                onClick={viewOnExplorer}
                variant="ghost"
                size="icon"
                className="h-6 w-6"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <Badge variant="outline" className="border-green-500/30 text-green-400">
          Active
        </Badge>
      </div>

      {/* Balance */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Total Balance</span>
          <Button
            onClick={() => setShowBalance(!showBalance)}
            variant="ghost"
            size="icon"
            className="h-6 w-6"
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
        </div>
        
        {showBalance ? (
          <>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl text-white">{walletData.solBalance.toFixed(4)}</span>
              <span className="text-slate-400">SOL</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <DollarSign className="w-4 h-4" />
              <span>${walletData.usdValue.toLocaleString()}</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">+12.5%</span>
            </div>
          </>
        ) : (
          <div className="py-4">
            <span className="text-2xl text-slate-600">••••••</span>
          </div>
        )}
      </div>

      {/* PSP Tokens */}
      <div className="bg-slate-950/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-sm">PSP Tokens</span>
            <div className="text-xl text-white mt-1">
              {showBalance ? walletData.pspTokens.toLocaleString() : '••••••'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-400">PSP</span>
          </div>
        </div>
      </div>

      <Separator className="mb-6 bg-slate-700" />

      {/* Recent Transactions */}
      <div>
        <h4 className="text-white mb-4 flex items-center gap-2">
          Recent Transactions
          <Badge variant="secondary" className="text-xs">
            {walletData.recentTransactions.length}
          </Badge>
        </h4>
        
        <div className="space-y-3">
          {walletData.recentTransactions.map((tx, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg hover:bg-slate-950 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === 'receive' ? 'bg-green-500/20' :
                  tx.type === 'send' ? 'bg-red-500/20' : 'bg-blue-500/20'
                }`}>
                  {tx.type === 'receive' ? (
                    <ArrowDownRight className="w-4 h-4 text-green-400" />
                  ) : tx.type === 'send' ? (
                    <ArrowUpRight className="w-4 h-4 text-red-400" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div>
                  <div className="text-white text-sm capitalize">{tx.type}</div>
                  <div className="text-slate-500 text-xs">{tx.time}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm ${
                  tx.type === 'receive' ? 'text-green-400' :
                  tx.type === 'send' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                </div>
                <div className="text-slate-500 text-xs">
                  ${tx.usd.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <Button variant="outline" className="w-full">
          Send
        </Button>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Receive
        </Button>
      </div>
    </Card>
  );
}
