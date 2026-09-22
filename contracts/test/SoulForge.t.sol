// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {KarmicLedger} from '../src/KarmicLedger.sol';
import {SoulForge} from '../src/SoulForge.sol';

contract SoulForgeTest {
    SoulForge internal soulForge;
    KarmicLedger internal karmicLedger;

    function setUp() public {
        soulForge = new SoulForge();
        karmicLedger = new KarmicLedger();
    }

    function test_mintAvatarStoresOwnerAndMetadata() public {
        uint256 avatarId = soulForge.mintAvatar('cool', 'architect');
        SoulForge.AvatarProfile memory avatar = soulForge.getAvatar(avatarId);

        require(avatar.owner == address(this), 'owner mismatch');
        require(keccak256(bytes(avatar.temperament)) == keccak256(bytes('cool')), 'temperament mismatch');
        require(keccak256(bytes(avatar.archetype)) == keccak256(bytes('architect')), 'archetype mismatch');
    }

    function test_combatEligibilityRequiresTierAndClearReputation() public {
        address player = address(0xBEEF);

        karmicLedger.setReputation(player, 10, 0, 0, false, false);
        karmicLedger.setLicenseTier(player, 2);

        bool eligible = karmicLedger.isEligibleForCombatTier(player, 2);
        require(eligible, 'expected eligible');
    }
}
