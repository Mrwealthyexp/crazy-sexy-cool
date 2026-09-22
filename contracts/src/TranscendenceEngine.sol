// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {KarmicLedger} from './KarmicLedger.sol';

contract TranscendenceEngine {
    struct JourneyState {
        uint32 level;
        uint32 souls;
        bool governanceUnlocked;
    }

    KarmicLedger public immutable karmicLedger;
    mapping(uint256 => JourneyState) private journeyByAvatar;

    constructor(address ledgerAddress) {
        karmicLedger = KarmicLedger(ledgerAddress);
    }

    function setJourneyState(uint256 avatarId, uint32 level, uint32 souls, bool governanceUnlocked) external {
        journeyByAvatar[avatarId] = JourneyState({
            level: level,
            souls: souls,
            governanceUnlocked: governanceUnlocked
        });
    }

    function getJourneyState(uint256 avatarId) external view returns (JourneyState memory) {
        return journeyByAvatar[avatarId];
    }

    function canEnterLicensedCombat(address player, uint8 requiredTier) external view returns (bool) {
        return karmicLedger.isEligibleForCombatTier(player, requiredTier);
    }
}
