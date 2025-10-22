import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Scan, CheckCircle, XCircle, User, Calendar, Trophy } from 'lucide-react';
import { membershipService, MembershipData } from '../services/membership.service';
import { format } from 'date-fns';

export const QRScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<string>('');
  const [verifiedMembership, setVerifiedMembership] = useState<MembershipData | null>(null);
  const [error, setError] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setError('');
    setVerifiedMembership(null);

    if (!scannedData.trim()) {
      setError('Please enter or scan a QR code');
      return;
    }

    // Verify the QR data
    const membership = membershipService.verifyQRData(scannedData);

    if (membership) {
      setVerifiedMembership(membership);
    } else {
      setError('Invalid or expired membership QR code');
    }
  };

  const handleCameraScanner = () => {
    setIsScanning(true);
    // In production, implement actual camera QR scanner using libraries like:
    // - react-qr-scanner
    // - react-qr-reader
    // - html5-qrcode
    alert('Camera scanner coming soon! For now, paste the QR code data manually.');
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScannedData('');
    setVerifiedMembership(null);
    setError('');
  };

  const getTierBenefits = (tier: number) => {
    switch (tier) {
      case 1:
        return { parking: '10 hours/month', hotel: '1 night/month', discount: '5%' };
      case 2:
        return { parking: '50 hours/month', hotel: '3 nights/month', discount: '10%' };
      case 3:
        return { parking: '100 hours/month', hotel: '5 nights/month', discount: '15%' };
      case 4:
        return { parking: 'Unlimited', hotel: '10 nights/month', discount: '20%' };
      default:
        return { parking: 'None', hotel: 'None', discount: '0%' };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="w-5 h-5" />
            Scan Membership QR Code
          </CardTitle>
          <CardDescription>
            Verify member status and check their booking eligibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Paste QR code data or scan using camera"
              value={scannedData}
              onChange={(e) => setScannedData(e.target.value)}
              disabled={isScanning}
            />
            <Button onClick={handleCameraScanner} disabled={isScanning} variant="outline">
              <Scan className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={handleScan} className="w-full" disabled={!scannedData.trim()}>
            Verify Membership
          </Button>

          {error && (
            <Alert variant="destructive">
              <XCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {verifiedMembership && (
        <Card className="border-green-500">
          <CardHeader className="bg-green-500/20 border-b-2 border-green-500/50">
            <CardTitle className="flex items-center gap-2 text-green-300 font-bold text-xl">
              <CheckCircle className="w-6 h-6" />
              Valid Membership Verified
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 bg-slate-800/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-3 rounded border border-slate-600">
                <label className="text-sm text-gray-300 font-semibold flex items-center gap-1 mb-1">
                  <User className="w-4 h-4" />
                  Member ID
                </label>
                <p className="font-bold text-white">{verifiedMembership.membershipId}</p>
              </div>

              <div className="bg-slate-700/50 p-3 rounded border border-slate-600">
                <label className="text-sm text-gray-300 font-semibold flex items-center gap-1 mb-1">
                  <Trophy className="w-4 h-4" />
                  Membership Tier
                </label>
                <Badge
                  className="mt-1 font-bold"
                  style={{
                    backgroundColor: membershipService.getTierColor(verifiedMembership.tier),
                    color: 'white',
                  }}
                >
                  {verifiedMembership.tierName}
                </Badge>
              </div>

              <div className="bg-purple-500/10 p-3 rounded border border-purple-500/30">
                <label className="text-sm text-purple-300 font-semibold mb-1 block">
                  Loyalty Points
                </label>
                <p className="font-bold text-2xl text-purple-200">{verifiedMembership.loyaltyPoints.toLocaleString()}</p>
              </div>

              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                <label className="text-sm text-blue-300 font-semibold mb-1 block">
                  Total Bookings
                </label>
                <p className="font-bold text-2xl text-blue-200">{verifiedMembership.totalBookings}</p>
              </div>

              <div className="md:col-span-2 bg-slate-700/50 p-3 rounded border border-slate-600">
                <label className="text-sm text-gray-300 font-semibold mb-2 block">
                  Wallet Address
                </label>
                <p className="font-mono text-sm break-all text-white">{verifiedMembership.walletAddress}</p>
              </div>

              <div className="bg-slate-700/50 p-3 rounded border border-slate-600">
                <label className="text-sm text-gray-300 font-semibold flex items-center gap-1 mb-1">
                  <Calendar className="w-4 h-4" />
                  Expires On
                </label>
                <p className="font-bold text-lg text-white">
                  {format(new Date(verifiedMembership.expiryDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            <div className="border-t-2 border-slate-600 pt-4 mt-4">
              <h4 className="font-bold text-lg text-white mb-3">Booking Eligibility</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-500/20 p-3 rounded-lg border-2 border-blue-500/40">
                  <p className="text-xs text-blue-300 font-semibold mb-1">Parking Credits</p>
                  <p className="font-bold text-xl text-blue-200">
                    {getTierBenefits(verifiedMembership.tier).parking}
                  </p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-lg border-2 border-purple-500/40">
                  <p className="text-xs text-purple-300 font-semibold mb-1">Hotel Credits</p>
                  <p className="font-bold text-xl text-purple-200">
                    {getTierBenefits(verifiedMembership.tier).hotel}
                  </p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg border-2 border-green-500/40">
                  <p className="text-xs text-green-300 font-semibold mb-1">Discount</p>
                  <p className="font-bold text-xl text-green-200">
                    {getTierBenefits(verifiedMembership.tier).discount}
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={resetScanner} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold">
              Scan Another Code
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
