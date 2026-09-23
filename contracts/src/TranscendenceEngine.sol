// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CoolToken.sol";
import "./KarmicLedger.sol";
import "./SoulForge.sol";
import "./WeatherOracle.sol";

/**
 * @title TranscendenceEngine
 * @dev Game progression and evolution engine coordinating soul, karma, combat, and world state.
 */
contract TranscendenceEngine {
    uint256 public constant INITIAL_REWARD = 100 ether;
    uint256 public constant CREATION_REWARD = 15 ether;
    uint256 public constant COMBAT_REWARD = 5 ether;
    uint256 public constant TRANSCENDENCE_REWARD = 250 ether;
    uint64 public constant COMBAT_LICENSE_FOCUS = 25;
    uint64 public constant TRANSCENDENCE_FOCUS = 100;
    uint64 public constant TRANSCENDENCE_WHITE = 20;
    uint64 public constant TRANSCENDENCE_BLACK_CAP = 5;
    int256 public constant TRANSCENDENCE_REPUTATION = 25;

    SoulForge public immutable soulForge;
    KarmicLedger public immutable karmicLedger;
    CoolToken public immutable coolToken;
    WeatherOracle public immutable weatherOracle;

    event SoulInitialized(address indexed player, uint256 indexed soulId, bytes32 tokenBoundAccount);
    event ReflectiveAct(address indexed player, uint256 indexed soulId, string actType, uint64 focusGain);
    event CombatLicenseGranted(address indexed player, uint256 indexed soulId);
    event CombatResolved(address indexed player, string indexed zoneId, bool honorable);
    event WorldQuestionAsked(address indexed player, string question, string answer);
    event Transcended(address indexed player, uint256 indexed soulId);

    constructor(address soulForge_, address karmicLedger_, address coolToken_, address weatherOracle_) {
        soulForge = SoulForge(soulForge_);
        karmicLedger = KarmicLedger(karmicLedger_);
        coolToken = CoolToken(coolToken_);
        weatherOracle = WeatherOracle(weatherOracle_);
    }

    function initializeSoul(
        string calldata displayName,
        string calldata temperament,
        uint8 birthMonth,
        bytes32 tokenBoundAccount
    ) external returns (uint256 soulId) {
        if (soulForge.soulExists(msg.sender)) revert SoulAlreadyInitialized();

        soulId = soulForge.forgeSoul(msg.sender, displayName, temperament, birthMonth, tokenBoundAccount);
        karmicLedger.registerSoul(msg.sender, soulId);
        coolToken.mint(msg.sender, INITIAL_REWARD);

        emit SoulInitialized(msg.sender, soulId, tokenBoundAccount);
    }

    function meditate() external onlySoulOwner {
        uint256 soulId = soulForge.soulIdOf(msg.sender);
        soulForge.shiftWorldState(soulId, SoulForge.WorldState.Cool);
        soulForge.adjustFocus(soulId, 10);
        karmicLedger.recordKarma(msg.sender, 2, 0, 0, "meditation");

        emit ReflectiveAct(msg.sender, soulId, "meditate", 10);
    }

    function createArtifact(string calldata zoneId) external onlySoulOwner {
        _requireSupportedZone(zoneId);
        uint256 soulId = soulForge.soulIdOf(msg.sender);
        soulForge.shiftWorldState(soulId, SoulForge.WorldState.Sexy);
        soulForge.adjustFocus(soulId, 15);
        karmicLedger.recordKarma(msg.sender, 3, 0, 1, "creation");
        coolToken.mint(msg.sender, CREATION_REWARD);
        weatherOracle.updateZoneWeather(zoneId, "inspired", 2, 20);

        emit ReflectiveAct(msg.sender, soulId, "create", 15);
    }

    function completeBounty(uint256 masteryScore) external onlySoulOwner {
        if (masteryScore == 0 || masteryScore > 100) revert InvalidMasteryScore();

        uint256 soulId = soulForge.soulIdOf(msg.sender);
        uint64 focusGain = uint64(5 + masteryScore / 10);
        uint64 whiteDelta = masteryScore >= 70 ? 1 : 0;
        uint64 grayDelta = masteryScore >= 90 ? 3 : 2;

        soulForge.shiftWorldState(soulId, SoulForge.WorldState.Cool);
        soulForge.adjustFocus(soulId, int64(focusGain));
        karmicLedger.recordKarma(msg.sender, whiteDelta, 0, grayDelta, "earning");
        coolToken.mint(msg.sender, masteryScore * 1 ether);

        emit ReflectiveAct(msg.sender, soulId, "earn", focusGain);
    }

    function grantCombatLicense() external onlySoulOwner {
        uint256 soulId = soulForge.soulIdOf(msg.sender);
        SoulForge.SoulIdentity memory soul = soulForge.getSoulByOwner(msg.sender);
        int256 reputation = karmicLedger.reputationOf(msg.sender);

        if (soul.focus < COMBAT_LICENSE_FOCUS) revert InsufficientFocus();
        if (reputation < 5) revert InsufficientReputation();

        soulForge.setCombatLicense(soulId, true);
        emit CombatLicenseGranted(msg.sender, soulId);
    }

    function engageCombat(string calldata zoneId, bool honorable) external onlySoulOwner {
        _requireSupportedZone(zoneId);
        uint256 soulId = soulForge.soulIdOf(msg.sender);
        SoulForge.SoulIdentity memory soul = soulForge.getSoulByOwner(msg.sender);
        if (!soul.combatLicensed) revert CombatLicenseRequired();

        soulForge.shiftWorldState(soulId, SoulForge.WorldState.Crazy);
        soulForge.adjustFocus(soulId, 8);
        karmicLedger.recordKarma(msg.sender, honorable ? 1 : 0, honorable ? 0 : 2, 1, honorable ? "licensed-combat" : "reckless-combat");
        coolToken.mint(msg.sender, COMBAT_REWARD);
        weatherOracle.updateZoneWeather(zoneId, honorable ? "charged" : "volatile", honorable ? 1 : 3, honorable ? 35 : 65);

        emit CombatResolved(msg.sender, zoneId, honorable);
    }

    function askWorldQuestion(string calldata question, string calldata answer) external onlySoulOwner {
        SoulForge.SoulIdentity memory soul = soulForge.getSoulByOwner(msg.sender);
        if (!soul.transcended) revert TranscendenceRequired();
        if (weatherOracle.answerExpiresAt() > block.timestamp) revert ActiveWorldQuestion();
        if (bytes(question).length == 0 || bytes(answer).length == 0) revert EmptyWorldQuestion();

        weatherOracle.setWorldQuestion(question, answer, 1 days);
        emit WorldQuestionAsked(msg.sender, question, answer);
    }

    function transcend() external onlySoulOwner {
        (bool eligible, string memory reason) = canTranscend(msg.sender);
        if (!eligible) revert NotReadyToTranscend(reason);

        uint256 soulId = soulForge.soulIdOf(msg.sender);
        soulForge.setTranscended(soulId, true);
        soulForge.shiftWorldState(soulId, SoulForge.WorldState.Cool);
        coolToken.mint(msg.sender, TRANSCENDENCE_REWARD);

        emit Transcended(msg.sender, soulId);
    }

    function canTranscend(address player) public view returns (bool, string memory) {
        if (!soulForge.soulExists(player)) {
            return (false, "Soul not initialized");
        }

        SoulForge.SoulIdentity memory soul = soulForge.getSoulByOwner(player);
        KarmicLedger.KarmaProfile memory profile = karmicLedger.getProfile(player);
        int256 reputation = karmicLedger.reputationOf(player);

        if (!soul.combatLicensed) {
            return (false, "Combat license required");
        }
        if (soul.focus < TRANSCENDENCE_FOCUS) {
            return (false, "Focus too low");
        }
        if (profile.white < TRANSCENDENCE_WHITE) {
            return (false, "White karma too low");
        }
        if (profile.black > TRANSCENDENCE_BLACK_CAP) {
            return (false, "Black karma too high");
        }
        if (reputation < TRANSCENDENCE_REPUTATION) {
            return (false, "Reputation too low");
        }

        return (true, "Ready");
    }

    modifier onlySoulOwner() {
        if (!soulForge.soulExists(msg.sender)) revert SoulMissing();
        _;
    }

    function _requireSupportedZone(string calldata zoneId) internal pure {
        bytes32 zoneKey = keccak256(bytes(zoneId));
        if (
            zoneKey != keccak256(bytes("soul-forge"))
                && zoneKey != keccak256(bytes("aeterna-gate"))
                && zoneKey != keccak256(bytes("shadow-arena"))
                && zoneKey != keccak256(bytes("oracle-district"))
        ) {
            revert UnsupportedZone();
        }
    }

    error SoulAlreadyInitialized();
    error SoulMissing();
    error InvalidMasteryScore();
    error InsufficientFocus();
    error InsufficientReputation();
    error CombatLicenseRequired();
    error TranscendenceRequired();
    error ActiveWorldQuestion();
    error EmptyWorldQuestion();
    error UnsupportedZone();
    error NotReadyToTranscend(string reason);
}
