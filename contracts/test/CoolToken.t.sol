// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {CoolToken} from "../src/CoolToken.sol";

contract CoolTokenTest is Test {
    address internal owner = makeAddr("owner");
    address internal treasury = makeAddr("treasury");
    address internal alice = makeAddr("alice");
    address internal bob = makeAddr("bob");

    CoolToken internal token;

    uint256 internal constant INITIAL_SUPPLY = 100_000_000 ether;
    uint256 internal constant MAX_SUPPLY = 1_000_000_000 ether;

    function setUp() public {
        token = new CoolToken(owner, treasury, INITIAL_SUPPLY, MAX_SUPPLY);
    }

    function test_constructorMintsToTreasury() public view {
        assertEq(token.balanceOf(treasury), INITIAL_SUPPLY);
        assertEq(token.totalSupply(), INITIAL_SUPPLY);
        assertEq(token.maxSupply(), MAX_SUPPLY);
        assertEq(token.owner(), owner);
    }

    function test_transfer() public {
        vm.prank(treasury);
        bool success = token.transfer(alice, 1_000 ether);
        assertTrue(success);
        assertEq(token.balanceOf(alice), 1_000 ether);
        assertEq(token.balanceOf(treasury), INITIAL_SUPPLY - 1_000 ether);
    }

    function test_transferFromUsesAllowance() public {
        vm.prank(treasury);
        token.approve(alice, 2_000 ether);

        vm.prank(alice);
        bool success = token.transferFrom(treasury, bob, 1_500 ether);

        assertTrue(success);
        assertEq(token.allowance(treasury, alice), 500 ether);
        assertEq(token.balanceOf(bob), 1_500 ether);
    }

    function test_onlyOwnerCanMint() public {
        vm.expectRevert(CoolToken.Unauthorized.selector);
        vm.prank(alice);
        token.mint(alice, 1 ether);

        vm.prank(owner);
        token.mint(alice, 1 ether);
        assertEq(token.balanceOf(alice), 1 ether);
    }

    function test_mintCannotExceedCap() public {
        uint256 maxMintable = MAX_SUPPLY - INITIAL_SUPPLY;
        vm.prank(owner);
        token.mint(alice, maxMintable);
        assertEq(token.totalSupply(), MAX_SUPPLY);

        vm.expectRevert(CoolToken.CapExceeded.selector);
        vm.prank(owner);
        token.mint(alice, 1);
    }

    function test_transferOwnership() public {
        vm.prank(owner);
        token.transferOwnership(alice);
        assertEq(token.owner(), alice);

        vm.expectRevert(CoolToken.Unauthorized.selector);
        vm.prank(owner);
        token.mint(alice, 1 ether);

        vm.prank(alice);
        token.mint(alice, 1 ether);
    }

    function test_burnReducesSupply() public {
        vm.prank(treasury);
        token.burn(10 ether);
        assertEq(token.totalSupply(), INITIAL_SUPPLY - 10 ether);
        assertEq(token.balanceOf(treasury), INITIAL_SUPPLY - 10 ether);
    }

    function test_burnFromUsesAllowance() public {
        vm.prank(treasury);
        token.approve(alice, 20 ether);

        vm.prank(alice);
        token.burnFrom(treasury, 12 ether);

        assertEq(token.totalSupply(), INITIAL_SUPPLY - 12 ether);
        assertEq(token.balanceOf(treasury), INITIAL_SUPPLY - 12 ether);
        assertEq(token.allowance(treasury, alice), 8 ether);
    }
}
