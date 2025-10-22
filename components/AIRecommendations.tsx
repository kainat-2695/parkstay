import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, MapPin, Hotel, Star, TrendingUp, Cloud } from 'lucide-react';

export function AIRecommendations() {
  const recommendations = [
    {
      type: 'parking',
      title: 'Perfect for Your Meeting',
      location: 'Downtown Parking Plaza',
      reason: 'Based on your calendar event at 2 PM today',
      distance: '0.2 miles from meeting location',
      confidence: 95,
      icon: <MapPin className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'hotel',
      title: 'Best Value This Weekend',
      location: 'Grand Plaza Hotel',
      reason: 'Price dropped 20% for your preferred dates',
      distance: 'Near your favorite restaurants',
      confidence: 88,
      icon: <Hotel className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      type: 'weather',
      title: 'Covered Parking Recommended',
      location: 'Airport Parking Hub',
      reason: 'Rain forecasted for your arrival time',
      distance: 'Covered parking available',
      confidence: 92,
      icon: <Cloud className="w-5 h-5" />,
      color: 'from-gray-500 to-slate-500'
    }
  ];

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-white">AI Recommendations</CardTitle>
            <CardDescription className="text-gray-400">
              Personalized suggestions based on your patterns
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 rounded-lg bg-white/5 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${rec.color} flex items-center justify-center flex-shrink-0`}>
                  {rec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white">{rec.title}</h4>
                      <p className="text-sm text-purple-400">{rec.location}</p>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 flex-shrink-0 ml-2">
                      {rec.confidence}% match
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {rec.reason}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {rec.distance}
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
