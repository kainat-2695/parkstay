import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Hotel, Clock, CheckCircle } from 'lucide-react';

interface ActivityHistoryProps {
  limit?: number;
}

export function ActivityHistory({ limit }: ActivityHistoryProps) {
  const activities = [
    {
      type: 'parking',
      location: 'Downtown Parking Plaza',
      address: '123 Main Street, New York',
      date: '2025-10-10',
      time: '14:30',
      duration: '2 hours',
      status: 'completed',
      solEarned: 0.01
    },
    {
      type: 'hotel',
      location: 'Grand Plaza Hotel',
      address: '100 Luxury Blvd, Miami',
      date: '2025-10-08',
      time: 'Check-in 15:00',
      duration: '2 nights',
      status: 'completed',
      solEarned: 0.015
    },
    {
      type: 'parking',
      location: 'Airport Parking Hub',
      address: '789 Airport Rd, Los Angeles',
      date: '2025-10-05',
      time: '09:00',
      duration: '8 hours',
      status: 'completed',
      solEarned: 0.01
    },
    {
      type: 'hotel',
      location: 'Business Inn Downtown',
      address: '200 Corporate St, Chicago',
      date: '2025-10-03',
      time: 'Check-in 14:00',
      duration: '1 night',
      status: 'completed',
      solEarned: 0.015
    },
    {
      type: 'parking',
      location: 'Central Station Garage',
      address: '456 Center Ave, Boston',
      date: '2025-10-01',
      time: '11:00',
      duration: '4 hours',
      status: 'completed',
      solEarned: 0.01
    },
    {
      type: 'hotel',
      location: 'Comfort Suites',
      address: '300 Comfort Lane, Seattle',
      date: '2025-09-28',
      time: 'Check-in 16:00',
      duration: '3 nights',
      status: 'completed',
      solEarned: 0.02
    }
  ];

  const displayActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white">Activity History</CardTitle>
        <CardDescription className="text-gray-400">
          Your recent bookings and transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activity.type === 'parking' 
                  ? 'bg-blue-500/20' 
                  : 'bg-purple-500/20'
              }`}>
                {activity.type === 'parking' ? (
                  <MapPin className="w-5 h-5 text-blue-400" />
                ) : (
                  <Hotel className="w-5 h-5 text-purple-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="text-white">{activity.location}</h4>
                    <p className="text-sm text-gray-400">{activity.address}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/50 flex-shrink-0 ml-2">
                    +{activity.solEarned} SOL
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.date} at {activity.time}
                  </div>
                  <div>Duration: {activity.duration}</div>
                  <div className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="w-3 h-3" />
                    {activity.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {limit && activities.length > limit && (
          <div className="mt-4 text-center">
            <button className="text-purple-400 hover:text-purple-300 text-sm">
              View all {activities.length} activities →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
