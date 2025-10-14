# Frontend Product Requirements Document (PRD)
# Karya Chain - Production-Ready Web Application

**Version**: 1.0
**Created**: October 13, 2025
**Status**: Active Development
**Target**: Production-Ready Web Application (Not Demo)

---

## Table of Contents

1. [Product Vision & Objectives](#product-vision--objectives)
2. [Success Metrics & KPIs](#success-metrics--kpis)
3. [Target Users & Personas](#target-users--personas)
4. [Design System Specification](#design-system-specification)
5. [User Experience Design](#user-experience-design)
6. [Feature Specifications](#feature-specifications)
7. [Technical Architecture](#technical-architecture)
8. [Performance Requirements](#performance-requirements)
9. [Security Requirements](#security-requirements)
10. [Internationalization (i18n)](#internationalization-i18n)
11. [Accessibility (a11y)](#accessibility-a11y)
12. [SEO Strategy](#seo-strategy)
13. [Analytics & Monitoring](#analytics--monitoring)
14. [Testing Strategy](#testing-strategy)
15. [Deployment & DevOps](#deployment--devops)
16. [Indonesian Market Considerations](#indonesian-market-considerations)
17. [Future Roadmap](#future-roadmap)

---

## Product Vision & Objectives

### Vision Statement
Build Indonesia's most trusted and professional blockchain platform for creator IP protection - a production-ready web application that combines enterprise-grade quality with creator-friendly UX.

### Business Objectives

**Primary Goals:**
1. **Trust & Credibility**: Create professional, polished interface that builds trust with Indonesian creators
2. **Seamless Onboarding**: 90% of visitors understand the value proposition within 10 seconds
3. **Conversion**: 20% of visitors connect wallet, 50% of wallet-connected users register copyright
4. **Retention**: 60% of creators return within 7 days to mint/list NFTs
5. **Transaction Success**: 95% of transactions complete successfully without user confusion

**Strategic Objectives:**
- Position Karya Chain as the go-to platform for Indonesian IP protection
- Build foundation for government/EKRAF partnerships
- Create scalable platform ready for mainnet launch
- Establish Indonesian design standards for Web3 applications

### Non-Goals (Out of Scope for v1.0)
- Mobile app (React Native) - planned for v2.0
- Fiat on-ramp integration - planned for v2.0
- Social features (comments, likes) - planned for v1.5
- Advanced analytics dashboard - planned for v1.5
- Auction system - planned for v1.5

---

## Success Metrics & KPIs

### User Acquisition Metrics
- **Landing Page Conversion**: 15-20% visitor-to-wallet-connection
- **Signup Completion Rate**: 80% of wallet-connected users complete profile
- **Time to First Action**: <2 minutes from landing to first copyright registration

### User Engagement Metrics
- **Active Creators**: 500+ creators in first 3 months
- **Copyright Registrations**: 2,000+ in first 3 months
- **NFT Minting Rate**: 40% of registered copyrights become NFTs
- **Marketplace Activity**: 200+ listings, 50+ sales in first 3 months

### Technical Performance Metrics
- **Page Load Speed (LCP)**: <2.5 seconds on 4G
- **First Input Delay (FID)**: <100ms
- **Cumulative Layout Shift (CLS)**: <0.1
- **Uptime**: 99.9% availability
- **Transaction Success Rate**: 95%+ (including wallet errors)

### User Experience Metrics
- **Task Completion Rate**: 90%+ for copyright registration flow
- **Error Rate**: <2% of user sessions encounter errors
- **User Satisfaction (NPS)**: 50+ Net Promoter Score
- **Support Ticket Rate**: <5% of users require support

### Business Metrics
- **Total GMV**: $10,000+ in first 3 months
- **Platform Fees Collected**: 2.5% of GMV
- **Average Transaction Value**: $50-200
- **Repeat Creator Rate**: 40% create multiple copyrights

---

## Target Users & Personas

### Primary Persona 1: Independent Digital Artist

**Demographics:**
- Name: Rani Kusuma
- Age: 27
- Location: Jakarta, Indonesia
- Occupation: Freelance illustrator
- Tech Savvy: Medium (uses Instagram, Behance, but new to Web3)
- English Level: Intermediate (prefers Bahasa Indonesia)

**Pain Points:**
- Work stolen on Instagram without credit
- No way to prove original authorship
- Lost opportunities due to art theft
- Complicated international copyright registration

**Goals:**
- Protect digital artwork easily
- Build verifiable portfolio
- Monetize art with fair royalties
- Reach international buyers

**Motivations:**
- Financial security from art
- Recognition as original creator
- Professional growth

**Tech Comfort:**
- Comfortable with web apps
- Nervous about crypto/blockchain
- Needs clear guidance for wallet setup
- Prefers visual interfaces

**Key User Journey:**
1. Discovers Karya Chain via Instagram/Twitter
2. Reads landing page (Bahasa Indonesia)
3. Connects wallet (needs step-by-step guide)
4. Uploads first artwork (IPFS upload)
5. Registers copyright (blockchain transaction)
6. Receives certificate (PDF download)
7. Mints NFT with 10% royalty
8. Lists on marketplace at 0.1 ETH
9. Makes first sale (receives payment)
10. Returns to register more works

---

### Primary Persona 2: Music Producer

**Demographics:**
- Name: Budi Santoso
- Age: 32
- Location: Bandung, Indonesia
- Occupation: Music producer & beatmaker
- Tech Savvy: High (uses DAWs, VSTs, understands blockchain basics)
- English Level: Fluent

**Pain Points:**
- Beats sampled without permission
- No royalty tracking on music streaming
- Difficult to license beats internationally
- Payment delays from clients

**Goals:**
- License beats with automatic royalties
- Track usage across platforms
- Get paid instantly on sales
- Build international client base

**Motivations:**
- Passive income from royalties
- Professional credibility
- Financial independence

**Tech Comfort:**
- Very comfortable with technology
- Already has crypto wallet
- Understands smart contracts
- Wants advanced features

**Key User Journey:**
1. Hears about platform from producer community
2. Connects existing wallet immediately
3. Bulk registers 10+ beats
4. Sets custom royalty rates (15-20%)
5. Mints NFTs with detailed metadata
6. Lists at various price points
7. Monitors sales in dashboard
8. Receives royalties automatically
9. Withdraws earnings regularly

---

### Secondary Persona 3: Photographer

**Demographics:**
- Name: Dian Permata
- Age: 35
- Location: Yogyakarta, Indonesia
- Occupation: Professional photographer
- Tech Savvy: Medium
- English Level: Intermediate

**Pain Points:**
- Photos used commercially without license
- No proof of original capture date
- Watermarks removed by thieves
- Complex licensing agreements

**Goals:**
- Protect photography portfolio
- Sell licenses with clear terms
- Prove originality in disputes
- Earn residual income

---

### Secondary Persona 4: Collector/Art Buyer

**Demographics:**
- Name: Kevin Tanaka
- Age: 29
- Location: Surabaya, Indonesia
- Occupation: Startup founder & art enthusiast
- Tech Savvy: High
- English Level: Fluent

**Pain Points:**
- Unsure if art is authentic
- No proof of provenance
- Fear of buying stolen work
- Difficult resale process

**Goals:**
- Buy authentic Indonesian art
- Support local creators
- Build valuable NFT collection
- Easy resale with profit

**Key User Journey:**
1. Browses marketplace regularly
2. Filters by asset type (Art, Photography)
3. Views NFT details + creator profile
4. Verifies copyright registration
5. Purchases NFT (ETH payment)
6. Views collection in dashboard
7. Lists for resale (creator gets royalty)

---

## Design System Specification

### Brand Identity

**Brand Personality:**
- Professional yet approachable
- Modern but rooted in Indonesian culture
- Trustworthy and secure
- Creator-first and empowering

**Visual Theme:**
- Clean, minimalist design
- Indonesian cultural elements (batik patterns, traditional colors)
- Web3-modern aesthetics
- High contrast for readability

---

### Color Palette

**Primary Colors:**
```css
--primary-600: #DC2626;      /* Indonesian Red (Merah Putih) */
--primary-500: #EF4444;      /* Lighter red for hover states */
--primary-400: #F87171;      /* Disabled states */

--secondary-600: #0891B2;    /* Teal (represents ocean/archipelago) */
--secondary-500: #06B6D4;    /* Cyan */
--secondary-400: #22D3EE;    /* Light cyan */

--accent-600: #D97706;       /* Gold (represents value/quality) */
--accent-500: #F59E0B;       /* Amber */
--accent-400: #FBBF24;       /* Yellow */
```

**Neutral Colors:**
```css
--neutral-950: #0A0A0A;      /* Text primary */
--neutral-900: #171717;      /* Text secondary */
--neutral-800: #262626;      /* Borders, dividers */
--neutral-700: #404040;      /* Muted text */
--neutral-600: #525252;
--neutral-500: #737373;
--neutral-400: #A3A3A3;
--neutral-300: #D4D4D4;
--neutral-200: #E5E5E5;
--neutral-100: #F5F5F5;      /* Background light */
--neutral-50: #FAFAFA;       /* Background lightest */
--white: #FFFFFF;
```

**Semantic Colors:**
```css
--success-600: #16A34A;      /* Green for success states */
--success-500: #22C55E;
--success-100: #DCFCE7;

--warning-600: #CA8A04;      /* Yellow for warnings */
--warning-500: #EAB308;
--warning-100: #FEF9C3;

--error-600: #DC2626;        /* Red for errors */
--error-500: #EF4444;
--error-100: #FEE2E2;

--info-600: #2563EB;         /* Blue for info */
--info-500: #3B82F6;
--info-100: #DBEAFE;
```

---

### Typography System

**Font Families:**
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Plus Jakarta Sans', 'Inter', sans-serif;  /* For headings */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;     /* For addresses, hashes */
```

**Type Scale:**
```css
/* Desktop */
--text-xs: 0.75rem;      /* 12px - Captions */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-base: 1rem;       /* 16px - Body */
--text-lg: 1.125rem;     /* 18px - Lead text */
--text-xl: 1.25rem;      /* 20px - H5 */
--text-2xl: 1.5rem;      /* 24px - H4 */
--text-3xl: 1.875rem;    /* 30px - H3 */
--text-4xl: 2.25rem;     /* 36px - H2 */
--text-5xl: 3rem;        /* 48px - H1 */
--text-6xl: 3.75rem;     /* 60px - Display */
--text-7xl: 4.5rem;      /* 72px - Hero */

/* Mobile (reduce by 10-20%) */
--text-5xl-mobile: 2.5rem;   /* 40px */
--text-6xl-mobile: 3rem;     /* 48px */
--text-7xl-mobile: 3.5rem;   /* 56px */
```

**Font Weights:**
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

**Line Heights:**
```css
--leading-tight: 1.25;       /* Headings */
--leading-snug: 1.375;       /* Subheadings */
--leading-normal: 1.5;       /* Body text */
--leading-relaxed: 1.625;    /* Long-form content */
--leading-loose: 2;          /* Spaced content */
```

---

### Spacing System

**Based on 4px base unit:**
```css
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

---

### Layout & Grid System

**Responsive Breakpoints:**
```css
--screen-sm: 640px;    /* Mobile landscape, small tablets */
--screen-md: 768px;    /* Tablets */
--screen-lg: 1024px;   /* Desktop */
--screen-xl: 1280px;   /* Large desktop */
--screen-2xl: 1536px;  /* Extra large desktop */
```

**Container Widths:**
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1400px;  /* Max content width */
```

**Grid System:**
- 12-column grid
- 24px gutters (desktop)
- 16px gutters (mobile)
- 24px outer margins (desktop)
- 16px outer margins (mobile)

---

### Component Library

#### Buttons

**Primary Button:**
```jsx
<button className="
  px-6 py-3
  bg-primary-600 hover:bg-primary-500
  text-white font-semibold
  rounded-lg shadow-md hover:shadow-lg
  transition-all duration-200
  disabled:bg-neutral-300 disabled:cursor-not-allowed
">
  Register Copyright
</button>
```

**Variants:**
- Primary (red, high emphasis)
- Secondary (teal, medium emphasis)
- Outline (border only, low emphasis)
- Ghost (text only, minimal emphasis)
- Danger (error-red, destructive actions)

**Sizes:**
- Small: `px-3 py-1.5 text-sm`
- Medium (default): `px-6 py-3 text-base`
- Large: `px-8 py-4 text-lg`

**States:**
- Default
- Hover (darker shade + shadow increase)
- Active (pressed effect)
- Disabled (gray, no interaction)
- Loading (spinner + disabled state)

---

#### Cards

**Base Card:**
```jsx
<div className="
  bg-white
  border border-neutral-200
  rounded-xl
  p-6
  shadow-sm hover:shadow-md
  transition-shadow duration-200
">
  {/* Card content */}
</div>
```

**Variants:**
- Default Card (white background)
- Featured Card (gradient border)
- Elevated Card (larger shadow)
- Outlined Card (no shadow, prominent border)

---

#### Forms & Inputs

**Text Input:**
```jsx
<input
  type="text"
  className="
    w-full
    px-4 py-3
    border border-neutral-300
    rounded-lg
    focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    placeholder:text-neutral-400
    disabled:bg-neutral-100 disabled:cursor-not-allowed
  "
  placeholder="Enter title..."
/>
```

**States:**
- Default
- Focus (ring + border color)
- Error (red ring + border)
- Success (green ring + border)
- Disabled (gray background)

**Form Elements:**
- Text Input
- Textarea
- Select Dropdown
- Radio Buttons
- Checkboxes
- File Upload (drag & drop)
- Date Picker
- Number Input (with increment/decrement)

---

#### NFT Card Component

**Design Specifications:**
```jsx
<div className="group">
  {/* Image Container - 1:1 aspect ratio */}
  <div className="relative aspect-square overflow-hidden rounded-t-xl bg-neutral-100">
    <img
      src={nft.image}
      alt={nft.title}
      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
    />

    {/* Quick View Overlay (on hover) */}
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        View Details
      </button>
    </div>

    {/* Copyright Badge */}
    <div className="absolute top-3 right-3 bg-success-500 text-white px-2 py-1 rounded text-xs">
      ✓ Verified
    </div>
  </div>

  {/* Card Content */}
  <div className="p-4 bg-white border border-neutral-200 border-t-0 rounded-b-xl">
    {/* Title */}
    <h3 className="font-semibold text-lg mb-1 truncate">
      {nft.title}
    </h3>

    {/* Creator */}
    <p className="text-sm text-neutral-600 mb-3 flex items-center gap-1">
      <span>by</span>
      <span className="font-medium text-neutral-900">{nft.creator}</span>
      {nft.creatorVerified && (
        <svg className="w-4 h-4 text-primary-500">✓</svg>
      )}
    </p>

    {/* Price & Royalty */}
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs text-neutral-500">Price</p>
        <p className="font-bold text-lg">{nft.price} ETH</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-neutral-500">Royalty</p>
        <p className="font-semibold text-sm text-accent-600">{nft.royalty}%</p>
      </div>
    </div>
  </div>
</div>
```

---

#### Loading States

**Skeleton Loaders:**
```jsx
/* NFT Card Skeleton */
<div className="animate-pulse">
  <div className="aspect-square bg-neutral-200 rounded-t-xl"></div>
  <div className="p-4 bg-white border border-neutral-200 border-t-0 rounded-b-xl">
    <div className="h-6 bg-neutral-200 rounded mb-2"></div>
    <div className="h-4 bg-neutral-200 rounded w-2/3 mb-3"></div>
    <div className="flex justify-between">
      <div className="h-8 bg-neutral-200 rounded w-20"></div>
      <div className="h-8 bg-neutral-200 rounded w-16"></div>
    </div>
  </div>
</div>
```

**Spinner Component:**
```jsx
<div className="animate-spin rounded-full h-8 w-8 border-4 border-neutral-200 border-t-primary-600"></div>
```

**Progress Bar:**
```jsx
<div className="w-full bg-neutral-200 rounded-full h-2">
  <div
    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
    style={{ width: `${progress}%` }}
  ></div>
</div>
```

---

#### Empty States

**No Results Found:**
```jsx
<div className="text-center py-16">
  <svg className="w-20 h-20 mx-auto mb-4 text-neutral-300">
    {/* Empty box icon */}
  </svg>
  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
    No copyrights registered yet
  </h3>
  <p className="text-neutral-600 mb-6">
    Start protecting your creative work by registering your first copyright
  </p>
  <button className="btn-primary">
    Register Your First Work
  </button>
</div>
```

---

#### Notification/Toast Component

**Success Toast:**
```jsx
<div className="fixed top-4 right-4 z-50 max-w-md">
  <div className="bg-white border-l-4 border-success-600 rounded-lg shadow-lg p-4 flex items-start gap-3">
    <svg className="w-6 h-6 text-success-600 flex-shrink-0">✓</svg>
    <div className="flex-1">
      <h4 className="font-semibold text-neutral-900">Copyright Registered!</h4>
      <p className="text-sm text-neutral-600 mt-1">
        Your work has been successfully registered on blockchain.
      </p>
    </div>
    <button className="text-neutral-400 hover:text-neutral-600">×</button>
  </div>
</div>
```

**Variants:**
- Success (green accent)
- Error (red accent)
- Warning (yellow accent)
- Info (blue accent)

---

### Icon System

**Icon Library:** Heroicons v2 (outline + solid variants)

**Common Icons:**
- Home, Dashboard, Search
- Upload, Download, Share
- Wallet, Ethereum, Credit Card
- User, Settings, Bell (notifications)
- Check, X, Info, Alert
- Heart, Star, Eye
- Plus, Minus, Edit, Trash
- ArrowRight, ArrowLeft, ChevronDown
- Image, Music, Document, Photo
- Lock, Unlock, Shield (security)

**Icon Sizes:**
```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

---

### Animation Guidelines

**Transition Durations:**
```css
--duration-fast: 150ms;     /* Micro-interactions */
--duration-base: 200ms;     /* Default transitions */
--duration-slow: 300ms;     /* Page transitions */
--duration-slower: 500ms;   /* Complex animations */
```

**Easing Functions:**
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Common Animations:**
- Fade in/out
- Slide in from top/bottom/left/right
- Scale up/down
- Rotate (loading spinners)
- Shake (error states)
- Pulse (loading states)
- Bounce (notifications)

**Animation Principles:**
- Subtle and purposeful
- Fast interactions (<200ms)
- Respect `prefers-reduced-motion`
- No animations on critical actions (wallet transactions)

---

## User Experience Design

### Core UX Principles

1. **Clarity First**: Every action has clear purpose and outcome
2. **Progressive Disclosure**: Show complexity gradually
3. **Immediate Feedback**: Every user action gets instant response
4. **Forgiving Design**: Easy to undo/cancel actions
5. **Trust Building**: Transparency in blockchain transactions
6. **Indonesian-Friendly**: Cultural sensitivity and local language

---

### Information Architecture

```
Home (Landing Page)
│
├── About / How It Works
├── Pricing / Fees
└── FAQ

Dashboard (After Login)
├── Overview
├── My Copyrights
│   ├── All Copyrights
│   ├── Minted NFTs
│   └── Pending Registrations
├── My NFTs (Collector View)
│   ├── Owned NFTs
│   ├── Listed for Sale
│   └── Purchase History
├── Earnings
│   ├── Sales Revenue
│   ├── Royalty Earnings
│   └── Withdrawal
└── Profile & Settings
    ├── Profile Information
    ├── Verification Status
    ├── Connected Wallet
    └── Notification Preferences

Marketplace
├── Browse All
├── Categories (Art, Music, Photo, Writing, Design)
├── Featured / Trending
└── Search & Filters

Actions
├── Register Copyright
├── Mint NFT
├── List for Sale
└── Purchase NFT

Support
├── Help Center
├── Documentation
├── Contact Support
└── Report Issue
```

---

### Key User Flows

#### Flow 1: First-Time Creator Onboarding

**Goal**: Convert visitor to registered creator with first copyright

**Steps**:
1. **Landing Page**
   - Hero section with clear value proposition (Bahasa + English)
   - "Protect Your Art Now" CTA button
   - Trust signals: "1,000+ creators, 5,000+ works protected"
   - Visual: Indonesian creator success stories

2. **Connect Wallet Modal**
   - "Connect Wallet to Get Started"
   - Wallet options: MetaMask, WalletConnect, Coinbase Wallet
   - "Don't have a wallet?" → Link to setup guide
   - Network check: Auto-switch to Sepolia

3. **Welcome Screen (First-Time User)**
   - "Welcome to Karya Chain!"
   - Quick tour: "3 steps to protect your work"
   - Option to skip tour
   - Profile completion prompt (optional)

4. **Dashboard - Empty State**
   - Large illustration: "No copyrights yet"
   - "Register Your First Work" CTA (prominent)
   - Educational cards: "Why register copyright?"
   - Video tutorial (optional)

5. **Copyright Registration Flow**
   - Step indicator: 1/4, 2/4, 3/4, 4/4
   - Step 1: Upload file (drag & drop)
   - Step 2: Fill metadata (title, description, type, tags)
   - Step 3: Review information
   - Step 4: Blockchain transaction
   - Success: Certificate download + Share options

**Exit Points**:
- Save draft at any step
- Clear cancellation option
- Resume later from dashboard

**Success Metrics**:
- 80% complete registration after upload
- <5 minutes average completion time
- <5% abandonment at transaction step

---

#### Flow 2: Mint NFT from Registered Copyright

**Entry Point**: Dashboard → My Copyrights → Select work → "Mint NFT"

**Steps**:
1. **Pre-Flight Check**
   - Verify copyright is registered ✓
   - Check wallet has sufficient ETH (gas estimation)
   - Warning if already minted

2. **NFT Configuration**
   - Choose NFT type: Unique (ERC-721) [default]
   - Set royalty percentage: Slider 5-20% [default 10%]
   - Preview royalty earnings (examples)

3. **IPFS Metadata Upload**
   - Auto-generate NFT metadata from copyright
   - Upload to IPFS (progress bar)
   - Preview NFT card appearance

4. **Blockchain Transaction**
   - Show estimated gas cost
   - "Mint NFT" button
   - Wallet confirmation prompt
   - Transaction pending state (animated)
   - Block explorer link

5. **Success State**
   - "NFT Minted Successfully!" 🎉
   - View NFT button
   - List on Marketplace button (optional)
   - Share on social media

**Estimated Time**: 2-3 minutes
**Gas Cost Display**: Prominent, in ETH + USD equivalent
**Error Handling**: Clear messages for all failure scenarios

---

#### Flow 3: Browse & Purchase NFT

**Entry Point**: Marketplace page

**Steps**:
1. **Marketplace Landing**
   - Hero: Featured NFTs (carousel)
   - Filter sidebar: Type, Price range, Royalty %
   - Search bar (autocomplete)
   - Sort: Newest, Price (low/high), Popular
   - Grid view: 3-4 columns (responsive)

2. **NFT Card Interactions**
   - Hover: Quick view overlay
   - Click: Navigate to detail page
   - Heart icon: Add to favorites (future)

3. **NFT Detail Page**
   - Large image viewer (lightbox on click)
   - Title, description, tags
   - Price (prominent)
   - Creator profile (avatar, name, badge)
   - Copyright verification badge
   - Royalty percentage (highlighted)
   - Properties/Attributes (collapsible)
   - Ownership history
   - "Buy Now" button (sticky on mobile)

4. **Purchase Flow**
   - Click "Buy Now"
   - Purchase confirmation modal:
     - NFT preview
     - Price breakdown:
       * NFT price
       * Creator royalty (if secondary)
       * Platform fee (2.5%)
       * Gas estimate
       * **Total**
   - "Confirm Purchase" button
   - Wallet transaction approval
   - Transaction pending (animated)

5. **Success State**
   - "Purchase Successful!" confetti animation
   - NFT now in "My Collection"
   - View NFT button
   - Share purchase (optional)

**Purchase Decision Time**: 30-60 seconds on detail page
**Conversion Goal**: 10% of detail page views → purchase
**Mobile Optimization**: Critical (60% traffic expected)

---

#### Flow 4: List NFT on Marketplace

**Entry Point**: Dashboard → My NFTs → Select NFT → "List for Sale"

**Steps**:
1. **Pre-List Check**
   - Verify NFT ownership ✓
   - Check if already listed
   - Marketplace approval (if needed)

2. **Listing Configuration**
   - Set price (ETH input with USD conversion)
   - Price suggestion: "Similar items: 0.05-0.15 ETH"
   - Royalty reminder: "Creator receives X% on this sale"
   - Optional: Add note/message

3. **Approval Transaction (First Time)**
   - "Approve Marketplace Contract"
   - Explanation: "One-time approval needed"
   - Transaction → Pending → Success

4. **Listing Transaction**
   - Review listing details
   - Gas estimate
   - "List NFT" button
   - Transaction pending
   - Success!

5. **Post-Listing**
   - "NFT Listed Successfully!"
   - Share listing button
   - View on marketplace
   - Edit/Cancel listing options

**Estimated Time**: 1-2 minutes
**Estimated Cost**: ~$3-5 in gas fees (Sepolia free)

---

### Error States & Handling

**Common Error Scenarios:**

1. **Wallet Not Connected**
   - Modal: "Please connect your wallet"
   - "Connect Wallet" button
   - Explanation: Why wallet is needed

2. **Wrong Network**
   - Banner: "Please switch to Sepolia Testnet"
   - "Switch Network" button (auto-switch)
   - Help link: Network setup guide

3. **Insufficient Balance**
   - Error message: "Insufficient ETH for gas"
   - Required amount display
   - Link to faucets (testnet)

4. **Transaction Failed**
   - Error details (if available)
   - "Try Again" button
   - "Contact Support" link
   - Transaction hash for debugging

5. **IPFS Upload Failed**
   - Retry logic (3 attempts)
   - Progress bar with status
   - Fallback: Manual retry button
   - Error: "Upload failed, please try again"

6. **Form Validation Errors**
   - Inline error messages (red text)
   - Field highlighting (red border)
   - Clear error descriptions
   - Focus on first error field

**Error Message Principles:**
- Clear, human-readable language
- Explain what went wrong
- Suggest how to fix it
- Provide escape route (cancel, go back)
- Log errors for monitoring

---

### Success States & Celebrations

**Moments to Celebrate:**

1. **First Copyright Registered**
   - Confetti animation
   - Achievement badge: "First Copyright!"
   - Share on Twitter template
   - Encourage next step: "Now mint your NFT"

2. **First NFT Minted**
   - Success modal with large checkmark
   - "Your NFT is Live!" message
   - Preview NFT card
   - CTA: List on marketplace

3. **First Sale Made**
   - Notification: "Congratulations on your first sale!"
   - Earnings display (animated counter)
   - Encourage: "Share your success"

4. **Royalty Received**
   - Toast notification: "You received X ETH in royalties!"
   - Show NFT that generated royalty
   - Lifetime royalty counter

**Gamification Elements (Future):**
- Achievement badges
- Creator levels (Bronze, Silver, Gold)
- Milestones (10 copyrights, 100 sales, etc.)
- Leaderboards (opt-in)

---

## Feature Specifications

### FEATURE 1: Landing Page & Marketing

**Priority**: CRITICAL
**Complexity**: Medium
**Estimated Time**: 3-4 days

#### User Story
**As a** visitor
**I want to** understand what Karya Chain offers within 10 seconds
**So that** I can decide if I want to use the platform

#### Detailed Requirements

**Section 1: Hero Section**
- Full viewport height
- Split layout: 60% text, 40% visual
- Headline (Bahasa): "Lindungi Karya Kreatif Anda dengan Blockchain"
- Headline (English): "Protect Your Creative Work with Blockchain"
- Subheadline: "Indonesia's first platform for copyright registration and automated royalties"
- Primary CTA: "Protect Your Work Now" (prominent, red button)
- Secondary CTA: "Learn How It Works" (outline button)
- Visual: Animated illustration of copyright → NFT → sale → royalty flow
- Trust metrics: "1,000+ Creators | 5,000+ Works Protected | $50,000+ Paid in Royalties"

**Section 2: How It Works (3 Steps)**
- Visual timeline with icons
- Step 1: "Register Copyright" → Upload work, blockchain verification (30 seconds)
- Step 2: "Mint NFT" → Convert to NFT with embedded royalties (2 minutes)
- Step 3: "Earn Forever" → Automatic royalty payments on every resale
- Each step has: Icon, title, description, estimated time
- CTA at end: "Start Now"

**Section 3: Features Grid (4 Columns)**
1. "Instant Blockchain Copyright"
   - Icon: Shield + Check
   - Description: Tamper-proof registration in seconds
2. "Lifetime Royalties"
   - Icon: Infinity + Money
   - Description: Earn automatically on every future sale
3. "OJK-Compliant"
   - Icon: Indonesian flag + Legal
   - Description: First regulatory-compliant platform
4. "Low Fees"
   - Icon: Percentage
   - Description: Only 2.5% platform fee vs 10-15% elsewhere

**Section 4: For Indonesian Creators (Localized)**
- Indonesian cultural imagery (batik pattern backgrounds)
- Specific pain points addressed:
  * "Karya dicuri di Instagram tanpa izin?"
  * "Royalti musik tidak jelas?"
  * "Foto dipakai komersial tanpa bayar?"
- Solution: Karya Chain provides proof + payment
- CTA: "Lindungi Karya Anda Sekarang"

**Section 5: Asset Type Showcase**
- 5 category cards: Art, Music, Photography, Writing, Design
- Each card shows example works + creator testimonial
- Hover effect: Show sample copyright certificate

**Section 6: Why Blockchain?**
- Comparison table:
  | Feature | Traditional | Karya Chain |
  |---------|-------------|-------------|
  | Registration Time | Weeks | 30 seconds |
  | Cost | $50-200 | ~$2 gas fee |
  | Proof of Ownership | Paper | Blockchain |
  | Royalty Tracking | Manual | Automatic |
  | International | Difficult | Global |

**Section 7: Live Statistics**
- Real-time counters (animated):
  * Total copyrights registered
  * Total NFTs minted
  * Total trading volume
  * Total creators
- Updates every 10 seconds via API

**Section 8: Creator Testimonials**
- 3-4 testimonial cards with:
  * Creator photo + name
  * Quote (Bahasa/English)
  * Their success metrics ("Registered 50 works, earned 2 ETH in royalties")
  * Link to their profile

**Section 9: FAQ Section**
- Accordion component
- 8-10 common questions:
  * "What is blockchain copyright?"
  * "How much does it cost?"
  * "Is it legal in Indonesia?"
  * "How do royalties work?"
  * "What if I don't have crypto?"
  * etc.

**Section 10: Final CTA**
- Large banner with gradient background
- "Join 1,000+ Indonesian Creators"
- "Start Protecting Your Work Today"
- Big CTA button
- Social proof: Logos of creator communities/partners

**Section 11: Footer**
- Logo + tagline
- Links: About, How It Works, Fees, FAQ, Blog, Contact
- Social media icons
- Language selector (Bahasa/English)
- Newsletter signup
- Legal: Terms, Privacy, Cookies
- "Built with ❤️ in Indonesia"

#### Technical Specifications

**Next.js Implementation:**
```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesGrid />
      <ForIndonesianCreators />
      <AssetTypeShowcase />
      <WhyBlockchain />
      <LiveStatistics />
      <CreatorTestimonials />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
```

**Performance Optimization:**
- Hero image: WebP format, lazy load below fold
- Use Next.js Image component for automatic optimization
- Code split sections (load FAQ only when visible)
- Preload critical fonts
- Inline critical CSS
- Target LCP < 2.0s

**Responsive Design:**
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Hero: Stack vertically on mobile
- Features: 4 columns → 2 columns → 1 column
- Touch-friendly (min 44px tap targets)

**Animations:**
- Scroll-triggered fade-ins (Intersection Observer)
- Counter animations for statistics
- Hero visual: Subtle parallax effect
- CTA buttons: Hover lift + shadow effect
- Smooth scroll to sections

**SEO Requirements:**
```tsx
export const metadata = {
  title: 'Karya Chain - Blockchain Copyright Protection for Indonesian Creators',
  description: 'Protect your creative work with blockchain. Instant copyright registration and lifetime royalties for Indonesian artists, musicians, photographers, and designers.',
  openGraph: {
    title: 'Karya Chain - Blockchain Copyright Protection',
    description: '1,000+ creators trust Karya Chain for IP protection',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

#### Acceptance Criteria

- [ ] Landing page loads in <2.5 seconds (LCP)
- [ ] Hero section value proposition clear within 10 seconds
- [ ] All CTAs prominently displayed and functional
- [ ] Mobile responsive (test on iPhone SE, iPad, Desktop)
- [ ] Bahasa Indonesia + English language toggle works
- [ ] All sections render correctly
- [ ] Links navigate to correct pages
- [ ] FAQ accordion expands/collapses smoothly
- [ ] Statistics update in real-time
- [ ] Images optimized (WebP format)
- [ ] Lighthouse score: 90+ Performance, 100 Accessibility, 100 SEO
- [ ] Cross-browser tested (Chrome, Safari, Firefox)

---

### FEATURE 2: Wallet Connection & Authentication

**Priority**: CRITICAL
**Complexity**: Medium
**Estimated Time**: 2-3 days

#### User Story
**As a** user
**I want to** connect my wallet easily
**So that** I can interact with the blockchain

#### Detailed Requirements

**Wallet Connection Flow:**

1. **Connect Wallet Button (Header)**
   - Location: Top-right corner
   - Icon: Wallet icon + "Connect Wallet"
   - Styling: Primary button (red)
   - Visible on all pages
   - Mobile: Icon only on small screens

2. **Wallet Selection Modal**
   - Trigger: Click "Connect Wallet"
   - Modal appearance: Fade in from center
   - Title: "Connect Your Wallet"
   - Subtitle: "Choose your preferred wallet provider"
   - Wallet Options (with icons):
     * MetaMask (most popular)
     * WalletConnect (mobile-friendly)
     * Coinbase Wallet
     * Rabby Wallet
   - Each option: Logo + Name + Description
   - "Don't have a wallet?" link → Setup guide
   - Close button (X icon)

3. **First-Time User Prompts**
   - Detect if first connection
   - Show tooltip: "New here? Click to connect and get started"
   - Educational modal after connection: "Welcome! Here's how Karya Chain works"

4. **Network Detection & Switching**
   - Auto-detect current network
   - If not Sepolia: Show banner "Wrong Network"
   - "Switch to Sepolia" button
   - Use `wallet_switchEthereumChain` RPC call
   - If Sepolia not added: Use `wallet_addEthereumChain`
   - Success: "Connected to Sepolia ✓"

5. **Connected State (Header)**
   - Replace "Connect Wallet" with:
     * User address (truncated): 0x1234...5678
     * Ethereum logo
     * ETH balance (if available)
     * Network badge: "Sepolia"
   - Dropdown on click:
     * View Profile
     * Dashboard
     * Copy Address (with copy feedback)
     * Disconnect
     * Settings

6. **Session Persistence**
   - Remember connection (localStorage)
   - Auto-reconnect on page refresh
   - Session timeout: 7 days
   - "Stay connected" option

7. **Disconnect Flow**
   - Click "Disconnect" in dropdown
   - Confirmation modal: "Are you sure?"
   - Clear session
   - Redirect to landing page
   - Show toast: "Wallet disconnected"

#### Edge Cases & Error Handling

**Error Scenarios:**

1. **User Rejects Connection**
   - Message: "Connection rejected. Please try again."
   - Keep modal open
   - "Try Again" button

2. **Wallet Not Installed**
   - Detect if MetaMask installed
   - If not: Show "Install MetaMask" button → metamask.io
   - Alternative: "Use WalletConnect instead"

3. **Network Switch Failed**
   - Message: "Failed to switch network. Please switch manually."
   - Manual instructions:
     * Network Name: Sepolia Testnet
     * RPC URL: https://rpc.sepolia.dev
     * Chain ID: 11155111
     * Currency: ETH

4. **Connection Timeout**
   - Timeout after 30 seconds
   - Message: "Connection timed out. Please try again."
   - "Retry" button

5. **Multiple Wallets Detected**
   - Detect if multiple wallets injected
   - Show warning: "Multiple wallets detected. Please disable others."

#### Technical Specifications

**Tech Stack:**
- **wagmi**: React hooks for Ethereum
- **RainbowKit**: Wallet connection UI
- **viem**: TypeScript Ethereum library

**Implementation:**

```tsx
// app/providers.tsx
'use client';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'Karya Chain',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

```tsx
// components/web3/ConnectButton.tsx
'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export function ConnectButton() {
  const { isConnected, address } = useAccount();

  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div>
            {!connected ? (
              <button
                onClick={openConnectModal}
                className="btn-primary"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span>{account.displayName}</span>
                <span>{account.displayBalance}</span>
              </div>
            )}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
```

**Network Configuration:**

```typescript
// lib/config/chains.ts
export const sepoliaConfig = {
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.dev'],
    },
    public: {
      http: ['https://rpc.sepolia.dev'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io'
    },
  },
  testnet: true,
};
```

**Custom Wallet Modal Styling:**

```tsx
// styles/rainbow.css
[data-rk] {
  --rk-colors-accentColor: #DC2626; /* Primary red */
  --rk-colors-accentColorForeground: white;
  --rk-radii-connectButton: 0.5rem;
  --rk-fonts-body: 'Inter', sans-serif;
}
```

#### Security Considerations

1. **Never Request Private Keys**
   - Only request wallet connection
   - All signing done in user's wallet

2. **Verify Network Before Transactions**
   - Check chain ID before every transaction
   - Show warning if wrong network

3. **Display Transaction Details**
   - Always show what user is signing
   - Gas estimates
   - Contract addresses

4. **Rate Limiting**
   - Limit connection attempts (3 per minute)
   - Prevent connection spam

5. **Session Security**
   - Use secure localStorage
   - Encrypt sensitive data
   - Clear session on logout

#### Acceptance Criteria

- [ ] Wallet connection modal opens smoothly
- [ ] All major wallets supported (MetaMask, WalletConnect, Coinbase)
- [ ] Network auto-detection works
- [ ] Auto-switch to Sepolia successful
- [ ] Address displayed correctly (truncated)
- [ ] ETH balance shows (if available)
- [ ] Session persists across page refresh
- [ ] Disconnect works cleanly
- [ ] Error messages clear and helpful
- [ ] Mobile-responsive wallet modal
- [ ] Tested on mobile wallets (MetaMask Mobile, Rainbow)
- [ ] No console errors
- [ ] Accessible (keyboard navigation, screen reader)

---

### FEATURE 3: Copyright Registration Flow

**Priority**: CRITICAL
**Complexity**: High
**Estimated Time**: 5-6 days

#### User Story
**As a** creator
**I want to** register my creative work easily
**So that** I have blockchain proof of ownership

#### Detailed Requirements

**Multi-Step Form Design:**

**Progress Indicator:**
```
[1. Upload] → [2. Details] → [3. Review] → [4. Register]
   Active       Inactive      Inactive     Inactive
```

---

**STEP 1: File Upload**

**Layout:**
- Large drag-and-drop zone (center of screen)
- Icon: Cloud upload
- Text: "Drag & drop your file here"
- "or click to browse"
- Supported formats listed below
- Max file size: 100 MB

**Supported File Types:**
- Images: JPG, PNG, GIF, SVG, WebP
- Audio: MP3, WAV, FLAC
- Documents: PDF, DOCX, TXT
- Video: MP4, MOV (future)

**Upload States:**
1. **Empty State**: Dotted border, upload icon
2. **Drag Over**: Solid border, highlight color
3. **Uploading**: Progress bar + percentage
4. **Upload Complete**: Green checkmark, file preview
5. **Upload Error**: Red X, error message

**File Preview:**
- Image: Show thumbnail (200x200px)
- Audio: Waveform visualization + play button
- Document: First page thumbnail + page count
- Display: Filename, size, type

**IPFS Upload Process:**
- Show progress: "Uploading to IPFS... 45%"
- Estimated time remaining
- Cancel button (abort upload)
- Success: "Uploaded to IPFS ✓ CID: Qm..."
- Copy CID button

**Validation:**
- File size check (<100MB)
- File type check (supported formats)
- Content hash generation (SHA-256)
- Duplicate detection (check if hash exists)
- If duplicate: "This work is already registered. View existing registration?"

**Navigation:**
- "Next" button (disabled until upload complete)
- "Cancel" button (confirm before exit)

---

**STEP 2: Metadata Details**

**Form Fields:**

1. **Title*** (Required)
   - Text input
   - Max 100 characters
   - Placeholder: "e.g., Sunset over Tanah Lot"
   - Validation: At least 3 characters

2. **Asset Type*** (Required)
   - Radio button group (visual cards)
   - Options:
     * Art (icon: palette)
     * Music (icon: note)
     * Photography (icon: camera)
     * Writing (icon: document)
     * Design (icon: layers)
   - Pre-selected based on file type

3. **Description*** (Required)
   - Textarea
   - Min 50 characters, Max 1000
   - Character counter
   - Placeholder: "Describe your work, inspiration, techniques..."
   - Markdown support (optional)

4. **Tags** (Optional but recommended)
   - Tag input with autocomplete
   - Max 10 tags
   - Suggestions based on asset type
   - Example tags: landscape, digital art, NFT, Indonesian

5. **Category** (Optional)
   - Dropdown
   - Categories vary by asset type
   - Art: Abstract, Portrait, Landscape, Digital, Traditional
   - Music: Pop, Jazz, Electronic, Traditional, Soundtrack

6. **Language** (Optional)
   - Dropdown
   - Options: Bahasa Indonesia, English, Javanese, etc.
   - Relevant for writing/music

7. **Creation Date** (Optional)
   - Date picker
   - Defaults to today
   - Can set historical date
   - Max: Today's date

8. **Location** (Optional)
   - Text input with autocomplete
   - Example: "Bali, Indonesia"
   - Used for photo/art provenance

**Co-Creator Support (Optional):**
- Toggle: "This is a collaborative work"
- If enabled:
  * Add co-creator wallet addresses
  * Set ownership percentages (must sum to 100%)
  * Each co-creator must approve before minting

**Form Behavior:**
- Auto-save to localStorage every 30 seconds
- "Save Draft" button (manual save)
- "Load Draft" on return
- Clear form button (with confirmation)

**Navigation:**
- "Back" button → Return to Step 1
- "Next" button → Proceed to Step 3
- Form validation on "Next"
- Show inline errors for invalid fields

---

**STEP 3: Review & Confirmation**

**Layout:**
- Two-column layout
- Left: File preview
- Right: Metadata summary

**File Preview Card:**
- Large preview image/player
- File details:
  * Filename
  * File size
  * File type
  * IPFS CID (with copy button)
  * Content Hash (with copy button)

**Metadata Summary Card:**
- All entered information displayed
- Grouped by sections:
  * Basic Info (Title, Type, Description)
  * Classification (Category, Tags, Language)
  * Provenance (Date, Location)
  * Collaborators (if any)
- "Edit" button on each section → Jump back to Step 2

**Copyright Certificate Preview:**
- Show preview of certificate that will be generated
- Include:
  * Karya Chain logo + Indonesian flag
  * Title of work
  * Creator address (truncated)
  * Asset type
  * Content hash
  * Timestamp (will be set on registration)
  * QR code (links to verification page)
  * "This is a preview" watermark

**Cost Breakdown:**
- Gas estimate (in ETH + USD)
- Platform fee: Free for registration
- Total cost: ~$2-5 (Sepolia: Free)
- "Get Testnet ETH" link (if balance low)

**Legal Disclaimer:**
- Checkbox: "I confirm I am the original creator/rights holder of this work"
- Link to Terms of Service
- Link to Copyright Policy

**Navigation:**
- "Back" button → Return to Step 2
- "Register Copyright" button (primary CTA)
  * Disabled until checkbox checked
  * Shows gas estimate
  * Prominent, large button

---

**STEP 4: Blockchain Registration**

**Transaction Flow:**

1. **Pre-Transaction Check**
   - Verify wallet connected
   - Check network (Sepolia)
   - Check sufficient balance
   - Final duplicate check

2. **Initiate Transaction**
   - Call smart contract: `registerCopyright(...)`
   - Show modal: "Confirm Transaction in Wallet"
   - Animated wallet icon (pulsing)
   - Instructions: "Check your wallet to approve"

3. **Transaction Pending**
   - Modal: "Registering Your Copyright..."
   - Animated loader (circular progress)
   - Status: "Transaction submitted..."
   - Transaction hash displayed (clickable → Etherscan)
   - Estimated time: "~30 seconds"
   - Live updates: "Waiting for confirmation..."

4. **Transaction Confirmed**
   - Success animation (confetti/checkmark)
   - Modal: "Copyright Registered Successfully! 🎉"
   - Registration ID displayed
   - Block number + timestamp
   - Etherscan verification link

5. **Post-Registration Actions**
   - "Download Certificate" button (primary)
     * Generates PDF certificate
     * Auto-download
   - "View Registration" button → Detail page
   - "Register Another Work" button
   - "Mint NFT" button → NFT minting flow
   - Share buttons:
     * Twitter: "I just registered my copyright on @KaryaChain!"
     * LinkedIn
     * Copy link

**Error Handling:**

1. **User Rejected Transaction**
   - Message: "Transaction cancelled"
   - "Try Again" button
   - "Save Draft" option

2. **Transaction Failed**
   - Error details (if available)
   - Common reasons:
     * Insufficient gas
     * Network congestion
     * Smart contract error
   - "Retry" button
   - "Adjust Gas" option (advanced)
   - "Contact Support" link

3. **Network Error**
   - "Network connection lost"
   - Auto-retry logic (3 attempts)
   - Manual "Retry" button

**Draft/Resume:**
- All steps auto-saved
- "Resume Registration" on return
- Drafts expire after 7 days

---

#### Technical Specifications

**Smart Contract Integration:**

```typescript
// lib/hooks/useCopyrightRegistry.ts
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { copyrightRegistryABI, copyrightRegistryAddress } from '@/lib/contracts';

export function useCopyrightRegistry() {
  const { write, data, isLoading, isError, error } = useContractWrite({
    address: copyrightRegistryAddress,
    abi: copyrightRegistryABI,
    functionName: 'registerCopyright',
  });

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const registerCopyright = async (
    assetType: number,
    contentHash: string,
    metadataURI: string
  ) => {
    write({
      args: [assetType, contentHash, metadataURI, []], // Empty array for solo work
    });
  };

  return {
    registerCopyright,
    isLoading: isLoading || isPending,
    isSuccess,
    isError,
    error,
    transactionHash: data?.hash,
  };
}
```

**IPFS Upload:**

```typescript
// lib/utils/ipfs.ts
import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY!,
});

export async function uploadFileToIPFS(file: File): Promise<string> {
  try {
    const upload = await pinata.upload.file(file);
    return upload.IpfsHash;
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw new Error('Failed to upload file to IPFS');
  }
}

export async function uploadMetadataToIPFS(metadata: object): Promise<string> {
  try {
    const upload = await pinata.upload.json(metadata);
    return upload.IpfsHash;
  } catch (error) {
    console.error('Metadata upload failed:', error);
    throw new Error('Failed to upload metadata to IPFS');
  }
}

export function getIPFSUrl(cid: string): string {
  return `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}`;
}
```

**Content Hash Generation:**

```typescript
// lib/utils/hash.ts
import { createHash } from 'crypto';

export async function generateContentHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const hash = createHash('sha256').update(buffer).digest('hex');
  return `0x${hash}`;
}
```

**Form State Management:**

```typescript
// components/register/useRegistrationForm.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RegistrationFormState {
  step: number;
  file: File | null;
  ipfsCID: string | null;
  contentHash: string | null;
  metadata: {
    title: string;
    assetType: number;
    description: string;
    tags: string[];
    category: string;
    language: string;
    creationDate: Date | null;
    location: string;
  };
  coCreators: Array<{ address: string; share: number }>;

  setStep: (step: number) => void;
  setFile: (file: File) => void;
  setIPFSCID: (cid: string) => void;
  setContentHash: (hash: string) => void;
  updateMetadata: (metadata: Partial<RegistrationFormState['metadata']>) => void;
  addCoCreator: (creator: { address: string; share: number }) => void;
  removeCoCreator: (address: string) => void;
  reset: () => void;
}

export const useRegistrationForm = create<RegistrationFormState>()(
  persist(
    (set) => ({
      step: 1,
      file: null,
      ipfsCID: null,
      contentHash: null,
      metadata: {
        title: '',
        assetType: 0,
        description: '',
        tags: [],
        category: '',
        language: 'id',
        creationDate: null,
        location: '',
      },
      coCreators: [],

      setStep: (step) => set({ step }),
      setFile: (file) => set({ file }),
      setIPFSCID: (cid) => set({ ipfsCID: cid }),
      setContentHash: (hash) => set({ contentHash: hash }),
      updateMetadata: (newMetadata) =>
        set((state) => ({
          metadata: { ...state.metadata, ...newMetadata }
        })),
      addCoCreator: (creator) =>
        set((state) => ({
          coCreators: [...state.coCreators, creator],
        })),
      removeCoCreator: (address) =>
        set((state) => ({
          coCreators: state.coCreators.filter((c) => c.address !== address),
        })),
      reset: () => set({
        step: 1,
        file: null,
        ipfsCID: null,
        contentHash: null,
        metadata: {
          title: '',
          assetType: 0,
          description: '',
          tags: [],
          category: '',
          language: 'id',
          creationDate: null,
          location: '',
        },
        coCreators: [],
      }),
    }),
    {
      name: 'registration-form-storage',
    }
  )
);
```

#### Acceptance Criteria

- [ ] All 4 steps flow smoothly
- [ ] File upload supports all specified formats
- [ ] IPFS upload shows progress
- [ ] Content hash generated correctly
- [ ] Duplicate detection works
- [ ] Form validation on all required fields
- [ ] Form auto-saves to localStorage
- [ ] Review page shows accurate information
- [ ] Gas estimate displayed correctly
- [ ] Transaction flow works end-to-end
- [ ] Success state shows certificate
- [ ] Certificate PDF downloads correctly
- [ ] Error handling for all failure scenarios
- [ ] Mobile-responsive on all steps
- [ ] Keyboard accessible (tab navigation)
- [ ] Screen reader friendly
- [ ] Tested on Sepolia testnet
- [ ] Average completion time < 5 minutes
- [ ] 95% transaction success rate
- [ ] No data loss if page refreshes

---

This is getting quite comprehensive! I've completed:
- ✅ Design System Specification (comprehensive)
- ✅ User Experience Design (flows, states)
- ✅ Feature 1: Landing Page (complete spec)
- ✅ Feature 2: Wallet Connection (complete spec)
- ✅ Feature 3: Copyright Registration (complete spec with code)

The document is now at ~1200 lines.

**Should I continue with the remaining features?**
- Feature 4: NFT Minting Flow
- Feature 5: Marketplace (Browse, Search, Filter)
- Feature 6: NFT Detail & Purchase
- Feature 7: Creator Dashboard
- Feature 8: Collector Dashboard
- Plus: Technical Architecture, Performance, Security, i18n, Accessibility, SEO, Analytics, Testing, Deployment, Indonesian Market Considerations, Roadmap

This will make the document approximately **3,000-4,000 lines total** - extremely comprehensive and production-ready.

Would you like me to:
**A)** Continue with all remaining features (full comprehensive document)
**B)** Provide a condensed version of remaining features
**C)** Stop here and let you review what we have so far

What would you prefer, RECTOR?
