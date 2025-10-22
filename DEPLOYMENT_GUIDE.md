# 🚀 ParkStay Pass - Complete Deployment Guide

## Overview

This guide covers deploying:
1. **Solana Programs** (Smart Contracts)
2. **Backend API** (Node.js/Express/MongoDB)
3. **Frontend** (React/Vercel)
4. **Infrastructure** (Docker/Kubernetes)

---

## 📦 Part 1: Deploy Solana Programs

### Prerequisites
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"

# Install Anchor
npm install -g @project-serum/anchor-cli
```

### Setup

1. **Initialize Anchor Project:**
```bash
cd solana-programs
anchor init parkstay-platform
```

2. **Configure Anchor.toml:**
```toml
[programs.devnet]
parkstay_platform = "YOUR_PROGRAM_ID_HERE"

[provider]
cluster = "devnet"
wallet = "~/.config/solana/id.json"
```

3. **Build Programs:**
```bash
anchor build
```

### Deploy to Devnet

```bash
# Set to devnet
solana config set --url devnet

# Airdrop SOL for deployment
solana airdrop 2

# Deploy
anchor deploy

# Note your Program ID
anchor keys list
```

### Deploy to Mainnet

```bash
# IMPORTANT: Test thoroughly on devnet first!

# Set to mainnet
solana config set --url mainnet-beta

# Ensure you have enough SOL (5-10 SOL recommended)
solana balance

# Deploy
anchor deploy --provider.cluster mainnet

# Update Program IDs in config
```

### Update Frontend Config

Edit `/config/solana.config.ts`:
```typescript
export const PROGRAM_IDS = {
  parkstayPlatform: 'YOUR_DEPLOYED_PROGRAM_ID',
  solRewardsPool: 'YOUR_REWARDS_POOL_PDA',
};

export const SOLANA_NETWORK = WalletAdapterNetwork.Mainnet;
```

---

## 🖥️ Part 2: Deploy Backend API

### Prerequisites
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# Visit: https://docs.mongodb.com/manual/installation/

# Install Redis
sudo apt-get install redis-server
```

### Local Development

1. **Install Dependencies:**
```bash
cd backend
npm install
```

2. **Create Environment File:**
```bash
# .env
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/parkstay
REDIS_URL=redis://localhost:6379

# Solana
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PROGRAM_ID=YOUR_PROGRAM_ID
PLATFORM_WALLET_PRIVATE_KEY=YOUR_PLATFORM_WALLET_PRIVATE_KEY

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRY=24h

# CORS
CORS_ORIGIN=http://localhost:5173,https://app.parkstay.com

# API Keys
OPENAI_API_KEY=your_openai_key_for_ai_features
```

3. **Run Development Server:**
```bash
npm run dev
```

### Deploy to Production (AWS/DigitalOcean)

#### Option A: Docker Deployment

1. **Create Dockerfile:**
```dockerfile
# /backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
```

2. **Create docker-compose.yml:**
```yaml
# /backend/docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/parkstay
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    restart: unless-stopped

  mongo:
    image: mongo:7
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  mongo-data:
```

3. **Deploy:**
```bash
docker-compose up -d
```

#### Option B: Kubernetes Deployment

1. **Create Kubernetes Manifests:**
```yaml
# /backend/k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: parkstay-api
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: parkstay-api
  template:
    metadata:
      labels:
        app: parkstay-api
    spec:
      containers:
      - name: api
        image: your-registry/parkstay-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: parkstay-secrets
              key: mongodb-uri
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: parkstay-secrets
              key: redis-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

2. **Create Service:**
```yaml
# /backend/k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: parkstay-api-service
  namespace: production
spec:
  selector:
    app: parkstay-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

3. **Deploy to Kubernetes:**
```bash
kubectl apply -f k8s/
```

#### Option C: Platform as a Service (Heroku/Railway)

1. **Heroku Deployment:**
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create parkstay-api

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Add Redis addon
heroku addons:create heroku-redis:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret
heroku config:set SOLANA_PROGRAM_ID=your_program_id

# Deploy
git push heroku main

# Open app
heroku open
```

2. **Railway Deployment:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up

# Set environment variables in Railway dashboard
```

### Database Setup

1. **MongoDB Atlas (Managed):**
```bash
# Visit https://www.mongodb.com/cloud/atlas
# Create a free cluster
# Get connection string
# Add to environment: MONGODB_URI=mongodb+srv://...
```

2. **Self-Hosted MongoDB:**
```bash
# Install MongoDB
sudo apt-get install mongodb

# Start service
sudo systemctl start mongodb

# Create database
mongo
> use parkstay
> db.createUser({user: "parkstay", pwd: "password", roles: ["readWrite"]})
```

### Redis Setup

1. **Redis Cloud (Managed):**
```bash
# Visit https://redis.com/try-free/
# Create free instance
# Get connection string
# Add to environment: REDIS_URL=redis://...
```

2. **Self-Hosted Redis:**
```bash
# Install Redis
sudo apt-get install redis-server

# Start service
sudo systemctl start redis

# Test connection
redis-cli ping
```

---

## 🌐 Part 3: Deploy Frontend

### Build for Production

