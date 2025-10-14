# Frontend Design 2 - Product Requirements Document (PRD)

**Project**: KaryaChain - Alternative Frontend Design
**Version**: 1.0
**Target Network**: Sepolia Testnet
**Timeline**: October 14-22, 2025 (8 days)
**Status**: 🟡 Planning Phase

---

## Executive Summary

This document outlines requirements for **KaryaChain Frontend Design 2** - a complete redesign of the copyright protection platform with:
- **Glassmorphism UI** with rich, professional animations
- **Alternative navigation structure** for improved UX discovery
- **Same technical stack** (Next.js 14, Tailwind CSS, wagmi v2, RainbowKit)
- **All pages rebuilt from scratch** with fresh information architecture

**Goal**: Provide RECTOR with two production-ready frontend options to choose from before hackathon submission (Oct 22, 2025).

---

## Design Philosophy

### Visual Identity
- **Glassmorphism Core**: Frosted glass effects, backdrop blur, translucent cards
- **Rich Animations**: Framer Motion for page transitions, micro-interactions, scroll-triggered animations
- **Professional Polish**: Subtle gradients, smooth transitions, premium feel
- **Indonesian Cultural Elements**: Batik patterns as subtle backgrounds, traditional color palette

### Color Palette
```css
/* Primary Colors */
--glass-bg: rgba(255, 255, 255, 0.1)
--glass-border: rgba(255, 255, 255, 0.2)
--backdrop-blur: 20px

/* Indonesian-Inspired Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
--gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)

/* Glass Overlays */
--glass-dark: rgba(0, 0, 0, 0.2)
--glass-light: rgba(255, 255, 255, 0.15)
```

### Animation Principles
- **Entrance Animations**: Fade in + slide up (stagger for lists)
- **Hover States**: Scale, glow, backdrop brightness increase
- **Page Transitions**: Smooth fade + slide between routes
- **Loading States**: Skeleton shimmer + pulse effects
- **Success States**: Confetti, scale bounce, gradient shift

---

## Epic 1: Design System & Foundation

**Goal**: Build robust design system with glassmorphism components and animation primitives.

### Story 1.1: Project Setup & Configuration
**User Value**: Establish technical foundation for rapid development.

**Tasks**:
- [1.1.1] Create `frontend-design-2/` directory with Next.js 14 + TypeScript
- [1.1.2] Install dependencies: `framer-motion`, `tailwindcss`, `wagmi`, `viem`, `@rainbow-me/rainbowkit`
- [1.1.3] Configure Tailwind with glass utilities and custom animations
- [1.1.4] Set up `/app` directory structure (App Router)
- [1.1.5] Copy contract ABIs and addresses from `frontend/lib/contracts`
- [1.1.6] Set up environment variables (`.env.local` template)
- [1.1.7] Configure `next.config.js` for optimization (images, fonts)

**Acceptance Criteria**:
- ✅ `npm run dev` starts without errors
- ✅ TypeScript strict mode enabled
- ✅ Tailwind compiles with glass utilities
- ✅ All contract ABIs available in `/lib/contracts`

---

### Story 1.2: Design System Components
**User Value**: Reusable, animated glass components ensure consistency and speed up development.

**Tasks**:
- [1.2.1] **GlassCard Component**
  - Frosted glass effect with backdrop blur
  - Border gradients (subtle glow)
  - Hover animation (scale + brightness)
  - Variants: default, elevated, interactive

- [1.2.2] **GlassButton Component**
  - Primary, secondary, ghost variants
  - Glass background with blur
  - Ripple effect on click
  - Loading state with spinner
  - Disabled state (reduced opacity)

- [1.2.3] **GlassInput Component**
  - Transparent background with border glow
  - Focus state animation (border gradient shift)
  - Error state (red glow)
  - Label floating animation

- [1.2.4] **GlassModal Component**
  - Backdrop blur overlay
  - Modal slide-in animation (Framer Motion)
  - Close button with hover effect
  - Scroll lock when open

- [1.2.5] **AnimatedSection Component**
  - Scroll-triggered fade-in + slide-up
  - Intersection Observer hook
  - Stagger children animations
  - Reusable wrapper for page sections

