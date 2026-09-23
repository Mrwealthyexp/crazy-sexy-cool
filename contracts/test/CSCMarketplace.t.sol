// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {CSCMarketplace} from '../src/CSCMarketplace.sol';
import {CoolToken} from '../src/CoolToken.sol';

contract MockNFT is ERC721 {
    constructor() ERC721('Mock NFT', 'MNFT') {}

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}

contract MarketActor {
    function approveNFT(MockNFT nft, address operator, uint256 tokenId) external {
        nft.approve(operator, tokenId);
    }

    function list(CSCMarketplace marketplace, address tokenContract, uint256 tokenId, uint256 price) external {
        marketplace.listItem(tokenContract, tokenId, price);
    }

    function cancel(CSCMarketplace marketplace, uint256 listingId) external {
        marketplace.cancelListing(listingId);
    }

    function approveCool(CoolToken coolToken, address spender, uint256 amount) external {
        coolToken.approve(spender, amount);
    }

    function buy(CSCMarketplace marketplace, uint256 listingId) external {
        marketplace.buyItem(listingId);
    }
}

contract CSCMarketplaceTest {
    CoolToken internal coolToken;
    CSCMarketplace internal marketplace;
    MockNFT internal nft;
    MarketActor internal seller;
    MarketActor internal buyer;

    uint256 internal constant PRICE = 10000;

    function setUp() public {
        coolToken = new CoolToken();
        marketplace = new CSCMarketplace(address(coolToken), address(0xAAA1), address(0xBBB2));
        nft = new MockNFT();
        seller = new MarketActor();
        buyer = new MarketActor();

        nft.mint(address(seller), 1);
        nft.mint(address(seller), 2);

        coolToken.mint(address(buyer), PRICE * 10);
    }

    function _listToken(uint256 tokenId, uint256 price) internal {
        seller.approveNFT(nft, address(marketplace), tokenId);
        seller.list(marketplace, address(nft), tokenId, price);
    }

    function test_duplicateListingRevertsAndRelistAfterCancelWorks() public {
        _listToken(1, PRICE);

        (bool duplicateSuccess, ) = address(seller).call(
            abi.encodeWithSignature('list(address,address,uint256,uint256)', address(marketplace), address(nft), 1, PRICE)
        );
        require(!duplicateSuccess, 'expected duplicate listing revert');

        seller.cancel(marketplace, 1);
        require(marketplace.activeListingByToken(address(nft), 1) == 0, 'active listing not cleared on cancel');

        _listToken(1, PRICE + 100);
        require(marketplace.activeListingByToken(address(nft), 1) == 2, 'relist did not create new active listing');
    }

    function test_buyItemDistributesFundsAndClearsState() public {
        _listToken(2, PRICE);

        uint256 supplyBefore = coolToken.totalSupply();
        buyer.approveCool(coolToken, address(marketplace), PRICE);
        buyer.buy(marketplace, 1);

        uint256 sellerBaseAmount = (PRICE * marketplace.CREATOR_SHARE()) / marketplace.FEE_DENOMINATOR();
        uint256 platformFeeAmount = (PRICE * marketplace.PLATFORM_FEE()) / marketplace.FEE_DENOMINATOR();
        uint256 burnAmount = (PRICE * marketplace.BURN_SHARE()) / marketplace.FEE_DENOMINATOR();
        uint256 charityAmount = (PRICE * marketplace.CHARITY_SHARE()) / marketplace.FEE_DENOMINATOR();
        uint256 remainder = PRICE - sellerBaseAmount - platformFeeAmount - burnAmount - charityAmount;
        uint256 expectedSellerAmount = sellerBaseAmount + remainder;

        require(nft.ownerOf(2) == address(buyer), 'buyer did not receive NFT');
        require(marketplace.activeListingByToken(address(nft), 2) == 0, 'active listing not cleared on sale');
        require(coolToken.balanceOf(address(seller)) == expectedSellerAmount, 'seller payout mismatch');
        require(coolToken.balanceOf(address(0xAAA1)) == platformFeeAmount, 'treasury payout mismatch');
        require(coolToken.balanceOf(address(0xBBB2)) == charityAmount, 'charity payout mismatch');
        require(coolToken.balanceOf(address(marketplace)) == 0, 'marketplace should not retain funds');
        require(coolToken.totalSupply() == supplyBefore - burnAmount, 'burn amount mismatch');
    }

    function test_sellerCannotBuyOwnListing() public {
        _listToken(1, PRICE);

        coolToken.mint(address(seller), PRICE);
        seller.approveCool(coolToken, address(marketplace), PRICE);

        (bool success, ) = address(seller).call(abi.encodeWithSignature('buy(address,uint256)', address(marketplace), 1));
        require(!success, 'expected self-buy revert');
    }
}
