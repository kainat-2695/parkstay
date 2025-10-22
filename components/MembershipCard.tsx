import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Wallet, Download, Calendar, Trophy, CreditCard, AlertTriangle } from 'lucide-react';
import { MembershipData, membershipService } from '../services/membership.service';
import { format } from 'date-fns';

interface MembershipCardProps {
  membership: MembershipData;
  onAddToAppleWallet?: () => void;
  onAddToGoogleWallet?: () => void;
}

export const MembershipCard: React.FC<MembershipCardProps> = ({
  membership,
  onAddToAppleWallet,
  onAddToGoogleWallet,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const qrData = membershipService.generateQRData(membership);
  const tierColor = membershipService.getTierColor(membership.tier);
  const isExpired = membership.expiryDate < Date.now();

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1a1a1a',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `parkstay-pass-${membership.membershipId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('Failed to download card. Please try again.');
    }
  };

  return (
    <Card className="overflow-hidden">
      <div ref={cardRef}>
        {/* Header with tier gradient - Improved contrast */}
        <div
          className="p-6"
          style={{
            background: `linear-gradient(135deg, ${tierColor} 0%, ${tierColor}dd 100%)`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-white drop-shadow-md" />
              <CardTitle className="text-white text-xl font-bold drop-shadow-md">
                ParkStay Pass Membership
              </CardTitle>
            </div>
            <Badge
              variant={isExpired ? 'destructive' : 'secondary'}
              className="bg-black/30 text-white border-white/40 font-semibold px-3 py-1"
            >
              {membership.tierName}
            </Badge>
          </div>
          <p className="text-base text-white font-medium drop-shadow-sm">
            #{membership.membershipId}
          </p>
        </div>

        <CardContent className="p-6 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Member Info - Improved text visibility */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 font-semibold flex items-center gap-1 mb-2">
                  <Wallet className="w-4 h-4" />
                  Wallet Address
                </label>
                <p className="font-mono text-sm break-all text-white bg-black/30 p-2 rounded border border-gray-600">
                  {membership.walletAddress}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
                  <label className="text-xs text-purple-300 font-semibold flex items-center gap-1 mb-1">
                    <Trophy className="w-3 h-3" />
                    Loyalty Points
                  </label>
                  <p className="text-2xl font-bold text-purple-200">
                    {membership.loyaltyPoints.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                  <label className="text-xs text-blue-300 font-semibold flex items-center gap-1 mb-1">
                    <CreditCard className="w-3 h-3" />
                    Total Bookings
                  </label>
                  <p className="text-2xl font-bold text-blue-200">
                    {membership.totalBookings}
                  </p>
                </div>
              </div>

              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                <label className="text-sm text-gray-300 font-semibold flex items-center gap-1 mb-1">
                  <Calendar className="w-4 h-4" />
                  {isExpired ? 'Expired On' : 'Expires On'}
                </label>
                <p className={`text-lg font-bold ${isExpired ? 'text-red-400' : 'text-white'}`}>
                  {format(new Date(membership.expiryDate), 'MMMM dd, yyyy')}
                </p>
              </div>

              {isExpired && (
                <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-red-300">
                    Your membership has expired. Renew to continue enjoying benefits.
                  </p>
                </div>
              )}
            </div>

            {/* Right: QR Code - Better contrast */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-white p-5 rounded-xl shadow-2xl border-4 border-gray-300">
                <QRCode
                  value={qrData}
                  size={180}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
              <p className="text-sm text-center font-semibold text-gray-300">
                Scan to verify membership
              </p>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Action Buttons - Outside the downloadable area */}
      <CardContent className="p-6 pt-0 bg-gradient-to-br from-slate-900 to-slate-800">
        <Alert className="mb-4 bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <AlertDescription className="text-amber-300 text-sm font-medium">
            <strong>Demo Only:</strong> This QR code uses client-side signing and is not secure for production. 
            Requires server-side implementation. See SECURITY_NOTES.md.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-3">
          <div className="text-sm font-bold text-gray-200 mb-2">
            Add to Your Wallet
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="w-full bg-white/5 hover:bg-white/10 border-white/20 text-white"
              onClick={onAddToAppleWallet}
              disabled={isExpired}
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Add to Apple Wallet"
                className="h-10"
              />
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white/5 hover:bg-white/10 border-white/20 text-white"
              onClick={onAddToGoogleWallet}
              disabled={isExpired}
            >
              <img
                src="https://developers.google.com/static/wallet/images/add-to-google-wallet-button.png"
                alt="Add to Google Wallet"
                className="h-10"
              />
            </Button>
            <Button
              variant="outline"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 text-white font-semibold"
              onClick={handleDownloadCard}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Card
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
