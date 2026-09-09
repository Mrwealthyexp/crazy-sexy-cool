// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/SoulForge.sol";

contract SoulForgeTest is Test {
    SoulForge public soulForge;
    address public user1;
    address public user2;

    function setUp() public {
        user1 = address(0x1);
        user2 = address(0x2);
        vm.deal(user1, 1 ether);
        vm.deal(user2, 1 ether);

        soulForge = new SoulForge(address(0), address(0));
    }

    function test_ForgeSoul() public {
        vm.prank(user1);
        uint256 soulId = soulForge.forgeSoul{value: 0.01 ether}(0, 6, 2, 0);

        assertEq(soulForge.ownerOf(soulId), user1);
        assertEq(soulForge.getSoulByWallet(user1), soulId);

        SoulForge.SoulBlueprint memory blueprint = soulForge.getSoulBlueprint(soulId);
        assertEq(blueprint.sex, 0);
        assertEq(blueprint.birthMonth, 6);
        assertEq(blueprint.moonPhase, 2);
        assertEq(blueprint.temperament, 0);
        assertTrue(blueprint.rulingPlanet <= 9);
    }

    function test_CannotForgeTwice() public {
        vm.startPrank(user1);
        soulForge.forgeSoul{value: 0.01 ether}(0, 6, 2, 0);

        vm.expectRevert("Wallet already has soul");
        soulForge.forgeSoul{value: 0.01 ether}(0, 6, 2, 0);
        vm.stopPrank();
    }

    function test_InsufficientPayment() public {
        vm.prank(user1);
        vm.expectRevert("Insufficient payment");
        soulForge.forgeSoul{value: 0.005 ether}(0, 6, 2, 0);
    }

    function test_Withdraw() public {
        vm.prank(user1);
        soulForge.forgeSoul{value: 0.01 ether}(0, 6, 2, 0);

        soulForge.withdraw();
        assertTrue(address(soulForge).balance == 0);
    }
}
