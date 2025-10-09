# Execution Plan & Progress Tracker
# Karya Chain - OJK-Ekraf Hackathon 2025

**Version**: 1.0
**Created**: October 9, 2025
**Submission Deadline**: October 22, 2025 (13 days remaining)
**Last Updated**: October 9, 2025

---

## 📊 Overall Progress

| Category | Progress | Status |
|----------|----------|--------|
| **Planning & Documentation** | 100% | ✅ Complete |
| **Smart Contracts** | 0% | 🔴 Not Started |
| **Testing & Security** | 0% | 🔴 Not Started |
| **Frontend DApp** | 0% | 🔴 Not Started |
| **Deployment** | 0% | 🔴 Not Started |
| **Pitch Deck** | 0% | 🔴 Not Started |
| **Overall Project** | 15% | 🟡 In Progress |

---

## 🎯 Critical Path Timeline (13 Days to Deadline)

### ⚠️ ADJUSTED TIMELINE (Due to Late Start)

Original plan was 6 weeks (43 days from Sept 25). We're starting Oct 9, leaving only **13 days**.

**Aggressive Sprint Schedule:**

| Sprint | Dates | Focus | Priority |
|--------|-------|-------|----------|
| **Sprint 1** | Oct 9-10 (2 days) | Core Smart Contracts | CRITICAL |
| **Sprint 2** | Oct 11-12 (2 days) | Testing & Security Audit | CRITICAL |
| **Sprint 3** | Oct 13-15 (3 days) | Frontend MVP | HIGH |
| **Sprint 4** | Oct 16-17 (2 days) | Integration & Deployment | HIGH |
| **Sprint 5** | Oct 18-20 (3 days) | Pitch Deck & Demo | CRITICAL |
| **Sprint 6** | Oct 21-22 (2 days) | Final Testing & Submission | CRITICAL |

---

## 📋 EPIC Progress Tracking

### EPIC 1: Copyright Registration System
**PRD Reference**: Lines 154-227
**Priority**: CRITICAL (Core functionality)
**Progress**: 0/4 Stories, 0/17 Tasks

| Story | Tasks | Status | Assignee | Target Date |
|-------|-------|--------|----------|-------------|
| 1.1: Register Creative Work | 0/7 | 🔴 Not Started | - | Oct 9 |
| 1.2: Asset Type Classification | 0/5 | 🔴 Not Started | - | Oct 9 |
| 1.3: Content Verification | 0/5 | 🔴 Not Started | - | Oct 10 |
| 1.4: Copyright Certificate | 0/0 | ⚪ Deferred (Frontend) | - | Oct 14 |

**Key Deliverables:**
- [ ] CopyrightRegistry.sol contract
- [ ] Asset type enum and metadata structures
- [ ] Content hash storage and verification
- [ ] Unit tests for registration flow

**Acceptance Criteria:**
- [ ] User can register work in single transaction
- [ ] Content hash and timestamp recorded on-chain
- [ ] Gas cost < 0.01 ETH on Sepolia
- [ ] Events emitted for indexing

---

### EPIC 2: NFT Minting & Ownership
**PRD Reference**: Lines 230-289
**Priority**: CRITICAL (Core functionality)
**Progress**: 0/3 Stories, 0/17 Tasks

| Story | Tasks | Status | Assignee | Target Date |
|-------|-------|--------|----------|-------------|
| 2.1: Mint Creative Work as NFT | 0/7 | 🔴 Not Started | - | Oct 9-10 |
| 2.2: Edition Support (ERC-1155) | 0/6 | 🟡 Optional (Nice-to-have) | - | Oct 11 |
| 2.3: Collaborative Works | 0/6 | 🟡 Optional (Nice-to-have) | - | Oct 11 |

**Key Deliverables:**
- [ ] KaryaNFT.sol contract (ERC-721)
- [ ] ERC-2981 royalty implementation
- [ ] IPFS metadata integration
- [ ] NFT minting tests

**Acceptance Criteria:**
- [ ] Creator can mint NFT for registered work
- [ ] NFT links to copyright registration
- [ ] Royalty info embedded (ERC-2981)
- [ ] Metadata stored on IPFS

