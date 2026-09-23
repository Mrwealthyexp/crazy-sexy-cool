// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title KarmicLedger
 * @dev Tracks soul reputation and the balance of white, black, and gray karma.
 */
contract KarmicLedger {
    struct KarmaProfile {
        uint256 soulId;
        uint64 white;
        uint64 black;
        uint64 gray;
        uint64 actions;
        bool exists;
    }

    address public owner;
    address public scribe;

    mapping(address => KarmaProfile) private profiles;

    event ScribeUpdated(address indexed scribe);
    event SoulRegistered(address indexed soulOwner, uint256 indexed soulId);
    event KarmaRecorded(
        address indexed soulOwner,
        uint64 whiteDelta,
        uint64 blackDelta,
        uint64 grayDelta,
        int256 reputation,
        string reason
    );

    error NotOwner();
    error NotScribe();
    error ZeroAddress();
    error SoulAlreadyRegistered();
    error SoulNotRegistered();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyScribe() {
        if (msg.sender != scribe) revert NotScribe();
        _;
    }

    constructor() {
        owner = msg.sender;
        scribe = msg.sender;
    }

    function setScribe(address newScribe) external onlyOwner {
        if (newScribe == address(0)) revert ZeroAddress();
        scribe = newScribe;
        emit ScribeUpdated(newScribe);
    }

    function registerSoul(address soulOwner, uint256 soulId) external onlyScribe {
        if (soulOwner == address(0)) revert ZeroAddress();
        if (profiles[soulOwner].exists) revert SoulAlreadyRegistered();

        profiles[soulOwner] = KarmaProfile({
            soulId: soulId,
            white: 0,
            black: 0,
            gray: 0,
            actions: 0,
            exists: true
        });

        emit SoulRegistered(soulOwner, soulId);
    }

    function recordKarma(
        address soulOwner,
        uint64 whiteDelta,
        uint64 blackDelta,
        uint64 grayDelta,
        string calldata reason
    ) external onlyScribe {
        KarmaProfile storage profile = profiles[soulOwner];
        if (!profile.exists) revert SoulNotRegistered();

        profile.white += whiteDelta;
        profile.black += blackDelta;
        profile.gray += grayDelta;
        profile.actions += 1;

        emit KarmaRecorded(soulOwner, whiteDelta, blackDelta, grayDelta, reputationOf(soulOwner), reason);
    }

    function getProfile(address soulOwner) external view returns (KarmaProfile memory) {
        KarmaProfile memory profile = profiles[soulOwner];
        if (!profile.exists) revert SoulNotRegistered();
        return profile;
    }

    function reputationOf(address soulOwner) public view returns (int256) {
        KarmaProfile memory profile = profiles[soulOwner];
        if (!profile.exists) revert SoulNotRegistered();

        int256 positive = int256(uint256(profile.white) * 2 + uint256(profile.gray));
        int256 negative = int256(uint256(profile.black) * 3);
        return positive - negative;
    }

    function eligibleForTranscendence(
        address soulOwner,
        uint64 minimumWhite,
        uint64 maximumBlack,
        int256 minimumReputation
    ) external view returns (bool) {
        KarmaProfile memory profile = profiles[soulOwner];
        if (!profile.exists) {
            return false;
        }

        return profile.white >= minimumWhite && profile.black <= maximumBlack && reputationOf(soulOwner) >= minimumReputation;
    }
}
