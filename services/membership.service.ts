import { SubscriptionTier } from '../types/solana.types';
import encode from 'jwt-encode';

export interface MembershipData {
  walletAddress: string;
  membershipId: string;
  tier: SubscriptionTier;
  tierName: string;
  expiryDate: number;
  loyaltyPoints: number;
  totalBookings: number;
  issueDate: number;
}

export interface MembershipQRData {
  id: string;
  wallet: string;
  tier: number;
  exp: number;
  points: number;
  bookings: number;
  sig: string;
}

class MembershipService {
  private SECRET_KEY = 'parkstay-pass-membership-verification-key';

  // Generate QR code data from membership
  // NOTE: In production, this should be done server-side with proper private key signing
  generateQRData(membership: MembershipData): string {
    const payload: MembershipQRData = {
      id: membership.membershipId,
      wallet: membership.walletAddress,
      tier: membership.tier,
      exp: membership.expiryDate,
      points: membership.loyaltyPoints,
      bookings: membership.totalBookings,
      sig: this.generateSignature(membership),
    };

    // Encode as JWT for security and compactness
    // WARNING: Client-side signing is NOT secure - move to backend in production
    const token = encode(payload, this.SECRET_KEY);
    return token;
  }

  // Verify and decode QR data
  // NOTE: In production, verification should be done server-side with proper JWT validation
  verifyQRData(qrToken: string): MembershipData | null {
    try {
      // Decode JWT (in production, use proper JWT library with verification)
      const decoded = this.decodeToken(qrToken) as MembershipQRData;

      // Verify signature
      const tempMembership: MembershipData = {
        walletAddress: decoded.wallet,
        membershipId: decoded.id,
        tier: decoded.tier,
        tierName: this.getTierName(decoded.tier),
        expiryDate: decoded.exp,
        loyaltyPoints: decoded.points || 0,
        totalBookings: decoded.bookings || 0,
        issueDate: Date.now(),
      };

      const expectedSig = this.generateSignature(tempMembership);
      if (decoded.sig !== expectedSig) {
        console.error('Invalid membership signature');
        return null;
      }

      // Check expiry
      if (decoded.exp < Date.now()) {
        console.error('Membership expired');
        return null;
      }

      return tempMembership;
    } catch (error) {
      console.error('Failed to verify QR data:', error);
      return null;
    }
  }

  // Generate signature for verification
  private generateSignature(membership: MembershipData): string {
    const data = `${membership.walletAddress}:${membership.tier}:${membership.expiryDate}`;
    // Simple hash for demo - use proper crypto in production
    return btoa(data + this.SECRET_KEY).substring(0, 16);
  }

  // Decode JWT token (simplified)
  private decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid token');
      const payload = atob(parts[1]);
      return JSON.parse(payload);
    } catch (error) {
      throw new Error('Failed to decode token');
    }
  }

  // Get tier name from enum
  getTierName(tier: SubscriptionTier): string {
    switch (tier) {
      case SubscriptionTier.Bronze:
        return 'Bronze';
      case SubscriptionTier.Silver:
        return 'Silver';
      case SubscriptionTier.Gold:
        return 'Gold';
      case SubscriptionTier.Platinum:
        return 'Platinum';
      default:
        return 'None';
    }
  }

  // Get tier color
  getTierColor(tier: SubscriptionTier): string {
    switch (tier) {
      case SubscriptionTier.Bronze:
        return '#CD7F32';
      case SubscriptionTier.Silver:
        return '#C0C0C0';
      case SubscriptionTier.Gold:
        return '#FFD700';
      case SubscriptionTier.Platinum:
        return '#E5E4E2';
      default:
        return '#718096';
    }
  }

  // Generate Apple Wallet pass data
  generateAppleWalletPassData(membership: MembershipData) {
    return {
      passTypeIdentifier: 'pass.com.parkstay.membership',
      serialNumber: membership.membershipId,
      organizationName: 'ParkStay Pass',
      description: `${membership.tierName} Membership`,
      foregroundColor: 'rgb(255, 255, 255)',
      backgroundColor: this.getTierColor(membership.tier),
      labelColor: 'rgb(255, 255, 255)',
      barcode: {
        message: this.generateQRData(membership),
        format: 'PKBarcodeFormatQR',
        messageEncoding: 'iso-8859-1',
      },
      generic: {
        primaryFields: [
          {
            key: 'member',
            label: 'Member',
            value: membership.walletAddress.substring(0, 8) + '...',
          },
        ],
        secondaryFields: [
          {
            key: 'tier',
            label: 'Tier',
            value: membership.tierName,
          },
          {
            key: 'points',
            label: 'Points',
            value: membership.loyaltyPoints.toString(),
          },
        ],
        auxiliaryFields: [
          {
            key: 'bookings',
            label: 'Bookings',
            value: membership.totalBookings.toString(),
          },
        ],
        backFields: [
          {
            key: 'wallet',
            label: 'Wallet Address',
            value: membership.walletAddress,
          },
          {
            key: 'expiry',
            label: 'Expires',
            value: new Date(membership.expiryDate).toLocaleDateString(),
          },
        ],
      },
    };
  }

  // Generate Google Wallet pass data
  generateGoogleWalletPassData(membership: MembershipData) {
    const issuerId = 'parkstay_issuer_id'; // Replace with actual issuer ID
    const classId = `${issuerId}.parkstay_membership_class`;
    const objectId = `${issuerId}.${membership.membershipId}`;

    return {
      id: objectId,
      classId: classId,
      state: 'ACTIVE',
      heroImage: {
        sourceUri: {
          uri: 'https://storage.googleapis.com/parkstay-assets/hero-image.png',
        },
      },
      textModulesData: [
        {
          header: 'Wallet Address',
          body: membership.walletAddress.substring(0, 12) + '...',
          id: 'wallet',
        },
        {
          header: 'Membership Tier',
          body: membership.tierName,
          id: 'tier',
        },
        {
          header: 'Loyalty Points',
          body: membership.loyaltyPoints.toString(),
          id: 'points',
        },
        {
          header: 'Total Bookings',
          body: membership.totalBookings.toString(),
          id: 'bookings',
        },
      ],
      barcode: {
        type: 'QR_CODE',
        value: this.generateQRData(membership),
      },
      cardTitle: {
        defaultValue: {
          language: 'en-US',
          value: 'ParkStay Pass Membership',
        },
      },
      header: {
        defaultValue: {
          language: 'en-US',
          value: membership.tierName,
        },
      },
      validTimeInterval: {
        start: {
          date: new Date(membership.issueDate).toISOString(),
        },
        end: {
          date: new Date(membership.expiryDate).toISOString(),
        },
      },
    };
  }

  // Generate Google Wallet JWT
  generateGoogleWalletJWT(membership: MembershipData): string {
    const passData = this.generateGoogleWalletPassData(membership);
    
    const claims = {
      iss: 'parkstay-service-account@parkstay.iam.gserviceaccount.com',
      aud: 'google',
      origins: ['https://parkstay.com'],
      typ: 'savetowallet',
      payload: {
        genericObjects: [passData],
      },
    };

    // In production, sign with proper private key
    return encode(claims, this.SECRET_KEY);
  }
}

export const membershipService = new MembershipService();