**MVP Scope Decision:**
- ✅ Story 2.1 (ERC-721 unique NFTs) - MUST HAVE
- ⚠️ Story 2.2 (ERC-1155 editions) - OPTIONAL (if time permits)
- ⚠️ Story 2.3 (Collaborative works) - OPTIONAL (post-hackathon)

---

### EPIC 3: Royalty Distribution System
**PRD Reference**: Lines 292-350
**Priority**: HIGH (Key differentiator)
**Progress**: 0/3 Stories, 0/17 Tasks

| Story | Tasks | Status | Assignee | Target Date |
|-------|-------|--------|----------|-------------|
| 3.1: ERC-2981 Royalty Standard | 0/6 | 🔴 Not Started | - | Oct 10 |
| 3.2: Automated Royalty Payments | 0/6 | 🔴 Not Started | - | Oct 10 |
| 3.3: Royalty Dashboard | 0/6 | ⚪ Deferred (Frontend) | - | Oct 14 |

**Key Deliverables:**
- [ ] ERC-2981 implementation in KaryaNFT
- [ ] RoyaltyDistributor.sol contract (optional)
- [ ] Payment splitting logic
- [ ] Royalty payment tests

**Acceptance Criteria:**
- [ ] ERC-2981 fully implemented
- [ ] Royalties work on secondary sales
- [ ] Creator can set custom royalty (5-20%)
- [ ] Payment distribution automatic

**MVP Scope Decision:**
- ✅ Story 3.1 (ERC-2981) - MUST HAVE (built into KaryaNFT)
- ⚠️ Story 3.2 (RoyaltyDistributor) - OPTIONAL (marketplace handles this)
- ⚪ Story 3.3 (Dashboard) - Nice-to-have (frontend only)

---

### EPIC 4: Marketplace & Trading
**PRD Reference**: Lines 353-429
**Priority**: CRITICAL (Demo requirement)
**Progress**: 0/4 Stories, 0/18 Tasks

| Story | Tasks | Status | Assignee | Target Date |
|-------|-------|--------|----------|-------------|
| 4.1: Primary Sales (Fixed Price) | 0/7 | 🔴 Not Started | - | Oct 10 |
| 4.2: Secondary Market (Resales) | 0/5 | 🔴 Not Started | - | Oct 10 |
| 4.3: Offers & Negotiation | 0/6 | 🟡 Optional | - | - |
| 4.4: Bundle Sales | 0/5 | 🟡 Optional | - | - |

**Key Deliverables:**
- [ ] KaryaMarketplace.sol contract
- [ ] Fixed-price listing function
- [ ] Purchase function with royalty deduction
- [ ] Marketplace tests

**Acceptance Criteria:**
- [ ] Creators can list NFTs for sale
- [ ] Buyers can purchase with ETH
- [ ] Royalties + platform fees (2.5%) deducted automatically
- [ ] NFT transferred on successful purchase

**MVP Scope Decision:**
- ✅ Story 4.1 (Primary sales) - MUST HAVE
- ✅ Story 4.2 (Secondary sales) - MUST HAVE (shows royalty enforcement)
- ⚪ Story 4.3 (Offers) - CUT (post-hackathon)
- ⚪ Story 4.4 (Bundles) - CUT (post-hackathon)

---

### EPIC 5: Creator Verification & KYC
**PRD Reference**: Lines 432-490
**Priority**: MEDIUM (OJK compliance showcase)
**Progress**: 0/3 Stories, 0/18 Tasks

| Story | Tasks | Status | Assignee | Target Date |
|-------|-------|--------|----------|-------------|
| 5.1: Creator Profile Registration | 0/6 | 🟡 Optional | - | Oct 15 |
| 5.2: KYC Integration | 0/6 | 🟡 Optional | - | Oct 15 |
| 5.3: Reputation System | 0/6 | ⚪ Deferred | - | - |

**Key Deliverables:**
- [ ] CreatorRegistry.sol contract (optional)
- [ ] Profile creation function
- [ ] KYC verification status (mock)
- [ ] Verified badge logic

**Acceptance Criteria:**
- [ ] Creators can register profile
- [ ] Verification status stored on-chain
- [ ] Verified badge displayed in frontend

**MVP Scope Decision:**
- ⚠️ Story 5.1 (Profiles) - NICE-TO-HAVE (if time permits)
- ⚠️ Story 5.2 (KYC) - NICE-TO-HAVE (can mock in pitch deck)
- ⚪ Story 5.3 (Reputation) - CUT (post-hackathon)

