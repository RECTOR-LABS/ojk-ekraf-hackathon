# Karya Chain

**Indonesian IP Protection & Royalty Platform**

Blockchain-verified copyright registration and automated lifetime royalties for Indonesia's creative economy.

---

## 📋 Overview

Karya Chain addresses the critical problem that only 11% of Indonesian creators have IP protection, leading to widespread piracy and unfair compensation in a $12.36B creative export industry.

**Built for**: OJK-Ekraf Infinity Hackathon 2025
**Sub-Theme**: Digital Rights & Authentication
**Network**: Sepolia Testnet (Chain ID: 11155111)

### Key Features

- ✅ **Blockchain Copyright Registration** - Tamper-proof proof of ownership
- ✅ **Automated Royalty Distribution** - Smart contract-enforced lifetime royalties
- ✅ **Multi-Asset Support** - Art, Music, Writing, Photography, Design
- ✅ **OJK-Compliant** - First regulatory-compliant IP platform in Indonesia
- ✅ **Creator Marketplace** - Low fees (2.5%), direct sales

---

## 🏗️ Architecture

```
Frontend (Next.js + Tailwind)
        │
        ├── Wallet Connection (RainbowKit)
        ├── IPFS Storage (Pinata)
        │
        └── Smart Contracts (Sepolia Testnet)
            ├── CopyrightRegistry    (IP registration)
            ├── KaryaNFT (ERC-721)   (Unique works)
            ├── KaryaEditions (1155) (Limited editions)
            ├── RoyaltyDistributor   (Payment splits)
            ├── KaryaMarketplace     (Trading platform)
            └── CreatorRegistry      (Profile & KYC)
```

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed technical design.

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Clone repository
git clone https://github.com/RECTOR-LABS/ojk-ekraf-hackathon.git
cd ojk-ekraf-hackathon

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your private key and API keys
```

### Configuration

Edit `.env` file:

```env
SEPOLIA_RPC_URL=https://rpc.sepolia.dev
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

**⚠️ IMPORTANT**: Never commit your `.env` file with real private keys!

---

## 🛠️ Development

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Test Coverage

```bash
npx hardhat coverage
```

### Deploy to Local Network

```bash
# Start local Hardhat node
npx hardhat node

# In another terminal, deploy contracts
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Sepolia Testnet

```bash
# Ensure you have Sepolia ETH in your wallet
npx hardhat run scripts/deploy.js --network sepolia

# Verify contracts on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

---

## 🧪 Testing Strategy

- **Unit Tests**: Test individual contract functions
- **Integration Tests**: Test contract interactions
- **Security Audits**: Slither + MythX
- **Gas Optimization**: Hardhat Gas Reporter

---

## 📁 Project Structure

```
ojk-ekraf-hackathon/
├── contracts/              # Solidity smart contracts
│   ├── CopyrightRegistry.sol
│   ├── KaryaNFT.sol
│   ├── KaryaEditions.sol
│   ├── RoyaltyDistributor.sol
│   ├── KaryaMarketplace.sol
│   └── CreatorRegistry.sol
├── scripts/                # Deployment scripts
│   └── deploy.js
├── test/                   # Contract tests
│   ├── CopyrightRegistry.test.js
│   ├── KaryaNFT.test.js
│   └── Marketplace.test.js
├── frontend/               # Next.js DApp (future)
├── docs/                   # Documentation
│   ├── PRD.md              # Product Requirements
│   ├── ARCHITECTURE.md     # Technical architecture
│   └── SECURITY.md         # Security audit (future)
├── hardhat.config.js       # Hardhat configuration
├── package.json
└── README.md
```

---

## 🎯 Roadmap

### Phase 1: Core Development (Weeks 1-2)
- [x] Project setup and documentation
- [ ] Core smart contracts (Registry, NFT, Royalty)
- [ ] Comprehensive unit tests
- [ ] Security audit (Slither/MythX)

