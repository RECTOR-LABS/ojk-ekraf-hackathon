// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./CopyrightRegistry.sol";

/**
 * @title KaryaNFT
 * @notice NFT contract for tokenizing registered copyrighted creative works
 * @dev Implements ERC-721 for unique NFTs and ERC-2981 for royalty standard
 *
 * Key Features:
 * - Each NFT links to a registered copyright in CopyrightRegistry
 * - Automatic royalty enforcement via ERC-2981 (5-20% configurable)
 * - Only copyright owner can mint NFT for their registered work
 * - IPFS metadata support for decentralized storage
 * - Prevents duplicate minting of same copyright
 */
contract KaryaNFT is ERC721URIStorage, ERC2981, Ownable, ReentrancyGuard {

    // ============================================
    // State Variables
    // ============================================

    /// @notice Reference to CopyrightRegistry contract
    CopyrightRegistry public immutable copyrightRegistry;

    /// @notice Next token ID to be minted
    uint256 private _nextTokenId;

    /// @notice Default royalty percentage in basis points (10% = 1000)
    uint96 public constant DEFAULT_ROYALTY_BPS = 1000; // 10%

    /// @notice Minimum royalty percentage (5% = 500 basis points)
    uint96 public constant MIN_ROYALTY_BPS = 500;

    /// @notice Maximum royalty percentage (20% = 2000 basis points)
    uint96 public constant MAX_ROYALTY_BPS = 2000;

    /// @notice Mapping from copyright ID to minted token ID (prevents duplicate minting)
    mapping(uint256 => uint256) public copyrightToToken;

    /// @notice Mapping from token ID to copyright ID (links NFT to copyright)
    mapping(uint256 => uint256) public tokenToCopyright;

    /// @notice Mapping to check if a copyright has been minted
    mapping(uint256 => bool) public isCopyrightMinted;

    // ============================================
    // Events
    // ============================================

    /**
     * @notice Emitted when a new NFT is minted from a registered copyright
     * @param tokenId The ID of the newly minted NFT
     * @param copyrightId The ID of the linked copyright registration
     * @param creator The address of the creator/minter
     * @param royaltyPercentage The royalty percentage in basis points
     * @param tokenURI The IPFS URI for the NFT metadata
     */
    event NFTMinted(
        uint256 indexed tokenId,
        uint256 indexed copyrightId,
        address indexed creator,
        uint96 royaltyPercentage,
        string tokenURI
    );

    /**
     * @notice Emitted when royalty info is updated for a token
     * @param tokenId The NFT token ID
     * @param receiver The royalty receiver address
     * @param royaltyPercentage The new royalty percentage in basis points
     */
    event RoyaltyUpdated(
        uint256 indexed tokenId,
        address indexed receiver,
        uint96 royaltyPercentage
    );

    // ============================================
    // Errors
    // ============================================

    error CopyrightNotFound(uint256 copyrightId);
    error NotCopyrightOwner(address caller, address owner);
    error CopyrightAlreadyMinted(uint256 copyrightId, uint256 existingTokenId);
    error InvalidRoyaltyPercentage(uint96 provided, uint96 min, uint96 max);
    error EmptyTokenURI();
    error TokenNotFound(uint256 tokenId);

    // ============================================
    // Constructor
    // ============================================

    /**
     * @notice Initialize the KaryaNFT contract
     * @param _copyrightRegistry Address of the CopyrightRegistry contract
     */
    constructor(address _copyrightRegistry)
        ERC721("Karya Chain NFT", "KARYA")
        Ownable(msg.sender)
    {
        require(_copyrightRegistry != address(0), "Invalid registry address");
        copyrightRegistry = CopyrightRegistry(_copyrightRegistry);
        _nextTokenId = 1; // Start token IDs from 1
    }

    // ============================================
    // External Functions
    // ============================================

    /**
     * @notice Mint an NFT for a registered copyright work
     * @dev Only the copyright owner can mint. Prevents duplicate minting.
     * @param copyrightId The ID of the registered copyright
     * @param tokenURI_ The IPFS URI for the NFT metadata
     * @param royaltyPercentage Royalty percentage in basis points (500-2000 = 5-20%)
     * @return tokenId The ID of the newly minted NFT
     */
    function mint(
        uint256 copyrightId,
        string calldata tokenURI_,
        uint96 royaltyPercentage
    ) external nonReentrant returns (uint256) {
        // Validate inputs
        if (bytes(tokenURI_).length == 0) revert EmptyTokenURI();
        if (royaltyPercentage < MIN_ROYALTY_BPS || royaltyPercentage > MAX_ROYALTY_BPS) {
            revert InvalidRoyaltyPercentage(royaltyPercentage, MIN_ROYALTY_BPS, MAX_ROYALTY_BPS);
        }

        // Verify copyright exists and get registration details
        CopyrightRegistry.Registration memory registration;
        try copyrightRegistry.getRegistration(copyrightId) returns (CopyrightRegistry.Registration memory reg) {
            registration = reg;
        } catch {
            revert CopyrightNotFound(copyrightId);
        }

        // Verify caller is the copyright owner
        if (msg.sender != registration.creator) {
            revert NotCopyrightOwner(msg.sender, registration.creator);
        }

        // Prevent duplicate minting
        if (isCopyrightMinted[copyrightId]) {
            revert CopyrightAlreadyMinted(copyrightId, copyrightToToken[copyrightId]);
        }

        // Mint the NFT
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        // Set royalty info (ERC-2981)
        _setTokenRoyalty(tokenId, msg.sender, royaltyPercentage);

        // Link copyright to token
        copyrightToToken[copyrightId] = tokenId;
        tokenToCopyright[tokenId] = copyrightId;
        isCopyrightMinted[copyrightId] = true;

        emit NFTMinted(tokenId, copyrightId, msg.sender, royaltyPercentage, tokenURI_);

        return tokenId;
    }

    /**
     * @notice Mint an NFT with default royalty percentage (10%)
     * @param copyrightId The ID of the registered copyright
     * @param tokenURI_ The IPFS URI for the NFT metadata
     * @return tokenId The ID of the newly minted NFT
     */
    function mintWithDefaultRoyalty(
        uint256 copyrightId,
        string calldata tokenURI_
    ) external nonReentrant returns (uint256) {
        // Validate inputs
        if (bytes(tokenURI_).length == 0) revert EmptyTokenURI();

        // Verify copyright exists and get registration details
        CopyrightRegistry.Registration memory registration;
        try copyrightRegistry.getRegistration(copyrightId) returns (CopyrightRegistry.Registration memory reg) {
            registration = reg;
        } catch {
            revert CopyrightNotFound(copyrightId);
        }

        // Verify caller is the copyright owner
        if (msg.sender != registration.creator) {
            revert NotCopyrightOwner(msg.sender, registration.creator);
        }

        // Prevent duplicate minting
        if (isCopyrightMinted[copyrightId]) {
            revert CopyrightAlreadyMinted(copyrightId, copyrightToToken[copyrightId]);
        }

        // Mint the NFT
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        // Set default royalty info (ERC-2981)
        _setTokenRoyalty(tokenId, msg.sender, DEFAULT_ROYALTY_BPS);

        // Link copyright to token
        copyrightToToken[copyrightId] = tokenId;
        tokenToCopyright[tokenId] = copyrightId;
        isCopyrightMinted[copyrightId] = true;

        emit NFTMinted(tokenId, copyrightId, msg.sender, DEFAULT_ROYALTY_BPS, tokenURI_);

        return tokenId;
    }

    /**
     * @notice Update royalty information for a token (only owner can update)
     * @param tokenId The NFT token ID
     * @param receiver The new royalty receiver address
     * @param royaltyPercentage The new royalty percentage in basis points
     */
    function updateRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 royaltyPercentage
    ) external {
        if (_ownerOf(tokenId) == address(0)) {
            revert TokenNotFound(tokenId);
        }
        if (msg.sender != ownerOf(tokenId)) {
            revert NotCopyrightOwner(msg.sender, ownerOf(tokenId));
        }
        if (royaltyPercentage < MIN_ROYALTY_BPS || royaltyPercentage > MAX_ROYALTY_BPS) {
            revert InvalidRoyaltyPercentage(royaltyPercentage, MIN_ROYALTY_BPS, MAX_ROYALTY_BPS);
        }

        _setTokenRoyalty(tokenId, receiver, royaltyPercentage);
        emit RoyaltyUpdated(tokenId, receiver, royaltyPercentage);
    }

    // ============================================
    // View Functions
    // ============================================

    /**
     * @notice Get the copyright ID linked to an NFT
     * @param tokenId The NFT token ID
     * @return The copyright registration ID
     */
    function getCopyrightId(uint256 tokenId) external view returns (uint256) {
        if (_ownerOf(tokenId) == address(0)) {
            revert TokenNotFound(tokenId);
        }
        return tokenToCopyright[tokenId];
    }

    /**
     * @notice Get the token ID for a minted copyright
     * @param copyrightId The copyright registration ID
     * @return tokenId The NFT token ID (0 if not minted)
     */
    function getTokenIdByCopyright(uint256 copyrightId) external view returns (uint256) {
        return copyrightToToken[copyrightId];
    }

    /**
     * @notice Check if a copyright has been minted as NFT
     * @param copyrightId The copyright registration ID
     * @return True if minted, false otherwise
     */
    function isMinted(uint256 copyrightId) external view returns (bool) {
        return isCopyrightMinted[copyrightId];
    }

    /**
     * @notice Get the current token ID counter
     * @return The next token ID that will be minted
     */
    function getCurrentTokenId() external view returns (uint256) {
        return _nextTokenId;
    }

    /**
     * @notice Get total number of NFTs minted
     * @return Total minted tokens
     */
    function totalMinted() external view returns (uint256) {
        return _nextTokenId - 1;
    }

    // ============================================
    // Override Functions (ERC-165)
    // ============================================

    /**
     * @notice Check if contract supports an interface
     * @dev Required for ERC-721 and ERC-2981 compatibility
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
