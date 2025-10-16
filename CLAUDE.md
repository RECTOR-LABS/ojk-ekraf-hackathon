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

**Last Updated**: October 17, 2025 (Mobile Responsive & Error Handling COMPLETE ✅)
**Overall Progress**: 99.5% Complete ✅ **PRODUCTION-READY!**
**Days Until Deadline**: 1.5 days (Oct 22, 2025)
**🌐 SUBMISSION URL**: https://karyachain.rectorspace.com (frontend-design-2 - Glassmorphism)

**🎨 Frontend (frontend-design-2/) - For Hackathon Submission:**
- **Design**: Glassmorphism with dual layout (Marketing navbar + Sidebar)
- **Version**: v0.4.1 (PATCH - Mobile responsive fixes + Error message handling)
- **Status**: 100% blockchain integrated - NO MOCK DATA ANYWHERE ✅
- **5 Custom Hooks**: ~1000+ lines of wagmi integration (useUserCopyrights, useUserNFTs, useUserListings, useMarketplaceListings, useNFTDetail)
- **Dev Server**: localhost:3001
- **Reference**: `docs/FRONTEND-DESIGN-2-PRD.md`

### ✅ Completed

#### Smart Contracts (3/3) 🎉
- **CopyrightRegistry**: 100% coverage (19 tests), ~412k gas, 5 asset types
- **KaryaNFT**: 100% coverage (32 tests), ~275k gas, ERC-721 + ERC-2981 royalty
- **KaryaMarketplace**: 100% coverage (39 tests), ~263k listing, ~108k purchase, 2.5% platform fee
- **Deployed on Sepolia**: Oct 13, 2025 - All verified on Etherscan ✅
- **Security**: Slither audit passed (0 critical/high), ReentrancyGuard on all transfers
- **Location**: `contracts/`

#### Frontend (100%) 🚀
- **All Pages**: Landing, Register (4 steps), Mint, Marketplace, NFT Detail, Dashboard (3 tabs)
- **100% Blockchain Integration**: 5 custom hooks with wagmi v2 (~1000+ lines)
  - useUserCopyrights, useUserNFTs, useUserListings, useMarketplaceListings, useNFTDetail
- **IPFS Integration**: Pinata gateway for file/metadata upload and display
- **Glassmorphism UI**: Complete design system, 10+ animations, dual layout
- **Mobile Responsive**: All breakpoints (sm/md/lg/xl), skeleton loaders
- **Production Build**: 9/9 pages compiled, 0 TypeScript errors ✅

#### Documentation (100%)
- ✅ All PRDs, execution plans, contract API, architecture, security audit
- ✅ MANUAL-TESTING-GUIDE.md - Section 4 complete (Dashboard + Mint tested)

#### Frontend Version History

**v0.2.0 (Oct 14)**: Design system + performance optimizations
- Glassmorphism UI system, dual layout (Navbar/Sidebar), 10+ animations
- 2x faster animations, removed page transitions, React cleanup fixes

**v0.3.0 (Oct 16)**: Dashboard blockchain integration
- 3 custom hooks (useUserCopyrights, useUserNFTs, useUserListings) - 540 lines
- 100% real data in all dashboard tabs, IPFS image display, asset-type icons

**v0.4.0 (Oct 16)**: Marketplace blockchain integration 🎉 **COMPLETE**
- 2 custom hooks (useMarketplaceListings, useNFTDetail) - 452 lines
- Marketplace browse with search/filter using real listings
- NFT detail page with purchase functionality (ownership checks, wallet validation)
- **NO MOCK DATA ANYWHERE IN APPLICATION** ✅