---

### EPIC 6: Frontend DApp (Next.js + Tailwind)
**PRD Reference**: Lines 493-637
**Priority**: CRITICAL (Demo requirement)
**Progress**: 0/7 Stories, 0/45 Tasks

| Story | Tasks | Status | Assignee | Target Date |
|-------|-------|--------|----------|-------------|
| 6.1: Landing Page | 0/7 | 🔴 Not Started | - | Oct 13 |
| 6.2: Wallet Connection | 0/7 | 🔴 Not Started | - | Oct 13 |
| 6.3: Register Copyright Page | 0/8 | 🔴 Not Started | - | Oct 14 |
| 6.4: Mint NFT Page | 0/7 | 🔴 Not Started | - | Oct 14 |
| 6.5: Marketplace Browse | 0/7 | 🔴 Not Started | - | Oct 15 |
| 6.6: NFT Detail & Purchase | 0/8 | 🔴 Not Started | - | Oct 15 |
| 6.7: Creator Dashboard | 0/7 | 🟡 Optional | - | Oct 16 |

**Key Deliverables:**
- [ ] Next.js 14 project with Tailwind CSS
- [ ] RainbowKit wallet connection
- [ ] Copyright registration UI
- [ ] Marketplace browse and purchase UI
- [ ] IPFS upload integration (Pinata)

**Acceptance Criteria:**
- [ ] Clean, professional UI
- [ ] Mobile responsive
- [ ] Wallet connection working
- [ ] End-to-end user flow functional

**MVP Scope Decision:**
- ✅ Stories 6.1-6.6 - MUST HAVE (core demo flow)
- ⚠️ Story 6.7 (Dashboard) - NICE-TO-HAVE (if time permits)

---

### EPIC 7: Testing & Security
**PRD Reference**: Lines 640-701
**Priority**: CRITICAL (25% of judging criteria!)
**Progress**: 0/3 Stories, 0/20 Tasks

| Story | Tasks | Status | Assignee | Target Date |
|-------|-------|--------|----------|-------------|
| 7.1: Smart Contract Unit Tests | 0/7 | 🔴 Not Started | - | Oct 11-12 |
| 7.2: Security Audit | 0/7 | 🔴 Not Started | - | Oct 12 |
| 7.3: Integration Testing | 0/7 | 🔴 Not Started | - | Oct 16 |

**Key Deliverables:**
- [ ] Unit tests for all contracts
- [ ] 95%+ test coverage
- [ ] Slither static analysis report
- [ ] MythX security scan report
- [ ] Security audit documentation

**Acceptance Criteria:**
- [ ] All tests passing
- [ ] No critical vulnerabilities
- [ ] Security measures documented
- [ ] ReentrancyGuard applied

**⚠️ CRITICAL:** Security & Compliance = 25% of judging score. Do NOT skip!

---

### EPIC 8: Deployment & Submission
**PRD Reference**: Lines 704-811
**Priority**: CRITICAL (Required for submission)
**Progress**: 0/5 Stories, 0/35 Tasks

| Story | Tasks | Status | Assignee | Target Date |
|-------|-------|--------|----------|-------------|
| 8.1: Sepolia Testnet Deployment | 0/8 | 🔴 Not Started | - | Oct 17 |
| 8.2: Frontend Deployment (Vercel) | 0/6 | 🔴 Not Started | - | Oct 17 |
| 8.3: Pitch Deck Creation | 0/12 | 🔴 Not Started | - | Oct 18-20 |
| 8.4: Demo Video | 0/7 | 🟡 Optional | - | Oct 21 |
| 8.5: Hackathon Submission | 0/8 | 🔴 Not Started | - | Oct 22 |

**Key Deliverables:**
- [ ] All contracts deployed to Sepolia
- [ ] All contracts verified on Etherscan
- [ ] Frontend deployed to Vercel
- [ ] Pitch deck (PDF, 15-20 pages)
- [ ] Demo video (optional, 3-5 min)
- [ ] Hackathon submission confirmed

**Acceptance Criteria:**
- [ ] Live demo URL functional
- [ ] All contract addresses documented
- [ ] Pitch deck professional and complete
- [ ] Submission before Oct 22 deadline

---

