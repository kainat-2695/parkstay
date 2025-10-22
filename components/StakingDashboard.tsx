import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, Lock, Unlock, Coins, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface StakingDashboardProps {
  solBalance: number;
  pspTokens: number;
}

export function StakingDashboard({ solBalance, pspTokens }: StakingDashboardProps) {
  const [stakeAmount, setStakeAmount] = useState('');
  const [activePool, setActivePool] = useState<string | null>(null);

  const handleStake = (poolName: string) => {
    toast.success(`Staked ${stakeAmount} tokens in ${poolName}`, {
      description: 'Transaction confirmed on Solana blockchain'
    });
    setStakeAmount('');
  };

  const stakingPools = [
    {
      name: 'Conservative SOL Pool',
      token: 'SOL',
      apy: '5-6%',
      risk: 'Low',
      minStake: 0.1,
      currentStaked: 1.2,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Aggressive SOL Pool',
      token: 'SOL',
      apy: '8-12%',
      risk: 'Moderate',
      minStake: 0.5,
      currentStaked: 0,
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'PSP Token Pool',
      token: 'PSP',
      apy: '15%',
      risk: 'Low',
      minStake: 100,
      currentStaked: 500,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'SOL-PSP Liquidity Pool',
      token: 'SOL-PSP LP',
      apy: '20-25%',
      risk: 'High',
      minStake: 1,
      currentStaked: 0,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const tierUnlocks = [
    { tier: 'Bronze → Silver', stake: 2, apy: '6%', unlocked: false },
    { tier: 'Silver → Gold', stake: 5, apy: '7%', unlocked: false },
    { tier: 'Gold → Platinum', stake: 10, apy: '8%', unlocked: false }
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardHeader>
            <CardDescription className="text-gray-400">Total Staked Value</CardDescription>
            <CardTitle className="text-3xl text-white">$1,245</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-400">
              1.2 SOL + 500 PSP
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardHeader>
            <CardDescription className="text-gray-400">Monthly Rewards</CardDescription>
            <CardTitle className="text-3xl text-white">0.08 SOL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-400">
              ~$6.40 at current price
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
          <CardHeader>
            <CardDescription className="text-gray-400">Average APY</CardDescription>
            <CardTitle className="text-3xl text-white">7.5%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-400">
              Across all pools
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staking Pools */}
      <Tabs defaultValue="pools">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-purple-500/20">
          <TabsTrigger value="pools" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Staking Pools
          </TabsTrigger>
          <TabsTrigger value="tiers" className="data-[state=active]:bg-purple-600">
            <Zap className="w-4 h-4 mr-2" />
            Tier Unlocks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pools" className="space-y-4 mt-6">
          {stakingPools.map((pool, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pool.color} flex items-center justify-center`}>
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{pool.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        Min stake: {pool.minStake} {pool.token}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/50 mb-2">
                      {pool.apy} APY
                    </Badge>
                    <div className="text-xs text-gray-400">Risk: {pool.risk}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-gray-400">Currently Staked:</span>
                    <span className="text-white">{pool.currentStaked} {pool.token}</span>
                  </div>
                  
                  {activePool === pool.name ? (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Amount to Stake</Label>
                        <Input
                          type="number"
                          placeholder={`Min: ${pool.minStake}`}
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="bg-white/5 border-purple-500/30 text-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleStake(pool.name)}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          Confirm Stake
                        </Button>
                        <Button 
                          onClick={() => setActivePool(null)}
                          variant="outline"
                          className="border-purple-500/50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setActivePool(pool.name)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Stake {pool.token}
                      </Button>
                      {pool.currentStaked > 0 && (
                        <Button variant="outline" className="border-purple-500/50">
                          <Unlock className="w-4 h-4 mr-2" />
                          Unstake
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Stake to Unlock Higher Tiers</CardTitle>
              <CardDescription className="text-gray-400">
                Stake SOL to access premium subscription tiers and higher rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tierUnlocks.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-purple-500/20">
                    <div>
                      <div className="text-white">{tier.tier}</div>
                      <div className="text-sm text-gray-400">Stake {tier.stake} SOL</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                        {tier.apy} APY
                      </Badge>
                      {tier.unlocked ? (
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                          Unlocked
                        </Badge>
                      ) : (
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                          Stake Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Staking Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Earn passive SOL income while keeping tier benefits
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Priority access during high-demand booking periods
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Governance voting power in platform decisions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Share in platform fee revenue
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
