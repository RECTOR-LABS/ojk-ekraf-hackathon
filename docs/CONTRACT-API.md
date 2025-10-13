# Smart Contract API Documentation
# Karya Chain - OJK-Ekraf Hackathon 2025

**Version**: 1.0
**Last Updated**: October 13, 2025
**Network**: Sepolia Testnet (Chain ID: 11155111)

---

## Table of Contents

- [CopyrightRegistry](#copyrightregistry)
  - [Overview](#overview)
  - [Contract Details](#contract-details)
  - [Data Structures](#data-structures)
  - [Functions](#functions)
  - [Events](#events)
  - [Usage Examples](#usage-examples)
  - [Gas Costs](#gas-costs)

---

## CopyrightRegistry

### Overview

The CopyrightRegistry contract provides blockchain-based copyright registration for Indonesian creative works. It offers:

- **Tamper-proof copyright registration** with immutable timestamps
- **Content hash verification** using SHA-256 + IPFS CID
- **Multi-asset type support** (Art, Music, Writing, Photography, Design)
- **Duplicate detection** to prevent re-registration
- **Public verification** for anyone to verify ownership

**Status**: ✅ Deployed (Local)
**Test Coverage**: 100% (19/19 tests passing)
**Gas Cost**: ~412,000 gas per registration

---

### Contract Details

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CopyrightRegistry {
    // Implementation at: contracts/CopyrightRegistry.sol
}
```

**Compiler Version**: 0.8.20
**Optimization**: Enabled (200 runs)
**License**: MIT

---

### Data Structures

#### AssetType Enum

Supported types of creative assets:

```solidity
enum AssetType {
    Art,          // 0 - Digital art, illustrations, graphics
    Music,        // 1 - Music tracks, albums, audio samples
    Writing,      // 2 - Articles, books, scripts, poetry
    Photography,  // 3 - Photographs, photo collections
    Design        // 4 - Logos, templates, UI kits, designs
}
```

#### Registration Struct

Complete registration record:

```solidity
struct Registration {
    uint256 id;                  // Unique registration ID (auto-increment)
    address creator;             // Creator's wallet address
    bytes32 contentHash;         // SHA-256 hash of content
    string ipfsCID;              // IPFS Content Identifier
    string title;                // Work title
    string description;          // Work description
    AssetType assetType;         // Type of creative asset
    string[] tags;               // Searchable tags
    uint256 timestamp;           // Block timestamp of registration
    bool exists;                 // Existence flag (internal use)
}
```

---

### Functions

#### Registration Functions

##### `registerCopyright`

Register a creative work with copyright protection.

```solidity
function registerCopyright(
    bytes32 contentHash,
    string memory ipfsCID,
    string memory title,
    string memory description,
    AssetType assetType,
    string[] memory tags
) external returns (uint256 registrationId)
```

**Parameters:**
- `contentHash` - SHA-256 hash of the content (use `keccak256(content)` for blockchain hash)
- `ipfsCID` - IPFS Content Identifier (e.g., "QmXxx...")
- `title` - Title of the creative work (required, non-empty)
- `description` - Description of the work (can be empty)
- `assetType` - Type of creative asset (0-4, see AssetType enum)
- `tags` - Array of searchable tags (can be empty)

**Returns:**
- `registrationId` - Unique ID of the new registration

**Requirements:**
- Content hash must not be empty (non-zero bytes32)
- Title must not be empty
- IPFS CID must not be empty
- Content must not already be registered (duplicate check)

**Emits:**
- `CopyrightRegistered(uint256 id, address creator, bytes32 contentHash, string ipfsCID, AssetType assetType)`

**Example:**
```javascript
const contentHash = ethers.id("my-unique-content");
const tx = await registry.registerCopyright(
    contentHash,
    "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    "My Digital Artwork",
    "A beautiful piece created in 2025",
    0, // Art
    ["digital", "art", "2025"]
);
const receipt = await tx.wait();
// registrationId is returned and can be extracted from events
```

---

#### Query Functions

##### `getRegistration`

Get full registration details by ID.

```solidity
function getRegistration(uint256 registrationId)
    external view returns (Registration memory)
```

**Parameters:**
- `registrationId` - The registration ID to query

**Returns:**
- Full `Registration` struct with all details

**Reverts:**
- "Registration does not exist" - if ID is invalid

**Example:**
```javascript
const registration = await registry.getRegistration(1);
console.log(registration.title); // "My Digital Artwork"
console.log(registration.creator); // "0x..."
```

---

##### `getRegistrationByHash`

Get registration details by content hash.

```solidity
function getRegistrationByHash(bytes32 contentHash)
    external view returns (Registration memory)
```

**Parameters:**
- `contentHash` - The content hash to look up

**Returns:**
- Full `Registration` struct

**Reverts:**
- "Content not registered" - if hash not found

**Example:**
```javascript
const contentHash = ethers.id("my-unique-content");
const registration = await registry.getRegistrationByHash(contentHash);
```

---

##### `getTotalRegistrations`

Get total number of registrations.

```solidity
function getTotalRegistrations() external view returns (uint256)
```

**Returns:**
- Total count of all registrations

**Example:**
```javascript
const total = await registry.getTotalRegistrations();
console.log(`Total: ${total} works registered`);
```

---

##### `getRegistrationsByCreator`

Get all registration IDs by a specific creator.

```solidity
function getRegistrationsByCreator(address creator)
    external view returns (uint256[] memory)
```

**Parameters:**
- `creator` - Creator's wallet address

**Returns:**
- Array of registration IDs owned by the creator

**Example:**
```javascript
const creatorWorks = await registry.getRegistrationsByCreator(creatorAddress);
// [1, 5, 7, 12] - IDs of all works by this creator
```

---

##### `getCreatorRegistrationCount`

Get count of registrations by a creator.

```solidity
function getCreatorRegistrationCount(address creator)
    external view returns (uint256)
```

**Parameters:**
- `creator` - Creator's wallet address

**Returns:**
- Number of registrations

**Example:**
```javascript
const count = await registry.getCreatorRegistrationCount(creatorAddress);
console.log(`Creator has ${count} registered works`);
```

---

##### `getRegistrationsByAssetType`

Get all registration IDs by asset type.

```solidity
function getRegistrationsByAssetType(AssetType assetType)
    external view returns (uint256[] memory)
```

**Parameters:**
- `assetType` - The asset type to query (0-4)

**Returns:**
- Array of registration IDs of that type

**Example:**
```javascript
// Get all Art registrations
const artWorks = await registry.getRegistrationsByAssetType(0);
// [1, 3, 5, 8] - IDs of all Art assets
```

---

##### `getAssetTypeCount`

Get count of registrations by asset type.

```solidity
function getAssetTypeCount(AssetType assetType)
    external view returns (uint256)
```

**Parameters:**
- `assetType` - The asset type to query

**Returns:**
- Number of registrations of that type

**Example:**
```javascript
const artCount = await registry.getAssetTypeCount(0);
console.log(`${artCount} artworks registered`);
```

---

#### Verification Functions

##### `isContentRegistered`

Check if content hash is already registered.

```solidity
function isContentRegistered(bytes32 contentHash)
    public view returns (bool)
```

**Parameters:**
- `contentHash` - Content hash to check

**Returns:**
- `true` if registered, `false` otherwise

**Example:**
```javascript
const contentHash = ethers.id("my-content");
const isRegistered = await registry.isContentRegistered(contentHash);
if (isRegistered) {
    console.log("This content is already registered!");
}
```

---

##### `getRegistrationIdByHash`

Get registration ID by content hash.

```solidity
function getRegistrationIdByHash(bytes32 contentHash)
    external view returns (uint256)
```

**Parameters:**
- `contentHash` - Content hash to look up

**Returns:**
- Registration ID, or `0` if not found

**Example:**
```javascript
const contentHash = ethers.id("my-content");
const id = await registry.getRegistrationIdByHash(contentHash);
// Returns 0 if not found, otherwise returns the registration ID
```

---

##### `isCreator`

Verify if an address is the creator of a registration.

```solidity
function isCreator(uint256 registrationId, address account)
    external view returns (bool)
```

**Parameters:**
- `registrationId` - Registration ID to check
- `account` - Address to verify

**Returns:**
- `true` if account is the creator

**Reverts:**
- "Registration does not exist" - if ID is invalid

**Example:**
```javascript
const isOwner = await registry.isCreator(1, userAddress);
if (isOwner) {
    console.log("User owns this work");
}
```

---

### Events

#### CopyrightRegistered

Emitted when a new copyright is registered.

```solidity
event CopyrightRegistered(
    uint256 indexed id,
    address indexed creator,
    bytes32 indexed contentHash,
    string ipfsCID,
    AssetType assetType
);
```

**Parameters:**
- `id` - Unique registration ID (indexed for filtering)
- `creator` - Creator's address (indexed)
- `contentHash` - Content hash (indexed)
- `ipfsCID` - IPFS Content Identifier
- `assetType` - Type of asset

**Usage:**
```javascript
// Listen for new registrations
registry.on("CopyrightRegistered", (id, creator, contentHash, ipfsCID, assetType) => {
    console.log(`New registration #${id} by ${creator}`);
});

// Query past events
const filter = registry.filters.CopyrightRegistered(null, creatorAddress);
const events = await registry.queryFilter(filter);
```

---

### Usage Examples

#### Complete Registration Flow

```javascript
// 1. Prepare content
const content = "My original artwork data";
const contentHash = ethers.id(content); // or use keccak256

// 2. Upload to IPFS (using Pinata, NFT.Storage, etc.)
const ipfsCID = await uploadToIPFS(fileBuffer);

// 3. Register copyright
const tx = await registry.registerCopyright(
    contentHash,
    ipfsCID,
    "Sunset Over Jakarta",
    "Digital painting of Jakarta skyline at sunset",
    0, // Art
    ["digital", "painting", "jakarta", "sunset"]
);

const receipt = await tx.wait();
const event = receipt.events.find(e => e.event === "CopyrightRegistered");
const registrationId = event.args.id;

console.log(`Registered with ID: ${registrationId}`);

// 4. Verify registration
const registration = await registry.getRegistration(registrationId);
console.log(`Creator: ${registration.creator}`);
console.log(`Timestamp: ${new Date(registration.timestamp * 1000)}`);
```

#### Check Before Registering

```javascript
// Prevent duplicate registration
const contentHash = ethers.id(myContent);

if (await registry.isContentRegistered(contentHash)) {
    const existingReg = await registry.getRegistrationByHash(contentHash);
    console.log(`Already registered by ${existingReg.creator}`);
    console.log(`On ${new Date(existingReg.timestamp * 1000)}`);
} else {
    // Proceed with registration
    await registry.registerCopyright(...);
}
```

#### Query Creator Portfolio

```javascript
// Get all works by a creator
const creatorAddress = "0x...";
const workIds = await registry.getRegistrationsByCreator(creatorAddress);

// Fetch details for each work
for (const id of workIds) {
    const work = await registry.getRegistration(id);
    console.log(`${work.title} - ${work.assetType}`);
}
```

---

### Gas Costs

**Test Network**: Hardhat Local
**Compiler**: Solidity 0.8.20 with optimization (200 runs)

| Operation | Gas Cost | Notes |
|-----------|----------|-------|
| `registerCopyright` | ~412,000 | With 2 tags, typical metadata |
| `getRegistration` | ~5,000 | View function, minimal cost |
| `isContentRegistered` | ~3,000 | Simple storage lookup |
| `getRegistrationsByCreator` | Varies | Depends on array length |

**Optimization Notes:**
- Storage-heavy operations (arrays, strings) increase gas
- Use minimal tags and descriptions to reduce costs
- On Sepolia, costs will vary based on network congestion
- Estimated Sepolia cost: ~0.0004 ETH per registration (at 1 gwei)

---

## Security Considerations

### Access Control
- No admin functions - fully decentralized
- Only creator can register under their address
- All data is public and immutable

### Input Validation
- ✅ Empty content hash rejected
- ✅ Empty title rejected
- ✅ Empty IPFS CID rejected
- ✅ Duplicate content hash rejected
- ✅ Invalid registration ID reverts

### Best Practices
- Always check `isContentRegistered()` before attempting to register
- Store IPFS CID on a pinning service (Pinata, NFT.Storage) to ensure availability
- Use content hashing consistently (same method for verification)
- Keep IPFS metadata accessible for certificate generation

---

## Testing

**Test Suite**: `test/CopyrightRegistry.test.js`
**Total Tests**: 19
**Coverage**: 100% statements, 100% functions, 100% lines, 78.57% branches

**Test Categories:**
- Deployment (2 tests)
- Copyright Registration (5 tests)
- Asset Type Classification (2 tests)
- Content Verification (3 tests)
- Query Functions (4 tests)
- Creator Verification (2 tests)
- Gas Optimization (1 test)

**Run Tests:**
```bash
npm test
npm run coverage  # For coverage report
```

---

## Future Enhancements

Planned for post-hackathon:

1. **Batch Registration** - Register multiple works in one transaction
2. **Update Metadata** - Allow creators to update non-critical fields
3. **Transfer Ownership** - Enable copyright transfers
4. **Collaborative Works** - Multi-owner support with percentage splits
5. **Licensing Terms** - Attach standard licenses (CC, All Rights Reserved)

---

**Document Version**: 1.0
**Last Updated**: October 13, 2025
**Maintained By**: Karya Chain Team
