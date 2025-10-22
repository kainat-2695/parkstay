import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Zap, Crown, Gem, Star } from 'lucide-react';
import { toast } from 'sonner';

const tiers = [
  {
    name: 'Bronze',
    price: 29,
    yearlyPrice: 299,
    icon: Star,
    color: 'from-amber-700 to-amber-500',
    features: [
      '20 hours parking credits monthly',
      '2 budget hotel nights per month',
      'Basic AI recommendations',
      '1x loyalty point multiplier',
      '0.1 SOL monthly bonus for 100% usage'
    ],
    popular: false
  },
  {
    name: 'Silver',
    price: 79,
    yearlyPrice: 799,
    icon: Zap,
    color: 'from-slate-400 to-slate-300',
    features: [
      '50 hours parking credits monthly',
      '5 mid-range hotel nights per month',
      'Advanced AI recommendations',
      '2x loyalty point multiplier',
      'Priority booking access',
      '0.3 SOL monthly + streak bonuses'
    ],
    popular: true
  },
  {
    name: 'Gold',
    price: 199,
    yearlyPrice: 1999,
    icon: Crown,
    color: 'from-yellow-500 to-amber-400',
    features: [
      'Unlimited parking (selected zones)',
      '10 premium hotel nights per month',
      'Premium AI concierge service',
      '3x loyalty point multiplier',
      'Exclusive partner benefits',
      'VIP support',
      '0.8 SOL monthly + milestone rewards'
    ],
    popular: false
  },
  {
    name: 'Platinum',
    price: 399,
    yearlyPrice: 3999,
    icon: Gem,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Global unlimited parking access',
      '15 luxury hotel nights per month',
      'Personal AI travel assistant',
      '5x loyalty point multiplier',
      'Luxury brand partnerships',
      '2 SOL monthly + exclusive NFT rewards',
      'Governance tokens + voting rights',
      'Access to 8% APY SOL staking'
    ],
    popular: false
  }
];

export function SubscriptionTiers() {
  const handleSelectTier = (tierName: string) => {
    toast.success(`${tierName} plan selected!`, {
      description: 'Connect your wallet to complete your subscription.',
      duration: 4000
    });
  };

  return (
    <div className="w-full">
      <div className="text-center mb-28">
        <div className="mb-10 flex justify-center">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 px-6 py-2 text-base">
            Flexible Plans for Every Traveler
          </Badge>
        </div>
        <h2 className="text-6xl font-bold text-white mb-10">
          Choose Your Plan
        </h2>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Select the perfect tier for your travel needs and start earning SOL rewards
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 items-start">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div key={tier.name} className="w-full flex flex-col">
              {tier.popular && (
                <div className="mb-3 flex justify-center">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none px-5 py-2 shadow-lg text-sm">
                    Most Popular
                  </Badge>
                </div>
              )}
              {!tier.popular && (
                <div className="mb-3 h-10"></div>
              )}
              <Card
                className={`relative bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex-1 ${
                  tier.popular ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/30' : ''
                }`}
              >
                <CardHeader className="pb-8 pt-12 text-center">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-8 shadow-2xl mx-auto`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white text-4xl mb-8">{tier.name}</CardTitle>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-6xl font-bold text-white">${tier.price}</span>
                      <span className="text-gray-400 text-xl">/month</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      or ${tier.yearlyPrice}/year <span className="text-green-400 font-medium">(save 15%)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-8 pb-10">
                  <ul className="space-y-4 mb-10 text-left">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                        <span className="text-base text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleSelectTier(tier.name)}
                    className={`w-full h-14 rounded-2xl font-semibold text-base transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/50'
                        : 'bg-white/10 hover:bg-white/20 border border-purple-500/30'
                    }`}
                  >
                    Choose {tier.name}
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <p className="text-gray-400 text-lg">
          All plans include 14-day free trial • Cancel anytime • No hidden fees
        </p>
      </div>
    </div>
  );
}