## 🎯 MVP Feature Prioritization

### ✅ MUST HAVE (Core Demo Flow)

**Smart Contracts:**
1. CopyrightRegistry.sol - Register creative works
2. KaryaNFT.sol (ERC-721 + ERC-2981) - Mint NFTs with royalties
3. KaryaMarketplace.sol - Buy/sell with automatic royalty distribution

**Frontend:**
1. Landing page with value proposition
2. Wallet connection (RainbowKit)
3. Register copyright page
4. Mint NFT page
5. Marketplace browse page
6. NFT detail & purchase page

**Testing:**
1. Unit tests for all contracts (95%+ coverage)
2. Slither + MythX security scans
3. End-to-end integration tests

**Deployment:**
1. Sepolia testnet deployment
2. Etherscan verification
3. Vercel frontend deployment

**Submission:**
1. Comprehensive pitch deck (15-20 pages)
2. GitHub repository (public)
3. Hackathon submission form

### ⚠️ NICE-TO-HAVE (If Time Permits)

1. KaryaEditions.sol (ERC-1155) - Limited editions
2. CreatorRegistry.sol - Creator profiles
3. Collaborative works (multi-owner)
4. Creator dashboard
5. Demo video

### ⚪ POST-HACKATHON (Cut from MVP)

1. RoyaltyDistributor.sol (marketplace handles this)
2. Offer system
3. Bundle sales
4. Reputation system
5. Advanced analytics

---

## 📅 Daily Sprint Plan (Oct 9-22)

### 🔴 Sprint 1: Oct 9-10 (Core Smart Contracts)

**Oct 9 (Today) - Day 1:**
- [x] ~~Project setup and documentation~~ (DONE)
- [ ] CopyrightRegistry.sol - Complete implementation
  - [ ] TASK-1.1.1 to 1.1.5: Basic registration
  - [ ] TASK-1.2.1 to 1.2.3: Asset type classification
- [ ] CopyrightRegistry tests - Start writing
  - [ ] TASK-1.1.6: Registration flow tests

**Oct 10 - Day 2:**
- [ ] KaryaNFT.sol - Complete implementation
  - [ ] TASK-2.1.1 to 2.1.5: ERC-721 + ERC-2981
- [ ] KaryaMarketplace.sol - Complete implementation
  - [ ] TASK-4.1.1 to 4.1.5: Fixed-price listing + purchase
- [ ] Complete all contract tests
  - [ ] TASK-1.1.7, 2.1.6, 4.1.6: Gas optimization and testing

**Deliverable:** 3 core contracts fully implemented and tested

---

### 🔴 Sprint 2: Oct 11-12 (Testing & Security)

**Oct 11 - Day 3:**
- [ ] Achieve 95%+ test coverage
  - [ ] TASK-7.1.1 to 7.1.5: Comprehensive tests
- [ ] Test edge cases and failure scenarios
- [ ] Fix any identified bugs

**Oct 12 - Day 4:**
- [ ] Run Slither static analysis
  - [ ] TASK-7.2.1: Slither scan
- [ ] Run MythX security scan
  - [ ] TASK-7.2.2: MythX scan
- [ ] Fix all critical and medium vulnerabilities
  - [ ] TASK-7.2.6: Bug fixes
- [ ] Document security measures
  - [ ] TASK-7.2.7: Security documentation

**Deliverable:** Fully tested and audited smart contracts

---

### 🟡 Sprint 3: Oct 13-15 (Frontend MVP)

**Oct 13 - Day 5:**
- [ ] Next.js project setup
  - [ ] TASK-6.1.1 to 6.1.2: Next.js + Tailwind
- [ ] Wallet connection
  - [ ] TASK-6.2.1 to 6.2.7: RainbowKit integration
- [ ] Landing page
  - [ ] TASK-6.1.3 to 6.1.7: Hero, features, CTA

**Oct 14 - Day 6:**
- [ ] Register copyright page
  - [ ] TASK-6.3.1 to 6.3.8: Form, IPFS upload, contract interaction
- [ ] Mint NFT page
  - [ ] TASK-6.4.1 to 6.4.7: Mint UI and transaction

**Oct 15 - Day 7:**
- [ ] Marketplace browse page
  - [ ] TASK-6.5.1 to 6.5.7: Grid, filter, search
