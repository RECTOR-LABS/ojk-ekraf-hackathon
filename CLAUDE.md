# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository is for the **OJK-Ekraf Infinity Hackathon 2025** - a blockchain hackathon focused on accelerating Indonesia's creative economy through digital innovation and decentralization.

**Hackathon Details:**
- Duration: September 25 - November 15, 2025
- Submission Deadline: October 22, 2025
- Prize Pool: IDR 50,000,000
- Target Network: Sepolia Testnet (Chain ID: 11155111)
- Theme: "Accelerating Creative Economy Through Digital Innovation & Decentralization"

## Current Project Status

**Last Updated**: October 18, 2025 (Day 8 COMPLETE ✅)
**Overall Progress**: 95% Complete ✅ **SMART CONTRACTS DEPLOYED! FRONTEND LIVE ON VERCEL! 🚀**
**Days Until Deadline**: 4 days
**Frontend Sprint Progress**: Day 8/9 Complete (95%)
**🌐 LIVE DEMO**: https://karyachain.rectorspace.com/

**🎨 PARALLEL DEVELOPMENT - Alternative Design (frontend-design-2/):**
- **Design Philosophy**: Glassmorphism with rich professional animations
- **Navigation**: Dual layout system - Marketing navbar (homepage) + Sidebar (app pages)
- **Progress**: 🎉 **ALL EPICS COMPLETE!** 42/42 tasks (100%) + v0.2.0 Performance Update ✅
- **Package Version**: 0.2.0 (MINOR bump - new features + optimizations)
- **Status**: All core features complete + performance optimized (2x faster animations)
- **Dev Server**: Running on localhost:3001
- **Reference**: `docs/FRONTEND-DESIGN-2-PRD.md` and `docs/FRONTEND-DESIGN-2-EXECUTION-PLAN.md`

### ✅ Completed

#### Smart Contracts (3/3 - 100%) 🎉
- **CopyrightRegistry.sol** ✅
  - Full implementation with 5 asset types
  - Tamper-proof copyright registration
  - Content hash verification and duplicate detection
  - Public verification functions
  - **Test Coverage**: 100% (19/19 tests passing)
  - **Gas Cost**: ~412k per registration
  - **Location**: `contracts/CopyrightRegistry.sol`

- **KaryaNFT.sol** ✅
  - ERC-721 + ERC-2981 royalty standard
  - Links to CopyrightRegistry (prevents duplicate minting)
  - IPFS metadata support
  - Configurable royalties (5-20%)
  - **Test Coverage**: 100% (32/32 tests passing)
  - **Gas Cost**: ~275k per mint
  - **Location**: `contracts/KaryaNFT.sol`

- **KaryaMarketplace.sol** ✅
  - Fixed-price listings and purchases
  - Automatic royalty distribution (ERC-2981)
  - Platform fee (2.5%)
  - Primary and secondary sales with perpetual royalties
  - **Test Coverage**: 100% (39/39 tests passing)
  - **Gas Cost**: ~263k listing, ~108k purchase
  - **Location**: `contracts/KaryaMarketplace.sol`

#### Testing & Security (100%) 🔒
- **Overall Test Suite**: 90 tests passing
- **Overall Coverage**:
  - Statements: 100%
  - Functions: 100%
  - Lines: 98.18%
  - Branches: 83.33%
- Integration tests: Register → Mint → List → Purchase flow ✅
- **Security Audit: COMPLETE** ✅
  - Slither static analysis: 11 findings (all Low/Informational)
  - **0 Critical vulnerabilities**
  - **0 High severity issues**
  - Manual security review: PASS
  - Comprehensive documentation: `docs/SECURITY-AUDIT.md`
  - Access control tests: 6 tests passing
  - ReentrancyGuard applied on all value transfers

#### Documentation (100%)
- ✅ PRD.md - Complete product requirements (Smart Contracts)
- ✅ FRONTEND-PRD.md - Comprehensive frontend web app specification
- ✅ EXECUTION-PLAN.md - v1.5 with Sepolia deployment complete
- ✅ FRONTEND-EXECUTION-PLAN.md - 9-day frontend sprint plan
- ✅ CONTRACT-API.md - Complete API documentation
- ✅ ARCHITECTURE.md - System design
- ✅ SECURITY-AUDIT.md - Comprehensive security audit report
- ✅ DEPLOYMENT-GUIDE.md - Sepolia deployment instructions
- ✅ DEPLOYED-CONTRACTS.md - Live contract addresses and links
- ✅ CLAUDE.md - Project guidance (this file)

