# Security Notes for Production Deployment

## ⚠️ Critical Security Issues to Address Before Production

### 1. Membership QR Code Signing (CRITICAL)

**Current Implementation (Demo Only):**
- QR codes are signed client-side using a hardcoded `SECRET_KEY`
- Anyone can inspect the code, extract the key, and forge membership QR codes
- Users can create fake memberships with elevated tiers and extended expiry dates

**Production Requirements:**
1. **Move QR generation to backend**
   - Generate and sign QR codes server-side with a private key
   - Use proper JWT libraries with RSA/ECDSA signing (e.g., `jsonwebtoken` with RS256)
   - Store private keys securely (environment variables, key management service)

2. **Implement verification endpoint**
   ```typescript
   // Backend endpoint example
   POST /api/membership/verify-qr
   Body: { qrToken: string }
   Response: { valid: boolean, membershipData?: MembershipData }
   ```

3. **Use proper cryptographic signatures**
   - Replace simple `btoa()` hash with HMAC-SHA256 or RSA signatures
   - Include nonce/timestamp to prevent replay attacks
   - Consider adding device binding for additional security

### 2. Apple Wallet & Google Wallet Pass Generation

**Current Implementation (Placeholder):**
- Buttons show alert dialogs instead of generating actual passes
- Pass data is generated client-side but never sent to wallet services

**Production Requirements:**

#### Apple Wallet (.pkpass files):
1. **Apple Developer Account Setup**
   - Enroll in Apple Developer Program ($99/year)
   - Create Pass Type ID certificate in Developer Portal
   - Download and store signing certificate (.p12 file)

2. **Backend Implementation**
   ```typescript
   // Backend endpoint
   POST /api/wallet/apple/generate-pass
   Body: { membershipId: string, walletAddress: string }
   Response: .pkpass file download
   ```

3. **Required Steps**
   - Install `passkit-generator` or similar library
   - Create pass template with images (logo, icon, background)
   - Sign pass bundle with Apple certificate
   - Serve with correct MIME type: `application/vnd.apple.pkpass`
   - Implement update/notification service for pass updates

#### Google Wallet Integration:
1. **Google Cloud Setup**
   - Create Google Cloud project
   - Enable Google Wallet API
   - Create service account and download JSON key
   - Register issuer account in Google Pay & Wallet Console

2. **Backend Implementation**
   ```typescript
   // Backend endpoint
   POST /api/wallet/google/generate-jwt
   Body: { membershipId: string, walletAddress: string }
   Response: { jwtToken: string, walletUrl: string }
   ```

3. **Required Steps**
   - Install `@google-pay/passes` or use REST API directly
   - Create pass class (template) via API
   - Generate signed JWT with service account credentials
   - Return "Add to Google Wallet" URL with JWT

### 3. Blockchain Verification

**Current Gap:**
- QR codes don't verify on-chain membership status
- No connection between Solana wallet and membership verification

**Production Requirements:**
1. **On-chain verification**
   - Query Solana program to verify subscription status
   - Check actual expiry date from blockchain account
   - Verify tier matches on-chain data

2. **Sync mechanism**
   - Periodically sync membership data with blockchain
   - Update wallet passes when tier changes
   - Invalidate QR codes when subscription expires

### 4. Data Privacy & Compliance

**Considerations:**
1. **Wallet Address Exposure**
   - QR codes contain full wallet addresses
   - Consider privacy implications for users
   - Option: Use anonymized IDs that map to wallet addresses server-side

2. **GDPR/Privacy Requirements**
   - Implement data deletion for expired memberships
   - Provide user control over QR code generation
   - Add privacy policy for wallet pass data

### 5. Rate Limiting & Abuse Prevention

**Production Safeguards:**
1. **QR Generation Limits**
   - Rate limit QR code generation (e.g., 10 per hour per user)
   - Prevent automated scraping/farming

2. **Verification Limits**
   - Rate limit verification endpoint
   - Implement CAPTCHA for repeated failed verifications
   - Monitor for suspicious scanning patterns

## Implementation Checklist for Production

### Backend Services Required:
- [ ] QR code generation endpoint with private key signing
- [ ] QR code verification endpoint with signature validation
- [ ] Apple Wallet pass generation service
- [ ] Google Wallet JWT generation service
- [ ] Blockchain sync service for membership status
- [ ] Pass update/notification service

### Security Measures:
- [ ] Move all signing operations to backend
- [ ] Use environment variables for secrets
- [ ] Implement proper JWT validation (not just decoding)
- [ ] Add rate limiting on all endpoints
- [ ] Set up monitoring/alerting for suspicious activity
- [ ] Add audit logging for membership verifications

### Apple Wallet Setup:
- [ ] Apple Developer account enrollment
- [ ] Pass Type ID creation
- [ ] Certificate generation and secure storage
- [ ] Pass template design (logo, colors, layout)
- [ ] Update service implementation (for pass changes)

### Google Wallet Setup:
- [ ] Google Cloud project creation
- [ ] Google Wallet API enablement
- [ ] Service account creation
- [ ] Issuer account registration
- [ ] Pass class creation via API

### Testing:
- [ ] Security audit of QR signing/verification
- [ ] Penetration testing for forgery attempts
- [ ] Load testing for verification endpoints
- [ ] End-to-end testing: QR generation → scanning → verification
- [ ] Wallet pass testing on iOS and Android devices

## Temporary Workarounds (Development Only)

The current implementation uses client-side signing for development/demo purposes only. To test the flow:

1. Generate QR code in app
2. Copy QR code data manually
3. Paste into scanner to verify
4. Observe membership tier and benefits display

**DO NOT deploy current implementation to production without addressing the security issues above.**

## References

- [Apple Wallet Developer Guide](https://developer.apple.com/documentation/walletpasses)
- [Google Wallet API Documentation](https://developers.google.com/wallet)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Solana Program Security](https://docs.solana.com/developing/programming-model/security)
