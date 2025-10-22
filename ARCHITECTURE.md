# ParkStay Pass - System Architecture

## 🏗️ Complete Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE LAYER                         │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Landing    │  │  Dashboard   │  │   Booking    │            │
│  │     Page     │  │     View     │  │  Interface   │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│         │                  │                  │                     │
│  ┌──────────────────────────────────────────────────┐              │
│  │          Shadcn/UI Components                     │              │
│  │  (Cards, Buttons, Dialogs, Charts, etc.)        │              │
│  └──────────────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      WALLET ADAPTER LAYER                           │
│                                                                     │
│  ┌──────────────────────────────────────────────────────┐          │
│  │        @solana/wallet-adapter-react                 │          │
│  │  • WalletProvider                                    │          │
│  │  • ConnectionProvider                                │          │
│  │  • WalletMultiButton                                 │          │
│  └──────────────────────────────────────────────────────┘          │
│           │                                                          │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │   Phantom      │  │   Solflare     │  │   Other        │       │
│  │   Wallet       │  │   Wallet       │  │   Wallets      │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     APPLICATION LOGIC LAYER                         │
│                                                                     │
│  ┌──────────────────────────────────────────────────┐              │
│  │          Context Providers                        │              │
│  │                                                   │              │
│  │  ┌─────────────────────────────────────┐         │              │
│  │  │   SolanaProvider                    │         │              │
│  │  │  • Global blockchain state          │         │              │
│  │  │  • Balance tracking                 │         │              │
│  │  │  • User account sync                │         │              │
│  │  │  • Auto-refresh on connect          │         │              │
│  │  └─────────────────────────────────────┘         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                     │
│  ┌──────────────────────────────────────────────────┐              │
│  │          Custom React Hooks                       │              │
│  │                                                   │              │
│  │  ┌──────────────┐  ┌──────────────┐            │              │
│  │  │ useSolana()  │  │  useApi()    │            │              │
│  │  │ • Balance    │  │  • Bookings  │            │              │
│  │  │ • Staking    │  │  • Rewards   │            │              │
│  │  │ • Bookings   │  │  • Analytics │            │              │
│  │  │ • Rewards    │  │  • User data │            │              │
│  │  └──────────────┘  └──────────────┘            │              │
│  └──────────────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
            ▼                               ▼
┌─────────────────────────���┐  ┌────────────────────────────────┐
│   BLOCKCHAIN LAYER       │  │   BACKEND API LAYER            │
│                          │  │                                │
│  ┌────────────────────┐  │  │  ┌──────────────────────────┐ │
│  │ SolanaService      │  │  │  │  ApiService              │ │
│  │                    │  │  │  │                          │ │
│  │ • getBalance()     │  │  │  │  • getUserProfile()      │ │
│  │ • getUserAccount() │  │  │  │  │  • createBooking()       │ │
│  │ • createBooking()  │  │  │  │  • getRecommendations()  │ │
│  │ • stakeSOL()       │  │  │  │  • claimRewards()        │ │
│  │ • airdrop()        │  │  │  │                          │ │
│  └──────────��─────────┘  │  │  └──────────────────────────┘ │
│           ▼              │  │             ▼                  │
│  ┌────────────────────┐  │  │  ┌──────────────────────────┐ │
│  │ @solana/web3.js    │  │  │  │  BackendMockServer       │ │
│  │                    │  │  │  │  (In-Memory Database)    │ │
│  │ • Connection       │  │  │  │                          │ │
│  │ • Transaction      │  │  │  │  ┌────────┐  ┌────────┐ │ │
│  │ • PublicKey        │  │  │  │  │ Users  │  │Bookings│ │ │
│  │ • SystemProgram    │  │  │  │  └────────┘  └────────┘ │ │
│  └────────────────────┘  │  │  │  ┌────────┐  ┌────────┐ │ │
│           ▼              │  │  │  │Rewards │  │Staking │ │ │
│  ┌────────────────────┐  │  │  │  └────────┘  └────────┘ │ │
│  │ Solana Blockchain  │  │  │  └──────────────────────────┘ │
│  │ (Devnet/Mainnet)   │  │  │             │                  │
│  │                    │  │  │             ▼                  │
│  │ • User PDAs        │  │  │  ┌──────────────────────────┐ │
│  │ • Reward Pool      │  │  │  │  AI Service              │ │
│  │ • Staking Pool     │  │  │  │                          │ │
│  │ • Transactions     │  │  │  │  • generateRecommendations│ │
│  └────────────────────┘  │  │  │  • optimizePrice()       │ │
└──────────────────────────┘  │  │  • predictAvailability() │ │
                              │  │  • updatePreferences()   │ │
                              │  │  └──────────────────────────┘ │
                              └────────────────────────────────┘
