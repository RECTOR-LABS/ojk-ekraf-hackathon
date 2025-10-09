# Technical Architecture Document
# Karya Chain - IP Protection & Royalty Platform

**Version**: 1.0
**Date**: October 9, 2025
**Status**: Design Phase

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Smart Contract Architecture](#smart-contract-architecture)
3. [Data Models](#data-models)
4. [User Flows](#user-flows)
5. [Security Architecture](#security-architecture)
6. [Frontend Architecture](#frontend-architecture)
7. [Storage Strategy](#storage-strategy)
8. [Deployment Architecture](#deployment-architecture)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         KARYA CHAIN PLATFORM                     │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   Frontend DApp      │         │   IPFS Storage       │
│   (Next.js +         │◄────────┤   (Pinata)           │
│    Tailwind)         │         │   - Files            │
│                      │         │   - Metadata         │
└───────┬──────────────┘         └──────────────────────┘
        │
        │ Web3 (wagmi)
        │
┌───────▼──────────────────────────────────────────────────────────┐
│                    SEPOLIA TESTNET                                │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Copyright   │  │   KaryaNFT   │  │   Royalty    │          │
│  │  Registry    │◄─┤  (ERC-721)   │◄─┤ Distributor  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         ▲                  ▲                  ▲                   │
│         │                  │                  │                   │
│         └──────────────────┴──────────────────┘                   │
│                            │                                      │
│                   ┌────────▼────────┐                            │
│                   │     Karya       │                            │
│                   │   Marketplace   │                            │
│                   └─────────────────┘                            │
│                            │                                      │
│                   ┌────────▼────────┐                            │
│                   │    Creator      │                            │
│                   │    Registry     │                            │
│                   └─────────────────┘                            │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

### Core Components

1. **CopyrightRegistry**: Central registry for all copyrighted works
2. **KaryaNFT**: ERC-721 NFT contract for unique works
3. **KaryaEditions**: ERC-1155 contract for limited editions
4. **RoyaltyDistributor**: Automated royalty payment system
5. **KaryaMarketplace**: Trading platform with integrated royalties
6. **CreatorRegistry**: Creator profile and verification

---

## Smart Contract Architecture

### Contract Hierarchy

```
                    ┌──────────────────┐
                    │   Ownable        │
                    │   (OpenZeppelin) │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│ Copyright      │  │  CreatorRegistry│  │ Marketplace    │
│ Registry       │  │                 │  │                │
└────────────────┘  └─────────────────┘  └────────────────┘


                    ┌──────────────────┐
                    │   ERC721         │
                    │   ERC2981        │
                    │   (OpenZeppelin) │
                    └────────┬─────────┘
                             │
                    ┌────────▼────────┐
                    │   KaryaNFT      │
                    └─────────────────┘


                    ┌──────────────────┐
                    │   ERC1155        │
                    │   ERC2981        │
                    │   (OpenZeppelin) │
                    └────────┬─────────┘
                             │
                    ┌────────▼────────┐
                    │  KaryaEditions  │
                    └─────────────────┘


                    ┌──────────────────┐
                    │ ReentrancyGuard  │
                    │   (OpenZeppelin) │
                    └────────┬─────────┘
                             │
                    ┌────────▼────────┐
                    │ Royalty         │
                    │ Distributor     │
                    └─────────────────┘
```

---

## Data Models

### 1. CopyrightRegistry Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CopyrightRegistry {

    enum AssetType {
        Art,
        Music,
        Writing,
        Photography,
        Design
    }

    struct Copyright {
        uint256 id;
        address creator;
        AssetType assetType;
        string contentHash;      // IPFS CID of content
        string metadataURI;      // IPFS URI for metadata JSON
        uint256 timestamp;       // Block timestamp of registration
        bool minted;             // Whether NFT has been minted
        address[] coCreators;    // For collaborative works
        uint256[] ownershipShares; // Percentage ownership (sum = 100)
    }

    struct Metadata {
        string title;
        string description;
        string[] tags;
        string category;
        string language;
    }

    // Storage
    mapping(uint256 => Copyright) public copyrights;
    mapping(bytes32 => bool) public contentHashExists;
    mapping(address => uint256[]) public creatorWorks;
    uint256 public copyrightCounter;

    // Events
    event CopyrightRegistered(
        uint256 indexed id,
        address indexed creator,
        AssetType assetType,
        string contentHash,
        uint256 timestamp
    );

    event CollaborativeWorkRegistered(
        uint256 indexed id,
        address[] creators,
        uint256[] shares
    );

    event NFTMinted(
        uint256 indexed copyrightId,
        address nftContract,
        uint256 tokenId
    );
}
```

### 2. KaryaNFT Contract (ERC-721)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KaryaNFT is ERC721URIStorage, ERC2981, Ownable {

    struct NFTData {
        uint256 copyrightId;     // Link to CopyrightRegistry
        address originalCreator;
        uint256 mintTimestamp;
        uint256 royaltyPercentage; // In basis points (500 = 5%)
    }

    // Storage
    mapping(uint256 => NFTData) public nftData;
    mapping(uint256 => bool) public copyrightMinted;
    uint256 private _tokenIdCounter;
    address public copyrightRegistry;

    // Platform fee (2.5% = 250 basis points)
    uint256 public constant PLATFORM_FEE = 250;
    address public platformFeeRecipient;

    // Events
    event NFTMinted(
        uint256 indexed tokenId,
        uint256 indexed copyrightId,
        address creator,
        uint256 royaltyPercentage
    );

    constructor(
        address _copyrightRegistry,
        address _platformFeeRecipient
    ) ERC721("Karya Chain", "KARYA") {
        copyrightRegistry = _copyrightRegistry;
        platformFeeRecipient = _platformFeeRecipient;
    }

    function mint(
        uint256 copyrightId,
        string memory tokenURI,
        uint96 royaltyPercentage
    ) external returns (uint256) {
        // Verification logic here
        // Mint NFT
        // Set royalty info
        // Emit event
    }

    // ERC2981 royaltyInfo implementation
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) public view override returns (address, uint256) {
        NFTData memory data = nftData[tokenId];
        uint256 royaltyAmount = (salePrice * data.royaltyPercentage) / 10000;
        return (data.originalCreator, royaltyAmount);
    }

    // Required overrides
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

### 3. KaryaEditions Contract (ERC-1155)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KaryaEditions is ERC1155, ERC2981, Ownable {

    struct Edition {
        uint256 copyrightId;
        address creator;
        uint256 maxSupply;
        uint256 currentSupply;
        uint256 royaltyPercentage;
        string uri;
    }

    mapping(uint256 => Edition) public editions;
    uint256 private _editionIdCounter;

    event EditionCreated(
        uint256 indexed editionId,
        uint256 indexed copyrightId,
        address creator,
        uint256 maxSupply
    );

    event EditionMinted(
        uint256 indexed editionId,
        address indexed recipient,
        uint256 amount
    );

    function createEdition(
        uint256 copyrightId,
        uint256 maxSupply,
        uint96 royaltyPercentage,
        string memory tokenURI
    ) external returns (uint256) {
        // Create edition
        // Set royalty
        // Emit event
    }

    function mintEdition(
        uint256 editionId,
        uint256 amount
    ) external {
        // Verify supply
        // Mint tokens
        // Update supply
    }
}
```

### 4. RoyaltyDistributor Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoyaltyDistributor is ReentrancyGuard, Ownable {

    struct RoyaltySplit {
        address[] recipients;
        uint256[] shares;  // Basis points, sum = 10000
    }

    struct PaymentRecord {
        uint256 tokenId;
        uint256 amount;
        uint256 timestamp;
        address payer;
    }

    // Storage
    mapping(uint256 => RoyaltySplit) public royaltySplits;
    mapping(address => uint256) public pendingWithdrawals;
    mapping(address => PaymentRecord[]) public paymentHistory;

    // Events
    event RoyaltyReceived(
        uint256 indexed tokenId,
        address indexed payer,
        uint256 amount
    );

    event RoyaltyDistributed(
        uint256 indexed tokenId,
        address indexed recipient,
        uint256 amount
    );

    event Withdrawn(
        address indexed recipient,
        uint256 amount
    );

    function setRoyaltySplit(
        uint256 tokenId,
        address[] memory recipients,
        uint256[] memory shares
    ) external {
        require(shares.length == recipients.length, "Length mismatch");
        uint256 totalShares = 0;
        for (uint256 i = 0; i < shares.length; i++) {
            totalShares += shares[i];
        }
        require(totalShares == 10000, "Shares must sum to 10000");

        royaltySplits[tokenId] = RoyaltySplit(recipients, shares);
    }

    function distributeRoyalty(uint256 tokenId) external payable nonReentrant {
        RoyaltySplit memory split = royaltySplits[tokenId];
        require(split.recipients.length > 0, "No split configured");

        for (uint256 i = 0; i < split.recipients.length; i++) {
            uint256 amount = (msg.value * split.shares[i]) / 10000;
            pendingWithdrawals[split.recipients[i]] += amount;

            emit RoyaltyDistributed(tokenId, split.recipients[i], amount);
        }

        emit RoyaltyReceived(tokenId, msg.sender, msg.value);
    }

    function withdraw() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds to withdraw");

        pendingWithdrawals[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit Withdrawn(msg.sender, amount);
    }

    function getPaymentHistory(address creator)
        external
        view
        returns (PaymentRecord[] memory)
    {
        return paymentHistory[creator];
    }
}
```

### 5. KaryaMarketplace Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract KaryaMarketplace is ReentrancyGuard {

    struct Listing {
        uint256 tokenId;
        address nftContract;
        address seller;
        uint256 price;
        bool active;
        uint256 listedAt;
    }

    struct Offer {
        uint256 listingId;
        address buyer;
        uint256 price;
        uint256 expiresAt;
        bool active;
    }

    // Storage
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Offer[]) public offers;
    uint256 public listingCounter;
    uint256 public platformFee = 250; // 2.5%
    address public platformFeeRecipient;

    // Events
    event Listed(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    event Sold(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price
    );

    event ListingCancelled(uint256 indexed listingId);

    event OfferMade(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price
    );

    event OfferAccepted(
        uint256 indexed listingId,
        uint256 indexed offerId
    );

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external returns (uint256) {
        require(price > 0, "Price must be > 0");

        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not owner");
        require(
            nft.getApproved(tokenId) == address(this) ||
            nft.isApprovedForAll(msg.sender, address(this)),
            "Not approved"
        );

        uint256 listingId = listingCounter++;
        listings[listingId] = Listing({
            tokenId: tokenId,
            nftContract: nftContract,
            seller: msg.sender,
            price: price,
            active: true,
            listedAt: block.timestamp
        });

        emit Listed(listingId, nftContract, tokenId, msg.sender, price);
        return listingId;
    }

    function buyNFT(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Not active");
        require(msg.value >= listing.price, "Insufficient payment");

        listing.active = false;

        // Calculate fees
        uint256 platformFeeAmount = (listing.price * platformFee) / 10000;
        uint256 royaltyAmount = 0;
        address royaltyRecipient;

        // Check for ERC2981 royalty
        try IERC2981(listing.nftContract).royaltyInfo(
            listing.tokenId,
            listing.price
        ) returns (address recipient, uint256 amount) {
            royaltyAmount = amount;
            royaltyRecipient = recipient;
        } catch {}

        uint256 sellerProceeds = listing.price - platformFeeAmount - royaltyAmount;

        // Transfer funds
        (bool success, ) = platformFeeRecipient.call{value: platformFeeAmount}("");
        require(success, "Platform fee transfer failed");

        if (royaltyAmount > 0) {
            (success, ) = royaltyRecipient.call{value: royaltyAmount}("");
            require(success, "Royalty transfer failed");
        }

        (success, ) = listing.seller.call{value: sellerProceeds}("");
        require(success, "Seller transfer failed");

        // Transfer NFT
        IERC721(listing.nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );

        emit Sold(listingId, msg.sender, listing.price);
    }

    function makeOffer(uint256 listingId, uint256 expiresAt)
        external
        payable
    {
        require(expiresAt > block.timestamp, "Invalid expiration");

        offers[listingId].push(Offer({
            listingId: listingId,
            buyer: msg.sender,
            price: msg.value,
            expiresAt: expiresAt,
            active: true
        }));

        emit OfferMade(listingId, msg.sender, msg.value);
    }

    function acceptOffer(uint256 listingId, uint256 offerId)
        external
        nonReentrant
    {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not seller");
        require(listing.active, "Listing not active");

        Offer storage offer = offers[listingId][offerId];
        require(offer.active, "Offer not active");
        require(offer.expiresAt > block.timestamp, "Offer expired");

        // Similar to buyNFT logic but using offer.price
        // ...

        emit OfferAccepted(listingId, offerId);
    }

    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not seller");
        require(listing.active, "Not active");

        listing.active = false;
        emit ListingCancelled(listingId);
    }
}
```

### 6. CreatorRegistry Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CreatorRegistry {

    enum VerificationStatus {
        Unverified,
        Pending,
        Verified,
        Rejected
    }

    struct Creator {
        address wallet;
        string profileURI;  // IPFS URI with profile data
        VerificationStatus status;
        uint256 registeredAt;
        uint256 totalWorks;
        uint256 totalSales;
        uint256 reputationScore;
    }

    mapping(address => Creator) public creators;
    mapping(address => bool) public isRegistered;
    address public verificationAuthority;

    event CreatorRegistered(address indexed creator, string profileURI);
    event VerificationStatusUpdated(address indexed creator, VerificationStatus status);
    event ReputationUpdated(address indexed creator, uint256 newScore);

    function registerCreator(string memory profileURI) external {
        require(!isRegistered[msg.sender], "Already registered");

        creators[msg.sender] = Creator({
            wallet: msg.sender,
            profileURI: profileURI,
            status: VerificationStatus.Unverified,
            registeredAt: block.timestamp,
            totalWorks: 0,
            totalSales: 0,
            reputationScore: 0
        });

        isRegistered[msg.sender] = true;
        emit CreatorRegistered(msg.sender, profileURI);
    }

    function updateVerificationStatus(
        address creator,
        VerificationStatus status
    ) external {
        require(msg.sender == verificationAuthority, "Not authorized");
        creators[creator].status = status;
        emit VerificationStatusUpdated(creator, status);
    }

    function updateReputation(address creator, uint256 score) external {
        // Called by marketplace on successful sales
        creators[creator].reputationScore = score;
        emit ReputationUpdated(creator, score);
    }
}
```

---

## User Flows

### Flow 1: Register Copyright

```
Creator → Connect Wallet → Upload File to IPFS → Fill Metadata Form
    → Submit Transaction → CopyrightRegistry.register()
    → Event Emitted → Certificate Generated → Download Certificate
```

**Steps:**
1. User connects wallet (MetaMask)
2. User uploads creative work file (image/audio/document)
3. Frontend uploads to IPFS, gets CID
4. User fills metadata (title, description, type, tags)
5. Frontend creates metadata JSON, uploads to IPFS
6. User signs transaction
7. Smart contract stores content hash + metadata URI
8. Event emitted for indexing
9. Frontend displays success + certificate download

**Smart Contract Interaction:**
```javascript
const tx = await copyrightRegistry.registerCopyright(
    assetType,        // enum: 0-4
    contentHash,      // IPFS CID
    metadataURI,      // IPFS metadata JSON URI
    []                // coCreators (empty for solo work)
);
await tx.wait();
```

---

### Flow 2: Mint NFT from Copyright

```
Creator → Dashboard → Select Registered Work → Choose NFT Type
    → Configure Royalty → Submit Transaction → KaryaNFT.mint()
    → NFT Minted → Optionally List on Marketplace
```

**Steps:**
1. User views their registered copyrights
2. User selects work to mint
3. User chooses: Unique (ERC-721) or Edition (ERC-1155)
4. User sets royalty percentage (5-20%)
5. User signs transaction
6. NFT minted with embedded royalty
7. User optionally lists on marketplace

**Smart Contract Interaction:**
```javascript
const tx = await karyaNFT.mint(
    copyrightId,
    tokenURI,        // IPFS metadata
    royaltyPercentage // in basis points (500 = 5%)
);
await tx.wait();
```

---

### Flow 3: List NFT on Marketplace

```
Creator → NFT Dashboard → Select NFT → Set Price
    → Approve Marketplace → Submit Transaction
    → Marketplace.listNFT() → Listed for Sale
```

**Steps:**
1. User views owned NFTs
2. User clicks "List for Sale"
3. User sets price in ETH
4. User approves marketplace to transfer NFT (if not already)
5. User signs listing transaction
6. NFT listed on marketplace

**Smart Contract Interaction:**
```javascript
// Approve marketplace
await karyaNFT.approve(marketplaceAddress, tokenId);

// List NFT
const tx = await marketplace.listNFT(
    karyaNFTAddress,
    tokenId,
    priceInWei
);
await tx.wait();
```

---

### Flow 4: Purchase NFT

```
Collector → Browse Marketplace → View NFT Details
    → Click Buy → Confirm Transaction → Marketplace.buyNFT()
    → Funds Split (Platform Fee + Royalty + Seller)
    → NFT Transferred to Buyer
```

**Steps:**
1. User browses marketplace
2. User clicks on NFT
3. User views full details (creator, royalty, history)
4. User clicks "Buy Now"
5. User signs transaction with ETH payment
6. Smart contract:
   - Deducts platform fee (2.5%)
   - Deducts creator royalty (5-20%)
   - Sends remaining to seller
   - Transfers NFT to buyer

**Smart Contract Interaction:**
```javascript
const tx = await marketplace.buyNFT(listingId, {
    value: listingPrice
});
await tx.wait();
```

---

### Flow 5: Secondary Sale (Royalty Distribution)

```
Collector → Lists NFT for Resale → New Buyer Purchases
    → Marketplace.buyNFT() → ERC2981 royaltyInfo() Called
    → Original Creator Receives Royalty
    → Previous Owner Receives Proceeds (minus fees/royalty)
```

**Automatic Royalty Flow:**
1. NFT listed for resale by owner
2. Buyer purchases NFT
3. Marketplace contract queries `royaltyInfo(tokenId, salePrice)`
4. Returns original creator address + royalty amount
5. Marketplace automatically sends royalty to creator
6. Remaining goes to seller (minus platform fee)
7. Royalties perpetual across all future sales

---

## Security Architecture

### Security Principles

1. **Defense in Depth**: Multiple layers of security
2. **Least Privilege**: Minimal permissions
3. **Fail Secure**: Safe defaults, explicit allowlists
4. **Audit Trail**: All actions logged via events

### Security Measures

#### 1. Reentrancy Protection
```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract KaryaMarketplace is ReentrancyGuard {
    function buyNFT(uint256 listingId) external payable nonReentrant {
        // Protected from reentrancy attacks
    }
}
```

#### 2. Access Control
```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

contract CopyrightRegistry is Ownable {
    function setVerificationAuthority(address authority) external onlyOwner {
        // Only owner can update
    }
}
```

#### 3. Input Validation
```solidity
function registerCopyright(
    AssetType assetType,
    string memory contentHash,
    string memory metadataURI
) external {
    require(bytes(contentHash).length > 0, "Content hash required");
    require(bytes(metadataURI).length > 0, "Metadata URI required");
    require(!contentHashExists[keccak256(bytes(contentHash))], "Already registered");
    // ...
}
```

#### 4. Safe External Calls
```solidity
// Use low-level call with success check
(bool success, ) = recipient.call{value: amount}("");
require(success, "Transfer failed");
```

#### 5. Integer Overflow Protection
Solidity 0.8+ has built-in overflow checks. For extra safety:
```solidity
require(totalShares <= 10000, "Invalid shares");
```

#### 6. Emergency Pause
```solidity
import "@openzeppelin/contracts/security/Pausable.sol";

contract KaryaMarketplace is Pausable {
    function emergencyPause() external onlyOwner {
        _pause();
    }

    function buyNFT(uint256 listingId) external payable whenNotPaused {
        // Function disabled when paused
    }
}
```

### Security Audit Checklist

- [ ] Reentrancy protection on all value transfers
- [ ] Access control on admin functions
- [ ] Input validation on all external functions
- [ ] Safe external calls (check return values)
- [ ] No integer overflow/underflow risks
- [ ] Proper event emission for all state changes
- [ ] Gas optimization to prevent DoS
- [ ] No delegatecall to untrusted contracts
- [ ] Proper handling of ERC-721/1155 transfers
- [ ] ERC-2981 royalty implementation correct

### Automated Security Tools

1. **Slither**: Static analysis
   ```bash
   slither contracts/
   ```

2. **MythX**: Security scanning
   ```bash
   mythx analyze contracts/CopyrightRegistry.sol
   ```

3. **Hardhat Gas Reporter**: Gas optimization
   ```javascript
   // hardhat.config.js
   gasReporter: {
     enabled: true,
     currency: 'USD'
   }
   ```

---

## Frontend Architecture

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Web3**: wagmi + viem
- **Wallet**: RainbowKit
- **State Management**: React Context + Zustand
- **Forms**: React Hook Form + Zod
- **IPFS**: Pinata SDK

### Directory Structure

```
/frontend
├── /app                    # Next.js 14 App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── /register           # Copyright registration
│   │   └── page.tsx
│   ├── /mint               # Mint NFT
│   │   └── page.tsx
│   ├── /marketplace        # Browse NFTs
│   │   ├── page.tsx
│   │   └── /[id]           # NFT detail page
│   │       └── page.tsx
│   ├── /dashboard          # Creator dashboard
│   │   └── page.tsx
│   └── /profile            # User profile
│       └── /[address]
│           └── page.tsx
├── /components
│   ├── /ui                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Input.tsx
│   ├── /layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── /web3
│   │   ├── WalletButton.tsx
│   │   └── NetworkSwitcher.tsx
│   └── /features
│       ├── CopyrightForm.tsx
│       ├── NFTCard.tsx
│       └── MintForm.tsx
├── /lib
│   ├── /contracts          # Contract ABIs and addresses
│   │   ├── copyrightRegistry.ts
│   │   ├── karyaNFT.ts
│   │   └── marketplace.ts
│   ├── /hooks              # Custom React hooks
│   │   ├── useContract.ts
│   │   ├── useIPFS.ts
│   │   └── useCopyright.ts
│   ├── /utils
│   │   ├── ipfs.ts
│   │   └── formatting.ts
│   └── wagmi.ts            # wagmi configuration
├── /public
│   └── /images
└── /styles
    └── globals.css         # Tailwind imports
```

### Key Frontend Components

#### 1. Wagmi Configuration

```typescript
// lib/wagmi.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Karya Chain',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains: [sepolia],
  ssr: true,
});
```

#### 2. Contract Hook

```typescript
// lib/hooks/useContract.ts
import { useContractWrite, useContractRead } from 'wagmi';
import { copyrightRegistryABI, copyrightRegistryAddress } from '@/lib/contracts';

export function useCopyrightRegistry() {
  const { write: registerCopyright } = useContractWrite({
    address: copyrightRegistryAddress,
    abi: copyrightRegistryABI,
    functionName: 'registerCopyright',
  });

  return { registerCopyright };
}
```

#### 3. IPFS Upload

```typescript
// lib/utils/ipfs.ts
import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: 'your-gateway.mypinata.cloud',
});

