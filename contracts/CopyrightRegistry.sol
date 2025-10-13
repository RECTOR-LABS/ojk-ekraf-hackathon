// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CopyrightRegistry
 * @notice Blockchain-based copyright registration system for Indonesian creative works
 * @dev Implements tamper-proof copyright registration with content verification
 *
 * Features:
 * - Immutable timestamp of creation
 * - Content hash verification (SHA-256 + IPFS)
 * - Multi-asset type support
 * - Duplicate detection
 * - Public verification
 *
 * Part of Karya Chain - OJK-Ekraf Hackathon 2025
 */
contract CopyrightRegistry {

    // ============================================
    // State Variables
    // ============================================

    /// @notice Counter for registration IDs
    uint256 private _registrationCounter;

    // ============================================
    // Enums
    // ============================================

    /// @notice Supported creative asset types
    enum AssetType {
        Art,          // Digital art, illustrations, graphics
        Music,        // Music tracks, albums, audio samples
        Writing,      // Articles, books, scripts, poetry
        Photography,  // Photographs, photo collections
        Design        // Logos, templates, UI kits, designs
    }

    // ============================================
    // Structs
    // ============================================

    /// @notice Copyright registration record
    struct Registration {
        uint256 id;                  // Unique registration ID
        address creator;             // Creator's wallet address
        bytes32 contentHash;         // SHA-256 hash of content
        string ipfsCID;              // IPFS Content Identifier
        string title;                // Work title
        string description;          // Work description
        AssetType assetType;         // Type of creative asset
        string[] tags;               // Searchable tags
        uint256 timestamp;           // Block timestamp of registration
        bool exists;                 // Flag for existence check
    }

    // ============================================
    // Storage
    // ============================================

    /// @notice Mapping from registration ID to Registration
    mapping(uint256 => Registration) private _registrations;

    /// @notice Mapping from content hash to registration ID (duplicate detection)
    mapping(bytes32 => uint256) private _contentHashToId;

    /// @notice Mapping from creator address to array of registration IDs
    mapping(address => uint256[]) private _creatorRegistrations;

    /// @notice Mapping from asset type to array of registration IDs
    mapping(AssetType => uint256[]) private _assetTypeRegistrations;

    // ============================================
    // Events
    // ============================================

    /// @notice Emitted when a new copyright is registered
    event CopyrightRegistered(
        uint256 indexed id,
        address indexed creator,
        bytes32 indexed contentHash,
        string ipfsCID,
        AssetType assetType
    );

    // ============================================
    // Constructor
    // ============================================

    constructor() {
        // Initialize counter at 0
        _registrationCounter = 0;
    }

    // ============================================
    // External Functions
    // ============================================

    /**
     * @notice Register a creative work with copyright protection
     * @param contentHash SHA-256 hash of the content
     * @param ipfsCID IPFS Content Identifier for the work
     * @param title Title of the creative work
     * @param description Description of the work
     * @param assetType Type of creative asset
     * @param tags Array of searchable tags
     * @return registrationId The ID of the new registration
     *
     * Requirements:
     * - Content hash must not be empty
     * - Content must not be already registered
     * - Title must not be empty
     * - IPFS CID must not be empty
     */
    function registerCopyright(
        bytes32 contentHash,
        string memory ipfsCID,
        string memory title,
        string memory description,
        AssetType assetType,
        string[] memory tags
    ) external returns (uint256 registrationId) {
        // Input validation
        require(contentHash != bytes32(0), "Content hash cannot be empty");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(ipfsCID).length > 0, "IPFS CID cannot be empty");
        require(!isContentRegistered(contentHash), "Content already registered");

        // Increment counter
        _registrationCounter++;
        registrationId = _registrationCounter;

        // Create registration record
        Registration storage registration = _registrations[registrationId];
        registration.id = registrationId;
        registration.creator = msg.sender;
        registration.contentHash = contentHash;
        registration.ipfsCID = ipfsCID;
        registration.title = title;
        registration.description = description;
        registration.assetType = assetType;
        registration.tags = tags;
        registration.timestamp = block.timestamp;
        registration.exists = true;

        // Update mappings
        _contentHashToId[contentHash] = registrationId;
        _creatorRegistrations[msg.sender].push(registrationId);
        _assetTypeRegistrations[assetType].push(registrationId);

        // Emit event
        emit CopyrightRegistered(
            registrationId,
            msg.sender,
            contentHash,
            ipfsCID,
            assetType
        );

        return registrationId;
    }

    // ============================================
    // View Functions - Registration Queries
    // ============================================

    /**
     * @notice Get registration details by ID
     * @param registrationId The registration ID to query
     * @return Registration struct with all details
     */
    function getRegistration(uint256 registrationId)
        external
        view
        returns (Registration memory)
    {
        require(_registrations[registrationId].exists, "Registration does not exist");
        return _registrations[registrationId];
    }

    /**
     * @notice Get registration details by content hash
     * @param contentHash The content hash to query
     * @return Registration struct with all details
     */
    function getRegistrationByHash(bytes32 contentHash)
        external
        view
        returns (Registration memory)
    {
        uint256 id = _contentHashToId[contentHash];
        require(id != 0, "Content not registered");
        return _registrations[id];
    }

    /**
     * @notice Get total number of registrations
     * @return Total count of all registrations
     */
    function getTotalRegistrations() external view returns (uint256) {
        return _registrationCounter;
    }

    // ============================================
    // View Functions - Content Verification
    // ============================================

    /**
     * @notice Check if content hash is already registered
     * @param contentHash The content hash to check
     * @return True if content is registered, false otherwise
     */
    function isContentRegistered(bytes32 contentHash) public view returns (bool) {
        return _contentHashToId[contentHash] != 0;
    }

    /**
     * @notice Get registration ID by content hash
     * @param contentHash The content hash to query
     * @return Registration ID, or 0 if not found
     */
    function getRegistrationIdByHash(bytes32 contentHash)
        external
        view
        returns (uint256)
    {
        return _contentHashToId[contentHash];
    }

    // ============================================
    // View Functions - Creator Queries
    // ============================================

    /**
     * @notice Get all registration IDs by a specific creator
     * @param creator The creator's address
     * @return Array of registration IDs
     */
    function getRegistrationsByCreator(address creator)
        external
        view
        returns (uint256[] memory)
    {
        return _creatorRegistrations[creator];
    }

    /**
     * @notice Get count of registrations by a creator
     * @param creator The creator's address
     * @return Number of registrations
     */
    function getCreatorRegistrationCount(address creator)
        external
        view
        returns (uint256)
    {
        return _creatorRegistrations[creator].length;
    }

    // ============================================
    // View Functions - Asset Type Queries
    // ============================================

    /**
     * @notice Get all registration IDs by asset type
     * @param assetType The asset type to query
     * @return Array of registration IDs
     */
    function getRegistrationsByAssetType(AssetType assetType)
        external
        view
        returns (uint256[] memory)
    {
        return _assetTypeRegistrations[assetType];
    }

    /**
     * @notice Get count of registrations by asset type
     * @param assetType The asset type to query
     * @return Number of registrations
     */
    function getAssetTypeCount(AssetType assetType)
        external
        view
        returns (uint256)
    {
        return _assetTypeRegistrations[assetType].length;
    }

    // ============================================
    // Helper Functions
    // ============================================

    /**
     * @notice Verify if an address is the creator of a registration
     * @param registrationId The registration ID to check
     * @param account The address to verify
     * @return True if the account is the creator
     */
    function isCreator(uint256 registrationId, address account)
        external
        view
        returns (bool)
    {
        require(_registrations[registrationId].exists, "Registration does not exist");
        return _registrations[registrationId].creator == account;
    }
}
