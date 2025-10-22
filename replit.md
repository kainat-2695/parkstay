# ParkStay Pass

## Overview

ParkStay Pass is a blockchain-powered Web3 travel platform built on Solana that combines global parking access, hotel reservations, AI-driven recommendations, and cryptocurrency rewards into a single subscription service. The platform offers tiered memberships (Bronze, Silver, Gold, Platinum) with gamified rewards, SOL token earnings, staking opportunities, and digital membership cards with QR verification.

The application is currently production-ready for frontend deployment in demo mode, with real Solana wallet integration available for testing on Devnet. Backend API and smart contracts are scaffolded but require implementation and deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript and Vite build tooling.

**UI System**: Shadcn/ui component library built on Radix UI primitives, styled with Tailwind CSS. Dark mode enabled by default with responsive layouts optimized for mobile and desktop.

**State Management**: React Context API for global state (wallet connection, user authentication, demo/live mode toggling). Local component state with React hooks for feature-specific data.

**Routing**: Single-page application (SPA) with client-side navigation between Landing Page and Dashboard views. No React Router dependency - uses conditional rendering based on state.

**Design Rationale**: Chose a component-based architecture for reusability and maintainability. Vite provides fast development builds and optimized production bundles with code splitting. Shadcn/ui offers accessible, customizable components without runtime overhead.

### Blockchain Integration Layer

**Solana Wallet Adapter**: Integration with `@solana/wallet-adapter-react` for connecting to Phantom, Solflare, Torus, and Ledger wallets. Supports both demo mode (mock wallet) and live mode (real blockchain).

**Network Configuration**: Configurable via environment variables - supports Devnet (default for testing), Testnet, and Mainnet-beta. Custom RPC endpoints supported through env vars for production use with services like Helius, QuickNode, or Alchemy.

**Dual-Mode Architecture**: 
- **Demo Mode**: Uses `SolanaProvider` with mock blockchain interactions for testing without real wallets
- **Live Mode**: Uses `RealSolanaProvider` with actual Solana wallet connections and blockchain transactions

**Design Rationale**: Demo mode allows users to explore features without crypto knowledge or wallet setup. Live mode provides production-ready blockchain integration. Environment-based configuration enables easy deployment across networks.

### Service Layer

**Blockchain Services** (`services/solana.service.ts`):
- User account management (registration, subscription, profile)
- Booking transactions with SOL rewards distribution
- Staking operations and reward calculations
- Transaction history and balance tracking
- Mock implementation provided for environments without Solana dependencies

**API Services** (`services/api.service.ts`):
- RESTful API wrapper for backend communication
- JWT-based authentication with token management
- User profile, booking, and analytics endpoints
- Currently mock implementation - designed for future backend integration

**AI Services** (`services/ai.service.ts`):
- Personalized parking and hotel recommendations
- Predictive availability using historical patterns
- Weather-based suggestions
- Mock implementation with structured scoring algorithm

**Membership Services** (`services/membership.service.ts`):
- QR code generation for digital membership cards
- JWT-based membership verification
- Apple Wallet and Google Wallet pass generation (placeholder)
- **Security Note**: Client-side QR signing is demo-only; production requires server-side signing with proper cryptographic keys

**Design Rationale**: Service layer abstracts business logic from UI components. Mock implementations allow frontend development without backend dependencies. Clear interfaces defined for future production API integration.

### Data Models

**TypeScript Types** (`types/`):
- **Solana Types**: User accounts, bookings, staking positions, subscription tiers matching smart contract schemas
- **API Types**: User profiles, preferences, recommendations, analytics, rewards
- **Strict typing** throughout codebase for compile-time safety

### Authentication System

**Multi-Provider Support**: Email/password authentication with OAuth integration placeholders for Google, GitHub, and Apple.

**Wallet-Based Auth**: Optional authentication via Solana wallet address as primary identifier.

**Session Management**: JWT tokens stored in localStorage with auto-expiration. User state managed via React Context.