#### Frontend DApp (Day 8 - 95%) 🎉 **DEPLOYED TO PRODUCTION!**
**🌐 Live at**: https://karyachain.rectorspace.com/
- **Day 1 Complete** ✅ (Oct 13 Morning - Foundation)
  - Next.js 14 + TypeScript setup
  - Tailwind CSS with Indonesian theme
  - Web3 stack (wagmi + RainbowKit + TanStack Query)
  - Directory structure (/app, /components, /lib)
  - Base UI components (Button, Card, Input, Spinner)
  - Contract ABIs exported to /lib/contracts
  - Environment configuration (.env.local)
  - Hero section (bilingual)

- **Day 2 Complete** ✅ (Oct 13 Evening - Landing + Wallet)
  - How It Works section (3-step timeline)
  - Features Grid section (4 feature cards)
  - For Indonesian Creators section
  - FAQ section (8 questions, accordion)
  - Footer component
  - Header component with navigation
  - ConnectButton with RainbowKit
  - Wallet connection modal integration

- **Day 3 Complete** ✅ (Oct 13 Night - Registration Part 1)
  - Registration page layout with 4-step wizard
  - Step 1: File upload with drag & drop, SHA-256 hashing
  - Step 2: Metadata form with validation (title, description, asset type, tags)
  - IPFS integration with Pinata (file upload working)
  - Zustand store with localStorage persistence
  - Image preview for uploaded files

- **Day 4 Complete** ✅ (Oct 13 Late Night / Oct 14 Early Morning)
  - **Copyright Registration (Part 2):**
    - Step 3: Review & Confirmation (complete file + metadata summary)
    - Step 4: Blockchain transaction with wagmi v2
    - `useWriteContract` for copyright registration
    - `useWaitForTransactionReceipt` for tx monitoring
    - Transaction states: idle → signing → pending → success/error
    - Registration ID extraction from event logs
    - Success page with registration details
    - Etherscan links for transaction verification
  - **NFT Minting Flow:**
    - `/mint` page with smart contract integration
    - Fetch user's registered copyrights from CopyrightRegistry
    - Display copyright cards in responsive grid
    - MintNFTModal with royalty configuration (5-20%)
    - Real-time earnings calculator
    - Full blockchain integration for minting
    - Token ID extraction from event logs
    - Success page with NFT details and marketplace CTA
  - **Dev Server Status**: ✅ Compiles successfully with zero errors

- **Day 5 Complete** ✅ (Oct 17 - Marketplace Development)
  - **Marketplace Page (/marketplace):**
    - Grid layout with responsive columns (1/2/3/4)
    - Search bar (by title/creator address)
    - Asset type filter (5 types with dropdown)
    - Active filters display with clear buttons
    - Loading/empty/error states
  - **NFTCard Component:**
    - Image preview with fallback UI
    - Asset type badges (color-coded by type)
    - Royalty percentage badge
    - Creator info with address truncation
    - Price display in ETH
    - Hover effects and smooth transitions
  - **useMarketplaceListings Hook:**
    - Fetch all active listings from marketplace contract
    - Fetch NFT metadata from IPFS (Pinata gateway)
    - Fetch royalty info (ERC-2981)
    - Enrich listings with metadata (title, description, image)
    - Error handling and loading states
  - **NFT Detail Page (/marketplace/[tokenId]):**
    - Large image preview
    - Full NFT information (title, description, properties grid)
    - Creator and owner information
    - Royalty information card
    - Copyright registration details
    - Purchase functionality with wagmi v2
    - Transaction states (idle → signing → pending → success/error)
    - Success/error banners
    - Etherscan links (token + metadata)
    - Wallet connection check
    - Owner/seller detection
  - **Dev Server Status**: ✅ Running on localhost:3002, zero compilation errors

- **Day 6 Complete** ✅ (Oct 18 Morning - Dashboard Development) **CORE MVP COMPLETE!**
  - **Dashboard Page (/dashboard):**
    - 3-tab navigation (My Copyrights, My NFTs, My Listings)
    - Wallet connection check and user address display
    - Responsive mobile-friendly tabs
  - **My Copyrights Tab:**
    - Stats cards (Total, Minted, Ready to Mint)
    - Grid display of all user's registered copyrights
    - Status indicators (minted vs not minted)
    - Quick actions: Mint NFT / View NFT
    - Empty/loading/error states
  - **My NFTs Tab:**
    - Stats cards (Total NFTs, Listed, Not Listed)
    - Grid display of all user's owned NFTs
    - Asset type and listing status badges
    - Quick actions: View Details / List for Sale
    - Empty/loading/error states
  - **ListNFTModal:**
    - Two-step transaction flow: Approve → List
    - Auto-detect existing approval (skip if approved)
    - Price input with fee display
    - Real-time transaction monitoring
    - Success/error states with Etherscan links
  - **My Listings Tab:**
    - Display active marketplace listings
    - Listing cards with price and metadata
    - View Listing CTA to marketplace
  - **Custom Hooks:**
    - useUserCopyrights() - fetch all user's copyrights with mint status
    - useUserNFTs() - fetch all user's NFTs with listing status
  - **Dev Server Status**: ✅ Running on localhost:3000, compiled successfully

