import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Brain, MapPin, Hotel, TrendingUp, Calendar, Cloud } from 'lucide-react';

export function AIFeatures() {
  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl mb-4 text-white">AI-Powered Intelligence</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our advanced AI learns your preferences to provide personalized recommendations
        </p>
      </div>

      <Tabs defaultValue="parking" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-white/5 border border-purple-500/20">
          <TabsTrigger value="parking" className="data-[state=active]:bg-purple-600">
            <MapPin className="w-4 h-4 mr-2" />
            Parking
          </TabsTrigger>
          <TabsTrigger value="hotels" className="data-[state=active]:bg-purple-600">
            <Hotel className="w-4 h-4 mr-2" />
            Hotels
          </TabsTrigger>
          <TabsTrigger value="optimization" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="parking" className="mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Predictive Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                AI predicts parking availability 2-4 hours in advance based on historical patterns,
                events, and real-time data to save you time.
              </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-400" />
                  Weather Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Automatically recommends covered parking during rain or extreme weather conditions
                to protect your vehicle.
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hotels" className="mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  Smart Timing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                AI analyzes millions of bookings to suggest the optimal time to book for best rates
                and availability.
              </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-pink-400" />
                  Preference Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                The system learns your amenity preferences, room types, and location priorities to
                make increasingly accurate suggestions.
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  Route Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Optimizes your travel route by suggesting parking locations with the shortest walking
                distance to your final destination.
              </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Event Awareness
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Provides recommendations around concerts, conferences, and sports events with
                dynamic pricing and availability insights.
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