**Design Rationale**: Flexible authentication supports both traditional Web2 users (email) and Web3 users (wallet). Allows gradual onboarding without forcing blockchain knowledge upfront.

### Component Architecture

**Landing Page**: Hero section, feature showcase, subscription tiers, AI capabilities, partnership section, and wallet connection.

**Dashboard**: Tabbed interface for bookings, rewards, staking, activity history, membership card, and QR scanner.

**Reusable Components**: Wallet connection (unified for demo/live), booking interface, rewards dashboard, staking interface, activity history, AI recommendations, membership card with QR code.

**Design Rationale**: Component composition allows feature independence and testing. Unified wallet component abstracts demo/live complexity from parent components.

## External Dependencies

### Blockchain Infrastructure

**Solana Web3.js**: Core library for Solana blockchain interactions, transaction building, and account management.

**Wallet Adapters**: 
- `@solana/wallet-adapter-react` - React hooks for wallet integration
- `@solana/wallet-adapter-react-ui` - Pre-built wallet connection UI
- `@solana/wallet-adapter-wallets` - Wallet-specific adapters (Phantom, Solflare, etc.)

**Network**: Currently configured for Solana Devnet (testing). Supports upgrade to Mainnet-beta via environment variables.

### UI Component Libraries

**Radix UI**: Headless, accessible component primitives (Dialog, Dropdown, Tabs, etc.) providing ARIA-compliant foundation without styling opinions.

**Shadcn/ui**: Pre-styled component layer built on Radix UI with Tailwind CSS classes. MIT licensed, copy-paste components without package bloat.

**Lucide React**: Icon library with consistent styling and tree-shaking support.

### Utility Libraries

**Tailwind CSS**: Utility-first CSS framework for responsive design and theming.

**Class Variance Authority (CVA)**: Type-safe component variant management for UI components.

**Date-fns**: Date manipulation and formatting with tree-shaking support.

**html2canvas**: Client-side screenshot generation for membership card downloads.

**QR Code Generation**: `react-qr-code` for digital membership QR codes.

**Toast Notifications**: `sonner` for user feedback and success/error messages.

### Development Tools

**Vite**: Build tool with fast HMR and optimized production builds. Configured for ES2020 target (required for BigInt support in Solana libraries).

**TypeScript**: Type safety with strict mode enabled for compile-time error detection.

**Buffer Polyfill**: Required for Solana wallet adapter browser compatibility.

### Backend (Not Yet Deployed)

**Planned Stack**:
- **Runtime**: Node.js with Express.js REST API
- **Database**: MongoDB for user data, bookings, analytics (schema designed, not deployed)
- **Caching**: Redis for session management and rate limiting
- **Authentication**: JWT with bcrypt password hashing
- **Security**: Helmet middleware, CORS, rate limiting with `express-rate-limit`

**Current Status**: Skeleton code and type definitions exist in `/backend` directory. Requires implementation, database setup, and deployment.

### Smart Contracts (Not Yet Deployed)

**Anchor Framework**: Rust-based framework for Solana program development.

**Planned Programs**:
- `parkstay_platform` - Core user management and subscription logic
- `sol_rewards_pool` - Rewards distribution and tracking
- `psp_token` - Platform token for staking and governance
- `staking_program` - Staking rewards and tier upgrades

**Current Status**: Program structure defined in `/solana-programs` with configuration in `solana.config.ts`. Requires compilation, deployment to Devnet/Mainnet, and testing.

### Deployment Platforms

**Frontend**: Configured for Vercel and Netlify with build settings, environment variables, and security headers defined in `vercel.json` and `netlify.toml`.

**RPC Providers** (Production Recommendation):
- Helius - Fast, reliable, generous free tier
- QuickNode - Enterprise-grade infrastructure
- Alchemy - Developer-friendly with analytics
- GenesysGo - High-performance RPC

**Design Rationale**: Deployment configurations ready for immediate frontend deployment. Backend and smart contracts require separate deployment strategies documented in respective guides.