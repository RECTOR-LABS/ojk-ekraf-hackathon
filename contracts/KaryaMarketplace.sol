// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title KaryaMarketplace
 * @notice Decentralized marketplace for trading Karya Chain NFTs with automatic royalty distribution
 * @dev Implements fixed-price listings with ERC-2981 royalty enforcement
 *
 * Key Features:
 * - Fixed-price primary and secondary sales
 * - Automatic creator royalty distribution (ERC-2981)
 * - Platform fee collection (2.5%)
 * - Listing management (create, cancel, update)
 * - Perpetual royalty enforcement across all resales
 */
contract KaryaMarketplace is Ownable, ReentrancyGuard {

    // ============================================
    // State Variables
    // ============================================

    /// @notice Platform fee in basis points (2.5% = 250)
    uint96 public constant PLATFORM_FEE_BPS = 250; // 2.5%

    /// @notice Basis points denominator (100% = 10000)
    uint96 public constant BPS_DENOMINATOR = 10000;

    /// @notice Platform fee recipient address
    address payable public platformFeeRecipient;

    /// @notice Next listing ID
    uint256 private _nextListingId;

    // ============================================
    // Structs
    // ============================================

    /// @notice Listing structure
    struct Listing {
        uint256 listingId;         // Unique listing ID
        address nftContract;       // NFT contract address
        uint256 tokenId;           // NFT token ID
        address payable seller;    // Seller address
        uint256 price;             // Listing price in wei
        bool active;               // Whether listing is active
        uint256 listedAt;          // Block timestamp when listed
    }

    // ============================================
    // Storage
    // ============================================

    /// @notice Mapping from listing ID to Listing
    mapping(uint256 => Listing) public listings;

    /// @notice Mapping from NFT contract + token ID to listing ID
    mapping(address => mapping(uint256 => uint256)) public nftToListing;

    /// @notice Array of all listing IDs (for enumeration)
    uint256[] private _allListings;

    // ============================================
    // Events
    // ============================================

    /**
     * @notice Emitted when an NFT is listed for sale
     * @param listingId The listing ID
     * @param nftContract The NFT contract address
     * @param tokenId The NFT token ID
     * @param seller The seller address
     * @param price The listing price
     */
    event NFTListed(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    /**
     * @notice Emitted when an NFT is sold
     * @param listingId The listing ID
     * @param nftContract The NFT contract address
     * @param tokenId The NFT token ID
     * @param seller The seller address
     * @param buyer The buyer address
     * @param price The sale price
     * @param royaltyAmount The royalty amount paid to creator
     * @param platformFee The platform fee collected
     */
    event NFTSold(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price,
        uint256 royaltyAmount,
        uint256 platformFee
    );

    /**
     * @notice Emitted when a listing is cancelled
     * @param listingId The listing ID
     * @param nftContract The NFT contract address
     * @param tokenId The NFT token ID
     */
    event ListingCancelled(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId
    );

    /**
     * @notice Emitted when a listing price is updated
     * @param listingId The listing ID
     * @param oldPrice The old price
     * @param newPrice The new price
     */
    event ListingUpdated(
        uint256 indexed listingId,
        uint256 oldPrice,
        uint256 newPrice
    );

    /**
     * @notice Emitted when platform fee recipient is updated
     * @param oldRecipient The old recipient
     * @param newRecipient The new recipient
     */
    event PlatformFeeRecipientUpdated(
        address indexed oldRecipient,
        address indexed newRecipient
    );

    // ============================================
    // Errors
    // ============================================

    error InvalidPrice();
    error NotNFTOwner();
    error NFTAlreadyListed(uint256 existingListingId);
    error ListingNotFound(uint256 listingId);
    error ListingNotActive(uint256 listingId);
    error NotSeller();
    error InsufficientPayment(uint256 required, uint256 provided);
    error InvalidFeeRecipient();
    error TransferFailed();
    error NotApproved();

    // ============================================
    // Constructor
    // ============================================

    /**
     * @notice Initialize the marketplace
     * @param _platformFeeRecipient Address to receive platform fees
     */
    constructor(address payable _platformFeeRecipient) Ownable(msg.sender) {
        if (_platformFeeRecipient == address(0)) revert InvalidFeeRecipient();
        platformFeeRecipient = _platformFeeRecipient;
        _nextListingId = 1;
    }

    // ============================================
    // External Functions - Listing Management
    // ============================================

    /**
     * @notice List an NFT for sale
     * @param nftContract The NFT contract address
     * @param tokenId The NFT token ID
     * @param price The listing price in wei
     * @return listingId The ID of the new listing
     */
    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external nonReentrant returns (uint256) {
        // Validate inputs
        if (price == 0) revert InvalidPrice();

        IERC721 nft = IERC721(nftContract);

        // Verify caller owns the NFT
        if (nft.ownerOf(tokenId) != msg.sender) revert NotNFTOwner();

        // Verify NFT is approved for marketplace
        if (nft.getApproved(tokenId) != address(this) &&
            !nft.isApprovedForAll(msg.sender, address(this))) {
            revert NotApproved();
        }

        // Check if NFT is already listed
        uint256 existingListingId = nftToListing[nftContract][tokenId];
        if (existingListingId != 0 && listings[existingListingId].active) {
            revert NFTAlreadyListed(existingListingId);
        }

        // Create listing
        uint256 listingId = _nextListingId++;
        listings[listingId] = Listing({
            listingId: listingId,
            nftContract: nftContract,
            tokenId: tokenId,
            seller: payable(msg.sender),
            price: price,
            active: true,
            listedAt: block.timestamp
        });

        nftToListing[nftContract][tokenId] = listingId;
        _allListings.push(listingId);

        emit NFTListed(listingId, nftContract, tokenId, msg.sender, price);

        return listingId;
    }

    /**
     * @notice Purchase an NFT from a listing
     * @param listingId The listing ID to purchase
     */
    function buyNFT(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];

        // Validate listing
        if (listing.listingId == 0) revert ListingNotFound(listingId);
        if (!listing.active) revert ListingNotActive(listingId);
        if (msg.value < listing.price) {
            revert InsufficientPayment(listing.price, msg.value);
        }

        // Mark listing as inactive
        listing.active = false;
        delete nftToListing[listing.nftContract][listing.tokenId];

        // Calculate fees and payments
        uint256 salePrice = listing.price;
        uint256 platformFee = (salePrice * PLATFORM_FEE_BPS) / BPS_DENOMINATOR;
        uint256 royaltyAmount = 0;
        address royaltyReceiver = address(0);

        // Check if NFT supports ERC-2981 royalty standard
        try IERC2981(listing.nftContract).royaltyInfo(listing.tokenId, salePrice)
            returns (address receiver, uint256 amount) {
            royaltyReceiver = receiver;
            royaltyAmount = amount;
        } catch {
            // NFT doesn't support ERC-2981, no royalty
        }

        // Calculate seller proceeds
        uint256 sellerProceeds = salePrice - platformFee - royaltyAmount;

        // Transfer NFT to buyer
        IERC721(listing.nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );

        // Distribute payments
        // 1. Platform fee
        (bool platformSuccess, ) = platformFeeRecipient.call{value: platformFee}("");
        if (!platformSuccess) revert TransferFailed();

        // 2. Royalty (if applicable)
        if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
            (bool royaltySuccess, ) = payable(royaltyReceiver).call{value: royaltyAmount}("");
            if (!royaltySuccess) revert TransferFailed();
        }

        // 3. Seller proceeds
        (bool sellerSuccess, ) = listing.seller.call{value: sellerProceeds}("");
        if (!sellerSuccess) revert TransferFailed();

        // Refund excess payment
        if (msg.value > salePrice) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - salePrice}("");
            if (!refundSuccess) revert TransferFailed();
        }

        emit NFTSold(
            listingId,
            listing.nftContract,
            listing.tokenId,
            listing.seller,
            msg.sender,
            salePrice,
            royaltyAmount,
            platformFee
        );
    }

    /**
     * @notice Cancel a listing
     * @param listingId The listing ID to cancel
     */
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];

        // Validate listing
        if (listing.listingId == 0) revert ListingNotFound(listingId);
        if (!listing.active) revert ListingNotActive(listingId);
        if (listing.seller != msg.sender) revert NotSeller();

        // Mark listing as inactive
        listing.active = false;
        delete nftToListing[listing.nftContract][listing.tokenId];

        emit ListingCancelled(listingId, listing.nftContract, listing.tokenId);
    }

    /**
     * @notice Update listing price
     * @param listingId The listing ID to update
     * @param newPrice The new price
     */
    function updateListingPrice(uint256 listingId, uint256 newPrice) external nonReentrant {
        Listing storage listing = listings[listingId];

        // Validate listing
        if (listing.listingId == 0) revert ListingNotFound(listingId);
        if (!listing.active) revert ListingNotActive(listingId);
        if (listing.seller != msg.sender) revert NotSeller();
        if (newPrice == 0) revert InvalidPrice();

        uint256 oldPrice = listing.price;
        listing.price = newPrice;

        emit ListingUpdated(listingId, oldPrice, newPrice);
    }

    // ============================================
    // View Functions
    // ============================================

    /**
     * @notice Get listing details
     * @param listingId The listing ID
     * @return Listing struct
     */
    function getListing(uint256 listingId) external view returns (Listing memory) {
        if (listings[listingId].listingId == 0) revert ListingNotFound(listingId);
        return listings[listingId];
    }

    /**
     * @notice Get listing ID for an NFT
     * @param nftContract The NFT contract address
     * @param tokenId The NFT token ID
     * @return Listing ID (0 if not listed)
     */
    function getListingByNFT(address nftContract, uint256 tokenId)
        external
        view
        returns (uint256)
    {
        return nftToListing[nftContract][tokenId];
    }

    /**
     * @notice Check if an NFT is listed
     * @param nftContract The NFT contract address
     * @param tokenId The NFT token ID
     * @return True if listed and active
     */
    function isNFTListed(address nftContract, uint256 tokenId) external view returns (bool) {
        uint256 listingId = nftToListing[nftContract][tokenId];
        return listingId != 0 && listings[listingId].active;
    }

    /**
     * @notice Get total number of listings ever created
     * @return Total listings count
     */
    function getTotalListings() external view returns (uint256) {
        return _nextListingId - 1;
    }

    /**
     * @notice Get all listing IDs
     * @return Array of all listing IDs
     */
    function getAllListingIds() external view returns (uint256[] memory) {
        return _allListings;
    }

    // ============================================
    // Admin Functions
    // ============================================

    /**
     * @notice Update platform fee recipient (only owner)
     * @param newRecipient The new recipient address
     */
    function updatePlatformFeeRecipient(address payable newRecipient) external onlyOwner {
        if (newRecipient == address(0)) revert InvalidFeeRecipient();

        address oldRecipient = platformFeeRecipient;
        platformFeeRecipient = newRecipient;

        emit PlatformFeeRecipientUpdated(oldRecipient, newRecipient);
    }

    // ============================================
    // Receive Function
    // ============================================

    /**
     * @notice Reject direct ETH transfers
     */
    receive() external payable {
        revert("Direct transfers not allowed");
    }
}
