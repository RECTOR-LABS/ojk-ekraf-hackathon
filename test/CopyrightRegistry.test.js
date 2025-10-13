const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("CopyrightRegistry", function () {
  // Fixture for deploying the contract
  async function deployCopyrightRegistryFixture() {
    const [owner, creator1, creator2, creator3] = await ethers.getSigners();

    const CopyrightRegistry = await ethers.getContractFactory("CopyrightRegistry");
    const registry = await CopyrightRegistry.deploy();

    return { registry, owner, creator1, creator2, creator3 };
  }

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      const { registry } = await loadFixture(deployCopyrightRegistryFixture);
      expect(await registry.getAddress()).to.be.properAddress;
    });

    it("Should initialize with zero registrations", async function () {
      const { registry } = await loadFixture(deployCopyrightRegistryFixture);
      expect(await registry.getTotalRegistrations()).to.equal(0);
    });
  });

  describe("Copyright Registration", function () {
    it("Should register a creative work successfully", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      const contentHash = ethers.id("unique-content-hash-1");
      const ipfsCID = "QmTest123456789abcdefghijk";
      const title = "My First Digital Artwork";
      const description = "A beautiful digital painting";
      const assetType = 0; // Art
      const tags = ["digital", "art", "painting"];

      await expect(
        registry.connect(creator1).registerCopyright(
          contentHash,
          ipfsCID,
          title,
          description,
          assetType,
          tags
        )
      )
        .to.emit(registry, "CopyrightRegistered")
        .withArgs(1, creator1.address, contentHash, ipfsCID, assetType);

      expect(await registry.getTotalRegistrations()).to.equal(1);
    });

    it("Should reject registration with empty content hash", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      await expect(
        registry.connect(creator1).registerCopyright(
          ethers.ZeroHash,
          "QmTest",
          "Title",
          "Description",
          0,
          []
        )
      ).to.be.revertedWith("Content hash cannot be empty");
    });

    it("Should reject registration with empty title", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      await expect(
        registry.connect(creator1).registerCopyright(
          ethers.id("test"),
          "QmTest",
          "",
          "Description",
          0,
          []
        )
      ).to.be.revertedWith("Title cannot be empty");
    });

    it("Should reject duplicate content hash registration", async function () {
      const { registry, creator1, creator2 } = await loadFixture(deployCopyrightRegistryFixture);

      const contentHash = ethers.id("unique-content");

      // First registration succeeds
      await registry.connect(creator1).registerCopyright(
        contentHash,
        "QmTest1",
        "Title 1",
        "Description 1",
        0,
        []
      );

      // Second registration with same hash fails
      await expect(
        registry.connect(creator2).registerCopyright(
          contentHash,
          "QmTest2",
          "Title 2",
          "Description 2",
          0,
          []
        )
      ).to.be.revertedWith("Content already registered");
    });

    it("Should store correct registration data", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      const contentHash = ethers.id("test-content");
      const ipfsCID = "QmTestCID123";
      const title = "Test Artwork";
      const description = "Test Description";
      const assetType = 0; // Art
      const tags = ["test", "digital"];

      await registry.connect(creator1).registerCopyright(
        contentHash,
        ipfsCID,
        title,
        description,
        assetType,
        tags
      );

      const registration = await registry.getRegistration(1);

      expect(registration.id).to.equal(1);
      expect(registration.creator).to.equal(creator1.address);
      expect(registration.contentHash).to.equal(contentHash);
      expect(registration.ipfsCID).to.equal(ipfsCID);
      expect(registration.title).to.equal(title);
      expect(registration.description).to.equal(description);
      expect(registration.assetType).to.equal(assetType);
      expect(registration.timestamp).to.be.greaterThan(0);
    });
  });

  describe("Asset Type Classification", function () {
    it("Should accept all valid asset types", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      const assetTypes = [
        { type: 0, name: "Art" },
        { type: 1, name: "Music" },
        { type: 2, name: "Writing" },
        { type: 3, name: "Photography" },
        { type: 4, name: "Design" }
      ];

      for (let i = 0; i < assetTypes.length; i++) {
        const asset = assetTypes[i];
        await expect(
          registry.connect(creator1).registerCopyright(
            ethers.id(`content-${i}`),
            `QmTest${i}`,
            `${asset.name} Work`,
            "Description",
            asset.type,
            []
          )
        ).to.not.be.reverted;
      }

      expect(await registry.getTotalRegistrations()).to.equal(5);
    });

    it("Should reject invalid asset type", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      await expect(
        registry.connect(creator1).registerCopyright(
          ethers.id("test"),
          "QmTest",
          "Title",
          "Description",
          99, // Invalid type
          []
        )
      ).to.be.reverted; // Will revert due to enum out of bounds
    });
  });

  describe("Content Verification", function () {
    it("Should verify registered content hash", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      const contentHash = ethers.id("verify-content");

      await registry.connect(creator1).registerCopyright(
        contentHash,
        "QmTest",
        "Title",
        "Description",
        0,
        []
      );

      expect(await registry.isContentRegistered(contentHash)).to.be.true;
      expect(await registry.getRegistrationIdByHash(contentHash)).to.equal(1);
    });

    it("Should return false for unregistered content", async function () {
      const { registry } = await loadFixture(deployCopyrightRegistryFixture);

      const unregisteredHash = ethers.id("not-registered");
      expect(await registry.isContentRegistered(unregisteredHash)).to.be.false;
    });

    it("Should get creator by content hash", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      const contentHash = ethers.id("creator-content");

      await registry.connect(creator1).registerCopyright(
        contentHash,
        "QmTest",
        "Title",
        "Description",
        0,
        []
      );

      const registration = await registry.getRegistrationByHash(contentHash);
      expect(registration.creator).to.equal(creator1.address);
    });
  });

  describe("Query Functions", function () {
    it("Should get registrations by creator", async function () {
      const { registry, creator1, creator2 } = await loadFixture(deployCopyrightRegistryFixture);

      // Creator1 registers 2 works
      await registry.connect(creator1).registerCopyright(
        ethers.id("content-1"),
        "QmTest1",
        "Title 1",
        "Description 1",
        0,
        []
      );

      await registry.connect(creator1).registerCopyright(
        ethers.id("content-2"),
        "QmTest2",
        "Title 2",
        "Description 2",
        1,
        []
      );

      // Creator2 registers 1 work
      await registry.connect(creator2).registerCopyright(
        ethers.id("content-3"),
        "QmTest3",
        "Title 3",
        "Description 3",
        0,
        []
      );

      const creator1Ids = await registry.getRegistrationsByCreator(creator1.address);
      const creator2Ids = await registry.getRegistrationsByCreator(creator2.address);

      expect(creator1Ids.length).to.equal(2);
      expect(creator2Ids.length).to.equal(1);
      expect(creator1Ids[0]).to.equal(1);
      expect(creator1Ids[1]).to.equal(2);
      expect(creator2Ids[0]).to.equal(3);
    });

    it("Should get registrations by asset type", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      // Register different asset types
      await registry.connect(creator1).registerCopyright(
        ethers.id("art-1"),
        "QmArt1",
        "Art 1",
        "Description",
        0, // Art
        []
      );

      await registry.connect(creator1).registerCopyright(
        ethers.id("music-1"),
        "QmMusic1",
        "Music 1",
        "Description",
        1, // Music
        []
      );

      await registry.connect(creator1).registerCopyright(
        ethers.id("art-2"),
        "QmArt2",
        "Art 2",
        "Description",
        0, // Art
        []
      );

      const artIds = await registry.getRegistrationsByAssetType(0);
      const musicIds = await registry.getRegistrationsByAssetType(1);

      expect(artIds.length).to.equal(2);
      expect(musicIds.length).to.equal(1);
    });

    it("Should get creator registration count", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      expect(await registry.getCreatorRegistrationCount(creator1.address)).to.equal(0);

      await registry.connect(creator1).registerCopyright(
        ethers.id("content-1"),
        "QmTest1",
        "Title 1",
        "Description 1",
        0,
        []
      );

      await registry.connect(creator1).registerCopyright(
        ethers.id("content-2"),
        "QmTest2",
        "Title 2",
        "Description 2",
        0,
        []
      );

      expect(await registry.getCreatorRegistrationCount(creator1.address)).to.equal(2);
    });

    it("Should get asset type count", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      expect(await registry.getAssetTypeCount(0)).to.equal(0);

      await registry.connect(creator1).registerCopyright(
        ethers.id("art-1"),
        "QmArt1",
        "Art 1",
        "Description",
        0, // Art
        []
      );

      await registry.connect(creator1).registerCopyright(
        ethers.id("art-2"),
        "QmArt2",
        "Art 2",
        "Description",
        0, // Art
        []
      );

      expect(await registry.getAssetTypeCount(0)).to.equal(2);
      expect(await registry.getAssetTypeCount(1)).to.equal(0);
    });
  });

  describe("Creator Verification", function () {
    it("Should verify if address is creator", async function () {
      const { registry, creator1, creator2 } = await loadFixture(deployCopyrightRegistryFixture);

      await registry.connect(creator1).registerCopyright(
        ethers.id("content-1"),
        "QmTest1",
        "Title 1",
        "Description 1",
        0,
        []
      );

      expect(await registry.isCreator(1, creator1.address)).to.be.true;
      expect(await registry.isCreator(1, creator2.address)).to.be.false;
    });

    it("Should reject verification for non-existent registration", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      await expect(
        registry.isCreator(999, creator1.address)
      ).to.be.revertedWith("Registration does not exist");
    });
  });

  describe("Gas Optimization", function () {
    it("Should register with reasonable gas cost", async function () {
      const { registry, creator1 } = await loadFixture(deployCopyrightRegistryFixture);

      const tx = await registry.connect(creator1).registerCopyright(
        ethers.id("gas-test"),
        "QmTest",
        "Title",
        "Description",
        0,
        ["tag1", "tag2"]
      );

      const receipt = await tx.wait();

      // Gas should be less than 500k for registration (with arrays and multiple mappings)
      expect(receipt.gasUsed).to.be.lessThan(500000);

      console.log(`      ⛽ Gas used for registration: ${receipt.gasUsed.toString()}`);
    });
  });
});
