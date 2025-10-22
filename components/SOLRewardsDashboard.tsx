import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Coins, TrendingUp, Gift, Zap, ArrowUpRight } from 'lucide-react';

interface SOLRewardsDashboardProps {
  compact?: boolean;
}

export function SOLRewardsDashboard({ compact = false }: SOLRewardsDashboardProps) {
  const recentEarnings = [
    { action: 'Parking Booking', amount: 0.01, time: '2 hours ago', type: 'booking' },
    { action: 'Weekly Streak Bonus', amount: 0.01, time: '1 day ago', type: 'bonus' },
    { action: 'Review Submitted', amount: 0.005, time: '2 days ago', type: 'review' },
    { action: 'Hotel Booking', amount: 0.015, time: '3 days ago', type: 'booking' },
    { action: 'Referral Reward', amount: 0.1, time: '5 days ago', type: 'referral' }
  ];

  const weeklyChallenge = {
    current: 3,
    target: 5,
    reward: 0.05,
    description: 'Complete 5 bookings this week'
  };

  if (compact) {
    return (
      <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            SOL Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-3xl text-white mb-1">2.45 SOL</div>
              <div className="text-sm text-gray-400">Total Earned</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Weekly Progress</span>
                <span className="text-purple-400">{weeklyChallenge.current}/{weeklyChallenge.target}</span>
              </div>
              <Progress value={(weeklyChallenge.current / weeklyChallenge.target) * 100} className="h-2" />
              <div className="text-xs text-gray-500">
                Earn {weeklyChallenge.reward} SOL by completing the challenge
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
              View All Rewards
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardHeader>
            <CardDescription className="text-gray-400">Total SOL Earned</CardDescription>
            <CardTitle className="text-3xl text-white flex items-center gap-2">
              2.45
              <Coins className="w-6 h-6 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <ArrowUpRight className="w-4 h-4" />
              +0.15 this week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardHeader>
            <CardDescription className="text-gray-400">Monthly Earnings</CardDescription>
            <CardTitle className="text-3xl text-white">0.8 SOL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-400">
              On track for Gold tier rewards
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border-orange-500/30">
          <CardHeader>
            <CardDescription className="text-gray-400">Staking Rewards</CardDescription>
            <CardTitle className="text-3xl text-white">7% APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-400">
              Estimated: 0.05 SOL/month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Challenge */}
      <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-white">Weekly Challenge</CardTitle>
                <CardDescription className="text-gray-400">{weeklyChallenge.description}</CardDescription>
              </div>
            </div>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
              +{weeklyChallenge.reward} SOL
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-purple-400">{weeklyChallenge.current} / {weeklyChallenge.target} completed</span>
            </div>
            <Progress value={(weeklyChallenge.current / weeklyChallenge.target) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Earnings */}
      <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Earnings</CardTitle>
          <CardDescription className="text-gray-400">Your latest SOL rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    earning.type === 'booking' ? 'bg-blue-500/20' :
                    earning.type === 'bonus' ? 'bg-purple-500/20' :
                    earning.type === 'review' ? 'bg-green-500/20' :
                    'bg-orange-500/20'
                  }`}>
                    {earning.type === 'booking' ? <Zap className="w-4 h-4 text-blue-400" /> :
                     earning.type === 'bonus' ? <Gift className="w-4 h-4 text-purple-400" /> :
                     earning.type === 'review' ? <TrendingUp className="w-4 h-4 text-green-400" /> :
                     <Coins className="w-4 h-4 text-orange-400" />}
                  </div>
                  <div>
                    <div className="text-white text-sm">{earning.action}</div>
                    <div className="text-xs text-gray-500">{earning.time}</div>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                  +{earning.amount} SOL
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Withdraw SOL</CardTitle>
            <CardDescription className="text-gray-400">
              Transfer your earned SOL to your wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
              Withdraw 2.45 SOL
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Stake SOL</CardTitle>
            <CardDescription className="text-gray-400">
              Earn up to 8% APY on staked SOL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
              Start Staking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