**v0.4.1 (Oct 17)**: Mobile responsive + Error handling fixes 🎉
- Fixed all mobile horizontal scroll issues (Bug #13-15)
  - Dashboard: Added overflow-x-hidden, responsive padding, flex-shrink-0
  - Landing page: Responsive navbar, logo text, overflow prevention
  - Button tap targets: All interactive elements meet 44px minimum
- Fixed error message overflow in all transaction flows (Bug #16)
  - Added text wrapping (break-words, whitespace-pre-wrap)
  - Scrollable containers (max-h-32, overflow-y-auto)
  - Improved flex layout (flex-1 min-w-0)
  - Applied to: Mint, List, Purchase, Registration flows
- Commits: `f8fd30a` (mobile fixes) + `ba48e22` (error fixes) + `dba190a` (debug logs)

### 🎯 Next Steps (Priority Order)

1. ✅ **Frontend DApp** - **100% COMPLETE!** 🎉
   - All pages functional with real blockchain data
   - No mock data anywhere
   - Production-ready

2. 🔜 **Manual Testing** (Oct 17-19) - Section 4 complete, Section 5-12 pending
   - Complete marketplace flow testing
   - End-to-end purchase verification
   - Cross-browser and mobile testing
   - **Reference**: `docs/MANUAL-TESTING-GUIDE.md`

3. 🔜 **Pitch Deck** 📊 (Oct 19-21)
   - Problem/solution, architecture, business model
   - Screenshots from https://karyachain.rectorspace.com
   - Demo video (3-5 min)

4. 🔜 **Final Submission** (Oct 22 - DEADLINE)
   - Submit pitch deck PDF
   - Submit contract addresses + live demo URL
   - Confirm before 5 PM WIB

### Project Structure

**Contracts**: `contracts/` (CopyrightRegistry, KaryaNFT, KaryaMarketplace) - 90 tests, 100% coverage
**Frontend**: `frontend-design-2/` (Next.js 14, wagmi v2, RainbowKit, Pinata IPFS)
**Key Hooks** (5 total, ~1000+ lines):
- useUserCopyrights, useUserNFTs, useUserListings (Dashboard)
- useMarketplaceListings, useNFTDetail (Marketplace)
**Docs**: `docs/` (PRDs, execution plans, API, architecture, security audit)

## Hackathon Context

**Sub-Theme**: Digital Rights & Authentication (Copyright verification for Indonesian creators)
**Judging**: Innovation 30%, Security 25%, Feasibility 20%, Technical 15%, Presentation 10%
**Deadline**: October 22, 2025 (2 days remaining)

## Technical Stack

**Network**: Sepolia Testnet (Chain ID: 11155111)
**Smart Contracts**: Hardhat, OpenZeppelin, Solidity 0.8.20
**Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
**Web3**: wagmi v2, RainbowKit, viem
**Storage**: Pinata IPFS (file + metadata)
**Testing**: Hardhat (90 tests), Slither (security audit)
**Deployment**: Vercel (frontend), Sepolia (contracts - verified on Etherscan)

## Submission Checklist

- [x] Contracts deployed & verified on Sepolia ✅
- [x] All tests passing (90/90, 100% coverage) ✅
- [x] Security audit (0 critical issues) ✅
- [x] Frontend deployed (https://karyachain.rectorspace.com) ✅
- [x] GitHub repository public ✅
- [ ] Pitch deck PDF 🔴 (Oct 19-21)
- [ ] Demo video (3-5 min) 🔴 (Oct 21)
- [ ] Team information 🔴

**Submission URL**: https://infinityhackathon.id/hackathon/OJKRAF/submission
**Deadline**: October 22, 2025

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

### Deployment Strategy

| Branch | Directory | URL | Purpose |
|--------|-----------|-----|---------|
| **dev** | frontend-design-2/ | https://karyachain.rectorspace.com | **PRIMARY - For Submission** |
| frontend-v1 | frontend/ | https://karyachain-v1.rectorspace.com | Backup (original design) |

**Vercel**: `git push origin dev` → Auto-deploy to karyachain.rectorspace.com
**Local**: `cd frontend-design-2 && npm run dev` (localhost:3001)

### Development Timeline

**Oct 13**: Contracts deployed & verified on Sepolia ✅
**Oct 13-14**: Frontend foundation (Next.js, wagmi, design system) ✅
**Oct 15**: Registration flow with IPFS & blockchain integration ✅
**Oct 16**: Dashboard (v0.3.0) + Marketplace (v0.4.0) blockchain integration ✅
**Oct 17-19**: Manual testing & bug fixes 🔜
**Oct 19-21**: Pitch deck & demo video 🔜
**Oct 22**: SUBMISSION DEADLINE

### Testing & Bugs (Updated Oct 17)

**Testing Progress** (localhost:3001):
- ✅ Section 1-8, 11: Wallet, Landing, Registration, Mint, List, Marketplace, Mobile (66/66 checks)
- 🔜 Section 9-10, 12: End-to-end, Error states, Cross-browser (pending)
- **Reference**: `docs/MANUAL-TESTING-GUIDE.md`

**Bugs Fixed** (16 total: 14 FIXED + 2 deferred):
1. ✅ Asset type UI feedback (visual selection)
2. 🔴 Tags persistence (LOW priority - workaround exists)
3. ✅ Blockchain registration disabled → Full IPFS + wagmi integration
4. ✅ Dashboard mock data → 3 custom hooks with real blockchain data
5. ✅ Modal transparency → Improved glassmorphism
6. ✅ Registration store not resetting → Auto-reset on success
7. ✅ Marketplace mock data → 2 custom hooks with real listings
8. ✅ Mint NFT function not working → Fixed function name + tokenURI
9. ✅ List NFT fake implementation → Full wagmi two-step flow
10. ✅ TypeScript error in purchase → Fixed function name
11. 🔴 Console errors (23 total - LOW priority, non-critical)
12. ✅ Marketplace cache not refreshing → React Query invalidation
13. ✅ Dashboard horizontal scroll on mobile → Responsive fixes
14. ✅ Landing page horizontal scroll → Overflow prevention
15. ✅ Button tap targets below 44px → min-h-[44px] all buttons
16. ✅ Error message overflow → Text wrapping + scrollable containers

**Proof of Success**:
- Registration TX: `0x1ac392...5eca87` ([Etherscan](https://sepolia.etherscan.io/tx/0x1ac392d58da682715357fd834c555147cdc6f41fe9235302fbc4d280b15eca87))
- Registration ID: #1760485969126
- IPFS: File + Metadata uploaded successfully

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
