const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("KaryaMarketplace", function () {
  // Test data constants
  const SAMPLE_CONTENT_HASH = ethers.keccak256(ethers.toUtf8Bytes("Sample creative work"));
  const SAMPLE_IPFS_CID = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
  const SAMPLE_TOKEN_URI = `ipfs://${SAMPLE_IPFS_CID}`;
  const DEFAULT_ROYALTY_BPS = 1000; // 10%
  const PLATFORM_FEE_BPS = 250; // 2.5%
  const LISTING_PRICE = ethers.parseEther("1"); // 1 ETH

  // Fixture for deploying all contracts
  async function deployContractsFixture() {
    const [owner, platformFeeRecipient, creator, buyer, other] = await ethers.getSigners();

    // Deploy CopyrightRegistry
    const CopyrightRegistry = await ethers.getContractFactory("CopyrightRegistry");
    const registry = await CopyrightRegistry.deploy();
    await registry.waitForDeployment();

    // Deploy KaryaNFT
    const KaryaNFT = await ethers.getContractFactory("KaryaNFT");
    const nft = await KaryaNFT.deploy(await registry.getAddress());
    await nft.waitForDeployment();

    // Deploy KaryaMarketplace
    const KaryaMarketplace = await ethers.getContractFactory("KaryaMarketplace");
    const marketplace = await KaryaMarketplace.deploy(platformFeeRecipient.address);
    await marketplace.waitForDeployment();

    return { registry, nft, marketplace, owner, platformFeeRecipient, creator, buyer, other };
  }

  // Fixture with minted NFT ready to list
  async function deployWithMintedNFTFixture() {
    const contracts = await deployContractsFixture();
    const { registry, nft, creator } = contracts;

    // Register copyright
    const tx = await registry.connect(creator).registerCopyright(
      SAMPLE_CONTENT_HASH,
      SAMPLE_IPFS_CID,
      "Test Artwork",
      "A beautiful test artwork",
      0, // AssetType.Art
      []
    );
    const receipt = await tx.wait();
    const copyrightId = receipt.logs[0].args.id;

    // Mint NFT
    await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);
    const tokenId = 1;

    return { ...contracts, copyrightId, tokenId };
  }

  // Fixture with listed NFT
  async function deployWithListedNFTFixture() {
    const contracts = await deployWithMintedNFTFixture();
    const { nft, marketplace, creator, tokenId } = contracts;

    // Approve marketplace to transfer NFT
    await nft.connect(creator).approve(await marketplace.getAddress(), tokenId);

    // List NFT
    await marketplace.connect(creator).listNFT(
      await nft.getAddress(),
      tokenId,
      LISTING_PRICE
    );
    const listingId = 1;

    return { ...contracts, listingId };
  }

  describe("Deployment", function () {
    it("Should deploy with correct platform fee recipient", async function () {
      const { marketplace, platformFeeRecipient } = await loadFixture(deployContractsFixture);

      expect(await marketplace.platformFeeRecipient()).to.equal(platformFeeRecipient.address);
    });

    it("Should deploy with correct platform fee (2.5%)", async function () {
      const { marketplace } = await loadFixture(deployContractsFixture);

      expect(await marketplace.PLATFORM_FEE_BPS()).to.equal(250);
    });

    it("Should revert if deployed with zero address fee recipient", async function () {
      const KaryaMarketplace = await ethers.getContractFactory("KaryaMarketplace");

      await expect(
        KaryaMarketplace.deploy(ethers.ZeroAddress)
      ).to.be.revertedWithCustomError(KaryaMarketplace, "InvalidFeeRecipient");
    });

    it("Should initialize with listing ID starting from 1", async function () {
      const { marketplace } = await loadFixture(deployContractsFixture);

      expect(await marketplace.getTotalListings()).to.equal(0);
    });

    it("Should reject direct ETH transfers", async function () {
      const { marketplace, buyer } = await loadFixture(deployContractsFixture);

      await expect(
        buyer.sendTransaction({
          to: await marketplace.getAddress(),
          value: ethers.parseEther("1")
        })
      ).to.be.revertedWith("Direct transfers not allowed");
    });
  });

  describe("Listing NFTs", function () {
    describe("Basic Listing", function () {
      it("Should list NFT successfully", async function () {
        const { nft, marketplace, creator, tokenId } = await loadFixture(deployWithMintedNFTFixture);

        // Approve marketplace
        await nft.connect(creator).approve(await marketplace.getAddress(), tokenId);

        const tx = await marketplace.connect(creator).listNFT(
          await nft.getAddress(),
          tokenId,
          LISTING_PRICE
        );
        const receipt = await tx.wait();

        // Check event emission
        const event = receipt.logs.find(
          log => log.fragment && log.fragment.name === 'NFTListed'
        );
        expect(event).to.not.be.undefined;
        expect(event.args.listingId).to.equal(1);
        expect(event.args.nftContract).to.equal(await nft.getAddress());
        expect(event.args.tokenId).to.equal(tokenId);
        expect(event.args.seller).to.equal(creator.address);
        expect(event.args.price).to.equal(LISTING_PRICE);

        // Check listing details
        const listing = await marketplace.getListing(1);
        expect(listing.listingId).to.equal(1);
        expect(listing.nftContract).to.equal(await nft.getAddress());
        expect(listing.tokenId).to.equal(tokenId);
        expect(listing.seller).to.equal(creator.address);
        expect(listing.price).to.equal(LISTING_PRICE);
        expect(listing.active).to.be.true;

        // Check total listings
        expect(await marketplace.getTotalListings()).to.equal(1);
      });

      it("Should track listing by NFT", async function () {
        const { nft, marketplace, creator, tokenId } = await loadFixture(deployWithMintedNFTFixture);

        await nft.connect(creator).approve(await marketplace.getAddress(), tokenId);
        await marketplace.connect(creator).listNFT(await nft.getAddress(), tokenId, LISTING_PRICE);

        expect(await marketplace.getListingByNFT(await nft.getAddress(), tokenId)).to.equal(1);
        expect(await marketplace.isNFTListed(await nft.getAddress(), tokenId)).to.be.true;
      });

      it("Should increment listing ID for each listing", async function () {
        const { registry, nft, marketplace, creator } = await loadFixture(deployContractsFixture);

        // Register and mint two NFTs
        for (let i = 1; i <= 2; i++) {
          const hash = ethers.keccak256(ethers.toUtf8Bytes(`Work ${i}`));
          const tx = await registry.connect(creator).registerCopyright(
            hash,
            `CID${i}`,
            `Work ${i}`,
            `Description ${i}`,
            0,
            []
          );
          const receipt = await tx.wait();
          const copyrightId = receipt.logs[0].args.id;

          await nft.connect(creator).mint(copyrightId, `ipfs://token${i}`, DEFAULT_ROYALTY_BPS);
          await nft.connect(creator).approve(await marketplace.getAddress(), i);
          await marketplace.connect(creator).listNFT(await nft.getAddress(), i, LISTING_PRICE);
        }

        expect(await marketplace.getTotalListings()).to.equal(2);
      });
    });

    describe("Access Control", function () {
      it("Should revert if non-owner tries to list", async function () {
        const { nft, marketplace, other, tokenId } = await loadFixture(deployWithMintedNFTFixture);

        await expect(
          marketplace.connect(other).listNFT(await nft.getAddress(), tokenId, LISTING_PRICE)
        ).to.be.revertedWithCustomError(marketplace, "NotNFTOwner");
      });

      it("Should revert if NFT not approved", async function () {
        const { nft, marketplace, creator, tokenId } = await loadFixture(deployWithMintedNFTFixture);

        // Don't approve marketplace
        await expect(
          marketplace.connect(creator).listNFT(await nft.getAddress(), tokenId, LISTING_PRICE)
        ).to.be.revertedWithCustomError(marketplace, "NotApproved");
      });
    });

    describe("Validation", function () {
      it("Should revert if price is zero", async function () {
        const { nft, marketplace, creator, tokenId } = await loadFixture(deployWithMintedNFTFixture);

        await nft.connect(creator).approve(await marketplace.getAddress(), tokenId);

        await expect(
          marketplace.connect(creator).listNFT(await nft.getAddress(), tokenId, 0)
        ).to.be.revertedWithCustomError(marketplace, "InvalidPrice");
      });

      it("Should revert if NFT already listed", async function () {
        const { nft, marketplace, creator, tokenId } = await loadFixture(deployWithMintedNFTFixture);

        await nft.connect(creator).approve(await marketplace.getAddress(), tokenId);
        await marketplace.connect(creator).listNFT(await nft.getAddress(), tokenId, LISTING_PRICE);

        // Try to list again
        await expect(
          marketplace.connect(creator).listNFT(await nft.getAddress(), tokenId, LISTING_PRICE)
        ).to.be.revertedWithCustomError(marketplace, "NFTAlreadyListed")
          .withArgs(1);
      });
    });
  });

  describe("Buying NFTs", function () {
    describe("Basic Purchase", function () {
      it("Should purchase NFT successfully", async function () {
        const { nft, marketplace, creator, buyer, tokenId, listingId } =
          await loadFixture(deployWithListedNFTFixture);

        const tx = await marketplace.connect(buyer).buyNFT(listingId, { value: LISTING_PRICE });
        const receipt = await tx.wait();

        // Check event emission
        const event = receipt.logs.find(
          log => log.fragment && log.fragment.name === 'NFTSold'
        );
        expect(event).to.not.be.undefined;
        expect(event.args.listingId).to.equal(listingId);
        expect(event.args.seller).to.equal(creator.address);
        expect(event.args.buyer).to.equal(buyer.address);
        expect(event.args.price).to.equal(LISTING_PRICE);

        // Verify NFT transferred to buyer
        expect(await nft.ownerOf(tokenId)).to.equal(buyer.address);

        // Verify listing marked as inactive
        const listing = await marketplace.getListing(listingId);
        expect(listing.active).to.be.false;

        // Verify NFT no longer listed
        expect(await marketplace.isNFTListed(await nft.getAddress(), tokenId)).to.be.false;
      });

      it("Should distribute payments correctly with royalties", async function () {
        const { nft, marketplace, platformFeeRecipient, creator, buyer, tokenId, listingId } =
          await loadFixture(deployWithListedNFTFixture);

        const initialCreatorBalance = await ethers.provider.getBalance(creator.address);
        const initialPlatformBalance = await ethers.provider.getBalance(platformFeeRecipient.address);

        await marketplace.connect(buyer).buyNFT(listingId, { value: LISTING_PRICE });

        // Calculate expected amounts
        const platformFee = (LISTING_PRICE * BigInt(PLATFORM_FEE_BPS)) / BigInt(10000); // 2.5%
        const royaltyAmount = (LISTING_PRICE * BigInt(DEFAULT_ROYALTY_BPS)) / BigInt(10000); // 10%
        const sellerProceeds = LISTING_PRICE - platformFee - royaltyAmount;

        // Verify balances
        const finalCreatorBalance = await ethers.provider.getBalance(creator.address);
        const finalPlatformBalance = await ethers.provider.getBalance(platformFeeRecipient.address);

        // Creator receives seller proceeds + royalty (since creator is also royalty receiver)
        expect(finalCreatorBalance - initialCreatorBalance).to.equal(sellerProceeds + royaltyAmount);
        expect(finalPlatformBalance - initialPlatformBalance).to.equal(platformFee);
      });

      it("Should refund excess payment", async function () {
        const { marketplace, buyer, listingId } = await loadFixture(deployWithListedNFTFixture);

        const overpayment = LISTING_PRICE + ethers.parseEther("0.5");
        const initialBuyerBalance = await ethers.provider.getBalance(buyer.address);

        const tx = await marketplace.connect(buyer).buyNFT(listingId, { value: overpayment });
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        const finalBuyerBalance = await ethers.provider.getBalance(buyer.address);

        // Buyer should only pay listing price + gas
        expect(initialBuyerBalance - finalBuyerBalance).to.be.closeTo(
          LISTING_PRICE + gasUsed,
          ethers.parseEther("0.001") // Small margin for gas estimation variance
        );
      });
    });

    describe("Secondary Sales (Resales)", function () {
      it("Should enforce royalties on secondary sale", async function () {
        const { nft, marketplace, platformFeeRecipient, creator, buyer, other, tokenId } =
          await loadFixture(deployWithListedNFTFixture);

        // First sale (primary)
        await marketplace.connect(buyer).buyNFT(1, { value: LISTING_PRICE });

        // Buyer lists for resale
        await nft.connect(buyer).approve(await marketplace.getAddress(), tokenId);
        await marketplace.connect(buyer).listNFT(
          await nft.getAddress(),
          tokenId,
          LISTING_PRICE
        );

        const initialCreatorBalance = await ethers.provider.getBalance(creator.address);
        const initialBuyerBalance = await ethers.provider.getBalance(buyer.address);
        const initialPlatformBalance = await ethers.provider.getBalance(platformFeeRecipient.address);

        // Second sale (secondary) - other buys from buyer
        await marketplace.connect(other).buyNFT(2, { value: LISTING_PRICE });

        // Calculate expected amounts
        const platformFee = (LISTING_PRICE * BigInt(PLATFORM_FEE_BPS)) / BigInt(10000);
        const royaltyAmount = (LISTING_PRICE * BigInt(DEFAULT_ROYALTY_BPS)) / BigInt(10000);
        const sellerProceeds = LISTING_PRICE - platformFee - royaltyAmount;

        // Verify payments
        const finalCreatorBalance = await ethers.provider.getBalance(creator.address);
        const finalBuyerBalance = await ethers.provider.getBalance(buyer.address);
        const finalPlatformBalance = await ethers.provider.getBalance(platformFeeRecipient.address);

        // Creator gets royalty on secondary sale
        expect(finalCreatorBalance - initialCreatorBalance).to.equal(royaltyAmount);
        // Seller (previous buyer) gets proceeds
        expect(finalBuyerBalance - initialBuyerBalance).to.equal(sellerProceeds);
        // Platform gets fee
        expect(finalPlatformBalance - initialPlatformBalance).to.equal(platformFee);

        // Verify NFT ownership transferred
        expect(await nft.ownerOf(tokenId)).to.equal(other.address);
      });
    });

    describe("Validation", function () {
      it("Should revert if listing does not exist", async function () {
        const { marketplace, buyer } = await loadFixture(deployContractsFixture);

        await expect(
          marketplace.connect(buyer).buyNFT(999, { value: LISTING_PRICE })
        ).to.be.revertedWithCustomError(marketplace, "ListingNotFound")
          .withArgs(999);
      });

      it("Should revert if listing is not active", async function () {
        const { marketplace, buyer, listingId } = await loadFixture(deployWithListedNFTFixture);

        // Buy once
        await marketplace.connect(buyer).buyNFT(listingId, { value: LISTING_PRICE });

        // Try to buy again
        await expect(
          marketplace.connect(buyer).buyNFT(listingId, { value: LISTING_PRICE })
        ).to.be.revertedWithCustomError(marketplace, "ListingNotActive")
          .withArgs(listingId);
      });

      it("Should revert if payment is insufficient", async function () {
        const { marketplace, buyer, listingId } = await loadFixture(deployWithListedNFTFixture);

        const insufficientPayment = LISTING_PRICE - ethers.parseEther("0.1");

        await expect(
          marketplace.connect(buyer).buyNFT(listingId, { value: insufficientPayment })
        ).to.be.revertedWithCustomError(marketplace, "InsufficientPayment")
          .withArgs(LISTING_PRICE, insufficientPayment);
      });
    });
  });

  describe("Cancelling Listings", function () {
    it("Should cancel listing successfully", async function () {
      const { nft, marketplace, creator, tokenId, listingId } =
        await loadFixture(deployWithListedNFTFixture);

      const tx = await marketplace.connect(creator).cancelListing(listingId);
      const receipt = await tx.wait();

      // Check event emission
      const event = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'ListingCancelled'
      );
      expect(event).to.not.be.undefined;
      expect(event.args.listingId).to.equal(listingId);
      expect(event.args.nftContract).to.equal(await nft.getAddress());
      expect(event.args.tokenId).to.equal(tokenId);

      // Verify listing marked as inactive
      const listing = await marketplace.getListing(listingId);
      expect(listing.active).to.be.false;

      // Verify NFT no longer listed
      expect(await marketplace.isNFTListed(await nft.getAddress(), tokenId)).to.be.false;

      // Creator still owns NFT
      expect(await nft.ownerOf(tokenId)).to.equal(creator.address);
    });

    it("Should revert if non-seller tries to cancel", async function () {
      const { marketplace, other, listingId } = await loadFixture(deployWithListedNFTFixture);

      await expect(
        marketplace.connect(other).cancelListing(listingId)
      ).to.be.revertedWithCustomError(marketplace, "NotSeller");
    });

    it("Should revert if listing does not exist", async function () {
      const { marketplace, creator } = await loadFixture(deployContractsFixture);

      await expect(
        marketplace.connect(creator).cancelListing(999)
      ).to.be.revertedWithCustomError(marketplace, "ListingNotFound")
        .withArgs(999);
    });

    it("Should revert if listing already inactive", async function () {
      const { marketplace, creator, listingId } = await loadFixture(deployWithListedNFTFixture);

      // Cancel once
      await marketplace.connect(creator).cancelListing(listingId);

      // Try to cancel again
      await expect(
        marketplace.connect(creator).cancelListing(listingId)
      ).to.be.revertedWithCustomError(marketplace, "ListingNotActive")
        .withArgs(listingId);
    });
  });

  describe("Updating Listing Price", function () {
    it("Should update listing price successfully", async function () {
      const { marketplace, creator, listingId } = await loadFixture(deployWithListedNFTFixture);

      const newPrice = ethers.parseEther("2");
      const tx = await marketplace.connect(creator).updateListingPrice(listingId, newPrice);
      const receipt = await tx.wait();

      // Check event emission
      const event = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'ListingUpdated'
      );
      expect(event).to.not.be.undefined;
      expect(event.args.listingId).to.equal(listingId);
      expect(event.args.oldPrice).to.equal(LISTING_PRICE);
      expect(event.args.newPrice).to.equal(newPrice);

      // Verify price updated
      const listing = await marketplace.getListing(listingId);
      expect(listing.price).to.equal(newPrice);
    });

    it("Should revert if non-seller tries to update price", async function () {
      const { marketplace, other, listingId } = await loadFixture(deployWithListedNFTFixture);

      await expect(
        marketplace.connect(other).updateListingPrice(listingId, ethers.parseEther("2"))
      ).to.be.revertedWithCustomError(marketplace, "NotSeller");
    });

    it("Should revert if new price is zero", async function () {
      const { marketplace, creator, listingId } = await loadFixture(deployWithListedNFTFixture);

      await expect(
        marketplace.connect(creator).updateListingPrice(listingId, 0)
      ).to.be.revertedWithCustomError(marketplace, "InvalidPrice");
    });

    it("Should revert if listing does not exist", async function () {
      const { marketplace, creator } = await loadFixture(deployContractsFixture);

      await expect(
        marketplace.connect(creator).updateListingPrice(999, ethers.parseEther("2"))
      ).to.be.revertedWithCustomError(marketplace, "ListingNotFound")
        .withArgs(999);
    });

    it("Should revert if listing is not active", async function () {
      const { marketplace, creator, listingId } = await loadFixture(deployWithListedNFTFixture);

      // Cancel listing
      await marketplace.connect(creator).cancelListing(listingId);

      // Try to update price
      await expect(
        marketplace.connect(creator).updateListingPrice(listingId, ethers.parseEther("2"))
      ).to.be.revertedWithCustomError(marketplace, "ListingNotActive")
        .withArgs(listingId);
    });
  });

  describe("View Functions", function () {
    it("Should return correct listing details", async function () {
      const { nft, marketplace, creator, tokenId, listingId } =
        await loadFixture(deployWithListedNFTFixture);

      const listing = await marketplace.getListing(listingId);

      expect(listing.listingId).to.equal(listingId);
      expect(listing.nftContract).to.equal(await nft.getAddress());
      expect(listing.tokenId).to.equal(tokenId);
      expect(listing.seller).to.equal(creator.address);
      expect(listing.price).to.equal(LISTING_PRICE);
      expect(listing.active).to.be.true;
    });

    it("Should return correct listing by NFT", async function () {
      const { nft, marketplace, tokenId, listingId } =
        await loadFixture(deployWithListedNFTFixture);

      expect(await marketplace.getListingByNFT(await nft.getAddress(), tokenId))
        .to.equal(listingId);
    });

    it("Should return 0 for unlisted NFT", async function () {
      const { nft, marketplace } = await loadFixture(deployWithMintedNFTFixture);

      expect(await marketplace.getListingByNFT(await nft.getAddress(), 1)).to.equal(0);
      expect(await marketplace.isNFTListed(await nft.getAddress(), 1)).to.be.false;
    });

    it("Should return correct total listings", async function () {
      const { marketplace } = await loadFixture(deployWithListedNFTFixture);

      expect(await marketplace.getTotalListings()).to.equal(1);
    });

    it("Should return all listing IDs", async function () {
      const { marketplace } = await loadFixture(deployWithListedNFTFixture);

      const allListings = await marketplace.getAllListingIds();
      expect(allListings.length).to.equal(1);
      expect(allListings[0]).to.equal(1);
    });

    it("Should revert getListing for non-existent listing", async function () {
      const { marketplace } = await loadFixture(deployContractsFixture);

      await expect(
        marketplace.getListing(999)
      ).to.be.revertedWithCustomError(marketplace, "ListingNotFound")
        .withArgs(999);
    });
  });

  describe("Admin Functions", function () {
    it("Should update platform fee recipient", async function () {
      const { marketplace, owner, other } = await loadFixture(deployContractsFixture);

      const tx = await marketplace.connect(owner).updatePlatformFeeRecipient(other.address);
      const receipt = await tx.wait();

      // Check event emission
      const event = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'PlatformFeeRecipientUpdated'
      );
      expect(event).to.not.be.undefined;

      // Verify updated
      expect(await marketplace.platformFeeRecipient()).to.equal(other.address);
    });

    it("Should revert if non-owner tries to update fee recipient", async function () {
      const { marketplace, other } = await loadFixture(deployContractsFixture);

      await expect(
        marketplace.connect(other).updatePlatformFeeRecipient(other.address)
      ).to.be.revertedWithCustomError(marketplace, "OwnableUnauthorizedAccount");
    });

    it("Should revert if updating to zero address", async function () {
      const { marketplace, owner } = await loadFixture(deployContractsFixture);

      await expect(
        marketplace.connect(owner).updatePlatformFeeRecipient(ethers.ZeroAddress)
      ).to.be.revertedWithCustomError(marketplace, "InvalidFeeRecipient");
    });
  });

  describe("Gas Optimization", function () {
    it("Should list with reasonable gas cost", async function () {
      const { nft, marketplace, creator, tokenId } = await loadFixture(deployWithMintedNFTFixture);

      await nft.connect(creator).approve(await marketplace.getAddress(), tokenId);

      const tx = await marketplace.connect(creator).listNFT(
        await nft.getAddress(),
        tokenId,
        LISTING_PRICE
      );
      const receipt = await tx.wait();

      console.log(`      ⛽ Gas used for listing: ${receipt.gasUsed.toString()}`);

      // Reasonable threshold: < 300k gas (includes storage, mappings, array operations)
      expect(receipt.gasUsed).to.be.lessThan(300000);
    });

    it("Should purchase with reasonable gas cost", async function () {
      const { marketplace, buyer, listingId } = await loadFixture(deployWithListedNFTFixture);

      const tx = await marketplace.connect(buyer).buyNFT(listingId, { value: LISTING_PRICE });
      const receipt = await tx.wait();

      console.log(`      ⛽ Gas used for purchase: ${receipt.gasUsed.toString()}`);

      // Reasonable threshold: < 200k gas
      expect(receipt.gasUsed).to.be.lessThan(200000);
    });
  });
});