- [ ] NFT detail & purchase page
  - [ ] TASK-6.6.1 to 6.6.8: Details, purchase flow

**Deliverable:** Functional frontend with complete user flow

---

### 🟡 Sprint 4: Oct 16-17 (Integration & Deployment)

**Oct 16 - Day 8:**
- [ ] Get Sepolia ETH from faucets
  - [ ] TASK-8.1.2: Faucet requests
- [ ] Deploy contracts to Sepolia
  - [ ] TASK-8.1.3 to 8.1.6: Deploy all contracts
- [ ] Verify contracts on Etherscan
  - [ ] TASK-8.1.7: Etherscan verification
- [ ] Document contract addresses
  - [ ] TASK-8.1.8: Address documentation

**Oct 17 - Day 9:**
- [ ] Connect frontend to Sepolia contracts
- [ ] Deploy frontend to Vercel
  - [ ] TASK-8.2.1 to 8.2.4: Vercel deployment
- [ ] End-to-end integration testing
  - [ ] TASK-7.3.1: Full user flow test
- [ ] Bug fixes and polish

**Deliverable:** Live demo on Sepolia + Vercel

---

### 🔴 Sprint 5: Oct 18-20 (Pitch Deck & Demo)

**Oct 18 - Day 10:**
- [ ] Pitch deck structure and content
  - [ ] TASK-8.3.1 to 8.3.5: Problem, solution, architecture, flows, business model
- [ ] Gather supporting data and screenshots

**Oct 19 - Day 11:**
- [ ] Continue pitch deck
  - [ ] TASK-8.3.6 to 8.3.10: GTM, team, data, competition, roadmap
- [ ] Design slides professionally
  - [ ] TASK-8.3.11: Visual design

**Oct 20 - Day 12:**
- [ ] Finalize pitch deck
  - [ ] TASK-8.3.12: Export to PDF
- [ ] Optional: Record demo video
  - [ ] TASK-8.4.1 to 8.4.7: Script, record, edit, upload
- [ ] Prepare submission materials

**Deliverable:** Professional pitch deck (+ optional demo video)

---

### 🔴 Sprint 6: Oct 21-22 (Final Testing & Submission)

**Oct 21 - Day 13:**
- [ ] Final testing on all devices
- [ ] Fix any last-minute bugs
- [ ] Update README and documentation
  - [ ] TASK-8.5.3: Comprehensive README
- [ ] Make GitHub repository public
  - [ ] TASK-8.5.2: Public repo
- [ ] Prepare submission form
  - [ ] TASK-8.5.1 to 8.5.4: Gather info, complete form

**Oct 22 - Day 14 (DEADLINE):**
- [ ] Final submission review
- [ ] Upload pitch deck PDF
  - [ ] TASK-8.5.5: Upload PDF
- [ ] Add live demo URL
  - [ ] TASK-8.5.6: Add URL
- [ ] Submit before deadline
  - [ ] TASK-8.5.7: Submit
- [ ] Confirm submission received
  - [ ] TASK-8.5.8: Confirmation

**Deliverable:** Hackathon submission COMPLETE ✅

---

## 📊 Success Metrics Tracking

### Judging Criteria Targets

| Criterion | Weight | Target | Current | Score |
|-----------|--------|--------|---------|-------|
| Innovation & Originality | 30% | 28/30 | TBD | 0/30 |
| Security & Compliance | 25% | 24/25 | TBD | 0/25 |
| Implementation Feasibility | 20% | 19/20 | TBD | 0/20 |
| Technical Quality | 15% | 14/15 | TBD | 0/15 |
| Presentation & Communication | 10% | 10/10 | TBD | 0/10 |
| **TOTAL** | **100%** | **95/100** | **TBD** | **0/100** |

### Technical Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Smart Contracts Written | 3 | 0 | 🔴 |
| Test Coverage | 95%+ | 0% | 🔴 |
| Security Vulnerabilities | 0 critical | - | 🔴 |
| Frontend Pages | 6 | 0 | 🔴 |
| Contracts Deployed | 3 | 0 | 🔴 |
| Contracts Verified | 3 | 0 | 🔴 |
| Pitch Deck Pages | 15-20 | 0 | 🔴 |

---

## ⚠️ Risk Register

