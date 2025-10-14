# Manual Testing Guide - KaryaChain

**Test URL**: https://karyachain-v1.rectorspace.com/
**Wallet**: Rabby Wallet (Sepolia Testnet)
**Estimated Time**: 1-2 hours

---

## Setup

- [ ] Browser: Chrome/Brave
- [ ] Wallet: Rabby with Sepolia ETH (~0.02 ETH minimum)
- [ ] Test files: Prepare 2-3 files (image, PDF, etc.)
- [ ] Two wallets: Main (seller) + Secondary (buyer)

---

## 1. Wallet Connection

- [ ] Click "Connect Wallet" → RainbowKit modal opens
- [ ] Connect Rabby → Address shows in header
- [ ] Network shows "Sepolia"
- [ ] Switch to wrong network → App prompts to switch back
- [ ] Disconnect → Reconnect (should work smoothly)

---

## 2. Landing Page

- [ ] All sections load (Hero, How It Works, Features, FAQ)
- [ ] CTA buttons work ("Register Copyright", "Explore Marketplace")
- [ ] Mobile: Open DevTools responsive mode → Check stacking

---

## 3. Register Copyright Flow

### Step 1: Upload
- [ ] Drag & drop file → Preview appears
- [ ] SHA-256 hash displays
- [ ] Copy hash button works
- [ ] Try invalid file → Error message

### Step 2: Metadata
- [ ] Fill title, description, asset type, tags
- [ ] Leave fields empty → Validation errors
- [ ] All fields valid → "Next" button enabled

### Step 3: IPFS
- [ ] IPFS upload progress bar shows
- [ ] IPFS CID displays after upload (~20 seconds)
- [ ] Review shows all data correctly
- [ ] Click "Edit" → Goes back with data preserved

### Step 4: Transaction
- [ ] Click "Register on Blockchain"
- [ ] Rabby wallet opens → Sign transaction
- [ ] Wait ~30 seconds → Success state
- [ ] Registration ID shows
- [ ] Etherscan link opens correctly
- [ ] **Note Registration ID for next tests**

---

## 4. Mint NFT

- [ ] Go to `/mint` page
- [ ] Your registered copyright displays
- [ ] Click "Mint NFT" → Modal opens
- [ ] Set royalty slider (5-20%)
- [ ] Click "Mint NFT" → Sign transaction
- [ ] Success: Token ID displays
- [ ] OpenSea link works (testnets.opensea.io)
- [ ] **Note Token ID for next tests**

---

## 5. Marketplace Browse

- [ ] Go to `/marketplace`
- [ ] NFT cards display in grid
- [ ] Search by title → Results filter
- [ ] Filter by asset type → Grid updates
- [ ] Click NFT card → Opens detail page

---

## 6. List NFT for Sale

- [ ] Go to `/dashboard` → "My NFTs" tab
- [ ] Your minted NFT displays
- [ ] Click "List for Sale"
- [ ] Enter price (e.g., 0.01 ETH)
- [ ] **Step 1**: Approve marketplace → Sign transaction
- [ ] **Step 2**: List NFT → Sign transaction
- [ ] Success: NFT shows in "My Listings" tab
- [ ] Go to marketplace → Your NFT appears

---

## 7. Purchase NFT (Use Second Wallet!)

- [ ] **Switch to Wallet B** (buyer wallet)
- [ ] Connect Wallet B with Sepolia ETH
- [ ] Go to marketplace → Find your listed NFT
- [ ] Click card → Detail page opens
- [ ] Price breakdown shows (price + royalty + platform fee)
- [ ] Click "Buy Now" → Sign transaction
- [ ] Success: Confetti animation (if implemented)
- [ ] **Verify on Etherscan**:
  - NFT transferred to Wallet B ✓
  - Royalty paid to Wallet A (seller/creator) ✓
  - Platform fee paid (2.5%) ✓

---

## 8. Dashboard Verification

### Wallet A (Seller):
- [ ] Go to `/dashboard` → "My NFTs" tab
- [ ] Sold NFT should be GONE
- [ ] "My Listings" tab → Listing should be removed

### Wallet B (Buyer):
- [ ] Go to `/dashboard` → "My NFTs" tab
- [ ] Purchased NFT should APPEAR
- [ ] Status: "Not Listed"

---

## 9. Critical End-to-End Test

**Full Flow**: Register → Mint → List → Purchase

- [ ] Complete entire flow with REAL file
- [ ] All transactions succeed
- [ ] Ownership transfers correctly
- [ ] Royalties distributed correctly (check Etherscan)
- [ ] All pages load without errors

**✅ If all pass → Production ready!**

---

## 10. Error States

- [ ] Reject transaction in wallet → Error message + Retry button
- [ ] Disconnect internet → Error handling
- [ ] Submit empty forms → Validation errors
- [ ] Wrong network → Network switch prompt

---

## 11. Mobile Responsive

Use Chrome DevTools (Cmd+Shift+M):

- [ ] iPhone SE (375px): All pages readable
- [ ] iPad (768px): Grid adjusts columns
- [ ] No horizontal scroll
- [ ] Buttons large enough to tap

---

## 12. Cross-Browser (Quick Check)

- [ ] Chrome: Landing + 1 transaction ✓
- [ ] Firefox: Landing + wallet connect ✓
- [ ] Safari: Landing + wallet connect ✓

---

## Bug Tracking Template

```
Bug #: [Title]
Page: [URL or /page-name]
Steps: 1. Do X, 2. Do Y, 3. See error
Expected: [What should happen]
Actual: [What happened]
Severity: Critical / High / Medium / Low
Console Error: [Check F12 Console]
```

---

## Screenshot Checklist (for Pitch Deck)

While testing, capture:

- [ ] Landing page hero
- [ ] Registration success (with certificate)
- [ ] Mint NFT success (token ID)
- [ ] Marketplace grid
- [ ] NFT detail page
- [ ] Purchase success
- [ ] Dashboard (all 3 tabs)
- [ ] Mobile view
- [ ] Etherscan transaction (showing royalty split)

---

## Notes

- **Test Faucet**: If low on Sepolia ETH, use Google Cloud Web3 faucet
- **RPC Issues**: If transactions slow, try switching RPC in Rabby settings
- **IPFS Upload**: Takes 15-30 seconds, don't refresh page
- **Etherscan**: All transactions visible at sepolia.etherscan.io

---

**Status**: Ready to test! Start with Section 1 (Wallet Connection).

**Found bugs?** Document using template above, prioritize Critical/High first.

**Testing complete?** All checkboxes marked = Ready for hackathon submission! 🎉
