// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract KarmicLedger {
    struct ReputationProfile {
        uint64 whiteKarma;
        uint64 grayKarma;
        uint64 blackKarma;
        uint8 licenseTier;
        bool fraudFlag;
        bool banned;
    }

    address public immutable admin;

    mapping(address => ReputationProfile) private profiles;

    event ReputationUpdated(address indexed player, uint64 whiteKarma, uint64 grayKarma, uint64 blackKarma);
    event LicenseTierSet(address indexed player, uint8 tier);
    event KarmaRecorded(uint256 indexed soulId, uint8 indexed karmaType, uint256 amount, string reason);

    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin');
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setReputation(
        address player,
        uint64 whiteKarma,
        uint64 grayKarma,
        uint64 blackKarma,
        bool fraudFlag,
        bool banned
    ) external onlyAdmin {
        ReputationProfile storage profile = profiles[player];
        profile.whiteKarma = whiteKarma;
        profile.grayKarma = grayKarma;
        profile.blackKarma = blackKarma;
        profile.fraudFlag = fraudFlag;
        profile.banned = banned;

        emit ReputationUpdated(player, whiteKarma, grayKarma, blackKarma);
    }

    function setLicenseTier(address player, uint8 tier) external onlyAdmin {
        profiles[player].licenseTier = tier;
        emit LicenseTierSet(player, tier);
    }

    function recordKarma(uint256 soulId, uint8 karmaType, uint256 amount, string calldata reason) external {
        emit KarmaRecorded(soulId, karmaType, amount, reason);
    }

    function getProfile(address player) external view returns (ReputationProfile memory) {
        return profiles[player];
    }

    function isEligibleForCombatTier(address player, uint8 requiredTier) external view returns (bool) {
        ReputationProfile memory profile = profiles[player];
        return !profile.banned && !profile.fraudFlag && profile.licenseTier >= requiredTier;
    }
}