| Risk | Impact | Probability | Mitigation | Status |
|------|--------|-------------|------------|--------|
| Timeline too aggressive (13 days) | HIGH | HIGH | Cut non-essential features, focus on MVP | 🟡 Active |
| Smart contract bugs | HIGH | MEDIUM | TDD approach, comprehensive tests, security audits | 🟢 Planned |
| IPFS upload failures | MEDIUM | LOW | Multiple providers, retry logic, fallback | 🟢 Planned |
| Sepolia faucet issues | MEDIUM | MEDIUM | Use multiple faucets, request early | 🟡 Monitor |
| Frontend complexity | MEDIUM | MEDIUM | Use templates, focus on core flows only | 🟢 Planned |
| Pitch deck quality | HIGH | LOW | Allocate 3 full days, use professional tools | 🟢 Planned |
| Missing submission deadline | CRITICAL | MEDIUM | Buffer time on Oct 21-22, submit early | 🟡 Monitor |

---

## 📝 Decision Log

| Date | Decision | Rationale | Impact |
|------|----------|-----------|--------|
| Oct 9 | Use Hardhat over Foundry | Better documentation, hackathon judges familiar | Low |
| Oct 9 | Include frontend (Next.js + Tailwind) | Better demo, higher presentation score | High |
| Oct 9 | Multi-asset support (not just digital art) | Broader market, aligns with PRD vision | Medium |
| Oct 9 | Cut ERC-1155 editions from MVP | Time constraint, ERC-721 sufficient for demo | Medium |
| Oct 9 | Cut RoyaltyDistributor contract | Marketplace handles royalty distribution via ERC-2981 | Low |
| Oct 9 | Cut offers and bundles | Time constraint, not core to value proposition | Low |
| Oct 9 | Optional: Creator profiles and KYC | Nice-to-have for OJK compliance narrative | Medium |

---

## 🔄 Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| Oct 9, 2025 | 1.0 | Initial execution plan created based on PRD | Claude |

---

## 📌 Notes & Blockers

### Current Blockers
- None (just started)

### Open Questions
1. Should we use Pinata or NFT.Storage for IPFS?
   - **Recommendation**: Pinata (better docs, faster setup)
2. Do we need a backend for indexing or use The Graph?
   - **Recommendation**: Skip for MVP, query contracts directly
3. Mock KYC or integrate real provider?
   - **Recommendation**: Mock for hackathon, mention real integration in pitch

### Decisions Needed
- [ ] Finalize platform fee recipient address (Oct 10)
- [ ] Choose IPFS provider (Oct 13)
- [ ] Decide on demo video (Oct 20)

---

## 🎯 Daily Standup Template

**Date**: ___________

**Yesterday:**
- Completed:
- Blocked by:

**Today:**
- Priority 1:
- Priority 2:
- Priority 3:

**Blockers:**
- None / [Describe blocker]

**Risks:**
- [Any new risks identified]

---

## ✅ Completion Checklist

### Smart Contracts
- [ ] CopyrightRegistry.sol implemented
- [ ] KaryaNFT.sol implemented (ERC-721 + ERC-2981)
- [ ] KaryaMarketplace.sol implemented
- [ ] All contracts have 95%+ test coverage
- [ ] Security audit passed (Slither + MythX)
- [ ] All contracts deployed to Sepolia
- [ ] All contracts verified on Etherscan

### Frontend
- [ ] Next.js + Tailwind setup complete
- [ ] Wallet connection working
- [ ] Landing page complete
- [ ] Register copyright page complete
- [ ] Mint NFT page complete
- [ ] Marketplace browse page complete
- [ ] NFT detail & purchase page complete
- [ ] Frontend deployed to Vercel
- [ ] End-to-end user flow tested

### Documentation
- [ ] README comprehensive
- [ ] Contract addresses documented
- [ ] SECURITY.md with audit results
- [ ] API documentation for contracts

### Submission
- [ ] Pitch deck complete (15-20 pages, PDF)
- [ ] Demo video (optional)
- [ ] GitHub repository public
- [ ] Live demo URL functional
- [ ] Submission form complete
- [ ] Submission confirmed before Oct 22

---

**Document Status**: ✅ Ready to Execute
**Next Action**: Begin Sprint 1 - Smart Contract Development
**Priority**: Start with CopyrightRegistry.sol (TASK-1.1.1)
