// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import 'forge-std/Test.sol';
import {KarmicLedger} from '../src/KarmicLedger.sol';
import {SoulForge} from '../src/SoulForge.sol';

contract SoulForgeTest is Test {
    SoulForge internal soulForge;
    KarmicLedger internal karmicLedger;

    function setUp() public {
        soulForge = new SoulForge();
        karmicLedger = new KarmicLedger();
    }

    function test_mintAvatarStoresOwnerAndMetadata() public {
        uint256 avatarId = soulForge.mintAvatar('cool', 'architect');
        SoulForge.AvatarProfile memory avatar = soulForge.getAvatar(avatarId);

        assertEq(avatar.owner, address(this));
        assertEq(avatar.temperament, 'cool');
        assertEq(avatar.archetype, 'architect');
    }

    function test_combatEligibilityRequiresTierAndClearReputation() public {
        address player = address(0xBEEF);

        karmicLedger.setReputation(player, 10, 0, 0, false, false);
        karmicLedger.setLicenseTier(player, 2);

        bool eligible = karmicLedger.isEligibleForCombatTier(player, 2);
        assertTrue(eligible);
    }
}
