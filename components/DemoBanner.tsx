import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertCircle, Zap, X } from 'lucide-react';

interface DemoBannerProps {
  isDemoMode: boolean;
  onTurnOffDemo?: () => void;
}

export function DemoBanner({ isDemoMode, onTurnOffDemo }: DemoBannerProps) {
  if (!isDemoMode) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <AlertCircle className="w-4 h-4 text-white animate-pulse" />
        <span className="text-white text-sm">
          <strong>DEMO MODE</strong> - Using mock data for demonstration
        </span>
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
          Test Environment
        </Badge>
        {onTurnOffDemo && (
          <Button
            onClick={onTurnOffDemo}
            size="sm"
            variant="secondary"
            className="h-6 px-3 bg-white/90 hover:bg-white text-amber-600 border-0 ml-2"
          >
            <X className="w-3 h-3 mr-1" />
            Turn Off Demo
          </Button>
        )}
      </div>
    </div>
  );
}

export function LiveBadge({ isDemoMode }: DemoBannerProps) {
  return (
    <Badge 
      variant="outline"
      className={isDemoMode 
        ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' 
        : 'border-green-500/50 text-green-400 bg-green-500/10'
      }
    >
      {isDemoMode ? (
        <>
          <AlertCircle className="w-3 h-3 mr-1 animate-pulse" />
          Demo Mode
        </>
      ) : (
        <>
          <Zap className="w-3 h-3 mr-1" />
          Live Mode
        </>
      )}
    </Badge>
  );
}
