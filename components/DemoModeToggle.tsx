import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { AlertCircle, Zap } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface DemoModeToggleProps {
  isDemoMode: boolean;
  onToggle: (enabled: boolean) => void;
  showAlert?: boolean;
}

export function DemoModeToggle({ isDemoMode, onToggle, showAlert = true }: DemoModeToggleProps) {
  return (
    <div className="space-y-4">
      {/* Toggle Control */}
      <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDemoMode ? 'bg-amber-500/20' : 'bg-green-500/20'
          }`}>
            {isDemoMode ? (
              <AlertCircle className="w-5 h-5 text-amber-400" />
            ) : (
              <Zap className="w-5 h-5 text-green-400" />
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white">Mode</span>
              <Badge 
                variant={isDemoMode ? 'outline' : 'default'}
                className={isDemoMode 
                  ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' 
                  : 'bg-green-500/20 text-green-400 border-green-500/50'
                }
              >
                {isDemoMode ? 'Demo' : 'Live'}
              </Badge>
            </div>
            <p className="text-slate-400 text-sm">
              {isDemoMode 
                ? 'Using mock data for testing' 
                : 'Connected to Solana blockchain'}
            </p>
          </div>
        </div>

        <Switch
          checked={!isDemoMode}
          onCheckedChange={(checked) => onToggle(!checked)}
          className="data-[state=checked]:bg-green-500"
        />
      </div>

      {/* Alert */}
      {showAlert && (
        isDemoMode ? (
          <Alert className="border-amber-500/50 bg-amber-500/10">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-300 text-sm">
              You're in <strong>Demo Mode</strong>. All transactions and data are simulated. 
              Switch to Live Mode to connect your real wallet and interact with the Solana blockchain.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-green-500/50 bg-green-500/10">
            <Zap className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-300 text-sm">
              <strong>Live Mode</strong> is active. Your transactions will be processed on the Solana blockchain. 
              Make sure you have a wallet connected to proceed.
            </AlertDescription>
          </Alert>
        )
      )}
    </div>
  );
}
