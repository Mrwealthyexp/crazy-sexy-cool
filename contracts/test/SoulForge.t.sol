// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {CoolToken} from '../src/CoolToken.sol';
import {KarmicLedger} from '../src/KarmicLedger.sol';
import {SoulForge} from '../src/SoulForge.sol';
import {TranscendenceEngine} from '../src/TranscendenceEngine.sol';

contract SoulForgeTest {
    SoulForge internal soulForge;
    KarmicLedger internal karmicLedger;
    CoolToken internal coolToken;
    TranscendenceEngine internal transcendenceEngine;

    function setUp() public {
        soulForge = new SoulForge(address(0), address(0));
        karmicLedger = new KarmicLedger();
        coolToken = new CoolToken();
        transcendenceEngine = new TranscendenceEngine(address(soulForge), address(karmicLedger), address(coolToken));
    }

    function test_soulForgeStartsWithZeroSupply() public view {
        require(soulForge.getTotalSouls() == 0, 'expected zero souls');
    }

    function test_forgeSoulStoresBlueprintAndWalletIndex() public {
        uint256 soulId = soulForge.forgeSoul{value: soulForge.MINT_COST()}(1, 7, 2, 0);
        SoulForge.SoulBlueprint memory soul = soulForge.getSoulBlueprint(soulId);

        require(soulForge.ownerOf(soulId) == address(this), 'owner mismatch');
        require(soulForge.getSoulByWallet(address(this)) == soulId, 'wallet index mismatch');
        require(soul.birthMonth == 7, 'birth month mismatch');
        require(soul.temperament == 0, 'temperament mismatch');
    }

    function test_transferUpdatesWalletIndex() public {
        uint256 soulId = soulForge.forgeSoul{value: soulForge.MINT_COST()}(0, 1, 0, 1);
        address recipient = address(0xCAFE);

        soulForge.transferFrom(address(this), recipient, soulId);

        require(soulForge.getSoulByWallet(address(this)) == 0, 'sender mapping not cleared');
        require(soulForge.getSoulByWallet(recipient) == soulId, 'recipient mapping not set');
    }

    function test_transcendenceEngineWiring() public view {
        require(address(transcendenceEngine.soulForge()) == address(soulForge), 'soulforge mismatch');
        require(address(transcendenceEngine.karmicLedger()) == address(karmicLedger), 'ledger mismatch');
        require(address(transcendenceEngine.coolToken()) == address(coolToken), 'cooltoken mismatch');
    }

    function test_combatEligibilityRequiresTierAndClearReputation() public {
        address player = address(0xBEEF);

        karmicLedger.setReputation(player, 10, 0, 0, false, false);
        karmicLedger.setLicenseTier(player, 2);

        bool eligible = karmicLedger.isEligibleForCombatTier(player, 2);
        require(eligible, 'expected eligible');
    }
}