**Acceptance Criteria**:
- ✅ All components in `/components/ui/glass/`
- ✅ Storybook-style demo page showing all variants
- ✅ Smooth 60fps animations
- ✅ Accessible (keyboard navigation, ARIA labels)

---

### Story 1.3: Global Layout & Navigation
**User Value**: New navigation structure improves discoverability and user flow.

**Tasks**:
- [1.3.1] **Sidebar Navigation** (Alternative to top header)
  - Fixed left sidebar (desktop), collapsible (mobile)
  - Glass background with blur
  - Animated menu items (icon + label)
  - Active state indicator (gradient border)
  - Sections: Home, Register Copyright, Mint NFT, Marketplace, Dashboard

- [1.3.2] **Top Bar**
  - Wallet connection (right side)
  - Network indicator (Sepolia badge)
  - User profile dropdown (when connected)
  - Notification bell (future feature placeholder)

- [1.3.3] **Root Layout** (`app/layout.tsx`)
  - Web3 providers (wagmi + RainbowKit)
  - Framer Motion AnimatePresence for page transitions
  - Global glass background (gradient + pattern)
  - Toaster for notifications

- [1.3.4] **Page Transition Animations**
  - Fade out current page
  - Slide in new page from right
  - Loading bar at top during navigation

**Acceptance Criteria**:
- ✅ Sidebar functional on desktop + mobile
- ✅ Smooth page transitions (no layout shift)
- ✅ Wallet connects via RainbowKit
- ✅ Active route highlighted in sidebar

---

## Epic 2: Core User Flows

**Goal**: Implement primary user journeys with new UX patterns.

### Story 2.1: Landing Page (Hero + Features)
**User Value**: First impression that showcases glassmorphism design and platform value.

**Tasks**:
- [2.1.1] **Hero Section**
  - Full-height hero with animated gradient background
  - 3D floating elements (Framer Motion parallax)
  - Large headline with typing animation
  - CTA buttons (glass style): "Register Copyright" + "Explore Marketplace"
  - Animated statistics counter (total registrations, NFTs minted)

- [2.1.2] **Features Section**
  - Grid of 4 feature cards (glass cards)
  - Each card: icon, title, description
  - Hover effect: lift + glow
  - Scroll-triggered stagger animation

- [2.1.3] **How It Works Section**
  - Horizontal timeline (desktop), vertical (mobile)
  - 4 steps with animated connectors
  - Each step: number badge, title, description, icon
  - Auto-play animation on scroll into view

- [2.1.4] **Trust Indicators**
  - Glass card showing: blockchain security, IPFS storage, smart contract verified
  - Animated icons with pulse effect

- [2.1.5] **CTA Section**
  - Large glass card with gradient border
  - "Start Protecting Your Work" headline
  - Primary CTA button with ripple effect

**Acceptance Criteria**:
- ✅ Hero animation plays smoothly on load
- ✅ All sections scroll-triggered (fade-in)
- ✅ Statistics counter animates from 0 to real values
- ✅ Mobile responsive (all sections stack properly)

---

### Story 2.2: Copyright Registration Flow
**User Value**: Streamlined, visually appealing registration process.

**Tasks**:
- [2.2.1] **Registration Page Layout**
  - Left sidebar: Progress tracker (vertical stepper with glass cards)
  - Right content area: Current step form
  - Top: Breadcrumb navigation
  - Background: Subtle animated gradient

- [2.2.2] **Step 1: File Upload**
  - Large drag-drop zone (glass card with dashed border)
  - File preview with thumbnail animation (scale in)
  - SHA-256 hash display with copy button
  - Animated checkmark on successful upload
  - File type validation with error toast

- [2.2.3] **Step 2: Metadata Form**
  - GlassInput components for all fields
  - Asset type selector (glass radio cards with icons)
  - Tags input with animated chips
  - Character count for description (animated progress ring)
  - Real-time validation with smooth error messages

- [2.2.4] **Step 3: IPFS Upload & Review**
  - Upload to Pinata with progress bar (animated gradient)
  - Review card showing all metadata
  - File preview + metadata in glass cards
  - Edit buttons (navigate back with state preservation)

