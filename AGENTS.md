<!-- Satellite context file — extends the global hub (~/.claude/CLAUDE.md | ~/.pi/agent/AGENTS.md). Host-neutral; project-specific only. Do not duplicate hub standards here. -->

# OJK-Ekraf Hackathon (KaryaChain)

> **OJK-Ekraf Infinity Hackathon 2025** submission — blockchain hackathon accelerating Indonesia's creative economy. Digital Rights & Authentication: copyright verification for Indonesian creators. Prize pool IDR 50,000,000. Sepolia Testnet.

**Submission URL:** https://karyachain.rectorspace.com (frontend-design-2, Glassmorphism)
**Deadline:** October 22, 2025 · **Status:** 97% complete, production-ready.

## Tech Stack

- **Network:** Sepolia Testnet (Chain ID 11155111)
- **Smart Contracts:** Hardhat, OpenZeppelin, Solidity 0.8.20
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Web3:** wagmi v2, RainbowKit, viem
- **Storage:** Pinata IPFS (file + metadata)
- **Testing:** Hardhat (90 tests, 100% coverage), Slither (security audit)
- **Deployment:** Vercel (frontend), Sepolia (contracts, verified on Etherscan)

## Deployed Contracts (Sepolia, Oct 13 2025)

| Contract | Address | Tests | Gas |
|----------|---------|-------|-----|
| CopyrightRegistry | `0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f` | 19 (100%) | ~412k/registration |
| KaryaNFT | `0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4` | 32 (100%) | ~275k/mint |
| KaryaMarketplace | `0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10` | 39 (100%) | ~263k listing / ~108k purchase |

All verified on Etherscan. 5 asset types, ERC-721 + ERC-2981 royalty, 2.5% platform fee, automatic royalty distribution, perpetual royalties on secondary sales. Slither audit: 0 critical/high. ReentrancyGuard on all transfers.

## Project Structure

- `contracts/` — CopyrightRegistry, KaryaNFT, KaryaMarketplace (90 tests, 100% coverage)
- `frontend-design-2/` — Next.js 14, wagmi v2, RainbowKit, Pinata IPFS (PRIMARY — for submission)
- `frontend/` — original design (backup)
- `docs/` — PRDs, execution plans, API, architecture, security audit, manual testing guide
- `pitch-deck/KaryaChain_Pitch_Deck.pdf` — 18-slide professional deck (1.2MB)

## Common Commands

```bash
npm test                    # 90 tests
npx hardhat coverage        # 100% coverage report
npm run compile             # compile contracts
npm run node                # local Hardhat node
npm run deploy:local        # deploy to local network
npm run deploy:sepolia      # deploy to Sepolia
npm run verify:sepolia      # verify on Etherscan
```

Frontend (`frontend-design-2/`): `npm run dev` (localhost:3001) · `npm run build`.

## Frontend (v0.4.1)

Glassmorphism with dual layout (Marketing navbar + Sidebar). 100% blockchain integrated — NO MOCK DATA. 5 custom hooks (~1000+ lines wagmi integration): `useUserCopyrights`, `useUserNFTs`, `useUserListings` (Dashboard); `useMarketplaceListings`, `useNFTDetail` (Marketplace). IPFS via Pinata gateway. Mobile responsive (all breakpoints), skeleton loaders. 9/9 pages compiled, 0 TypeScript errors.

**Pages:** Landing · Register (4 steps) · Mint · Marketplace · NFT Detail · Dashboard (3 tabs).

## Deployment Strategy

| Branch | Directory | URL | Purpose |
|--------|-----------|-----|---------|
| **dev** | frontend-design-2/ | https://karyachain.rectorspace.com | **PRIMARY — for submission** |
| frontend-v1 | frontend/ | https://karyachain-v1.rectorspace.com | Backup (original design) |

Vercel: `git push origin dev` → auto-deploy to karyachain.rectorspace.com.

## Wallet Configuration

- **Primary:** Rabby Wallet (not MetaMask)
- **Vanity address:** `0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf` ☕ (71,091 attempts, 223s, 318 addr/sec)
- **RPC:** PublicNode (`https://ethereum-sepolia-rpc.publicnode.com`)

## Key Docs

`docs/CONTRACT-API.md` · `docs/EXECUTION-PLAN.md` (progress tracker) · `docs/SECURITY-AUDIT.md` · `docs/MANUAL-TESTING-GUIDE.md`.