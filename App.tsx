import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { RealSolanaProvider } from './providers/RealSolanaProvider';
import { SolanaProvider } from './providers/SolanaProvider';
import { Toaster } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider?: string;
}

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const WalletProviderComponent = demoMode ? SolanaProvider : RealSolanaProvider;

  return (
    <WalletProviderComponent>
      <div className="min-h-screen bg-background">
        {showDashboard ? (
          <Dashboard 
            onNavigateToLanding={() => setShowDashboard(false)} 
            isWalletConnected={isWalletConnected}
            setIsWalletConnected={setIsWalletConnected}
            isDemoMode={demoMode}
            setIsDemoMode={setDemoMode}
            user={user}
            setUser={setUser}
          />
        ) : (
          <LandingPage 
            onNavigateToDashboard={() => setShowDashboard(true)}
            isWalletConnected={isWalletConnected}
            setIsWalletConnected={setIsWalletConnected}
            isDemoMode={demoMode}
            setIsDemoMode={setDemoMode}
            user={user}
            setUser={setUser}
          />
        )}
        <Toaster position="top-right" richColors />
      </div>
    </WalletProviderComponent>
  );
}

export default App;