export async function uploadToIPFS(file: File) {
  const upload = await pinata.upload.file(file);
  return upload.IpfsHash;
}

export async function uploadMetadata(metadata: object) {
  const upload = await pinata.upload.json(metadata);
  return upload.IpfsHash;
}
```

---

## Storage Strategy

### IPFS Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    IPFS STORAGE                           │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────┐        ┌─────────────────┐         │
│  │  Content Files  │        │  Metadata JSON  │         │
│  │                 │        │                 │         │
│  │  - Images       │        │  {              │         │
│  │  - Audio        │        │    "title": "", │         │
│  │  - Documents    │        │    "desc": "",  │         │
│  │  - Videos       │        │    "image": "", │         │
│  │                 │        │    ...          │         │
│  └─────────────────┘        │  }              │         │
│         │                   └─────────────────┘         │
│         │                            │                   │
│         │                            │                   │
│  ┌──────▼────────────────────────────▼──────┐           │
│  │       Pinata CDN Gateway                 │           │
│  │  https://gateway.pinata.cloud/ipfs/...   │           │
│  └──────────────────────────────────────────┘           │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Data Storage Breakdown

**On-Chain (Sepolia)**:
- Content hash (CID)
- Metadata URI (IPFS link)
- Creator addresses
- Timestamps
- Ownership info
- Royalty percentages
- Marketplace listings

**Off-Chain (IPFS)**:
- Actual content files (images, audio, etc.)
- Metadata JSON
- Creator profile data
- NFT artwork

### Metadata Standard (ERC-721/1155)

```json
{
  "name": "Sunset over Bali",
  "description": "Digital photography captured at Tanah Lot temple",
  "image": "ipfs://QmX...",
  "external_url": "https://karyachain.io/nft/123",
  "attributes": [
    {
      "trait_type": "Asset Type",
      "value": "Photography"
    },
    {
      "trait_type": "Creator",
      "value": "0x123..."
    },
    {
      "trait_type": "Copyright ID",
      "value": "456"
    },
    {
      "trait_type": "Royalty",
      "value": "10%"
    }
  ],
  "properties": {
    "creator": {
      "address": "0x123...",
      "name": "John Doe",
      "verified": true
    },
    "copyright": {
      "id": 456,
      "registered": "2025-10-09T10:00:00Z",
      "contentHash": "QmY..."
    }
  }
}
```

---

## Deployment Architecture

### Smart Contract Deployment Flow

```
1. Local Development (Hardhat Network)
   ├── Write contracts
   ├── Write tests
   └── Local testing

