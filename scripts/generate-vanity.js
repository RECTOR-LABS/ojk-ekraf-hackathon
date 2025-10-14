const { ethers } = require("ethers");

/**
 * Generate a vanity Ethereum address
 * @param {string} prefix - The desired prefix (without 0x)
 * @param {boolean} caseSensitive - Whether to match case-sensitive
 */
async function generateVanityAddress(prefix, caseSensitive = false) {
  console.log(`🔍 Searching for address starting with: 0x${prefix}`);
  console.log(`⏳ This may take a few minutes...\n`);

  const targetPrefix = caseSensitive ? prefix : prefix.toLowerCase();
  let attempts = 0;
  const startTime = Date.now();

  while (true) {
    attempts++;

    // Generate random wallet
    const wallet = ethers.Wallet.createRandom();
    const address = wallet.address;
    const addressToCheck = caseSensitive ? address : address.toLowerCase();

    // Check if address starts with desired prefix (after 0x)
    if (addressToCheck.slice(2).startsWith(targetPrefix)) {
      const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log("════════════════════════════════════════════════════════════");
      console.log("🎉 VANITY ADDRESS FOUND!");
      console.log("════════════════════════════════════════════════════════════\n");

      console.log("📍 Address:", address);
      console.log("🔑 Private Key:", wallet.privateKey);
      console.log("\n📊 Stats:");
      console.log(`   - Attempts: ${attempts.toLocaleString()}`);
      console.log(`   - Time: ${elapsedTime} seconds`);
      console.log(`   - Speed: ${(attempts / elapsedTime).toFixed(0)} addresses/sec`);

      console.log("\n⚠️  SECURITY WARNINGS:");
      console.log("   - Save this private key securely!");
      console.log("   - Never share your private key with anyone");
      console.log("   - Add it to your .env file as PRIVATE_KEY");

      console.log("\n📝 Next Steps:");
      console.log("   1. Copy the private key above");
      console.log("   2. Get test ETH for this address:");
      console.log(`      https://cloud.google.com/application/web3/faucet/ethereum/sepolia`);
      console.log("   3. Paste address when requesting: " + address);
      console.log("   4. Update your .env file with the private key");
      console.log("   5. Deploy with: npx hardhat run scripts/deploy.js --network sepolia");

      console.log("\n════════════════════════════════════════════════════════════\n");

      return {
        address: address,
        privateKey: wallet.privateKey,
        attempts: attempts,
        timeSeconds: elapsedTime
      };
    }

    // Progress update every 10000 attempts
    if (attempts % 10000 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const speed = (attempts / elapsed).toFixed(0);
      process.stdout.write(`\r⏳ Attempts: ${attempts.toLocaleString()} | Time: ${elapsed}s | Speed: ${speed} addr/s`);
    }
  }
}

// Main execution
const prefix = process.argv[2] || "cafe";

console.log("════════════════════════════════════════════════════════════");
console.log("☕ Karya Chain Vanity Address Generator");
console.log("════════════════════════════════════════════════════════════\n");

generateVanityAddress(prefix, false)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