```

---

## 🔄 Data Flow Examples

### Example 1: User Connects Wallet

```
┌─────────────┐
│   User      │ Clicks "Connect Wallet"
└─────────────┘
      ▼
┌─────────────┐
│ WalletConnect│ Opens wallet selection modal
└─────────────┘
      ▼
┌─────────────┐
│   Phantom   │ User approves connection
└─────────────┘
      ▼
┌─────────────────┐
│ WalletProvider  │ Updates connected state
└─────────────────┘
      ▼
┌──────────────────┐
│ SolanaProvider   │ Detects wallet connection
└──────────────────┘
      ▼
┌──────────────────┐
│ SolanaService    │ Fetches balance from blockchain
└──────────────────┘
      ▼
┌──────────────────┐
│ ApiService       │ Fetches user profile from backend
└──────────────────┘
      ▼
┌──────────────────┐
│ BackendMockServer│ Creates/returns user data
└──────────────────┘
      ▼
┌──────────────────┐
│   Dashboard      │ Displays balance and user data
└──────────────────┘
```

### Example 2: Creating a Booking

```
┌─────────────┐
│   User      │ Selects booking option
└─────────────┘
      ▼
┌─────────────────┐
│ BookingInterface│ Fetches AI recommendations
└─────────────────┘
      ▼
┌─────────────┐
│ AIService   │ Generates smart recommendations
└─────────────┘
      ▼
┌─────────────┐
│   User      │ Confirms booking
└─────────────┘
      ▼
┌──────────────────┐
│ useSolana()      │ Calls createBooking()
└──────────────────┘
      ▼
┌──────────────────┐
│ SolanaService    │ Builds Solana transaction
└──────────────────┘
      ▼
┌──────────────────┐
│ Wallet (Phantom) │ User signs transaction
└──────────────────┘
      ▼
┌──────────────────┐
│ Solana Blockchain│ Transaction confirmed
└──────────────────┘
      ▼
┌──────────────────┐
│ ApiService       │ Saves booking to backend
└──────────────────┘
      ▼
┌──────────────────┐
│BackendMockServer │ Creates booking record
└──────────────────┘
      ▼
┌──────────────────┐
│BackendMockServer │ Awards SOL rewards
└──────────────────┘
      ▼
┌──────────────────┐
│   Dashboard      │ Shows updated balance + new booking
└──────────────────┘
```

### Example 3: Staking SOL

```
┌─────────────┐
│   User      │ Enters stake amount and duration
└─────────────┘
      ▼
┌──────────────────┐
│StakingDashboard  │ Calculates estimated rewards
└──────────────────┘
      ▼
┌─────────────┐
│   User      │ Confirms staking
└─────────────┘
      ▼
┌──────────────────┐
│ useSolana()      │ Calls stakeSOL()
└──────────────────┘
      ▼
┌──────────────────┐
│ SolanaService    │ Builds stake transaction
└──────────────────┘
      ▼
┌──────────────────┐
│ SystemProgram    │ Transfers SOL to staking pool
└──────────────────┘
      ▼
┌──────────────────┐
│ Wallet (Phantom) │ User signs transaction
└──────────────────┘
      ▼
┌──────────────────┐
│ Solana Blockchain│ SOL transferred and locked
└──────────────────┘
      ▼
┌──────────────────┐
│ ApiService       │ Records staking position
└──────────────────┘
      ▼
┌──────────────────┐
│BackendMockServer │ Creates staking record
└──────────────────┘
      ▼
┌──────────────────┐
│StakingDashboard  │ Shows active staking position
└──────────────────┘
```

---

## 📦 Component Dependency Graph

```
App.tsx
  ├─ ConnectionProvider (Solana)
  │   └─ WalletProvider (Solana)
  │       └─ WalletModalProvider (Solana)
  │           └─ SolanaProvider (Custom)
  │               ├─ LandingPage
  │               │   ├─ WalletConnect
  │               │   ├─ SubscriptionTiers
  │               │   ├─ AIFeatures
  │               │   ├─ SOLRewardsShowcase
  │               │   └─ PartnershipSection
  │               │
  │               └─ Dashboard
  │                   ├─ WalletConnect
  │                   ├─ BookingInterface
  │                   │   └─ AIRecommendations
  │                   ├─ SOLRewardsDashboard
  │                   ├─ StakingDashboard
  │                   ├─ ActivityHistory
  │                   └─ Analytics
  │
  └─ Toaster (Notifications)
