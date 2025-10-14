# Sepolia Deployment Guide

**Network**: Sepolia Testnet (Chain ID: 11155111)
**Status**: Ready for deployment
**Contracts**: CopyrightRegistry, KaryaNFT, KaryaMarketplace

---

## Prerequisites

### 1. Wallet Setup (Rabby Wallet)
- Install Rabby Wallet browser extension
- Create or import a wallet
- Switch network to **Sepolia Testnet**
  - Rabby auto-detects networks when you interact with dApps
  - Or manually select Sepolia from network dropdown

### 2. Get Sepolia Test ETH

You need approximately **0.05-0.1 ETH** for deployment and verification.

**Recommended Faucets** (try multiple):

1. **Google Cloud Web3 Faucet** (100 PYUSD + ETH daily)
   - URL: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
   - Amount: ~0.05 ETH
   - Requirements: Google account

2. **Chainlink Faucet** (0.1 ETH per day)
   - URL: https://faucets.chain.link/sepolia
   - Amount: 0.1 ETH
   - Requirements: GitHub/Twitter account

3. **Alchemy Faucet** (0.1 ETH every 72 hours)
   - URL: https://sepoliafaucet.com/
   - Amount: 0.1 ETH
   - Requirements: Alchemy account

4. **QuickNode Faucet** (0.05 ETH every 12 hours)
   - URL: https://faucet.quicknode.com/ethereum/sepolia
   - Amount: 0.05 ETH
   - Requirements: QuickNode account

### 3. Get Etherscan API Key

Required for contract verification:

1. Go to https://etherscan.io/
2. Sign up/login to your account
3. Navigate to https://etherscan.io/myapikey
4. Click "Add" to create a new API key
5. Copy the API key for later use

---

## Environment Setup

### 1. Create .env File

```bash
# Copy the example file
cp .env.example .env
```

### 2. Fill in Environment Variables

Edit `.env` with your values:

```bash
# Your MetaMask wallet private key
PRIVATE_KEY=0x1234...your_private_key

# Sepolia RPC URL (default works fine)
SEPOLIA_RPC_URL=https://rpc.sepolia.dev

# Your Etherscan API key
ETHERSCAN_API_KEY=ABC123...your_api_key
```

**⚠️ SECURITY WARNING:**
- NEVER commit `.env` to git (already in .gitignore)
- NEVER share your private key
- Use a testnet-only wallet if possible

### 3. Get Your Private Key from Rabby Wallet

1. Open Rabby Wallet
2. Click on the account card at the top
3. Click the three dots (...) next to your address
4. Select "Export Private Key" or "Show Private Key"
5. Enter password/authenticate and copy the key
6. Paste into `.env` file as `PRIVATE_KEY=0x...`

---

## Deployment Steps

### 1. Verify Configuration

```bash
# Check Hardhat config
cat hardhat.config.js

# Check you have test ETH
npx hardhat console --network sepolia
# In console:
const [deployer] = await ethers.getSigners();
await ethers.provider.getBalance(deployer.address);
# Should show > 0
```

### 2. Run Deployment

```bash
# Deploy all contracts to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

**Expected Output:**
```
🚀 Starting Karya Chain deployment to Sepolia testnet...

📝 Deploying contracts with account: 0x1234...
💰 Account balance: 0.1 ETH

📄 Deploying CopyrightRegistry...
✅ CopyrightRegistry deployed to: 0xABC...
⏳ Waiting for block confirmations...
✅ CopyrightRegistry confirmed

🎨 Deploying KaryaNFT...
✅ KaryaNFT deployed to: 0xDEF...
⏳ Waiting for block confirmations...
✅ KaryaNFT confirmed

🛒 Deploying KaryaMarketplace...
✅ KaryaMarketplace deployed to: 0xGHI...
⏳ Waiting for block confirmations...
✅ KaryaMarketplace confirmed

════════════════════════════════════════════════════════════
🎉 DEPLOYMENT COMPLETE!
════════════════════════════════════════════════════════════

📋 Deployed Contracts:
├─ CopyrightRegistry: 0xABC...
├─ KaryaNFT: 0xDEF...
└─ KaryaMarketplace: 0xGHI...
```

**Deployment will take approximately 5-10 minutes** (includes waiting for block confirmations).

### 3. Verify Contracts on Etherscan

After deployment, verify each contract:

```bash
# 1. Verify CopyrightRegistry (no constructor args)
npx hardhat verify --network sepolia <REGISTRY_ADDRESS>

# 2. Verify KaryaNFT (with registry address)
npx hardhat verify --network sepolia <NFT_ADDRESS> "<REGISTRY_ADDRESS>"

# 3. Verify KaryaMarketplace (with platform fee recipient)
npx hardhat verify --network sepolia <MARKETPLACE_ADDRESS> "<YOUR_WALLET_ADDRESS>"
```

**Note**: Replace `<ADDRESS>` with actual deployed contract addresses from deployment output.

**Expected Output for Each:**
```
Successfully submitted source code for contract
contracts/CopyrightRegistry.sol:CopyrightRegistry at 0xABC...
for verification on the block explorer. Waiting for verification result...

