const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting Karya Chain deployment to Sepolia testnet...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  if (balance === 0n) {
    console.error("❌ ERROR: Account has no ETH. Please get Sepolia ETH from faucets first.");
    console.log("\nFaucet options:");
    console.log("- Google Cloud Web3 Faucet: https://cloud.google.com/application/web3/faucet/ethereum/sepolia");
    console.log("- Chainlink Faucet: https://faucets.chain.link/sepolia");
    console.log("- Alchemy Faucet: https://sepoliafaucet.com/");
    console.log("- QuickNode Faucet: https://faucet.quicknode.com/ethereum/sepolia\n");
    process.exit(1);
  }

  const deploymentData = {
    network: "sepolia",
    chainId: 11155111,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {}
  };

  // ============================================
  // 1. Deploy CopyrightRegistry
  // ============================================
  console.log("📄 Deploying CopyrightRegistry...");
  const CopyrightRegistry = await hre.ethers.getContractFactory("CopyrightRegistry");
  const copyrightRegistry = await CopyrightRegistry.deploy();
  await copyrightRegistry.waitForDeployment();

  const registryAddress = await copyrightRegistry.getAddress();
  console.log("✅ CopyrightRegistry deployed to:", registryAddress);

  deploymentData.contracts.CopyrightRegistry = {
    address: registryAddress,
    constructorArgs: []
  };

  // Wait for a few block confirmations
  console.log("⏳ Waiting for block confirmations...");
  await copyrightRegistry.deploymentTransaction().wait(5);
  console.log("✅ CopyrightRegistry confirmed\n");

  // ============================================
  // 2. Deploy KaryaNFT
  // ============================================
  console.log("🎨 Deploying KaryaNFT...");
  const KaryaNFT = await hre.ethers.getContractFactory("KaryaNFT");
  const karyaNFT = await KaryaNFT.deploy(registryAddress);
  await karyaNFT.waitForDeployment();

  const nftAddress = await karyaNFT.getAddress();
  console.log("✅ KaryaNFT deployed to:", nftAddress);

  deploymentData.contracts.KaryaNFT = {
    address: nftAddress,
    constructorArgs: [registryAddress]
  };

  // Wait for block confirmations
  console.log("⏳ Waiting for block confirmations...");
  await karyaNFT.deploymentTransaction().wait(5);
  console.log("✅ KaryaNFT confirmed\n");

  // ============================================
  // 3. Deploy KaryaMarketplace
  // ============================================
  console.log("🛒 Deploying KaryaMarketplace...");
  const KaryaMarketplace = await hre.ethers.getContractFactory("KaryaMarketplace");
  const marketplace = await KaryaMarketplace.deploy(deployer.address);
  await marketplace.waitForDeployment();

  const marketplaceAddress = await marketplace.getAddress();
  console.log("✅ KaryaMarketplace deployed to:", marketplaceAddress);

  deploymentData.contracts.KaryaMarketplace = {
    address: marketplaceAddress,
    constructorArgs: [deployer.address]
  };

  // Wait for block confirmations
  console.log("⏳ Waiting for block confirmations...");
  await marketplace.deploymentTransaction().wait(5);
  console.log("✅ KaryaMarketplace confirmed\n");

  // ============================================
  // Save deployment data
  // ============================================
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(deploymentsDir, `sepolia-${Date.now()}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentData, null, 2));

  console.log("════════════════════════════════════════════════════════════");
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("════════════════════════════════════════════════════════════\n");

  console.log("📋 Deployed Contracts:");
  console.log("├─ CopyrightRegistry:", registryAddress);
  console.log("├─ KaryaNFT:", nftAddress);
  console.log("└─ KaryaMarketplace:", marketplaceAddress);
  console.log("");

  console.log("📁 Deployment data saved to:", deploymentFile);
  console.log("");

  console.log("🔍 View on Etherscan:");
  console.log(`├─ CopyrightRegistry: https://sepolia.etherscan.io/address/${registryAddress}`);
  console.log(`├─ KaryaNFT: https://sepolia.etherscan.io/address/${nftAddress}`);
  console.log(`└─ KaryaMarketplace: https://sepolia.etherscan.io/address/${marketplaceAddress}`);
  console.log("");

  console.log("🔐 Next Steps:");
  console.log("1. Verify contracts on Etherscan:");
  console.log(`   npx hardhat verify --network sepolia ${registryAddress}`);
  console.log(`   npx hardhat verify --network sepolia ${nftAddress} "${registryAddress}"`);
  console.log(`   npx hardhat verify --network sepolia ${marketplaceAddress} "${deployer.address}"`);
  console.log("");
  console.log("2. Update frontend with contract addresses");
  console.log("3. Test full user flow on testnet");
  console.log("");
  console.log("════════════════════════════════════════════════════════════\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ DEPLOYMENT FAILED:");
    console.error(error);
    process.exit(1);
  });