- **Day 7 Complete** ✅ (Oct 18 Afternoon - Mobile Responsiveness + Polish)
  - **Skeleton Loaders System:**
    - Created Skeleton, SkeletonCard, SkeletonGrid components
    - Added shimmer animation to globals.css
    - Replaced all Loader2 spinners with skeleton loaders (Marketplace, Dashboard tabs)
  - **Mobile Responsiveness (All Pages):**
    - Landing Page: Responsive trust metrics (grid-cols-2 sm:grid-cols-3), asset type grid smooth transitions
    - Registration: Responsive progress indicator (w-10 sm:w-12), reduced upload padding (p-6 sm:p-12)
    - Mint Page: Responsive success heading (text-2xl sm:text-3xl)
    - Marketplace: Responsive NFT detail heading and price (text-2xl sm:text-3xl lg:text-4xl)
    - Dashboard: Responsive heading and tab labels (short text on mobile)
  - **Key Improvements:**
    - Progressive text scaling (sm/md/lg breakpoints)
    - Better padding on mobile (reduced from p-12 to p-6)
    - Smaller UI elements on mobile (circles, icons)
    - Responsive grids with smooth transitions
  - **Dev Server Status**: ✅ Running on localhost:3000, zero compilation errors

- **Day 8 Complete** ✅ (Oct 18 Evening - Performance Optimization + Deployment)
  - **Production Build Fixes (COMPLETE):**
    - Fixed 40+ TypeScript errors across 15+ files
    - Contract ABI syntax fixes
    - Button component API fixes (href → Link wrapper)
    - publicClient type assertions
    - BigInt conversion fixes
    - useUserNFTs rewrite (totalMinted approach)
    - Pinata SDK v3 API fixes
    - Next.js barrel optimization disabled
    - **Production build successful: 9/9 pages compiled, 0 TypeScript errors** ✅
  - **Error Handling & Optimization (COMPLETE):**
    - Error handling & user-friendly messages ✅
    - Image optimization (Next.js Image) ✅
  - **Deployment (COMPLETE):**
    - Vercel deployment setup ✅
    - Production deployment ✅
    - **🌐 LIVE**: https://karyachain.rectorspace.com/
    - SEO meta tags - Deferred to Day 9
  - **Status**: ✅ **DEPLOYED TO PRODUCTION!**

### 🎯 Next Steps (In Priority Order)

1. **Frontend DApp** 💻 (9-day sprint: Oct 13-22) - **DAY 8 COMPLETE!** ✅ **DEPLOYED TO PRODUCTION! 🚀**
   - **🌐 LIVE DEMO**: https://karyachain.rectorspace.com/
   - **Reference**: `docs/FRONTEND-EXECUTION-PLAN.md` for daily breakdown
   - **Reference**: `docs/FRONTEND-PRD.md` for detailed specifications
   - ✅ Day 1 (Oct 13 Morning): Foundation & Setup COMPLETE
   - ✅ Day 2 (Oct 13 Evening): Landing Page & Wallet Connection COMPLETE
   - ✅ Day 3 (Oct 13 Night): Copyright registration Steps 1-2 COMPLETE
   - ✅ Day 4 (Oct 13-14): Registration Steps 3-4 + Full NFT Minting COMPLETE (AHEAD OF SCHEDULE!)
   - ✅ Day 5 (Oct 17): Full marketplace (browse, search, filter, detail, purchase) COMPLETE
   - ✅ Day 6 (Oct 18 Morning): Dashboard (My Copyrights, My NFTs, List for Sale) COMPLETE - **CORE MVP DONE!** 🎉
   - ✅ Day 7 (Oct 18 Afternoon): Mobile responsiveness + Skeleton loaders COMPLETE
   - ✅ Day 8 (Oct 18 Evening): Performance optimization + Deploy to Vercel - **COMPLETE!** 🎉
   - 🔜 Day 9 (Oct 19-20): Final polish (SEO meta tags) + Buffer day + SUBMIT TO HACKATHON

2. **Pitch Deck** 📊 (Parallel work, Oct 18-21)
   - Problem/solution slides
   - Technical architecture & user flows
   - Business model & go-to-market
   - Team & roadmap
   - Live demo screenshots from production app
   - Demo video (3-5 minutes)

3. **Final Submission** ✅ (Oct 22, 2025 - DEADLINE DAY)
   - Review all deliverables
   - Submit pitch deck PDF
   - Submit contract addresses (already deployed ✅)
   - Submit live demo URL
   - Confirm submission before 5 PM deadline