```bash
# Install dependencies
npm install

# Build
npm run build

# Preview build locally
npm run preview
```

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel

# Follow prompts:
# - Link to existing project or create new
# - Select framework: Vite
# - Set environment variables
```

3. **Set Environment Variables:**
```bash
# In Vercel Dashboard or CLI:
VITE_SOLANA_NETWORK=mainnet
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
VITE_PROGRAM_ID=YOUR_DEPLOYED_PROGRAM_ID
VITE_API_URL=https://api.parkstay.com
```

4. **Production URL:**
```
https://parkstay-pass.vercel.app
```

### Deploy to Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Deploy:**
```bash
netlify deploy --prod

# Or connect Git repo in Netlify dashboard
```

### Deploy to AWS S3 + CloudFront

1. **Build:**
```bash
npm run build
```

2. **Upload to S3:**
```bash
aws s3 sync dist/ s3://parkstay-app --delete
```

3. **Configure CloudFront:**
```bash
# Create CloudFront distribution
# Point to S3 bucket
# Enable HTTPS
# Set custom domain
```

---

## 🔧 Part 4: Infrastructure & CI/CD

### GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy ParkStay Platform

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm test

  deploy-solana:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Solana
      run: |
        sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
        echo "$HOME/.local/share/solana/install/active_release/bin" >> $GITHUB_PATH
    - name: Deploy Programs
      run: |
        cd solana-programs
        anchor build
        anchor deploy --provider.cluster mainnet
      env:
        ANCHOR_WALLET: ${{ secrets.SOLANA_DEPLOY_KEY }}

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.14
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "parkstay-api"
        heroku_email: "your-email@example.com"

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - run: npm ci
    - run: npm run build
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

### Monitoring Setup

1. **Sentry for Error Tracking:**
```bash
npm install @sentry/node @sentry/react
```

```typescript
// Backend: src/utils/sentry.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

2. **Prometheus + Grafana:**
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

3. **Log Aggregation (ELK Stack):**
```bash
# Use Elasticsearch + Logstash + Kibana
# Or use managed services like Datadog, Loggly
```

---

## 🔒 Security Checklist

### Pre-Deployment

- [ ] Environment variables secured (not in code)
- [ ] Solana programs audited
- [ ] API rate limiting enabled
- [ ] HTTPS/SSL configured
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] Secrets rotation plan
- [ ] Backup strategy implemented

### Post-Deployment

- [ ] Monitor error rates
- [ ] Set up alerting
- [ ] Test all critical paths
- [ ] Load testing completed
- [ ] Security scan performed
- [ ] Penetration testing done
- [ ] Compliance verification (if applicable)

---

## 📊 Performance Optimization

### Frontend
```typescript
// Code splitting
const Dashboard = lazy(() => import('./components/Dashboard'));

// Image optimization
<img src={imageUrl} loading="lazy" />

// Caching
const { data } = useSWR('/api/bookings', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000,
});
```

### Backend
```typescript
// Redis caching
const cached = await redis.get(`user:${userId}`);
if (cached) return JSON.parse(cached);

// Database indexing
userSchema.index({ walletAddress: 1 });
userSchema.index({ createdAt: -1 });

// Query optimization
User.find({ active: true })
  .select('name email')
  .lean()
  .limit(100);
```

---

## 🧪 Testing Before Launch

### 1. Smoke Tests
```bash
# Test API health
curl https://api.parkstay.com/health

# Test frontend
curl https://app.parkstay.com

# Test blockchain connection
solana balance YOUR_WALLET_ADDRESS
```

### 2. Integration Tests
```bash
# Run full test suite
npm test

# E2E tests
npm run test:e2e
```

### 3. Load Testing
```bash
# Install artillery
npm install -g artillery

# Run load test
artillery quick --count 100 --num 10 https://api.parkstay.com/api/bookings
```

---

## 🚀 Go Live Checklist

- [ ] Solana programs deployed to mainnet
- [ ] Backend API deployed and running
- [ ] Frontend deployed to CDN
- [ ] DNS configured correctly
- [ ] SSL certificates active
- [ ] Monitoring dashboards set up
- [ ] Alerting configured
- [ ] Backups automated
- [ ] Documentation updated
- [ ] Team trained on operations
- [ ] Incident response plan ready
- [ ] Marketing materials prepared
- [ ] Support channels active

---

## 📞 Post-Deployment Support

### Monitoring Checklist
- Monitor Sentry for errors
- Check Grafana dashboards
- Review logs in CloudWatch/Datadog
- Track Solana transactions
- Monitor API response times
- Check database performance
- Review Redis cache hit rates

### Scaling Checklist
- Add more API replicas if needed
- Scale database (read replicas)
- Increase Redis cache size
- Add CDN if not using
- Optimize slow queries
- Add load balancer

---

## 🎉 You're Live!

Your ParkStay Pass platform is now deployed! Monitor closely for the first 24-48 hours and be ready to address any issues.

**Success Metrics to Track:**
- Wallet connection rate
- Booking completion rate
- SOL rewards distributed
- API response times
- Error rates
- User retention
- Transaction success rate

---

*For issues or questions, contact: devops@parkstay.com*