Successfully verified contract CopyrightRegistry on Etherscan.
https://sepolia.etherscan.io/address/0xABC...#code
```

---

## Testing on Testnet

### 1. Manual Testing via Etherscan

Visit each contract on Etherscan:

**CopyrightRegistry**: https://sepolia.etherscan.io/address/YOUR_ADDRESS
1. Go to "Write Contract" tab
2. Click "Connect to Web3"
3. Test `registerCopyright()`:
   - contentHash: "QmTest123..."
   - ipfsCID: "QmTest456..."
   - title: "Test Artwork"
   - description: "A test artwork for verification"
   - assetType: 0 (Art)
   - tags: [] (empty array)
4. Confirm transaction in MetaMask
5. Check "Read Contract" → `getRegistration(1)` to verify

**KaryaNFT**: https://sepolia.etherscan.io/address/YOUR_ADDRESS
1. Go to "Write Contract" tab
2. Test `mintWithDefaultRoyalty()`:
   - copyrightId: 1 (from step above)
   - tokenURI: "ipfs://QmTest789..."
3. Confirm transaction
4. Check "Read Contract" → `tokenToCopyright(1)` to verify link

**KaryaMarketplace**: https://sepolia.etherscan.io/address/YOUR_ADDRESS
1. First approve NFT: Go to KaryaNFT → `approve(marketplaceAddress, 1)`
2. Go to Marketplace "Write Contract"
3. Test `listNFT()`:
   - nftContract: YOUR_NFT_ADDRESS
   - tokenId: 1
   - price: 100000000000000000 (0.1 ETH in wei)
4. Check `getListing(1)` to verify listing

### 2. Integration Test Script

Create a test script for full user flow:

```javascript
// scripts/test-sepolia.js
const hre = require("hardhat");

async function main() {
  const [creator, buyer] = await hre.ethers.getSigners();
  
  // Load deployed contracts
  const registry = await hre.ethers.getContractAt("CopyrightRegistry", "0xREGISTRY_ADDRESS");
  const nft = await hre.ethers.getContractAt("KaryaNFT", "0xNFT_ADDRESS");
  const marketplace = await hre.ethers.getContractAt("KaryaMarketplace", "0xMARKETPLACE_ADDRESS");

  console.log("Testing full user flow on Sepolia...\n");

  // 1. Register copyright
  console.log("1. Registering copyright...");
  const tx1 = await registry.registerCopyright(
    "QmTestHash123",
    "QmTestCID456",
    "Test Artwork",
    "A beautiful test piece",
    0, // Art
    []
  );
  await tx1.wait();
  console.log("✅ Copyright registered\n");

  // 2. Mint NFT
  console.log("2. Minting NFT...");
  const tx2 = await nft.mintWithDefaultRoyalty(1, "ipfs://QmTokenURI");
  await tx2.wait();
  console.log("✅ NFT minted\n");

  // 3. Approve and list
  console.log("3. Listing NFT...");
  const tx3 = await nft.approve(await marketplace.getAddress(), 1);
  await tx3.wait();
  
  const tx4 = await marketplace.listNFT(
    await nft.getAddress(),
    1,
    hre.ethers.parseEther("0.01")
  );
  await tx4.wait();
  console.log("✅ NFT listed\n");

  console.log("🎉 Full flow tested successfully!");
}

main().catch(console.error);
```

Run with:
```bash
npx hardhat run scripts/test-sepolia.js --network sepolia
```

---

## Troubleshooting

### Issue: "Insufficient funds"
**Solution**: Get more Sepolia ETH from faucets. You need at least 0.05 ETH.

### Issue: "Transaction underpriced"
**Solution**: Gas price too low. Increase in hardhat.config.js:
```javascript
gasPrice: 2000000000, // 2 gwei instead of 1
```

### Issue: "Contract verification failed"
**Solutions**:
1. Wait 1-2 minutes after deployment before verifying
2. Ensure constructor arguments are correct and properly formatted
3. Check Etherscan API key is valid
4. Try manual verification on Etherscan website

### Issue: "Network error / RPC not responding"
**Solution**: Try alternative RPC URLs:
- https://rpc.sepolia.org/
- https://rpc2.sepolia.org/
- Get dedicated RPC from Alchemy or Infura

---

## Post-Deployment Checklist

- [ ] All 3 contracts deployed successfully
- [ ] All contracts verified on Etherscan
- [ ] Contract addresses saved in `deployments/` folder
- [ ] Test transactions completed for each contract
- [ ] Full integration flow tested (register → mint → list → buy)
- [ ] Contract addresses documented in README
- [ ] Etherscan links ready for pitch deck
- [ ] Frontend updated with contract addresses (if applicable)

---

## Deployment Data

After deployment, you'll find a JSON file in `deployments/sepolia-TIMESTAMP.json`:

```json
{
  "network": "sepolia",
  "chainId": 11155111,
  "deployer": "0x1234...",
  "timestamp": "2025-10-13T...",
  "contracts": {
    "CopyrightRegistry": {
      "address": "0xABC...",
      "constructorArgs": []
    },
    "KaryaNFT": {
      "address": "0xDEF...",
      "constructorArgs": ["0xABC..."]
    },
    "KaryaMarketplace": {
      "address": "0xGHI...",
      "constructorArgs": ["0x1234..."]
    }
  }
}
```

**Keep this file safe** - you'll need it for frontend integration and hackathon submission.

---

## Gas Costs Estimate

Based on our testing:

| Action | Estimated Gas | Cost (@ 1 gwei) |
|--------|---------------|-----------------|
| Deploy CopyrightRegistry | ~2,500,000 | 0.0025 ETH |
| Deploy KaryaNFT | ~3,000,000 | 0.003 ETH |
| Deploy KaryaMarketplace | ~2,800,000 | 0.0028 ETH |
| Verify 3 contracts | Minimal | ~0.0001 ETH |
| **TOTAL** | **~8,300,000** | **~0.0083 ETH** |

Add buffer for testing: **Total needed ~0.05 ETH**

---

## Support

If you encounter issues:

1. Check Sepolia network status: https://sepolia.etherscan.io/
2. Verify your environment variables are correct
3. Ensure you have sufficient test ETH
4. Check Hardhat documentation: https://hardhat.org/docs
5. Review error messages carefully - they usually indicate the issue

---

**Ready to deploy?** Follow the steps above and let's get Karya Chain on Sepolia! 🚀
