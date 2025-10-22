import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Hotel, Calendar as CalendarIcon, Clock, Star, Zap, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface BookingInterfaceProps {
  userTier: string;
}

export function BookingInterface({ userTier }: BookingInterfaceProps) {
  const [bookingType, setBookingType] = useState<'parking' | 'hotel'>('parking');
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState('');

  const handleBooking = () => {
    toast.success(`${bookingType === 'parking' ? 'Parking' : 'Hotel'} booked successfully!`, {
      description: `You've earned 0.01 SOL reward. Transaction confirmed on Solana.`
    });
  };

  const parkingRecommendations = [
    {
      name: 'Downtown Parking Plaza',
      address: '123 Main Street',
      distance: '0.3 miles',
      price: 'Included',
      rating: 4.8,
      availability: 'High',
      features: ['Covered', 'EV Charging', 'Security']
    },
    {
      name: 'Central Station Garage',
      address: '456 Center Ave',
      distance: '0.5 miles',
      price: 'Included',
      rating: 4.6,
      availability: 'Medium',
      features: ['24/7 Access', 'Valet Service']
    },
    {
      name: 'Airport Parking Hub',
      address: '789 Airport Rd',
      distance: '2.1 miles',
      price: 'Included',
      rating: 4.9,
      availability: 'High',
      features: ['Shuttle', 'Long-term', 'Covered']
    }
  ];

  const hotelRecommendations = [
    {
      name: 'Grand Plaza Hotel',
      address: '100 Luxury Blvd',
      distance: '1.2 miles',
      price: 'Included',
      rating: 4.9,
      category: 'Luxury',
      features: ['Pool', 'Spa', 'Restaurant', 'Gym']
    },
    {
      name: 'Business Inn Downtown',
      address: '200 Corporate St',
      distance: '0.8 miles',
      price: 'Included',
      rating: 4.5,
      category: 'Business',
      features: ['WiFi', 'Meeting Rooms', 'Gym']
    },
    {
      name: 'Comfort Suites',
      address: '300 Comfort Lane',
      distance: '1.5 miles',
      price: 'Included',
      rating: 4.3,
      category: 'Budget',
      features: ['Breakfast', 'WiFi', 'Parking']
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Recommendation Banner */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-white">AI-Powered Recommendations</CardTitle>
              <CardDescription className="text-gray-400">
                Based on your travel patterns and preferences
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={bookingType} onValueChange={(value) => setBookingType(value as 'parking' | 'hotel')}>
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-purple-500/20">
          <TabsTrigger value="parking" className="data-[state=active]:bg-purple-600">
            <MapPin className="w-4 h-4 mr-2" />
            Parking
          </TabsTrigger>
          <TabsTrigger value="hotel" className="data-[state=active]:bg-purple-600">
            <Hotel className="w-4 h-4 mr-2" />
            Hotels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="parking" className="space-y-6">
          {/* Search Form */}
          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Find Parking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Enter address or place"
                      className="pl-10 bg-white/5 border-purple-500/30 text-white"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input 
                      type="date"
                      className="pl-10 bg-white/5 border-purple-500/30 text-white"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Duration</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-purple-500/30">
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600">
                <Navigation className="w-4 h-4 mr-2" />
                Search Nearby Parking
              </Button>
            </CardContent>
          </Card>

          {/* Parking Recommendations */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingRecommendations.map((parking, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{parking.name}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm mt-1">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {parking.address}
                      </CardDescription>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                      {parking.distance}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{parking.rating}</span>
                      </div>
                      <Badge className={`${
                        parking.availability === 'High' ? 'bg-green-500/20 text-green-300 border-green-500/50' :
                        'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                      }`}>
                        {parking.availability} Availability
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {parking.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="border-purple-500/30 text-xs text-gray-400">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Price:</span>
                        <span className="text-green-400">{parking.price}</span>
                      </div>
                      <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hotel" className="space-y-6">
          {/* Search Form */}
          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Find Hotels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="City or hotel name"
                      className="pl-10 bg-white/5 border-purple-500/30 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Check-in</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input 
                      type="date"
                      className="pl-10 bg-white/5 border-purple-500/30 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Check-out</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input 
                      type="date"
                      className="pl-10 bg-white/5 border-purple-500/30 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Guests</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-purple-500/30">
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600">
                <Hotel className="w-4 h-4 mr-2" />
                Search Hotels
              </Button>
            </CardContent>
          </Card>

          {/* Hotel Recommendations */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotelRecommendations.map((hotel, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{hotel.name}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm mt-1">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {hotel.address}
                      </CardDescription>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                      {hotel.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{hotel.rating}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{hotel.distance} away</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {hotel.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="border-purple-500/30 text-xs text-gray-400">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Price:</span>
                        <span className="text-green-400">{hotel.price}</span>
                      </div>
                      <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
