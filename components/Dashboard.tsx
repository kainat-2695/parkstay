import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UnifiedWalletConnect } from './UnifiedWalletConnect';
import { WalletCard } from './WalletCard';
import { BookingInterface } from './BookingInterface';
import { SOLRewardsDashboard } from './SOLRewardsDashboard';
import { StakingDashboard } from './StakingDashboard';
import { ActivityHistory } from './ActivityHistory';
import { AIRecommendations } from './AIRecommendations';
import { DemoModeToggle } from './DemoModeToggle';
import { LiveBadge } from './DemoBanner';
import { MembershipCard } from './MembershipCard';
import { QRScanner } from './QRScanner';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Zap, Home, Calendar, Coins, TrendingUp, Trophy, 
  Settings, Bell, Menu, X, User, Wallet, LogOut, CreditCard, Scan
} from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
// Logo placeholder - using text instead

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider?: string;
}

interface DashboardProps {
  onNavigateToLanding: () => void;
  isWalletConnected: boolean;
  setIsWalletConnected: (connected: boolean) => void;
  isDemoMode: boolean;
  setIsDemoMode: (mode: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export function Dashboard({ 
  onNavigateToLanding, 
  isWalletConnected, 
  setIsWalletConnected,
  isDemoMode,
  setIsDemoMode,
  user,
  setUser
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock user data
  const userData = {
    tier: 'Gold',
    solBalance: 2.45,
    pspTokens: 1250,
    parkingCredits: 8,
    hotelNights: 6,
    currentStreak: 12,
    totalBookings: 45
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-slate-950/95 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onNavigateToLanding} 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
              >
                <img 
                  src="/parkstay-logo.png" 
                  alt="ParkStay Pass" 
                  className="h-8 w-8 object-contain"
                />
                <span className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ParkStay Pass
                </span>
              </button>
              <Badge className="hidden md:block bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-none">
                {userData.tier} Member
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <LiveBadge isDemoMode={isDemoMode} />
              
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>
              
              <UnifiedWalletConnect 
                isDemoMode={isDemoMode}
                isConnected={isWalletConnected}
                setIsConnected={setIsWalletConnected}
              />
              
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800" align="end">
                    <DropdownMenuLabel className="text-slate-300">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem className="text-slate-300 focus:bg-slate-800">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 focus:bg-slate-800">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem 
                      onClick={() => {
                        setUser(null);
                        toast.success('Signed out successfully!');
                        setTimeout(() => {
                          onNavigateToLanding();
                        }, 500);
                      }} 
                      className="text-red-400 focus:bg-slate-800 focus:text-red-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-gray-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/40">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-200 font-semibold text-sm">SOL Balance</CardDescription>
              <CardTitle className="text-3xl font-bold text-white drop-shadow-md">{userData.solBalance.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-green-300 drop-shadow-sm">+0.15 this week</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/40">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-200 font-semibold text-sm">PSP Tokens</CardDescription>
              <CardTitle className="text-3xl font-bold text-white drop-shadow-md">{userData.pspTokens}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-blue-200 drop-shadow-sm">Staking: 500 PSP</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/40">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-200 font-semibold text-sm">Parking Credits</CardDescription>
              <CardTitle className="text-3xl font-bold text-white drop-shadow-md">{userData.parkingCredits}h</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-emerald-200 drop-shadow-sm">of 10h remaining</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/50 to-amber-900/50 border-orange-500/40">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-200 font-semibold text-sm">Current Streak</CardDescription>
              <CardTitle className="text-3xl font-bold text-white drop-shadow-md">{userData.currentStreak} days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-orange-200 drop-shadow-sm">+0.01 SOL/week</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 bg-white/5 border border-purple-500/20 mb-8">
            <TabsTrigger value="overview" className="text-white font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="booking" className="text-white font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Book</span>
            </TabsTrigger>
            <TabsTrigger value="membership" className="text-white font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Membership</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="text-white font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Coins className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="staking" className="text-white font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Staking</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-white font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6 mb-6">
              <DemoModeToggle 
                isDemoMode={isDemoMode}
                onToggle={setIsDemoMode}
              />
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <AIRecommendations />
                <ActivityHistory limit={5} />
              </div>
              <div className="space-y-6">
                <WalletCard 
                  isConnected={isWalletConnected}
                  isDemoMode={isDemoMode}
                />
                <SOLRewardsDashboard compact />
                <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Tier Benefits</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your {userData.tier} membership includes:
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        Unlimited parking (selected zones)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        10 premium hotel nights/month
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        3x loyalty point multiplier
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        0.8 SOL monthly rewards
                      </li>
                    </ul>
                    <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600">
                      Upgrade to Platinum
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="booking">
            <BookingInterface userTier={userData.tier} />
          </TabsContent>

          <TabsContent value="membership">
            <Alert className="mb-6 bg-amber-500/10 border-amber-500/30">
              <AlertDescription className="text-amber-400">
                <strong>Demo Mode:</strong> Membership QR codes are signed client-side for demonstration only. 
                In production, QR generation and verification must be done server-side with proper cryptographic signing. 
                See SECURITY_NOTES.md for details.
              </AlertDescription>
            </Alert>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <MembershipCard
                  membership={{
                    walletAddress: isWalletConnected 
                      ? '7BgD2kWb9v8KMZxPQJ5vNxL4pR1tS3cY9hF6mA8uE2jK'
                      : 'Connect wallet to view',
                    membershipId: `PSP-${Date.now().toString().slice(-8)}`,
                    tier: userData.tier === 'Bronze' ? 1 : userData.tier === 'Silver' ? 2 : userData.tier === 'Gold' ? 3 : 4,
                    tierName: userData.tier,
                    expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
                    loyaltyPoints: userData.pspTokens,
                    totalBookings: userData.totalBookings,
                    issueDate: Date.now() - 90 * 24 * 60 * 60 * 1000,
                  }}
                  onAddToAppleWallet={() => {
                    alert('Apple Wallet pass generation will be implemented with backend service. This requires Apple Developer account and certificate setup.');
                  }}
                  onAddToGoogleWallet={() => {
                    alert('Google Wallet pass generation will be implemented with backend service. This requires Google Wallet API setup and issuer account.');
                  }}
                />
                <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">How to Use Your Membership Card</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-semibold">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Add to Your Wallet</h4>
                        <p className="text-sm text-gray-400">Click "Add to Apple Wallet" or "Add to Google Wallet" to save your membership card to your phone.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-semibold">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Show at Partner Locations</h4>
                        <p className="text-sm text-gray-400">Present your QR code at any ParkStay partner parking or hotel to verify your membership and apply discounts.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-semibold">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Earn Rewards Automatically</h4>
                        <p className="text-sm text-gray-400">Your SOL rewards and loyalty points are automatically credited to your wallet after each verified booking.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Scan className="w-5 h-5" />
                      Verify Member QR Codes
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      For ParkStay partners and staff to verify member status
                    </CardDescription>
                  </CardHeader>
                </Card>
                <QRScanner />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rewards">
            <SOLRewardsDashboard />
          </TabsContent>

          <TabsContent value="staking">
            <StakingDashboard solBalance={userData.solBalance} pspTokens={userData.pspTokens} />
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'City Explorer', progress: 60, reward: '0.1 SOL', description: 'Visit 5 cities', unlocked: false },
                { name: 'Frequent Parker', progress: 100, reward: '0.2 SOL', description: '100 parking sessions', unlocked: true },
                { name: 'Hotel Connoisseur', progress: 45, reward: '0.3 SOL', description: '50 hotel stays', unlocked: false },
                { name: 'Network Builder', progress: 80, reward: '0.5 SOL', description: '20 referrals', unlocked: false },
                { name: 'Streak Warrior', progress: 100, reward: '0.8 SOL', description: '30-day streak', unlocked: true },
                { name: 'Globe Trotter', progress: 30, reward: '2 SOL + NFT', description: 'Visit 10 countries', unlocked: false }
              ].map((achievement, index) => (
                <Card key={index} className={`${achievement.unlocked ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/50' : 'bg-white/5 border-purple-500/20'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-white text-lg">{achievement.name}</CardTitle>
                      {achievement.unlocked && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-gray-400">{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-purple-400">{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-400">
                        Reward: <span className="text-green-400">{achievement.reward}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <ActivityHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
