<div align="center">

# ⛓️ Karya Chain

### Blockchain-Powered Copyright Protection for Indonesia's Creative Economy

**Tamper-proof IP registration • Automated lifetime royalties • OJK-compliant marketplace**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-karyachain.rectorspace.com-4F46E5?style=for-the-badge)](https://karyachain.rectorspace.com)
[![Sepolia Testnet](https://img.shields.io/badge/Network-Sepolia_Testnet-00D4AA?style=for-the-badge)](https://sepolia.etherscan.io/)
[![Verified Contracts](https://img.shields.io/badge/Contracts-Verified_✓-28A745?style=for-the-badge)](https://sepolia.etherscan.io/address/0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f#code)

**Built for OJK-Ekraf Infinity Hackathon 2025** 🏆

</div>

---

## 🎯 The Problem

Only **11% of Indonesian creators** have IP protection in a **$12.36B** creative export industry, leading to:
- Widespread piracy and content theft
- Lost royalties for original creators
- No transparent proof of ownership
- Manual, inefficient royalty distribution

## 💡 Our Solution

**Karya Chain** provides blockchain-verified copyright registration with automated, perpetual royalty distribution for Indonesia's 27.66M creative workers.

### Key Features

🔒 **Immutable Copyright Registry** - Blockchain proof of ownership with IPFS metadata
💰 **Automated Royalties** - Smart contract-enforced payments on every resale (ERC-2981)
🎨 **Multi-Asset Support** - Art, Music, Writing, Photography, Design
🛒 **Creator Marketplace** - Direct sales with 2.5% platform fee
⚖️ **OJK-Compliant** - First regulatory-aligned IP platform in Indonesia

---

## 🏗️ Architecture

```
Next.js 14 + TypeScript + Tailwind CSS
          ↓
    wagmi v2 + RainbowKit (Web3)
          ↓
    Pinata IPFS (Metadata Storage)
          ↓
┌─────────────────────────────────────────┐
│   Smart Contracts (Sepolia Testnet)    │
├─────────────────────────────────────────┤
│ • CopyrightRegistry - IP registration   │
│ • KaryaNFT - ERC-721 + ERC-2981         │
│ • KaryaMarketplace - Trading platform   │
└─────────────────────────────────────────┘
```

📚 **[Full Architecture Docs](./docs/ARCHITECTURE.md)**

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| **Smart Contract Tests** | 90 tests, 100% coverage |
| **Security Audit** | ✅ Slither passed (0 critical) |
| **Gas Efficiency** | ~412k registration, ~275k mint |
| **Frontend Pages** | 9 pages, fully responsive |
| **Blockchain Integration** | 100% (5 custom wagmi hooks) |
| **Production Status** | ✅ Deployed & Verified |

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/RECTOR-LABS/ojk-ekraf-hackathon.git
cd ojk-ekraf-hackathon
npm install

# Run tests (90 tests, 100% coverage)
npm test

# Deploy contracts
cp .env.example .env  # Add your PRIVATE_KEY and ETHERSCAN_API_KEY
npm run deploy:sepolia

# Start frontend
cd frontend-design-2
npm install
npm run dev  # Opens at localhost:3001
```

**Live Demo**: [karyachain.rectorspace.com](https://karyachain.rectorspace.com)

---

## 📁 Project Structure

```
ojk-ekraf-hackathon/
├── contracts/                   # Smart contracts (Solidity 0.8.20)
│   ├── CopyrightRegistry.sol   # 19 tests, 100% coverage
│   ├── KaryaNFT.sol            # 32 tests, 100% coverage
│   └── KaryaMarketplace.sol    # 39 tests, 100% coverage
├── frontend-design-2/           # Production DApp (Next.js 14)
│   ├── src/hooks/              # 5 custom wagmi hooks (~1000 lines)
│   └── src/app/                # 9 pages, glassmorphism UI
├── test/                        # 90 comprehensive tests
├── docs/                        # Complete documentation
│   ├── PRD.md                  # Product requirements
│   ├── ARCHITECTURE.md         # Technical design
│   ├── SECURITY-AUDIT.md       # Security analysis
│   └── CONTRACT-API.md         # Smart contract API
└── pitch-deck/                  # Hackathon submission materials
```

---

## 🔗 Deployed Contracts (Sepolia Testnet)

| Contract | Address | Status |
|----------|---------|--------|
| **CopyrightRegistry** | [`0xa2e84f3c...9ca93f`](https://sepolia.etherscan.io/address/0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f#code) | ✅ Verified |
| **KaryaNFT** | [`0xE7f3c9Bd...2b52Fa4`](https://sepolia.etherscan.io/address/0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4#code) | ✅ Verified |
| **KaryaMarketplace** | [`0xb2430198...b4b8Ed10`](https://sepolia.etherscan.io/address/0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10#code) | ✅ Verified |

**Deployment Date**: October 13, 2025
**Network**: Sepolia (Chain ID: 11155111)

---

## 🔒 Security & Compliance

✅ **ReentrancyGuard** on all value transfers
✅ **OpenZeppelin** audited contract libraries
✅ **Slither audit** passed (0 critical/high issues)
✅ **100% test coverage** across all contracts
✅ **Input validation** on external functions
✅ **OJK-compliant** architecture

📄 **[Full Security Audit Report](./docs/SECURITY-AUDIT.md)**

---

## 💼 Market Impact

| Metric | Value |
|--------|-------|
| Indonesia Creative Economy | $12.36B in exports |
| Target Users | 27.66M creative workers |
| Current IP Protection Rate | Only 11% |
| Annual Growth Rate | 5.96% exports, 8.08% investment |

**Problem Solved**: First OJK-compliant blockchain platform addressing IP protection crisis and enabling automated royalty distribution for Indonesian creators.

---

## 🏆 OJK-Ekraf Infinity Hackathon 2025

**Theme**: Accelerating Creative Economy Through Digital Innovation
**Prize Pool**: IDR 50,000,000 | **Deadline**: October 22, 2025

### Judging Criteria (Target: 95/100)
- 🎯 Innovation & Originality: 30%
- 🔐 Security & Compliance: 25% ⭐
- ⚡ Implementation Feasibility: 20%
- 💻 Technical Quality: 15%
- 🎤 Presentation: 10%

---

## 🛠️ Technology Stack

**Blockchain**: Solidity 0.8.20, Hardhat, OpenZeppelin, ERC-721/2981
**Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
**Web3**: wagmi v2, viem, RainbowKit
**Storage**: Pinata IPFS
**Network**: Sepolia Testnet (Chain ID: 11155111)

---

## 📚 Documentation

- 📋 [Product Requirements (PRD)](./docs/PRD.md)
- 🏗️ [Technical Architecture](./docs/ARCHITECTURE.md)
- 🔒 [Security Audit Report](./docs/SECURITY-AUDIT.md)
- 📖 [Smart Contract API](./docs/CONTRACT-API.md)
- 📊 [Pitch Deck](./pitch-deck/KaryaChain_Pitch_Deck.pdf)

---

## 👥 Team

**RECTOR** - Full-Stack Blockchain Developer

---

## 📄 License

ISC License

---

<div align="center">

### Built for Indonesia's Creative Economy 🇮🇩

**[Live Demo](https://karyachain.rectorspace.com)** • **[Documentation](./docs/)** • **[Pitch Deck](./pitch-deck/KaryaChain_Pitch_Deck.pdf)**

[![GitHub](https://img.shields.io/badge/GitHub-RECTOR--LABS-181717?style=flat-square&logo=github)](https://github.com/RECTOR-LABS/ojk-ekraf-hackathon)
[![Sepolia](https://img.shields.io/badge/Sepolia-Verified-00D4AA?style=flat-square)](https://sepolia.etherscan.io/)

**Powered by OpenZeppelin • Ethereum Foundation • Pinata IPFS**

</div>