```

---

## 🔐 Security Architecture

### Frontend Security
```
┌────────────────────────────────────┐
│     Input Validation Layer         │
│  • Sanitize user inputs            │
│  • Validate amounts                │
│  • Check wallet signatures         │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     Wallet Signature Layer         │
│  • All transactions signed         │
│  • User must approve               │
│  • Private keys never exposed      │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     Transaction Verification       │
│  • Confirm on blockchain           │
│  • Check transaction status        │
│  • Handle failures gracefully      │
└────────────────────────────────────┘
```

### Backend Security (Ready for Production)
```
┌────────────────────────────────────┐
│     API Gateway Layer              │
│  • Rate limiting                   │
│  • CORS configuration              │
│  • Request logging                 │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     Authentication Layer           │
│  • JWT tokens                      │
│  • Wallet signature verification   │
│  • Session management              │
└────────────────────────────────────┘
          ▼
┌──────────────────────���─────────────┐
│     Authorization Layer            │
│  • Role-based access control       │
│  • Resource ownership validation   │
│  • Permission checks               │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     Data Access Layer              │
│  • Parameterized queries           │
│  • SQL injection prevention        │
│  • Input sanitization              │
└────────────────────────────────────┘
```

---

## 🚀 Scalability Architecture

### Current (MVP)
```
                     ┌──────────────┐
                     │   Vercel     │
                     │  (Frontend)  │
                     └──────────────┘
                            │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Solana     │  │ Mock Backend │  │   Browser    │
│  Blockchain  │  │  (In-Memory) │  │   Storage    │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Production (Future)
```
                     ┌──────────────┐
                     │  CloudFlare  │
                     │     CDN      │
                     └──────────────┘
                            │
                     ┌──────────────┐
                     │   Vercel     │
                     │  (Frontend)  │
                     └──────────────┘
                            │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Solana     │  │  API Gateway │  │    Redis     │
│  Mainnet     │  │   (Node.js)  │  │   (Cache)    │
└──────────────┘  └──────────────┘  └──────────────┘
                           │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   MongoDB    │  │   AI/ML      │  │  Analytics   │
│  (Database)  │  │  Service     │  │  (Mixpanel)  │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🎯 Performance Optimization

### Frontend Optimizations
```
┌────────────────────────────────────┐
│     Code Splitting                 │
│  • Lazy load components            │
│  • Route-based splitting           │
│  • Dynamic imports                 │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     React 18 Features              │
│  • Concurrent rendering            │
│  • Automatic batching              │
│  • Transitions API                 │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     Caching Strategy               │
│  • SWR for data fetching           │
│  • LocalStorage for preferences    │
│  • Memoization for calculations    │
└────────────────────────────────────┘
```

### Backend Optimizations (Future)
```
┌────────────────────────────────────┐
│     Redis Caching                  │
│  • User sessions                   │
│  • API responses                   │
│  • Blockchain queries              │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     Database Indexing              │
│  • User lookup by wallet           │
│  • Bookings by user ID             │
│  • Rewards by timestamp            │
└──────────────���─────────────────────┘
          ▼
┌────────────────────────────────────┐
│     CDN & Asset Optimization       │
│  • Image compression               │
│  • Minified JS/CSS                 │
│  • Gzip compression                │
└────────────────────────────────────┘
```

---

## 📊 Monitoring & Analytics

### Application Monitoring
```
┌────────────────────────────────────┐
│     Performance Metrics            │
│  • Page load time                  │
│  • Transaction confirmation time   │
│  • API response time               │
│  • Component render time           │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     Error Tracking                 │
│  • JavaScript errors               │
│  • Failed transactions             │
│  • API failures                    │
│  • Network issues                  │
└────────────────────────────────────┘
          ▼
┌────────────────────────────────────┐
│     User Analytics                 │
│  • User journey tracking           │
│  • Feature usage                   │
│  • Conversion rates                │
│  • Drop-off points                 │
└────────────────────────────────────┘
```

---

## 🔄 State Management

### Current Implementation
```
┌─────────────────────────────────────┐
│       SolanaProvider                │
│  (Global Blockchain State)          │
│                                     │
│  • connected: boolean               │
│  • publicKey: PublicKey | null      │
│  • balance: number                  │
│  • solEarned: number                │
│  • userAccount: UserAccount | null  │
│  • userData: User | null            │
│  • loading: boolean                 │
│  • error: string | null             │
└─────────────────────────────────────┘
          ▼
┌─────────────────────────────────────┐
│       Custom Hooks                  │
│                                     │
│  • useSolana()                      │
│  • useApi()                         │
│  • useBookings()                    │
│  • useRewards()                     │
│  • useStaking()                     │
└─────────────────────────────────────┘
          ▼
┌─────────────────────────────────────┐
│       Local Component State         │
│  (useState, useReducer)             │
│                                     │
│  • UI state                         │
│  • Form inputs                      │
│  • Modal open/close                 │
└─────────────────────────────────────┘
```

---

This architecture provides a **solid foundation** for building a production-ready Web3 application with Solana integration and scalable backend services! 🚀
