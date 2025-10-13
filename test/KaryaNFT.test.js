const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("KaryaNFT", function () {
  // Test data constants
  const SAMPLE_CONTENT_HASH = ethers.keccak256(ethers.toUtf8Bytes("Sample creative work"));
  const SAMPLE_IPFS_CID = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
  const SAMPLE_TOKEN_URI = `ipfs://${SAMPLE_IPFS_CID}`;
  const DEFAULT_ROYALTY_BPS = 1000; // 10%
  const MIN_ROYALTY_BPS = 500; // 5%
  const MAX_ROYALTY_BPS = 2000; // 20%
  const CUSTOM_ROYALTY_BPS = 1500; // 15%

  // Fixture for deploying contracts
  async function deployContractsFixture() {
    const [owner, creator, buyer, other] = await ethers.getSigners();

    // Deploy CopyrightRegistry first
    const CopyrightRegistry = await ethers.getContractFactory("CopyrightRegistry");
    const registry = await CopyrightRegistry.deploy();
    await registry.waitForDeployment();

    // Deploy KaryaNFT
    const KaryaNFT = await ethers.getContractFactory("KaryaNFT");
    const nft = await KaryaNFT.deploy(await registry.getAddress());
    await nft.waitForDeployment();

    return { nft, registry, owner, creator, buyer, other };
  }

  // Fixture with pre-registered copyright
  async function deployWithCopyrightFixture() {
    const contracts = await deployContractsFixture();
    const { registry, creator } = contracts;

    // Register a copyright as creator
    const tx = await registry.connect(creator).registerCopyright(
      SAMPLE_CONTENT_HASH,
      SAMPLE_IPFS_CID,
      "Test Artwork",
      "A beautiful test artwork",
      0, // AssetType.DigitalArt
      [] // tags
    );
    const receipt = await tx.wait();

    // Extract copyright ID from event
    const event = receipt.logs.find(
      log => log.fragment && log.fragment.name === 'CopyrightRegistered'
    );
    const copyrightId = event.args.id; // Note: event uses 'id' not 'copyrightId'

    return { ...contracts, copyrightId };
  }

  describe("Deployment", function () {
    it("Should deploy with correct name and symbol", async function () {
      const { nft } = await loadFixture(deployContractsFixture);

      expect(await nft.name()).to.equal("Karya Chain NFT");
      expect(await nft.symbol()).to.equal("KARYA");
    });

    it("Should deploy with correct CopyrightRegistry reference", async function () {
      const { nft, registry } = await loadFixture(deployContractsFixture);

      expect(await nft.copyrightRegistry()).to.equal(await registry.getAddress());
    });

    it("Should initialize with token ID starting from 1", async function () {
      const { nft } = await loadFixture(deployContractsFixture);

      expect(await nft.getCurrentTokenId()).to.equal(1);
      expect(await nft.totalMinted()).to.equal(0);
    });

    it("Should revert if deployed with zero address registry", async function () {
      const KaryaNFT = await ethers.getContractFactory("KaryaNFT");

      await expect(
        KaryaNFT.deploy(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid registry address");
    });

    it("Should support ERC-721 and ERC-2981 interfaces", async function () {
      const { nft } = await loadFixture(deployContractsFixture);

      // ERC-721 interface ID
      const ERC721_INTERFACE_ID = "0x80ac58cd";
      // ERC-2981 interface ID
      const ERC2981_INTERFACE_ID = "0x2a55205a";

      expect(await nft.supportsInterface(ERC721_INTERFACE_ID)).to.be.true;
      expect(await nft.supportsInterface(ERC2981_INTERFACE_ID)).to.be.true;
    });
  });

  describe("Minting", function () {
    describe("Basic Minting", function () {
      it("Should mint NFT successfully for copyright owner", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        const tx = await nft.connect(creator).mint(
          copyrightId,
          SAMPLE_TOKEN_URI,
          CUSTOM_ROYALTY_BPS
        );
        const receipt = await tx.wait();

        // Check event emission
        const event = receipt.logs.find(
          log => log.fragment && log.fragment.name === 'NFTMinted'
        );
        expect(event).to.not.be.undefined;
        expect(event.args.tokenId).to.equal(1);
        expect(event.args.copyrightId).to.equal(copyrightId);
        expect(event.args.creator).to.equal(creator.address);
        expect(event.args.royaltyPercentage).to.equal(CUSTOM_ROYALTY_BPS);
        expect(event.args.tokenURI).to.equal(SAMPLE_TOKEN_URI);

        // Check NFT ownership
        expect(await nft.ownerOf(1)).to.equal(creator.address);

        // Check token URI
        expect(await nft.tokenURI(1)).to.equal(SAMPLE_TOKEN_URI);

        // Check mappings
        expect(await nft.copyrightToToken(copyrightId)).to.equal(1);
        expect(await nft.tokenToCopyright(1)).to.equal(copyrightId);
        expect(await nft.isCopyrightMinted(copyrightId)).to.be.true;

        // Check counters
        expect(await nft.getCurrentTokenId()).to.equal(2);
        expect(await nft.totalMinted()).to.equal(1);
      });

      it("Should mint with default royalty using mintWithDefaultRoyalty", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        await nft.connect(creator).mintWithDefaultRoyalty(copyrightId, SAMPLE_TOKEN_URI);

        // Verify royalty info
        const salePrice = ethers.parseEther("1");
        const [receiver, royaltyAmount] = await nft.royaltyInfo(1, salePrice);

        expect(receiver).to.equal(creator.address);
        // 10% of 1 ETH = 0.1 ETH
        expect(royaltyAmount).to.equal(ethers.parseEther("0.1"));
      });

      it("Should set correct royalty info (ERC-2981)", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, CUSTOM_ROYALTY_BPS);

        // Test royalty calculation
        const salePrice = ethers.parseEther("1");
        const [receiver, royaltyAmount] = await nft.royaltyInfo(1, salePrice);

        expect(receiver).to.equal(creator.address);
        // 15% of 1 ETH = 0.15 ETH
        expect(royaltyAmount).to.equal(ethers.parseEther("0.15"));
      });

      it("Should increment token ID for each mint", async function () {
        const { nft, registry, creator } = await loadFixture(deployContractsFixture);

        // Register multiple copyrights
        const tx1 = await registry.connect(creator).registerCopyright(
          SAMPLE_CONTENT_HASH,
          "CID1",
          "Work 1",
          "Description 1",
          0,
          []
        );
        const receipt1 = await tx1.wait();
        const copyrightId1 = receipt1.logs[0].args.id;

        const tx2 = await registry.connect(creator).registerCopyright(
          ethers.keccak256(ethers.toUtf8Bytes("Different content")),
          "CID2",
          "Work 2",
          "Description 2",
          1,
          []
        );
        const receipt2 = await tx2.wait();
        const copyrightId2 = receipt2.logs[0].args.id;

        // Mint both
        await nft.connect(creator).mint(copyrightId1, "ipfs://token1", DEFAULT_ROYALTY_BPS);
        await nft.connect(creator).mint(copyrightId2, "ipfs://token2", DEFAULT_ROYALTY_BPS);

        expect(await nft.getCurrentTokenId()).to.equal(3);
        expect(await nft.totalMinted()).to.equal(2);
        expect(await nft.ownerOf(1)).to.equal(creator.address);
        expect(await nft.ownerOf(2)).to.equal(creator.address);
      });
    });

    describe("Access Control", function () {
      it("Should revert if non-owner tries to mint", async function () {
        const { nft, other, copyrightId, creator } = await loadFixture(deployWithCopyrightFixture);

        await expect(
          nft.connect(other).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS)
        ).to.be.revertedWithCustomError(nft, "NotCopyrightOwner")
          .withArgs(other.address, creator.address);
      });

      it("Should revert if copyright does not exist", async function () {
        const { nft, creator } = await loadFixture(deployContractsFixture);

        const nonExistentId = 99999;

        await expect(
          nft.connect(creator).mint(nonExistentId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS)
        ).to.be.revertedWithCustomError(nft, "CopyrightNotFound")
          .withArgs(nonExistentId);
      });
    });

    describe("Validation", function () {
      it("Should revert if royalty percentage is below minimum", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        const tooLow = 400; // 4%

        await expect(
          nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, tooLow)
        ).to.be.revertedWithCustomError(nft, "InvalidRoyaltyPercentage")
          .withArgs(tooLow, MIN_ROYALTY_BPS, MAX_ROYALTY_BPS);
      });

      it("Should revert if royalty percentage is above maximum", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        const tooHigh = 2500; // 25%

        await expect(
          nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, tooHigh)
        ).to.be.revertedWithCustomError(nft, "InvalidRoyaltyPercentage")
          .withArgs(tooHigh, MIN_ROYALTY_BPS, MAX_ROYALTY_BPS);
      });

      it("Should accept minimum royalty percentage", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        await expect(
          nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, MIN_ROYALTY_BPS)
        ).to.not.be.reverted;
      });

      it("Should accept maximum royalty percentage", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        await expect(
          nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, MAX_ROYALTY_BPS)
        ).to.not.be.reverted;
      });

      it("Should revert if token URI is empty", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        await expect(
          nft.connect(creator).mint(copyrightId, "", DEFAULT_ROYALTY_BPS)
        ).to.be.revertedWithCustomError(nft, "EmptyTokenURI");
      });
    });

    describe("Duplicate Prevention", function () {
      it("Should revert if copyright already minted", async function () {
        const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        // Mint once
        await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

        // Try to mint again
        await expect(
          nft.connect(creator).mint(copyrightId, "ipfs://another-uri", DEFAULT_ROYALTY_BPS)
        ).to.be.revertedWithCustomError(nft, "CopyrightAlreadyMinted")
          .withArgs(copyrightId, 1);
      });

      it("Should prevent minting even after NFT transfer", async function () {
        const { nft, creator, buyer, copyrightId } = await loadFixture(deployWithCopyrightFixture);

        // Mint and transfer NFT
        await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);
        await nft.connect(creator).transferFrom(creator.address, buyer.address, 1);

        // Original creator should still not be able to mint again
        await expect(
          nft.connect(creator).mint(copyrightId, "ipfs://new-uri", DEFAULT_ROYALTY_BPS)
        ).to.be.revertedWithCustomError(nft, "CopyrightAlreadyMinted");
      });
    });
  });

  describe("Royalty Management", function () {
    it("Should allow owner to update royalty info", async function () {
      const { nft, creator, buyer, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      // Update royalty
      const newRoyalty = 1800; // 18%
      const tx = await nft.connect(creator).updateRoyalty(1, buyer.address, newRoyalty);
      const receipt = await tx.wait();

      // Check event
      const event = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'RoyaltyUpdated'
      );
      expect(event.args.tokenId).to.equal(1);
      expect(event.args.receiver).to.equal(buyer.address);
      expect(event.args.royaltyPercentage).to.equal(newRoyalty);

      // Verify new royalty
      const salePrice = ethers.parseEther("1");
      const [receiver, royaltyAmount] = await nft.royaltyInfo(1, salePrice);
      expect(receiver).to.equal(buyer.address);
      expect(royaltyAmount).to.equal(ethers.parseEther("0.18")); // 18%
    });

    it("Should revert if non-owner tries to update royalty", async function () {
      const { nft, creator, other, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      await expect(
        nft.connect(other).updateRoyalty(1, other.address, 1000)
      ).to.be.revertedWithCustomError(nft, "NotCopyrightOwner")
        .withArgs(other.address, creator.address);
    });

    it("Should revert update with invalid royalty percentage", async function () {
      const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      await expect(
        nft.connect(creator).updateRoyalty(1, creator.address, 3000) // 30%
      ).to.be.revertedWithCustomError(nft, "InvalidRoyaltyPercentage");
    });

    it("Should revert update for non-existent token", async function () {
      const { nft, creator } = await loadFixture(deployContractsFixture);

      await expect(
        nft.connect(creator).updateRoyalty(999, creator.address, 1000)
      ).to.be.revertedWithCustomError(nft, "TokenNotFound")
        .withArgs(999);
    });
  });

  describe("View Functions", function () {
    it("Should return correct copyright ID for token", async function () {
      const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      expect(await nft.getCopyrightId(1)).to.equal(copyrightId);
    });

    it("Should return correct token ID for copyright", async function () {
      const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      expect(await nft.getTokenIdByCopyright(copyrightId)).to.equal(1);
    });

    it("Should return 0 for unminted copyright", async function () {
      const { nft, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      expect(await nft.getTokenIdByCopyright(copyrightId)).to.equal(0);
    });

    it("Should correctly report minted status", async function () {
      const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      expect(await nft.isMinted(copyrightId)).to.be.false;

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      expect(await nft.isMinted(copyrightId)).to.be.true;
    });

    it("Should track current token ID correctly", async function () {
      const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      expect(await nft.getCurrentTokenId()).to.equal(1);
      expect(await nft.totalMinted()).to.equal(0);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      expect(await nft.getCurrentTokenId()).to.equal(2);
      expect(await nft.totalMinted()).to.equal(1);
    });

    it("Should revert getCopyrightId for non-existent token", async function () {
      const { nft } = await loadFixture(deployContractsFixture);

      await expect(
        nft.getCopyrightId(999)
      ).to.be.revertedWithCustomError(nft, "TokenNotFound")
        .withArgs(999);
    });
  });

  describe("ERC-721 Compliance", function () {
    it("Should support ERC-721 transfers", async function () {
      const { nft, creator, buyer, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      // Transfer
      await nft.connect(creator).transferFrom(creator.address, buyer.address, 1);

      expect(await nft.ownerOf(1)).to.equal(buyer.address);
    });

    it("Should support ERC-721 approvals", async function () {
      const { nft, creator, buyer, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      // Approve and transfer
      await nft.connect(creator).approve(buyer.address, 1);
      expect(await nft.getApproved(1)).to.equal(buyer.address);

      await nft.connect(buyer).transferFrom(creator.address, buyer.address, 1);
      expect(await nft.ownerOf(1)).to.equal(buyer.address);
    });

    it("Should support safe transfers", async function () {
      const { nft, creator, buyer, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      await nft.connect(creator).mint(copyrightId, SAMPLE_TOKEN_URI, DEFAULT_ROYALTY_BPS);

      await nft.connect(creator)["safeTransferFrom(address,address,uint256)"](
        creator.address,
        buyer.address,
        1
      );

      expect(await nft.ownerOf(1)).to.equal(buyer.address);
    });
  });

  describe("Gas Optimization", function () {
    it("Should mint with reasonable gas cost", async function () {
      const { nft, creator, copyrightId } = await loadFixture(deployWithCopyrightFixture);

      const tx = await nft.connect(creator).mint(
        copyrightId,
        SAMPLE_TOKEN_URI,
        DEFAULT_ROYALTY_BPS
      );
      const receipt = await tx.wait();

      // Log gas used for analysis
      console.log(`      ⛽ Gas used for minting: ${receipt.gasUsed.toString()}`);

      // Reasonable threshold: < 300k gas
      expect(receipt.gasUsed).to.be.lessThan(300000);
    });
  });
});
