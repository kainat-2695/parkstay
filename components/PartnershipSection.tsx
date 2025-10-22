import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Building2, ParkingCircle, Hotel, Coins } from 'lucide-react';

export function PartnershipSection() {
  const partnerCategories = [
    {
      title: 'Parking Partners',
      icon: <ParkingCircle className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      partners: ['Airport Parking Co', 'City Parking Auth', 'ParkMate', 'EV Charge Stations'],
      benefits: ['Instant SOL settlements', 'Real-time availability', 'Dynamic pricing']
    },
    {
      title: 'Hotel Partners',
      icon: <Hotel className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      partners: ['Hilton', 'Marriott', 'Holiday Inn', 'Boutique Hotels'],
      benefits: ['Global payment in SOL', 'Automated refunds', 'Loyalty amplification']
    },
    {
      title: 'Solana Ecosystem',
      icon: <Coins className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      partners: ['Raydium', 'Orca', 'Marinade Finance', 'Magic Eden'],
      benefits: ['Liquidity pools', 'NFT marketplace', 'Staking integration']
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none">
          Powered by Global Network
        </Badge>
        <h2 className="text-4xl md:text-5xl mb-4 text-white">Partnership Ecosystem</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Collaborating with industry leaders and blockchain innovators worldwide
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {partnerCategories.map((category, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                {category.icon}
              </div>
              <CardTitle className="text-white">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Featured Partners:</div>
                  <div className="flex flex-wrap gap-2">
                    {category.partners.map((partner, idx) => (
                      <Badge key={idx} variant="outline" className="border-purple-500/30 text-gray-300">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Key Benefits:</div>
                  <ul className="space-y-1">
                    {category.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Partner Locations', value: '1,000+' },
          { label: 'Cities Covered', value: '50+' },
          { label: 'Countries', value: '25+' },
          { label: 'DeFi Integrations', value: '10+' }
        ].map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg p-6 border border-purple-500/20 text-center">
            <div className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