- [2.2.5] **Step 4: Blockchain Transaction**
  - Transaction preview (estimated gas, total cost)
  - "Register on Blockchain" button (prominent glass button)
  - Transaction states:
    - Signing: Wallet modal with animated spinner
    - Pending: Loading animation with block confirmations counter
    - Success: Confetti animation + registration certificate card
    - Error: Error card with retry button
  - Success page: Registration ID, certificate download, Etherscan link, "Mint NFT" CTA

**Acceptance Criteria**:
- ✅ All steps navigable (forward + back)
- ✅ State persists in localStorage (Zustand)
- ✅ IPFS upload functional with Pinata
- ✅ Blockchain registration successful
- ✅ All animations smooth (60fps)

---

### Story 2.3: NFT Minting Flow
**User Value**: Clear, engaging NFT creation experience.

**Tasks**:
- [2.3.1] **Mint Page Layout**
  - Header: "Your Registered Copyrights"
  - Grid of copyright cards (glass cards with glow on hover)
  - Each card: thumbnail, title, registration ID, "Mint NFT" button
  - Empty state: Glass card with illustration + "Register Copyright" CTA

- [2.3.2] **Mint Modal**
  - Large modal (glass background with blur)
  - Copyright preview (left): image, title, metadata
  - Mint form (right):
    - Royalty slider (5-20%) with animated percentage display
    - Earnings calculator (interactive, updates in real-time)
    - Fee breakdown (gas estimate, platform fee)
  - "Mint NFT" button with loading state

- [2.3.3] **Minting Transaction**
  - Transaction states (same as registration)
  - Success animation: NFT card flip animation revealing token ID
  - Success page: NFT preview, token ID, OpenSea link, "List on Marketplace" CTA

- [2.3.4] **Loading States**
  - Skeleton loaders for copyright cards (shimmer effect)
  - No copyrights found: Animated empty state illustration

**Acceptance Criteria**:
- ✅ Fetch user's copyrights from blockchain
- ✅ Mint transaction successful with royalty configuration
- ✅ Token ID extracted from event logs
- ✅ Smooth animations throughout

---

### Story 2.4: Marketplace (Browse & Purchase)
**User Value**: Immersive marketplace for discovering and buying NFTs.

**Tasks**:
- [2.4.1] **Marketplace Page Layout**
  - Top: Search bar (glass input) + Filter bar
  - Filters: Asset type (dropdown), Price range (slider), Sort by (dropdown)
  - Grid: NFT cards (2/3/4 columns responsive)
  - Infinite scroll or pagination (animated)

- [2.4.2] **NFT Card Component**
  - Glass card with hover lift effect
  - Image with lazy loading (blur-up effect)
  - Title, creator (truncated), price (large, bold)
  - Asset type badge (top-right corner)
  - Royalty badge (bottom-left)
  - Quick view button on hover (reveals metadata)

- [2.4.3] **NFT Detail Page**
  - Large image (left) with zoom on hover
  - Details panel (right, glass card):
    - Title, description
    - Creator, owner, price
    - Royalty information
    - Copyright registration link
  - Purchase section (glass card):
    - Price breakdown (price + royalty + platform fee)
    - "Buy Now" button (large, gradient)
    - Transaction flow (approve → purchase → success)
  - Properties section (grid of glass cards)
  - Transaction history (list of past sales)

- [2.4.4] **Purchase Flow**
  - Modal: Transaction preview
  - States: Signing → Pending → Success/Error
  - Success: Confetti + "View in Dashboard" CTA
  - Error: Friendly error message + retry

**Acceptance Criteria**:
- ✅ Fetch all active listings from marketplace contract
- ✅ Enrich with IPFS metadata
- ✅ Search and filter functional
- ✅ Purchase transaction successful with royalty distribution
- ✅ All animations smooth

---

## Epic 3: Advanced Features & Polish

**Goal**: Complete the platform with dashboard, animations, and production optimizations.

### Story 3.1: User Dashboard
**User Value**: Centralized hub for managing copyrights, NFTs, and listings.

**Tasks**:
- [3.1.1] **Dashboard Layout**
  - Top: Welcome card (glass) with user stats
  - Tab navigation: My Copyrights, My NFTs, My Listings, Activity (glass tabs)
  - Content area: Tab-specific content