### Phase 2: Marketplace & Frontend (Weeks 3-4)
- [ ] Marketplace contract
- [ ] Creator registry & verification
- [ ] Next.js frontend setup
- [ ] Wallet integration
- [ ] Copyright registration UI

### Phase 3: Integration & Testing (Week 5)
- [ ] Smart contract deployment to Sepolia
- [ ] Etherscan verification
- [ ] Frontend-contract integration
- [ ] End-to-end testing

### Phase 4: Submission (Week 6)
- [ ] Pitch deck creation
- [ ] Demo video
- [ ] Final testing and bug fixes
- [ ] Hackathon submission (by Oct 22)

---

## 🔒 Security

### Implemented Protections

- ✅ ReentrancyGuard on all value transfers
- ✅ OpenZeppelin audited contracts
- ✅ Access control with Ownable
- ✅ Input validation on external functions
- ✅ Safe external calls with checks
- ✅ Solidity 0.8+ overflow protection

### Audit Status

- [ ] Slither static analysis
- [ ] MythX security scan
- [ ] Manual security review
- [ ] Test coverage > 95%

See [SECURITY.md](./docs/SECURITY.md) for full security documentation.

---

## 📊 Market Opportunity

- **Creative Economy Size**: $12.36B exports (Indonesia, 2024)
- **Target Users**: 27.66M creative workers
- **Current IP Protection**: Only 11% of creators protected
- **Growth Rate**: 5.96% export growth, 8.08% investment growth

### Key Pain Points Solved

1. **IP Protection Crisis**: Only 11% have registered IP rights
2. **Royalty Tracking**: Artists rarely receive deserved royalties
3. **Piracy Epidemic**: Widespread theft across all creative sectors
4. **Regulatory Compliance**: OJK-aligned, first compliant platform

---

## 🏆 Hackathon Details

**Competition**: OJK-Ekraf Infinity Hackathon 2025
**Theme**: Accelerating Creative Economy Through Digital Innovation
**Prize Pool**: IDR 50,000,000
**Submission Deadline**: October 22, 2025
**Network**: Sepolia Testnet

### Judging Criteria

- Innovation & Originality: 30%
- Security & Compliance: 25% ⭐
- Implementation Feasibility: 20%
- Technical Quality: 15%
- Presentation: 10%

**Target Score**: 95/100

---

## 🔗 Resources

### Documentation
- [Product Requirements (PRD)](./docs/PRD.md)
- [Technical Architecture](./docs/ARCHITECTURE.md)
- [Hackathon Overview](./hackathon-overview.md)
- [Sepolia Testnet Research](./sepolia-testnet-research.md)

### Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://rpc.sepolia.dev
- **Explorer**: https://sepolia.etherscan.io/
- **Faucets**:
  - Google Cloud Web3 Faucet
  - Chainlink Faucet
  - Alchemy Faucet
  - QuickNode Faucet

### Technology Stack
- **Smart Contracts**: Solidity 0.8.20, Hardhat
- **Standards**: ERC-721, ERC-1155, ERC-2981
- **Libraries**: OpenZeppelin Contracts
- **Frontend**: Next.js 14, Tailwind CSS
- **Web3**: wagmi, viem, RainbowKit
- **Storage**: IPFS (Pinata)

---

## 👥 Team

**RECTOR** - Senior Developer

---

## 📝 License

ISC License

---

## 🤝 Contributing

This is a hackathon submission project. Contributions are welcome post-hackathon.

---

## 📧 Contact

- **Repository**: https://github.com/RECTOR-LABS/ojk-ekraf-hackathon
- **Issues**: https://github.com/RECTOR-LABS/ojk-ekraf-hackathon/issues

---

## 🙏 Acknowledgments

- **OJK** (Financial Services Authority Indonesia)
- **EKRAF** (Creative Economy Agency Indonesia)
- **BlockDevId** - Hackathon organizer
- **OpenZeppelin** - Secure smart contract libraries
- **Ethereum Foundation** - Sepolia testnet infrastructure

---

**Built with ❤️ for Indonesia's Creative Economy**
