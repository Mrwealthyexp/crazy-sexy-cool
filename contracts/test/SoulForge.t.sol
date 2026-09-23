// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {CoolToken} from '../src/CoolToken.sol';
import {KarmicLedger} from '../src/KarmicLedger.sol';
import {SoulForge} from '../src/SoulForge.sol';
import {TranscendenceEngine} from '../src/TranscendenceEngine.sol';

contract SoulTransferHelper {
    function forgeAndTransfer(SoulForge soulForge, address recipient) external payable returns (uint256 soulId) {
        soulId = soulForge.forgeSoul{value: msg.value}(2, 12, 4, 3);
        soulForge.transferFrom(address(this), recipient, soulId);
    }
}

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

    function attemptTransferTo(address recipient, uint256 soulId) external {
        soulForge.transferFrom(address(this), recipient, soulId);
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

    function test_transferToWalletWithExistingSoulReverts() public {
        uint256 soulId = soulForge.forgeSoul{value: soulForge.MINT_COST()}(1, 5, 1, 2);
        address recipient = address(0xBEEF);
        SoulTransferHelper helper = new SoulTransferHelper();

        helper.forgeAndTransfer{value: soulForge.MINT_COST()}(soulForge, recipient);

        try this.attemptTransferTo(recipient, soulId) {
            revert('expected transfer revert');
        } catch Error(string memory reason) {
            require(
                keccak256(bytes(reason)) == keccak256(bytes('Wallet already has soul')),
                'unexpected revert reason'
            );
        }
    }

    function test_ownerCanWithdrawMintProceeds() public {
        soulForge.forgeSoul{value: soulForge.MINT_COST()}(2, 3, 1, 1);
        uint256 ownerBalanceBeforeWithdraw = address(this).balance;
        uint256 contractBalanceBeforeWithdraw = address(soulForge).balance;

        soulForge.withdraw();

        require(address(soulForge).balance == 0, 'contract balance not emptied');
        require(
            address(this).balance == ownerBalanceBeforeWithdraw + contractBalanceBeforeWithdraw,
            'owner did not receive full proceeds'
        );
    }

    function test_levelUpJobCanTriggerOverEvolved() public {
        uint256 soulId = soulForge.forgeSoul{value: soulForge.MINT_COST()}(1, 8, 1, 0);

        transcendenceEngine.initializeSoulState(soulId);
        transcendenceEngine.addMitochondrialPoints(soulId, 10001);
        transcendenceEngine.levelUpJob(soulId, 0);

        uint256 jobLevel = transcendenceEngine.getJobLevel(soulId, 0);
        (
            TranscendenceEngine.WorldlyState stage,
            uint256 whiteKarma,
            uint256 blackKarma,
            uint256 grayKarma,
            uint256 soulTokens,
            uint256 mitochondrialPoints,
            bool overEvolved,
            uint256 lastAscensionTime,
            uint256 interventionsPerformed,
            uint256 interventionsReceived
        ) = transcendenceEngine.getSoulState(soulId);

        stage;
        whiteKarma;
        blackKarma;
        grayKarma;
        soulTokens;
        mitochondrialPoints;
        lastAscensionTime;
        interventionsPerformed;
        interventionsReceived;

        require(jobLevel == 1, 'job level not increased');
        require(overEvolved, 'expected overEvolved');
    }

    function test_karmicAndSoulTokenMutatorsUpdateState() public {
        uint256 soulId = soulForge.forgeSoul{value: soulForge.MINT_COST()}(0, 9, 2, 2);
        transcendenceEngine.initializeSoulState(soulId);

        transcendenceEngine.recordKarma(soulId, 0, 5);
        transcendenceEngine.earnSoulTokens(soulId, 50);
        transcendenceEngine.burnSoulTokens(soulId, 25);

        (
            TranscendenceEngine.WorldlyState stage,
            uint256 whiteKarma,
            uint256 blackKarma,
            uint256 grayKarma,
            uint256 soulTokens,
            uint256 mitochondrialPoints,
            bool overEvolved,
            uint256 lastAscensionTime,
            uint256 interventionsPerformed,
            uint256 interventionsReceived
        ) = transcendenceEngine.getSoulState(soulId);

        stage;
        blackKarma;
        grayKarma;
        mitochondrialPoints;
        overEvolved;
        lastAscensionTime;
        interventionsPerformed;
        interventionsReceived;

        require(whiteKarma == 5, 'white karma mismatch');
        require(soulTokens == (100 * 10 ** 18) + 25, 'soul token mismatch');
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