- [3.1.2] **My Copyrights Tab**
  - Stats cards (glass): Total, Minted, Unminted
  - Grid of copyright cards
  - Status badges (minted vs not minted)
  - Quick actions: Mint NFT / View NFT

- [3.1.3] **My NFTs Tab**
  - Stats cards: Total NFTs, Listed, Unlisted
  - Grid of NFT cards
  - Listing status badges
  - Quick actions: View Details / List for Sale

- [3.1.4] **My Listings Tab**
  - Active listings grid
  - Price, views, time listed
  - Quick actions: Edit Price / Delist

- [3.1.5] **Activity Feed Tab**
  - Timeline of user actions (register, mint, list, purchase)
  - Each item: icon, description, timestamp, Etherscan link
  - Animated entry (fade in + slide)

**Acceptance Criteria**:
- ✅ All tabs functional with data from blockchain
- ✅ Tab switching animated
- ✅ All quick actions work
- ✅ Empty states handled gracefully

---

### Story 3.2: Advanced Animations & Interactions
**User Value**: Premium feel through polished micro-interactions.

**Tasks**:
- [3.2.1] **Page Load Animations**
  - Logo animation on first load
  - Stagger animation for initial content
  - Loading screen with animated logo

- [3.2.2] **Hover Effects Library**
  - Card lift + glow
  - Button ripple effect
  - Image zoom
  - Link underline animation

- [3.2.3] **Transaction Animations**
  - Wallet signing: Pulsing wallet icon
  - Pending: Block confirmation counter with animation
  - Success: Confetti burst + checkmark scale
  - Error: Shake animation + red glow

- [3.2.4] **Scroll Animations**
  - Parallax background elements
  - Section fade-in as user scrolls
  - Navigation bar hide/show on scroll

- [3.2.5] **Loading States**
  - Skeleton loaders with shimmer
  - Spinner variations (dots, rings)
  - Progress bars with gradient animation

**Acceptance Criteria**:
- ✅ All animations 60fps on mid-range devices
- ✅ Reduced motion preference respected
- ✅ No janky transitions
- ✅ Animations enhance UX (not distract)

---

### Story 3.3: Production Optimization
**User Value**: Fast, reliable, SEO-friendly production deployment.

**Tasks**:
- [3.3.1] **Performance Optimization**
  - Image optimization (Next.js Image component)
  - Code splitting (dynamic imports for heavy components)
  - Bundle size analysis (next-bundle-analyzer)
  - Tree shaking (remove unused Framer Motion features)

- [3.3.2] **SEO & Meta Tags**
  - Dynamic meta tags per page
  - Open Graph tags for social sharing
  - JSON-LD structured data
  - Sitemap generation

- [3.3.3] **Error Handling**
  - Global error boundary (glass error card)
  - Network error handling (retry button)
  - Transaction error recovery
  - User-friendly error messages

- [3.3.4] **Accessibility**
  - Keyboard navigation (all interactive elements)
  - ARIA labels (buttons, modals, forms)
  - Color contrast check (WCAG AA)
  - Screen reader testing

- [3.3.5] **Production Build**
  - Zero TypeScript errors
  - Zero console warnings
  - All pages compile successfully
  - Environment variables configured

- [3.3.6] **Deployment**
  - Deploy to Vercel (new subdomain: `karyachain-v2.rectorspace.com`)
  - Custom domain configuration
  - SSL certificate
  - Performance monitoring (Vercel Analytics)

**Acceptance Criteria**:
- ✅ Lighthouse score: 90+ (Performance, Accessibility, Best Practices, SEO)
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Zero production errors
- ✅ Accessible (keyboard + screen reader)

---

## Non-Functional Requirements

### Performance Targets
- **First Contentful Paint**: < 1.5 seconds
- **Time to Interactive**: < 3 seconds
- **Animation Frame Rate**: 60fps (smooth animations)
- **Bundle Size**: < 500KB (initial load, gzipped)

### Browser Compatibility
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile Safari (iOS 14+) ✅
- Chrome Mobile (Android 10+) ✅

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support (`prefers-reduced-motion`)

### Security
- No sensitive data in localStorage (only registration state)
- Secure RPC endpoints (HTTPS only)
- Input sanitization (XSS prevention)
- Private key never exposed (RainbowKit handles wallet connection)