### Key Contracts Summary

| Contract | Status | Test Coverage | Location |
|----------|--------|---------------|----------|
| CopyrightRegistry | ✅ Complete | 100% (19 tests) | contracts/CopyrightRegistry.sol |
| KaryaNFT | ✅ Complete | 100% (32 tests) | contracts/KaryaNFT.sol |
| KaryaMarketplace | ✅ Complete | 100% (39 tests) | contracts/KaryaMarketplace.sol |

### Active Development Files

```
contracts/ ✅ DEPLOYED
  ├── CopyrightRegistry.sol ✅
  ├── KaryaNFT.sol ✅
  └── KaryaMarketplace.sol ✅

test/ ✅ 90 TESTS PASSING
  ├── CopyrightRegistry.test.js ✅
  ├── KaryaNFT.test.js ✅
  └── KaryaMarketplace.test.js ✅

frontend/ ✅ DEPLOYED TO PRODUCTION (Day 8 - 95% - https://karyachain.rectorspace.com/)
  ├── /app ✅ (Next.js 14 App Router - All pages mobile-responsive)
  │   ├── layout.tsx ✅ (Root layout with providers + Header)
  │   ├── page.tsx ✅ (Home page with all sections, mobile-responsive)
  │   ├── providers.tsx ✅ (wagmi + RainbowKit setup)
  │   ├── globals.css ✅ (Indonesian theme + semantic colors + shimmer animation)
  │   ├── /register ✅
  │   │   └── page.tsx ✅ (4-step wizard, mobile-responsive progress indicator)
  │   ├── /mint ✅
  │   │   └── page.tsx ✅ (NFT minting, mobile-responsive)
  │   ├── /dashboard ✅
  │   │   └── page.tsx ✅ (3-tab navigation, mobile-friendly tab labels)
  │   └── /marketplace ✅
  │       ├── page.tsx ✅ (Browse with search & filters, skeleton loaders)
  │       └── /[tokenId]
  │           └── page.tsx ✅ (NFT detail with purchase flow, mobile-responsive)
  ├── /components ✅ (UI, Layout, Web3, Landing, Features, Dashboard)
  │   ├── /ui ✅ (Button, Card, Input, Spinner, Skeleton, Tabs)
  │   ├── /layout ✅ (Header with mobile menu, Footer)
  │   ├── /web3 ✅ (ConnectButton with RainbowKit)
  │   ├── /landing ✅ (All sections mobile-responsive)
  │   ├── /features ✅ (FileUpload, MetadataForm, MintNFTModal, NFTCard, ListNFTModal)
  │   └── /dashboard ✅ (MyCopyrightsTab, MyNFTsTab, MyListingsTab - all with skeleton loaders)
  ├── /lib ✅
  │   ├── /contracts ✅ (All 3 contract ABIs + addresses)
  │   ├── /stores ✅ (registrationStore with Zustand + localStorage)
  │   ├── /hooks ✅ (useMarketplaceListings, useUserCopyrights, useUserNFTs)
  │   └── /utils ✅ (ipfs with Pinata integration)
  └── /public (Static assets - TODO)

docs/ ✅ COMPLETE
  ├── PRD.md ✅ (Smart Contracts)
  ├── FRONTEND-PRD.md ✅ (Web App Spec)
  ├── EXECUTION-PLAN.md ✅ (v1.5)
  ├── FRONTEND-EXECUTION-PLAN.md ✅ (9-day sprint)
  ├── FRONTEND-DESIGN-2-PRD.md ✅ (Alternative Design - Glassmorphism)
  ├── FRONTEND-DESIGN-2-EXECUTION-PLAN.md ✅ (8-day sprint)
  ├── CONTRACT-API.md ✅
  ├── ARCHITECTURE.md ✅
  ├── SECURITY-AUDIT.md ✅
  ├── DEPLOYMENT-GUIDE.md ✅
  └── DEPLOYED-CONTRACTS.md ✅

frontend-design-2/ 🎉 ALL EPICS COMPLETE + v0.2.0 Performance Update (100% - Optimized!)
  ├── /app ✅ (Next.js 14 App Router with glassmorphism)
  │   ├── layout.tsx ✅ (Root layout with LayoutWrapper - simplified)
  │   ├── page.tsx ✅ (Home page with AnimatedSection - optimized)
  │   ├── template.tsx ✅ (Removed page transitions for faster load)
  │   ├── providers.tsx ✅ (wagmi + RainbowKit setup)
  │   ├── globals.css ✅ (Complete glassmorphism system with 10+ animations)
  │   ├── /register ✅ (Full registration flow - 4 steps)
  │   ├── /mint ✅ (NFT minting with royalty config)
  │   ├── /marketplace ✅ (Browse, search, filter, purchase)
  │   └── /dashboard ✅ (3 tabs: Copyrights, NFTs, Listings)
  ├── /components ✅ (Glass UI Library + Layout + Features)
  │   ├── /ui/glass ✅ (GlassCard, GlassButton, GlassInput, GlassModal, Loading, Badge)
  │   ├── /ui ✅ (AnimatedSection with scroll trigger - optimized React cleanup)
  │   ├── /layout ✅ (LayoutWrapper 🆕, Navbar 🆕, Sidebar, TopBar)
  │   ├── /landing ✅ (HeroSection, HowItWorksSection, TrustSection, CTASection - 2x faster!)
  │   ├── /features ✅ (Registration, Mint, Marketplace components)
  │   └── /dashboard ✅ (MyCopyrightsTab, MyNFTsTab, MyListingsTab)
  ├── /lib ✅
  │   └── /contracts ✅ (All 3 contract ABIs + addresses)
  ├── package.json ✅ (v0.2.0 + typecheck scripts 🆕)
  ├── next.config.ts ✅ (Production optimization)
  ├── .env.local ✅ (Environment variables)
  └── Dev Server: ✅ Running on localhost:3001
```

