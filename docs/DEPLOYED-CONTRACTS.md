# Deployed Contracts - Sepolia Testnet

**Network**: Sepolia Testnet (Chain ID: 11155111)
**Deployment Date**: October 13, 2025
**Deployer Address**: `0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf` ☕

**🌐 LIVE DEMO**: https://karyachain.rectorspace.com/

---

## 📋 Contract Addresses

| Contract | Address | Etherscan |
|----------|---------|-----------|
| **CopyrightRegistry** | `0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f` | [View Code](https://sepolia.etherscan.io/address/0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f#code) |
| **KaryaNFT** | `0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4` | [View Code](https://sepolia.etherscan.io/address/0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4#code) |
| **KaryaMarketplace** | `0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10` | [View Code](https://sepolia.etherscan.io/address/0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10#code) |

---

## ✅ Verification Status

All contracts are **verified** on Etherscan with source code publicly viewable.

- ✅ CopyrightRegistry - Verified
- ✅ KaryaNFT - Verified
- ✅ KaryaMarketplace - Verified

---

## 🔗 Contract Relationships

```
CopyrightRegistry (0xa2e84f3c...)
    ↓ (referenced by)
KaryaNFT (0xE7f3c9Bd...)
    ↓ (listed on)
KaryaMarketplace (0xb2430198...)
```

- **KaryaNFT** references **CopyrightRegistry** at `0xa2e84f3c...`
- **KaryaMarketplace** has platform fee recipient set to deployer: `0xcAfeA0fd...`

---

## 📊 Deployment Summary

### CopyrightRegistry
- **Purpose**: Immutable copyright registration for Indonesian creative works
- **Features**: 5 asset types, content hash verification, duplicate detection
- **Constructor Args**: None
- **Gas Used**: ~2.5M

### KaryaNFT
- **Purpose**: ERC-721 NFTs with ERC-2981 royalty standard
- **Features**: Links to CopyrightRegistry, 5-20% configurable royalties, IPFS metadata
- **Constructor Args**: 
  - `_copyrightRegistry`: `0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f`
- **Gas Used**: ~3M

### KaryaMarketplace  
- **Purpose**: Fixed-price marketplace with automatic royalty distribution
- **Features**: Platform fee 2.5%, perpetual royalties, primary & secondary sales
- **Constructor Args**:
  - `_platformFeeRecipient`: `0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf`
- **Gas Used**: ~2.8M

---

## 🧪 Testing on Sepolia

### Quick Test Flow

1. **Register Copyright** (CopyrightRegistry)
   ```
   registerCopyright(
     "QmTestHash123",
     "QmTestCID456",
     "Test Artwork",
     "A test piece",
     0, // AssetType.Art
     []
   )
   ```

2. **Mint NFT** (KaryaNFT)
   ```
   mintWithDefaultRoyalty(
     1, // copyrightId from step 1
     "ipfs://QmTokenURI..."
   )
   ```

3. **List on Marketplace** (First approve, then list)
   ```
   // On KaryaNFT contract:
   approve(0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10, 1)
   
   // On KaryaMarketplace contract:
   listNFT(
     0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4, // KaryaNFT address
     1, // tokenId
     100000000000000000 // 0.1 ETH in wei
   )
   ```

4. **Purchase NFT**
   ```
   buyNFT(1) // Send 0.1 ETH
   ```

---

## 💰 Economics

### Platform Fees
- **Platform Fee**: 2.5% (250 basis points)
- **Fee Recipient**: `0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf`

### Royalties
- **Range**: 5-20% (500-2000 basis points)
- **Default**: 10% (1000 basis points)
- **Standard**: ERC-2981
- **Enforcement**: Automatic on all marketplace sales

### Example Sale Breakdown (0.1 ETH)
```
Sale Price:      0.1 ETH (100%)
- Platform Fee:  0.0025 ETH (2.5%)
- Royalty:       0.01 ETH (10% default)
= Seller Gets:   0.0875 ETH (87.5%)
```

---

## 🔐 Security

### Audit Status
- ✅ Slither static analysis: 0 critical/high issues
- ✅ Manual security review: PASS
- ✅ Test coverage: 100% statements (90 tests)
- ✅ ReentrancyGuard: Applied on all value transfers
- ✅ Access control: Proper ownership checks

### Security Report
See `docs/SECURITY-AUDIT.md` for comprehensive security analysis.

---

## 🎯 For Hackathon Submission

### Required Information

**Smart Contract Addresses** (Sepolia Testnet):
```
CopyrightRegistry: 0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f
KaryaNFT: 0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4
KaryaMarketplace: 0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10
```

**Verified Source Code**:
- All contracts verified on Etherscan
- Source code publicly viewable
- Constructor arguments verified

**Deployer**:
- Address: `0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf` ☕
- Network: Sepolia Testnet

---

## 📱 Frontend Integration

### Environment Variables

```javascript
// .env.local for Next.js frontend
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
NEXT_PUBLIC_CHAIN_ID=11155111

NEXT_PUBLIC_COPYRIGHT_REGISTRY_ADDRESS=0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f
NEXT_PUBLIC_KARYA_NFT_ADDRESS=0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10
```

### Contract ABIs

ABIs are available in:
```
artifacts/contracts/CopyrightRegistry.sol/CopyrightRegistry.json
artifacts/contracts/KaryaNFT.sol/KaryaNFT.json
artifacts/contracts/KaryaMarketplace.sol/KaryaMarketplace.json
```

---

## 📊 Deployment Metadata

**Deployment File**: `deployments/sepolia-1760344656497.json`

```json
{
  "network": "sepolia",
  "chainId": 11155111,
  "deployer": "0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf",
  "timestamp": "2025-10-13T...",
  "contracts": {
    "CopyrightRegistry": {
      "address": "0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f",
      "constructorArgs": []
    },
    "KaryaNFT": {
      "address": "0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4",
      "constructorArgs": ["0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f"]
    },
    "KaryaMarketplace": {
      "address": "0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10",
      "constructorArgs": ["0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf"]
    }
  }
}
```

---

## ✅ Checklist for Submission

- [x] All contracts deployed to Sepolia
- [x] All contracts verified on Etherscan
- [x] Source code publicly viewable
- [x] Test coverage: 100% (90 tests passing)
- [x] Security audit completed
- [x] Frontend deployed ✅ **https://karyachain.rectorspace.com/** (Oct 18, 2025)
- [ ] Pitch deck completed (Target: Oct 19-21)
- [ ] Full demo video (Target: Oct 21)

---

**Deployment Complete**: ✅
**Frontend Live**: ✅ https://karyachain.rectorspace.com/
**Ready for Hackathon Submission**: Contracts ✅, Frontend ✅, Pitch Deck 🔴
