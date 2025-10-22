import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Coins, TrendingUp, Gift, Trophy, Zap, Flame } from 'lucide-react';

export function SOLRewardsShowcase() {
  const earningMethods = [
    {
      category: 'Base Earning',
      icon: <Coins className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      methods: [
        { action: 'First Booking Bonus', reward: '0.05 SOL', description: 'Welcome to the platform!' },
        { action: 'Monthly Completion', reward: '0.02-0.5 SOL', description: 'Based on subscription tier' },
        { action: 'Perfect Usage Streaks', reward: '0.01 SOL/week', description: 'Consecutive week usage' },
        { action: 'Referral Rewards', reward: '0.1 SOL', description: 'Per successful referral' }
      ]
    },
    {
      category: 'Premium Activities',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      methods: [
        { action: 'City Champion', reward: '0.5 SOL', description: '#1 user in your city monthly' },
        { action: 'Travel Milestone', reward: '1 SOL', description: 'Visit 10+ countries in a year' },
        { action: 'Loyalty Milestone', reward: '2 SOL', description: '2+ years continuous subscription' },
        { action: 'Community Contributions', reward: '0.1-1 SOL', description: 'Helpful community posts' }
      ]
    },
    {
      category: 'Advanced Opportunities',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      methods: [
        { action: 'Liquidity Provision', reward: '15-25% APY', description: 'Provide PSP-SOL liquidity' },
        { action: 'Validator Rewards', reward: '5-7% APY', description: 'Delegate to platform validator' },
        { action: 'Prediction Markets', reward: 'Variable', description: 'Predict travel demand correctly' },
        { action: 'NFT Trading', reward: 'Variable', description: 'Achievement NFT marketplace' }
      ]
    }
  ];

  const stakingTiers = [
    { tier: 'Bronze → Silver', stake: '2 SOL', apy: '6%' },
    { tier: 'Silver → Gold', stake: '5 SOL', apy: '7%' },
    { tier: 'Gold → Platinum', stake: '10 SOL', apy: '8%' }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none">
          Earn Real Cryptocurrency
        </Badge>
        <h2 className="text-4xl md:text-5xl mb-4 text-white">SOL Rewards Ecosystem</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Earn Solana (SOL) cryptocurrency through platform engagement, staking, and DeFi opportunities
        </p>
      </div>

      {/* Earning Methods */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {earningMethods.map((category, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                {category.icon}
              </div>
              <CardTitle className="text-white">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {category.methods.map((method, idx) => (
                  <li key={idx} className="border-l-2 border-purple-500/30 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-white text-sm">{method.action}</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/50 text-xs">
                        {method.reward}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staking Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <CardTitle className="text-white">SOL Staking Pools</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Stake SOL to unlock higher tiers and earn passive income
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stakingTiers.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="text-white">{item.tier}</div>
                    <div className="text-sm text-gray-400">Stake {item.stake}</div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                    {item.apy} APY
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 border-orange-500/30">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <CardTitle className="text-white">Gamification Rewards</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Complete challenges and achievements for bonus SOL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <div className="text-white text-sm">Monthly Travel Challenge</div>
                  <div className="text-xs text-gray-400">Top users share 50 SOL prize pool</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-pink-400 mt-1" />
                <div>
                  <div className="text-white text-sm">Achievement NFTs</div>
                  <div className="text-xs text-gray-400">Earn tradeable NFTs worth 0.5-10 SOL</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <div className="text-white text-sm">Weekly Streak Bonuses</div>
                  <div className="text-xs text-gray-400">Extra 0.01 SOL per consecutive week</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total SOL Distributed', value: '10,000+', icon: <Coins className="w-5 h-5" /> },
          { label: 'Average Monthly Earn', value: '0.3 SOL', icon: <TrendingUp className="w-5 h-5" /> },
          { label: 'Active Stakers', value: '5,000+', icon: <Zap className="w-5 h-5" /> },
          { label: 'NFTs Minted', value: '15,000+', icon: <Trophy className="w-5 h-5" /> }
        ].map((stat, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 text-center">
            <div className="flex justify-center mb-2 text-purple-400">
              {stat.icon}
            </div>
            <div className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
