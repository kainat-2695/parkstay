import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UnifiedWalletConnect } from './UnifiedWalletConnect';
import { SubscriptionTiers } from './SubscriptionTiers';
import { AIFeatures } from './AIFeatures';
import { SOLRewardsShowcase } from './SOLRewardsShowcase';
import { PartnershipSection } from './PartnershipSection';
import { AuthModal } from './AuthModal';
import { LiveBadge } from './DemoBanner';
import { DemoModeButton } from './DemoModeButton';
import { Sparkles, Zap, Globe, Shield, ArrowRight, Menu, X, UserCircle, LogIn, LogOut, Home } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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

interface LandingPageProps {
  onNavigateToDashboard: () => void;
  isWalletConnected: boolean;
  setIsWalletConnected: (connected: boolean) => void;
  isDemoMode: boolean;
  setIsDemoMode: (mode: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export function LandingPage({ 
  onNavigateToDashboard, 
  isWalletConnected, 
  setIsWalletConnected, 
  isDemoMode,
  setIsDemoMode,
  user,
  setUser
}: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartTrial = () => {
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewDemo = () => {
    // Navigate to dashboard in demo mode
    onNavigateToDashboard();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 w-full">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-purple-500/20 w-full">
        <div className="w-full max-w-[1600px] mx-auto px-12 py-6">
          <div className="flex items-center gap-12 w-full">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
            >
              <img 
                src="/parkstay-logo.png" 
                alt="ParkStay Pass" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ParkStay Pass
              </span>
            </button>
            
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors text-base">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-purple-400 transition-colors text-base">
                Pricing
              </a>
              <a href="#rewards" className="text-gray-300 hover:text-purple-400 transition-colors text-base">
                Rewards
              </a>
              <a href="#partners" className="text-gray-300 hover:text-purple-400 transition-colors text-base">
                Partners
              </a>
              
              <div className="ml-auto flex items-center gap-4">
                <DemoModeButton 
                  isDemoMode={isDemoMode} 
                  onToggle={() => setIsDemoMode(!isDemoMode)}
                />
                
                <UnifiedWalletConnect 
                  isDemoMode={isDemoMode}
                  isConnected={isWalletConnected}
                  setIsConnected={setIsWalletConnected}
                />
                
                {user ? (
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
                      <DropdownMenuItem onClick={onNavigateToDashboard} className="text-slate-300 focus:bg-slate-800">
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-slate-300 focus:bg-slate-800">
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-800" />
                      <DropdownMenuItem 
                        onClick={() => {
                          setUser(null);
                          toast.success('Signed out successfully!');
                        }} 
                        className="text-red-400 focus:bg-slate-800 focus:text-red-300"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    variant="outline"
                    className="border-purple-500/50 hover:bg-purple-500/10"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                )}
                
                {isWalletConnected && (
                  <Button 
                    onClick={onNavigateToDashboard} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-11 px-6"
                  >
                    Dashboard
                  </Button>
                )}
              </div>
            </nav>
            
            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              onAuthSuccess={setUser}
            />

            <button 
              className="lg:hidden text-white ml-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-28 w-full"></div>

      {/* Hero Section */}
      <section className="w-full py-40 px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center w-full">
            <div className="mb-10 flex justify-center">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 px-6 py-2 text-base">
                Powered by Solana Blockchain
              </Badge>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight leading-tight mb-10">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                One Subscription,
              </span>
              <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mt-4">
                Unlimited Possibilities
              </span>
            </h1>
            
            <p className="text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16">
              Seamless parking and hotel stays worldwide with AI-powered recommendations and blockchain-secured SOL rewards
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-32">
              <Button 
                size="lg" 
                onClick={handleStartTrial}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xl h-16 px-12 rounded-2xl shadow-2xl shadow-purple-500/50"
              >
                Start Free Trial
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleViewDemo}
                className="border-2 border-purple-500/50 hover:border-purple-400 text-xl h-16 px-12 rounded-2xl text-purple-300 hover:bg-purple-500/10"
              >
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { label: 'Active Users', value: '50K+' },
                { label: 'Partner Locations', value: '1,000+' },
                { label: 'SOL Distributed', value: '10K+' },
                { label: 'Countries', value: '25+' }
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-purple-500/20 hover:border-purple-500/50 transition-colors text-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                      {stat.value}
                    </div>
                    <div className="text-base text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Large spacing */}
      <div className="h-40 w-full"></div>

      {/* Features Section */}
      <section id="features" className="w-full py-40 px-12 bg-slate-900/50">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-28">
            <h2 className="text-6xl font-bold text-white mb-10">
              Why Choose ParkStay Pass?
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of travel with blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: Globe,
                title: 'Global Access',
                description: 'Access 1,000+ parking locations and hotels across 25+ countries worldwide',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Sparkles,
                title: 'AI Recommendations',
                description: 'Get personalized suggestions based on your travel patterns and preferences',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Shield,
                title: 'Blockchain Security',
                description: 'Your rewards and transactions are secured by Solana blockchain technology',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105 duration-300 text-center">
                <CardHeader className="pb-6 pt-10">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8 shadow-2xl mx-auto`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white text-3xl mb-6">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-lg leading-relaxed px-6">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Large spacing */}
      <div className="h-40 w-full"></div>

      {/* AI Features */}
      <section className="w-full py-40 px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          <AIFeatures />
        </div>
      </section>

      {/* Large spacing */}
      <div className="h-40 w-full"></div>

      {/* Subscription Tiers */}
      <section id="pricing" className="w-full py-40 px-12 bg-slate-900/50">
        <div className="w-full max-w-[1600px] mx-auto">
          <SubscriptionTiers />
        </div>
      </section>

      {/* Large spacing */}
      <div className="h-40 w-full"></div>

      {/* SOL Rewards */}
      <section id="rewards" className="w-full py-40 px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          <SOLRewardsShowcase />
        </div>
      </section>

      {/* Large spacing */}
      <div className="h-40 w-full"></div>

      {/* Partnerships */}
      <section id="partners" className="w-full py-40 px-12 bg-slate-900/50">
        <div className="w-full max-w-[1400px] mx-auto">
          <PartnershipSection />
        </div>
      </section>

      {/* Large spacing */}
      <div className="h-40 w-full"></div>

      {/* CTA Section */}
      <section className="w-full py-40 px-12">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/30 rounded-3xl p-24 text-center backdrop-blur-sm">
              <h2 className="text-7xl font-bold text-white mb-12">
                Ready to Transform Your Travel?
              </h2>
              <p className="text-3xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
                Join thousands of travelers earning SOL while enjoying seamless parking and hotel access worldwide
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <UnifiedWalletConnect 
                  isDemoMode={isDemoMode}
                  isConnected={isWalletConnected}
                  setIsConnected={setIsWalletConnected}
                  size="lg"
                />
                {isWalletConnected && (
                  <Button 
                    onClick={onNavigateToDashboard}
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-16 px-12 text-xl rounded-2xl shadow-2xl shadow-purple-500/50"
                  >
                    Launch Dashboard
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Large spacing */}
      <div className="h-20 w-full"></div>

      {/* Footer */}
      <footer className="w-full border-t border-purple-500/20 py-20 px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">ParkStay Pass</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">
                The world's first blockchain-powered subscription for global parking and hotel access
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 text-xl">Product</h3>
              <ul className="space-y-4 text-base text-gray-400">
                <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#rewards" className="hover:text-purple-400 transition-colors">Rewards</a></li>
                <li><a href="#partners" className="hover:text-purple-400 transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 text-xl">Resources</h3>
              <ul className="space-y-4 text-base text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 text-xl">Legal</h3>
              <ul className="space-y-4 text-base text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 pt-10 text-center text-base text-gray-400">
            <p>&copy; 2025 ParkStay Pass. All rights reserved. Built on Solana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
