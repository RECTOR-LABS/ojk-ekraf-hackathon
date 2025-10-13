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

**Last Updated**: October 13, 2025
**Overall Progress**: 25% Complete
**Days Until Deadline**: 9 days

### ✅ Completed

#### Smart Contracts (1/3 - 33%)
- **CopyrightRegistry.sol** ✅
  - Full implementation with 5 asset types
  - Tamper-proof copyright registration
  - Content hash verification and duplicate detection
  - Public verification functions
  - Creator and asset type querying
  - **Test Coverage**: 100% (19/19 tests passing)
  - **Gas Cost**: ~412k per registration
  - **Location**: `contracts/CopyrightRegistry.sol`
  - **Tests**: `test/CopyrightRegistry.test.js`
  - **Documentation**: `docs/CONTRACT-API.md`

#### Testing & Security (35%)
- Unit tests for CopyrightRegistry (100% coverage)
- Test suite: 19 comprehensive tests
- Coverage breakdown:
  - Statements: 100%
  - Functions: 100%
  - Lines: 100%
  - Branches: 78.57%

#### Documentation (100%)
- ✅ PRD.md - Complete product requirements
- ✅ EXECUTION-PLAN.md - Updated with Epic 1 completion
- ✅ CONTRACT-API.md - Complete API documentation
- ✅ ARCHITECTURE.md - System design
- ✅ CLAUDE.md - Project guidance (this file)

### 🎯 In Progress

#### Smart Contracts (Next: 2/3)
- **KaryaNFT.sol** - Planned for Oct 14
  - ERC-721 implementation
  - ERC-2981 royalty standard
  - IPFS metadata integration
  - Links to CopyrightRegistry

- **KaryaMarketplace.sol** - Planned for Oct 14
  - Fixed-price listings
  - Purchase with automatic royalty distribution
  - Platform fee (2.5%)
  - Primary and secondary sales

### 🔴 Not Started

- Frontend DApp (Next.js + Tailwind) - Planned for Oct 15-17
- Sepolia deployment - Planned for Oct 17
- Pitch deck - Planned for Oct 18-20
- Security audit (Slither + MythX) - Planned for Oct 16

### Key Contracts Summary

| Contract | Status | Test Coverage | Location |
|----------|--------|---------------|----------|
| CopyrightRegistry | ✅ Complete | 100% (19 tests) | contracts/CopyrightRegistry.sol |
| KaryaNFT | 🔴 Not Started | - | contracts/KaryaNFT.sol (planned) |
| KaryaMarketplace | 🔴 Not Started | - | contracts/KaryaMarketplace.sol (planned) |

### Active Development Files

```
contracts/
  └── CopyrightRegistry.sol ✅

test/
  └── CopyrightRegistry.test.js ✅

docs/
  ├── PRD.md ✅
  ├── EXECUTION-PLAN.md ✅
  ├── CONTRACT-API.md ✅
  └── ARCHITECTURE.md ✅
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

### Smart Contract Security Checklist
- [ ] Reentrancy protection (ReentrancyGuard)
- [ ] Integer overflow/underflow checks (Solidity 0.8+)
- [ ] Access control (Ownable, AccessControl)
- [ ] Input validation on all external functions
- [ ] Proper event emission for state changes
- [ ] Gas optimization considerations
- [ ] Emergency pause mechanism (if applicable)
- [ ] Time-lock for critical operations (if applicable)

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
- [ ] Smart contract deployed to Sepolia testnet
- [ ] Contract verified on Etherscan
- [ ] All tests passing
- [ ] Security audit completed (automated tools minimum)
- [ ] Pitch deck completed (PDF format)
- [ ] Demo prepared (live or video)
- [ ] GitHub repository public (if submitting)
- [ ] Team information finalized

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

### Development Progress (Updated Oct 13, 2025)

✅ **Completed Milestones:**
1. ✅ Sub-theme chosen: Digital Rights & Authentication
2. ✅ Development environment set up (Hardhat + OpenZeppelin)
3. ✅ Smart contract architecture designed
4. ✅ First contract implemented with comprehensive testing (CopyrightRegistry)
5. ✅ TDD approach validated (100% test coverage achieved)

🎯 **Next Steps:**
1. Implement KaryaNFT.sol (ERC-721 + ERC-2981)
2. Implement KaryaMarketplace.sol (fixed-price + royalties)
3. Run security audit (Slither + MythX)
4. Deploy to Sepolia testnet
5. Build frontend DApp (Next.js + Tailwind)
6. Create pitch deck
7. Submit before Oct 22 deadline

### Available Commands

```bash
# Testing
npm test                    # Run all tests
npx hardhat coverage        # Generate coverage report

# Compilation
npm run compile             # Compile contracts

# Development
npm run node                # Start local Hardhat node
npm run deploy:local        # Deploy to local network
npm run deploy:sepolia      # Deploy to Sepolia (when ready)
npm run verify:sepolia      # Verify on Etherscan

# Documentation
cat docs/CONTRACT-API.md    # View API documentation
cat docs/EXECUTION-PLAN.md  # View progress tracker
```

### Working Contracts

**CopyrightRegistry** (contracts/CopyrightRegistry.sol):
- ✅ Production-ready implementation
- ✅ 100% test coverage (19 tests)
- ✅ Comprehensive API documentation
- ✅ Gas optimized
- 📍 Ready for integration with NFT contract