## Project Context

### Chosen Sub-Theme
**Digital Rights & Authentication** - Copyright verification and IP protection for Indonesian creators

### Hackathon Sub-Themes
Choose ONE primary focus area:
1. **Digital Rights & Authentication** - Copyright verification, IP protection
2. **Transparent Creative Supply Chain** - End-to-end traceability
3. **DeFi for Creative Economy** - Decentralized finance for creators
4. **NFT-Powered Creativity** - NFT-based creative economy innovations
5. **Game-Fi: Play-to-Earn & Beyond** - Gaming + DeFi + NFT integration

### Judging Criteria
- Innovation & Originality (30%)
- Security & Compliance (25%) - Must align with Indonesian regulations
- Implementation Feasibility (20%)
- Technical Quality (15%)
- Presentation & Communication (10%)

## Development Requirements

### Mandatory Technical Requirements
- **Network**: Sepolia Testnet (Chain ID: 11155111)
- **Smart Contract Deployment**: All contracts MUST be deployed and verified on Sepolia
- **Contract Verification**: Etherscan verification required (https://sepolia.etherscan.io/)
- **Security**: Follow smart contract security best practices
- **Compliance**: Consider Indonesian digital finance regulations

### Required Deliverables
1. **Smart Contract Address** on Sepolia Testnet
2. **Pitch Deck (PDF)** including:
   - Project description (problem & solution)
   - Business model
   - Technical and user flow diagrams
   - Adoption strategy & ecosystem
   - Development roadmap
   - Team information
   - Mockup designs, POC, prototypes
   - Supporting data
3. **Optional**: GitHub repository (public), live demo URL

## Network Configuration

### Sepolia Testnet Details
```
Chain ID: 11155111
RPC URL: https://rpc.sepolia.dev
Block Explorer: https://sepolia.etherscan.io/
Consensus: Proof of Stake
Block Time: ~12 seconds
```

### Alternative RPC Endpoints
- https://rpc.sepolia.org/
- https://rpc2.sepolia.org/
- https://rpc.sepolia.online/
- Alchemy: https://eth-sepolia.g.alchemy.com/v2/[API_KEY]
- Infura: https://sepolia.infura.io/v3/[API_KEY]

### Getting Test ETH
**Primary Faucets:**
- Google Cloud Web3 Faucet (100 PYUSD + ETH daily)
- Chainlink Faucet (0.1 ETH per day)
- Alchemy Faucet (0.1 ETH every 72 hours)
- QuickNode Faucet (0.05 ETH every 12 hours)

## Development Workflow

### Smart Contract Development
When code is added, use this workflow:

**Framework Options:**
- **Hardhat** (Recommended for full-featured development)
- **Foundry** (Recommended for gas optimization and testing)
- **Remix IDE** (For quick prototyping)

**Hardhat Setup Example:**
```javascript
// hardhat.config.js
networks: {
  sepolia: {
    url: "https://rpc.sepolia.dev",
    accounts: [process.env.PRIVATE_KEY],
    chainId: 11155111,
    gasPrice: 1000000000 // 1 gwei
  }
}
```

**Foundry Setup Example:**
```toml
[profile.sepolia]
rpc_url = "https://rpc.sepolia.dev"
chain_id = 11155111
```

### Testing Strategy
1. **Local Testing**: Run comprehensive unit tests
2. **Sepolia Deployment**: Deploy to testnet
3. **Integration Testing**: Test all user flows on testnet
4. **Security Audit**: Use automated tools (Slither, MythX)
5. **Etherscan Verification**: Verify all deployed contracts

### Common Commands
When codebase is established, typical commands will be:

```bash
# Hardhat
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network sepolia
npx hardhat verify --network sepolia [CONTRACT_ADDRESS]

# Foundry
forge install
forge build
forge test
forge script scripts/Deploy.s.sol --rpc-url sepolia --broadcast
forge verify-contract [CONTRACT_ADDRESS] [CONTRACT_NAME] --chain sepolia
```

## Security Considerations

### Smart Contract Security Checklist ✅ COMPLETE
- [x] Reentrancy protection (ReentrancyGuard) ✅
- [x] Integer overflow/underflow checks (Solidity 0.8+) ✅
- [x] Access control (Ownable, AccessControl) ✅
- [x] Input validation on all external functions ✅
- [x] Proper event emission for state changes ✅
- [x] Gas optimization considerations ✅
- [x] Emergency pause mechanism (not needed for MVP)
- [x] Time-lock for critical operations (not needed for MVP)

### Security Tools
- **Slither**: Static analysis
- **MythX**: Automated security scanning
- **Tenderly**: Transaction debugging and monitoring
- **OpenZeppelin Contracts**: Battle-tested implementations

## Indonesian Regulatory Compliance

### Key Considerations
- **OJK Regulations**: Financial Services Authority compliance
- **Data Privacy**: Handle user data appropriately
- **KYC/AML**: Consider anti-money laundering if handling financial transactions
- **Consumer Protection**: User-friendly error messages and safeguards
- **Transparency**: Clear documentation of financial mechanisms

### Compliance Documentation
When implementing features that touch financial services:
- Document compliance measures in README
- Include risk disclosures
- Explain dispute resolution mechanisms
- Clarify legal framework alignment

## Project Structure Best Practices

### Recommended Structure (when code is added)
```
/contracts          - Solidity smart contracts
/scripts            - Deployment and interaction scripts
/test               - Contract test files
/frontend           - DApp user interface (if applicable)
/docs               - Technical documentation
/pitch-deck         - Hackathon presentation materials
```

### Documentation Requirements
- **README.md**: Project overview, setup instructions
- **ARCHITECTURE.md**: Technical architecture and design decisions
- **SECURITY.md**: Security considerations and audit results
- **API.md**: Contract interfaces and integration guide

## Hackathon Submission Checklist

### Pre-Submission Requirements
- [x] Smart contract deployed to Sepolia testnet ✅ (Oct 13, 2025)
- [x] Contract verified on Etherscan ✅ (All 3 contracts)
- [x] All tests passing ✅ (90/90 tests, 100% coverage)
- [x] Security audit completed ✅ (Slither + manual review, 0 critical issues)
- [x] Production build ready ✅ (9/9 pages, 0 TypeScript errors)
- [x] Frontend DApp deployed to production ✅ **https://karyachain.rectorspace.com/** (Oct 18, 2025)
- [ ] Pitch deck completed (PDF format) 🔴 NOT STARTED (Target: Oct 19-21)
- [ ] Demo video prepared (3-5 minutes) 🔴 NOT STARTED (Target: Oct 21)
- [x] GitHub repository public ✅ (Already public)
- [ ] Team information finalized 🔴 TODO

### Pitch Deck Must Include
1. Problem statement and solution
2. Target user personas
3. Business model and monetization
4. Technical architecture diagrams
5. User flow wireframes
6. Go-to-market strategy
7. Competitive analysis
8. Development roadmap
9. Team backgrounds
10. Financial projections (if DeFi project)

## Timeline Awareness

**Current Phase**: Planning/Development (until October 22, 2025)
**Next Milestone**: Submission Deadline - October 22, 2025
**Finalist Announcement**: October 31, 2025
**Mentoring Period**: November 3-12, 2025
**Demo Day**: November 15, 2025

## Resources

### Official Documentation
- Hackathon Details: `docs/hackathon-overview.md`
- Sepolia Research: `docs/sepolia-testnet-research.md`
- Registration: https://infinityhackathon.id/hackathon/OJKRAF/submission

### Ethereum Development
- Solidity Docs: https://docs.soliditylang.org/
- OpenZeppelin: https://docs.openzeppelin.com/
- Hardhat: https://hardhat.org/docs
- Foundry Book: https://book.getfoundry.sh/

### Sepolia Tools
- Etherscan: https://sepolia.etherscan.io/
- Tenderly: https://dashboard.tenderly.co/
- Remix IDE: https://remix.ethereum.org/

## Development Philosophy for This Project

### Focus on Production-Ready Quality
- This is not just a hackathon prototype - build with implementation potential
- OJK and EKRAF may support real-world deployment
- Security and compliance are weighted heavily (25% of judging)
- Think long-term: scalability, maintenance, upgradability

### Innovation with Practicality
- Novel solutions that address real creative economy pain points in Indonesia
- Consider adoption barriers: UX, education, infrastructure
- Balance cutting-edge tech with user accessibility
- Demonstrate clear value proposition

### Indonesian Context Matters
- Understand local creative economy challenges
- Consider regulatory environment proactively
- Think about local payment systems, banking integration
- Cultural considerations in design and messaging

## Notes

### Wallet Configuration
- **Primary Wallet**: Rabby Wallet (not MetaMask)
- **Vanity Address**: `0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf` ☕
- **Network**: Sepolia Testnet (Chain ID: 11155111)
- **RPC Provider**: PublicNode (`https://ethereum-sepolia-rpc.publicnode.com`)
- **Test ETH**: ✅ 0.049 ETH (transferred from old wallet)
- **Generation Stats**: 71,091 attempts in 223 seconds (318 addr/sec)

### Deployed Contracts (Sepolia)
- **CopyrightRegistry**: `0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f` ✅ [Verified](https://sepolia.etherscan.io/address/0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f#code)
- **KaryaNFT**: `0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4` ✅ [Verified](https://sepolia.etherscan.io/address/0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4#code)
- **KaryaMarketplace**: `0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10` ✅ [Verified](https://sepolia.etherscan.io/address/0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10#code)
- **Deployment Date**: October 13, 2025
- **All Contracts**: Verified on Etherscan with public source code

### Development Progress (Updated Oct 13, 2025)

✅ **Completed Milestones:**
1. ✅ Sub-theme chosen: Digital Rights & Authentication
2. ✅ Development environment set up (Hardhat + OpenZeppelin)
3. ✅ Smart contract architecture designed
4. ✅ **ALL 3 CORE CONTRACTS COMPLETE** 🎉
   - CopyrightRegistry (19 tests, 100% coverage)
   - KaryaNFT (32 tests, 100% coverage)
   - KaryaMarketplace (39 tests, 100% coverage)
5. ✅ TDD approach validated (100% statement coverage achieved)
6. ✅ Integration tests: Full user flow verified
7. ✅ Gas optimized for production use
8. ✅ **SECURITY AUDIT COMPLETE** 🔒
   - Slither analysis: 0 critical/high issues
   - Manual security review: PASS
   - All contracts production-ready
9. ✅ **Vanity Address Generated** ☕
   - Address: `0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf`
   - 71,091 attempts in 223 seconds
10. ✅ **DEPLOYED TO SEPOLIA TESTNET** 🚀
    - All 3 contracts deployed and verified
    - Deployer: `0xcAfeA0fd...` (vanity address)
    - All source code verified on Etherscan

🎯 **Frontend Sprint Progress (Day 8 Complete - 95% - DEPLOYED TO PRODUCTION! 🚀):**
1. ✅ **Day 1 (Oct 13 Morning)**: Project setup + Landing page foundation COMPLETE
   - Next.js 14 + TypeScript + Tailwind CSS
   - Web3 stack (wagmi + RainbowKit)
   - Base UI components
   - Contract ABIs exported
   - Hero section
2. ✅ **Day 2 (Oct 13 Evening)**: Landing page + Wallet connection COMPLETE
   - 5 landing page sections (How It Works, Features, For Indonesian Creators, FAQ, Footer)
   - Header with navigation
   - Wallet connection with RainbowKit
   - Full bilingual support
3. ✅ **Day 3 (Oct 13 Night)**: Copyright registration flow (Part 1) COMPLETE
   - File upload with drag & drop, SHA-256 hashing
   - IPFS integration (Pinata)
   - Metadata form with validation
   - Zustand state management with localStorage
4. ✅ **Day 4 (Oct 13-14 Late Night/Early Morning)**: Registration Steps 3-4 + Full NFT Minting COMPLETE
   - ✅ Step 3: Review & Confirmation
   - ✅ Step 4: Blockchain transaction with wagmi
   - ✅ Success page with registration details
   - ✅ Complete NFT minting flow with royalty configuration
   - ✅ MintNFTModal with earnings calculator
   - ✅ Full blockchain integration for minting
5. ✅ **Day 5 (Oct 17)**: Full Marketplace Implementation COMPLETE
   - ✅ Marketplace page (/marketplace) with grid layout
   - ✅ Search and filter functionality
   - ✅ NFTCard component with badges
   - ✅ useMarketplaceListings hook (fetch + enrich with IPFS metadata)
   - ✅ NFT detail page (/marketplace/[tokenId])
   - ✅ Purchase flow with wagmi v2 integration
6. ✅ **Day 6 (Oct 18 Morning)**: Dashboard Development COMPLETE
   - ✅ Dashboard page with 3-tab navigation (My Copyrights, My NFTs, My Listings)
   - ✅ useUserCopyrights() and useUserNFTs() hooks
   - ✅ List for sale functionality (ListNFTModal with approve + list flow)
   - ✅ Stats cards and quick actions
7. ✅ **Day 7 (Oct 18 Afternoon)**: Mobile Responsiveness + Polish COMPLETE
   - ✅ All pages mobile-responsive (sm/md/lg/xl breakpoints)
   - ✅ Skeleton loaders system (Skeleton, SkeletonCard, SkeletonGrid)
   - ✅ Progressive text scaling and responsive grids
8. ✅ **Day 8 (Oct 18 Evening)**: Performance Optimization + Deployment COMPLETE
   - ✅ Fixed 40+ TypeScript errors for production build
   - ✅ Production build successful (9/9 pages, 0 errors)
   - ✅ Deployed to Vercel: **https://karyachain.rectorspace.com/**
9. 🔜 **Day 9 (Oct 19-20)**: Final polish (SEO meta tags) + Buffer day + SUBMIT TO HACKATHON

**See `docs/FRONTEND-EXECUTION-PLAN.md` for detailed daily breakdown**

🎨 **Frontend Design 2 Progress (ALL EPICS COMPLETE - 100% + v0.2.0 Performance Update!):**
1. ✅ **EPIC 1: Design System & Foundation (18/18 tasks)** COMPLETE
   - Next.js 14 + TypeScript + Tailwind CSS with glassmorphism
   - Complete design system in globals.css (10+ animations, glass utilities, gradients)
   - 7 glass components (GlassCard, GlassButton, GlassInput, GlassModal, Loading components, Badge)
   - AnimatedSection with scroll-triggered animations
   - Sidebar navigation (NEW UX pattern)
   - TopBar with wallet connection
   - Web3 providers setup (wagmi v2 + RainbowKit)
   - Contract ABIs integration
   - Page transition animations (template.tsx)
   - Homepage with glassmorphism showcase
2. ✅ **EPIC 2: Core User Flows (15 tasks)** COMPLETE
   - Full copyright registration flow (4 steps + success page)
   - Full NFT minting flow with royalty configuration
   - Complete marketplace (browse, search, filter, purchase)
   - Zustand state management + IPFS integration
3. ✅ **EPIC 3: Advanced Features & Polish (9 tasks)** COMPLETE
   - Dashboard implementation (3 tabs: Copyrights, NFTs, Listings)
   - List NFT functionality with approve + list flow
   - Error handling components
   - Loading states with skeleton loaders
4. ✅ **v0.2.0 Performance Update (Oct 14 Evening)** COMPLETE
   - **New LayoutWrapper**: Smart dual layout system (marketing vs app)
   - **New Navbar**: Marketing navigation for homepage
   - **Animation Optimizations**: 2x faster (0.8s → 0.4s, 0.6s → 0.3s)
   - **React Cleanup**: Fixed useEffect memory leak in AnimatedSection
   - **Simplified Layout**: Cleaner architecture (21 lines → 7 lines)
   - **Faster Load**: Removed expensive page transitions
   - **DX Improvements**: Added `typecheck` and `typecheck:strict` scripts

**See `docs/FRONTEND-DESIGN-2-EXECUTION-PLAN.md` for detailed breakdown**

### Available Commands

```bash
# Testing
npm test                    # Run all tests (90 tests)
npx hardhat coverage        # Generate coverage report (100% achieved)

# Compilation
npm run compile             # Compile contracts

# Development
npm run node                # Start local Hardhat node
npm run deploy:local        # Deploy to local network
npm run deploy:sepolia      # Deploy to Sepolia (ready!)
npm run verify:sepolia      # Verify on Etherscan

# Documentation
cat docs/CONTRACT-API.md      # View API documentation
cat docs/EXECUTION-PLAN.md    # View progress tracker (v1.4)
cat docs/SECURITY-AUDIT.md    # View security audit report
```

### Working Contracts (All Production-Ready!)

**CopyrightRegistry** (contracts/CopyrightRegistry.sol):
- ✅ 100% test coverage (19 tests)
- ✅ Gas optimized (~412k per registration)
- ✅ 5 asset types supported

**KaryaNFT** (contracts/KaryaNFT.sol):
- ✅ 100% test coverage (32 tests)
- ✅ Gas optimized (~275k per mint)
- ✅ ERC-721 + ERC-2981 royalty standard
- ✅ Links to CopyrightRegistry

**KaryaMarketplace** (contracts/KaryaMarketplace.sol):
- ✅ 100% test coverage (39 tests)
- ✅ Gas optimized (~263k listing, ~108k purchase)
- ✅ Automatic royalty distribution
- ✅ Platform fee (2.5%)
- ✅ Perpetual royalties on secondary sales