---

## Success Metrics

### User Experience
- [ ] All core flows completable in < 3 minutes
- [ ] Zero blocking errors during testing
- [ ] Smooth animations (60fps) on mid-range devices

### Technical
- [ ] 100% TypeScript coverage (no `any` types)
- [ ] All blockchain transactions successful (registration, minting, listing, purchase)
- [ ] All IPFS uploads successful (Pinata)

### Design
- [ ] Glassmorphism consistently applied across all pages
- [ ] Animation library documented and reusable
- [ ] Mobile responsive (tested on 3+ devices)

### Hackathon Submission
- [ ] Production URL live and functional
- [ ] Demo video ready (3-5 minutes)
- [ ] Screenshots for pitch deck
- [ ] Code clean and documented

---

## Out of Scope (v1.0)

These features are deferred for post-hackathon development:

- **User Profiles**: Detailed creator profiles with bio, portfolio
- **Advanced Search**: Full-text search, advanced filters
- **Activity Feed**: Real-time notifications for bids, purchases
- **Auction System**: Time-based auctions for NFTs
- **Batch Operations**: Bulk mint, bulk list
- **Analytics Dashboard**: Detailed sales analytics, charts
- **Social Features**: Comments, likes, follows
- **Multi-Language**: Full i18n support (English + Bahasa Indonesia)

---

## Dependencies & Integrations

### Smart Contracts (Deployed on Sepolia)
- **CopyrightRegistry**: `0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f`
- **KaryaNFT**: `0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4`
- **KaryaMarketplace**: `0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10`

### External Services
- **IPFS Storage**: Pinata (existing API key)
- **RPC Provider**: PublicNode (Sepolia)
- **Wallet Connection**: RainbowKit (Rabby, MetaMask, WalletConnect)
- **Deployment**: Vercel

### NPM Packages
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "typescript": "^5.2.0",
  "tailwindcss": "^3.3.0",
  "framer-motion": "^10.16.0",
  "wagmi": "^2.0.0",
  "viem": "^2.0.0",
  "@rainbow-me/rainbowkit": "^2.0.0",
  "@tanstack/react-query": "^5.0.0",
  "zustand": "^4.4.0",
  "lucide-react": "^0.290.0"
}
```

---

## Timeline Summary

**Total Duration**: 8 days (October 14-22, 2025)

| Epic | Duration | Completion Target |
|------|----------|-------------------|
| Epic 1: Design System & Foundation | 2 days | Oct 15 |
| Epic 2: Core User Flows | 4 days | Oct 19 |
| Epic 3: Advanced Features & Polish | 2 days | Oct 21 |
| **Buffer & Final Testing** | 1 day | Oct 22 |

**Critical Path**: Epic 1 → Epic 2 (Stories 2.1-2.4) → Epic 3 (Story 3.3)

---

## Risk Management

### High Risk
- **Timeline Pressure**: 8 days for complete rebuild
  - Mitigation: Focus on MVP features, defer non-critical animations

- **Animation Performance**: Complex animations may cause lag
  - Mitigation: Performance testing on mid-range devices, simplify if needed

### Medium Risk
- **Blockchain Integration Issues**: Same contracts, but new hooks
  - Mitigation: Copy proven hooks from frontend-v1, test thoroughly

- **IPFS Upload Reliability**: Pinata API failures
  - Mitigation: Retry logic, error handling, use same Pinata setup as v1

### Low Risk
- **Design Consistency**: Many components to build
  - Mitigation: Design system first approach, component library

---

## Appendix

### Design Inspiration
- **Glassmorphism**: [glassmorphism.com](https://glassmorphism.com)
- **Framer Motion Examples**: [framer.com/motion](https://framer.com/motion)
- **Premium Web3 UIs**: Uniswap, OpenSea, Foundation.app

### Technical References
- Framer Motion Docs: https://framer.com/motion
- Next.js 14 App Router: https://nextjs.org/docs
- Tailwind CSS Utilities: https://tailwindcss.com/docs
- wagmi v2 Hooks: https://wagmi.sh/react/hooks

---

**Document Version**: 1.0
**Last Updated**: October 14, 2025
**Next Review**: After Epic 1 completion (Oct 15, 2025)
