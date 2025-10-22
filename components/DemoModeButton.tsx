import { Button } from './ui/button';
import { AlertCircle, Zap } from 'lucide-react';

interface DemoModeButtonProps {
  isDemoMode: boolean;
  onToggle: () => void;
}

export function DemoModeButton({ isDemoMode, onToggle }: DemoModeButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      className={`flex items-center gap-2 ${
        isDemoMode 
          ? 'border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400' 
          : 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-400'
      }`}
    >
      {isDemoMode ? (
        <>
          <AlertCircle className="w-4 h-4" />
          <span>Demo Mode</span>
        </>
      ) : (
        <>
          <Zap className="w-4 h-4" />
          <span>Live Mode</span>
        </>
      )}
    </Button>
  );
}
