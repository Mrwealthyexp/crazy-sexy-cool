// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import './CoolToken.sol';

contract CSCMarketplace is Ownable, IERC721Receiver, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Listing {
        address seller;
        address tokenContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;
    mapping(address => mapping(uint256 => uint256)) public activeListingByToken;
    uint256 private _listingIdCounter;

    uint256 public constant PLATFORM_FEE = 250;
    uint256 public constant CREATOR_SHARE = 9000;
    uint256 public constant BURN_SHARE = 200;
    uint256 public constant CHARITY_SHARE = 100;
    uint256 public constant FEE_DENOMINATOR = 10000;

    address public treasury;
    address public charityPool;
    CoolToken public coolToken;

    event ItemListed(uint256 indexed listingId, address indexed seller, uint256 price);
    event ItemSold(uint256 indexed listingId, address indexed buyer, uint256 price);
    event ListingCancelled(uint256 indexed listingId);

    constructor(address _coolToken, address _treasury, address _charityPool) Ownable(msg.sender) {
        require(_coolToken != address(0) && _treasury != address(0) && _charityPool != address(0), 'Invalid address');
        coolToken = CoolToken(_coolToken);
        treasury = _treasury;
        charityPool = _charityPool;
    }

    function listItem(address tokenContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(tokenContract != address(0), 'Invalid token contract');
        require(price > 0, 'Price must be > 0');
        require(activeListingByToken[tokenContract][tokenId] == 0, 'Token already listed');

        IERC721(tokenContract).safeTransferFrom(msg.sender, address(this), tokenId);

        uint256 listingId = ++_listingIdCounter;
        listings[listingId] = Listing({
            seller: msg.sender,
            tokenContract: tokenContract,
            tokenId: tokenId,
            price: price,
            active: true
        });
        activeListingByToken[tokenContract][tokenId] = listingId;

        emit ItemListed(listingId, msg.sender, price);
    }

    function buyItem(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, 'Listing not active');
        require(listing.seller != msg.sender, 'Cannot buy own item');

        uint256 price = listing.price;
        uint256 sellerBaseAmount = (price * CREATOR_SHARE) / FEE_DENOMINATOR;
        uint256 platformFeeAmount = (price * PLATFORM_FEE) / FEE_DENOMINATOR;
        uint256 burnAmount = (price * BURN_SHARE) / FEE_DENOMINATOR;
        uint256 charityAmount = (price * CHARITY_SHARE) / FEE_DENOMINATOR;
        uint256 remainder = price - sellerBaseAmount - platformFeeAmount - burnAmount - charityAmount;
        uint256 sellerAmount = sellerBaseAmount + remainder;
        listing.active = false;
        activeListingByToken[listing.tokenContract][listing.tokenId] = 0;

        uint256 balanceBefore = coolToken.balanceOf(address(this));
        IERC20 token = IERC20(address(coolToken));
        token.safeTransferFrom(msg.sender, address(this), price);
        token.safeTransfer(listing.seller, sellerAmount);
        token.safeTransfer(treasury, platformFeeAmount);
        token.safeTransfer(charityPool, charityAmount);
        require(coolToken.burn(burnAmount), 'Burn failed');
        require(coolToken.balanceOf(address(this)) == balanceBefore, 'Settlement imbalance');

        IERC721(listing.tokenContract).safeTransferFrom(address(this), msg.sender, listing.tokenId);

        emit ItemSold(listingId, msg.sender, price);
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, 'Listing not active');
        require(listing.seller == msg.sender || msg.sender == owner(), 'Not authorized');

        listing.active = false;
        activeListingByToken[listing.tokenContract][listing.tokenId] = 0;
        IERC721(listing.tokenContract).safeTransferFrom(address(this), listing.seller, listing.tokenId);

        emit ListingCancelled(listingId);
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), 'Invalid treasury');
        treasury = _treasury;
    }

    function setCharityPool(address _charityPool) external onlyOwner {
        require(_charityPool != address(0), 'Invalid charity');
        charityPool = _charityPool;
    }

    function totalListings() external view returns (uint256) {
        return _listingIdCounter;
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