2. Sepolia Testnet Deployment
   ├── Configure hardhat.config.js
   ├── Get Sepolia ETH from faucets
   ├── Deploy contracts via scripts
   ├── Verify on Etherscan
   └── Test on testnet

3. Documentation
   ├── Save contract addresses
   ├── Update frontend config
   └── Document in CLAUDE.md
```

### Deployment Script Example

```javascript
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying to Sepolia...");

  // 1. Deploy CopyrightRegistry
  const CopyrightRegistry = await hre.ethers.getContractFactory("CopyrightRegistry");
  const registry = await CopyrightRegistry.deploy();
  await registry.deployed();
  console.log("CopyrightRegistry deployed to:", registry.address);

  // 2. Deploy KaryaNFT
  const KaryaNFT = await hre.ethers.getContractFactory("KaryaNFT");
  const nft = await KaryaNFT.deploy(
    registry.address,
    platformFeeRecipient
  );
  await nft.deployed();
  console.log("KaryaNFT deployed to:", nft.address);

  // 3. Deploy RoyaltyDistributor
  const RoyaltyDistributor = await hre.ethers.getContractFactory("RoyaltyDistributor");
  const royalty = await RoyaltyDistributor.deploy();
  await royalty.deployed();
  console.log("RoyaltyDistributor deployed to:", royalty.address);

  // 4. Deploy Marketplace
  const Marketplace = await hre.ethers.getContractFactory("KaryaMarketplace");
  const marketplace = await Marketplace.deploy(
    nft.address,
    platformFeeRecipient
  );
  await marketplace.deployed();
  console.log("Marketplace deployed to:", marketplace.address);

  // 5. Verify contracts
  console.log("Verifying contracts on Etherscan...");
  await hre.run("verify:verify", {
    address: registry.address,
    constructorArguments: [],
  });
  // ... verify others

  console.log("Deployment complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Frontend Deployment (Vercel)

```yaml
# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_COPYRIGHT_REGISTRY_ADDRESS": "@copyright-registry-address",
    "NEXT_PUBLIC_KARYA_NFT_ADDRESS": "@karya-nft-address",
    "NEXT_PUBLIC_MARKETPLACE_ADDRESS": "@marketplace-address",
    "NEXT_PUBLIC_PINATA_JWT": "@pinata-jwt",
    "NEXT_PUBLIC_WALLET_CONNECT_ID": "@wallet-connect-id"
  }
}
```

---

## Gas Optimization Strategies

1. **Use events instead of storage for historical data**
2. **Pack struct variables efficiently**
3. **Use mappings instead of arrays when possible**
4. **Batch operations where applicable**
5. **Use unchecked blocks for safe arithmetic**
6. **Optimize loop iterations**
7. **Use immutable for constants**

---

## Testing Strategy

### Unit Tests (Hardhat)

```javascript
describe("CopyrightRegistry", function () {
  it("Should register copyright", async function () {
    const { registry, owner } = await loadFixture(deployFixture);

    const tx = await registry.registerCopyright(
      0, // AssetType.Art
      "QmTest123",
      "ipfs://QmMetadata"
    );

    await expect(tx)
      .to.emit(registry, "CopyrightRegistered")
      .withArgs(1, owner.address, 0, "QmTest123", anyValue);

    const copyright = await registry.copyrights(1);
    expect(copyright.creator).to.equal(owner.address);
  });
});
```

### Integration Tests

- Test full user flows end-to-end
- Register → Mint → List → Purchase
- Verify royalty distribution
- Test collaborative works
- Test edge cases

---

## Monitoring & Analytics

### Event Indexing

Use The Graph or custom backend to index events:
- CopyrightRegistered
- NFTMinted
- Listed
- Sold
- RoyaltyDistributed

### Metrics to Track

- Total copyrights registered
- Total NFTs minted
- Total sales volume
- Average royalty percentage
- Top creators by sales
- Asset type distribution

---

## Conclusion

This architecture provides a solid foundation for Karya Chain, balancing:
- **Security**: Multiple layers, audited patterns
- **Scalability**: Efficient gas usage, off-chain storage
- **User Experience**: Simple flows, automated processes
- **Compliance**: OJK-aligned, transparent operations

The modular design allows for future enhancements while maintaining a clean, maintainable codebase suitable for production deployment.

---

**Document Status**: ✅ Ready for Implementation
**Next Step**: Initialize Hardhat project and begin smart contract development
