# ParkStay Pass

## Overview

ParkStay Pass is a blockchain-powered Web3 travel platform built on Solana. Its primary purpose is to combine global parking access, hotel reservations, AI-driven recommendations, and cryptocurrency rewards within a single application. The platform incorporates a tiered subscription model (Bronze, Silver, Gold, Platinum) offering SOL token rewards, staking capabilities, and gamification elements. The application is a React-based single-page application with real Solana blockchain integration and support for multiple wallet providers. It also includes a demo mode for testing without live blockchain connectivity.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**October 21, 2025 - Netlify Deployment Configuration**
- Configured app for Netlify deployment with Solana Devnet connectivity
- Created netlify.toml with optimized build settings, security headers, and caching
- Updated vite.config.ts with ES2020 target (required for BigInt/Solana libraries)
- Added code splitting for React, UI components, and Solana libraries
- Production build tested and verified (builds successfully)
- Created comprehensive NETLIFY_DEPLOYMENT.md deployment guide
- Environment variables configured for Devnet in netlify.toml
- Demo mode remains fully functional with toggle capability
- Build output optimized with separate vendor chunks for better caching

**October 20, 2025 - Authentication & Logout Enhancement**
- Added success toast notifications for login and logout actions
- Fixed logout functionality with LogOut icon import
- Improved user feedback with "Signed out successfully!" message
- Login shows "Signed in successfully!" confirmation

**October 20, 2025 - Demo Mode Toggle Button**
- Added clickable Demo/Live Mode toggle button in landing page header
- Button shows current mode with color-coded styling (green for Live, amber for Demo)
- Users can easily switch between Demo Mode (testing) and Live Mode (real blockchain)
- Includes icon indicators (Zap for Live, AlertCircle for Demo)

**October 20, 2025 - Production-Ready Wallet Configuration**
- Changed default mode from Demo to Live Mode (real Solana wallets)
- App now connects to real Solana blockchain by default
- Added environment variable support for network selection (devnet/testnet/mainnet-beta)
- Enhanced RealSolanaProvider with custom RPC endpoint configuration
- Created comprehensive PRODUCTION_SETUP.md guide for deployment
- Configured for Phantom, Solflare, Torus, and Ledger wallet support
- Ready for Devnet testing with real wallets
- Includes instructions for upgrading to Mainnet for production

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript and Vite.
**UI Component System**: Shadcn/UI (Radix UI primitives with Tailwind CSS) for a comprehensive, responsive, and dark mode-supported component library.
**State Management**: Local React state, Context providers (for SolanaProvider), and Jotai for atomic state.
**Routing**: Client-side navigation between Landing Page and Dashboard.
**Wallet Integration**: Dual-mode system supporting a mock Demo Mode and a Live Mode with real Solana wallet adapters (Phantom, Solflare, Torus, Ledger).

### Blockchain Integration

**Solana Network**: Configurable for Mainnet, Devnet, and Testnet, with Devnet as default for development. RPC endpoints are configurable via environment variables.
**Wallet Adapters**: Utilizes `@solana/wallet-adapter-react` and `@solana/wallet-adapter-react-ui` for seamless wallet connections.
**Smart Contract Interactions**: Services handle user registration, subscriptions, bookings, and staking, including transaction signing and confirmation.
**Key Features**: User account management with PDAs, subscription tier management, booking system with SOL rewards, staking pools, and referral/loyalty programs.

### Service Layer Architecture

**Solana Service**: Abstracts blockchain operations, including balance queries and transactions.
**API Service**: Mock backend API with RESTful endpoints for user management and bookings.
**AI Recommendation Service**: Provides AI-powered parking and hotel recommendations based on location and user preferences.
**Backend Mock Service**: In-memory data simulation for CRUD operations during testing.

### Component Architecture

**Page-Level Components**: `LandingPage` (marketing/authentication) and `Dashboard` (main application interface).
**Feature Components**: `BookingInterface`, `SOLRewardsDashboard`, `StakingDashboard`, `AIRecommendations`, `SubscriptionTiers`.
**Shared Components**: `UnifiedWalletConnect`, `WalletCard`, `AuthModal`, `DemoBanner`, `DemoModeToggle`.

### Type System

**TypeScript Definitions**: Comprehensive type definitions (`solana.types.ts`, `api.types.ts`) ensure type safety across the application.

### Authentication & Authorization

**Multi-Provider Authentication**: Supports Solana wallet-based authentication, traditional email/password, and OAuth (Google, GitHub, Apple).
**Security Considerations**: Includes client-side QR signing for digital membership cards (with server-side implementation noted as a future requirement for production).

### Build & Development

**Build System**: Vite with TypeScript for fast HMR and optimized production builds.
**Development Server**: Configured for port 5000 with host 0.0.0.0 for Replit compatibility.
**Production Build**: ES2020 target with code splitting, minification, and vendor chunking.
**Deployment**: Configured for Netlify with automatic deployments, SPA routing, and security headers.

## External Dependencies

### Blockchain & Crypto

- **@solana/web3.js**: Core Solana library.
- **@solana/wallet-adapter-react**, **@solana/wallet-adapter-react-ui**, **@solana/wallet-adapter-wallets**, **@solana/wallet-adapter-base**: Solana wallet integration.
- **@project-serum/anchor**: Solana program development framework.
- **bs58**: Base58 encoding.
- **tweetnacl**: Cryptographic signatures.

### UI Framework & Components

- **React**: Core UI library.
- **Radix UI components**: Accessible UI primitives (e.g., accordion, dialog, forms).
- **Tailwind CSS**: Utility-first CSS framework.
- **class-variance-authority**, **clsx**: UI utility libraries.
- **lucide-react**: Icon library.
- **embla-carousel-react**: Carousel component.
- **vaul**: Drawer component.
- **sonner**: Toast notifications.
- **react-day-picker**: Date picker.
- **react-qr-code**: QR code generation.
- **html2canvas**: For capturing screenshots to download membership cards.

### State & Data Management

- **Jotai**: Atomic state management.
- **date-fns**: Date manipulation.

### Development & Build Tools

- **Vite**: Build tool and dev server.
- **TypeScript**: Type-safe JavaScript.
- **ESLint**: Code linting.
- **PostCSS**: CSS processing.

### Backend (Planned/Mocked)

- **Express**: Web server framework.
- **Mongoose**: MongoDB object modeling.
- **Redis**: Caching layer.
- **jsonwebtoken**: JWT authentication.
- **bcrypt**: Password hashing.
- **cors**, **helmet**, **express-rate-limit**: Security and middleware.
- **winston**: Logging.
- **joi**: Request validation.
- **axios**: HTTP client.

### Environment Configuration

- **VITE_SOLANA_NETWORK**: Solana network selection.
- **VITE_SOLANA_RPC_URL**: Custom RPC endpoint.
- **VITE_ENABLE_DEMO_MODE**: Toggle demo mode.
- **VITE_API_URL**: Backend API endpoint.
- **VITE_PROGRAM_ID**: Solana program ID.

### External Services (Planned Integration)

- **MongoDB**: Database.
- **Redis**: Caching and session management.
- **Solana RPC Providers**: Blockchain node access.
- **AI/ML Services**: Recommendation engine.
- **Payment Gateways**: Fiat on/off-ramp.
- **External APIs**: Weather, calendar, location services.