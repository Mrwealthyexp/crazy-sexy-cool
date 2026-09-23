// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableLite} from "./utils/OwnableLite.sol";
import {SoulForge} from "./SoulForge.sol";
import {KarmicLedger} from "./KarmicLedger.sol";
import {CoolToken} from "./CoolToken.sol";
import {WeatherOracle} from "./WeatherOracle.sol";

/**
 * @title TranscendenceEngine
 * @dev Governs progression, karmic auditing, and divine interventions.
 */
contract TranscendenceEngine is OwnableLite {
    error SoulNotOwned(uint256 soulId, address account);
    error SoulNotInitialized(uint256 soulId);
    error SoulAlreadyInitialized(uint256 soulId);
    error InvalidStageAdvance(uint8 stage);
    error MilestoneAlreadyRecorded(uint256 soulId, JourneyMilestone milestone);
    error OnlyGreatTeacher(uint256 soulId);
    error OnlyEnlightened(uint256 soulId);
    error InvalidSkill(uint8 skillType);
    error EmptyProof();
    error DivinePowerSuspended(uint256 soulId, uint256 untilTimestamp);

    enum Stage {
        Unknowing,
        Wanting,
        Detached,
        Integrated,
        Servant,
        Mysterious,
        GreatTeacher,
        Enlightened
    }

    enum JourneyMilestone {
        HumblingDefeat,
        SelflessAct,
        GiftMostValuableAsset,
        CompassionateGrief,
        Mentorship,
        AnonymousRescue,
        EnemyReconciliation,
        FairEmotions
    }

    enum DivineSkill {
        Weather,
        DeathDenied,
        FairEmotions
    }

    struct SoulState {
        uint8 stage;
        uint256 whiteKarma;
        uint256 blackKarma;
        uint256 grayKarma;
        uint256 soulTokens;
        bool isGreatTeacher;
        bool isEnlightened;
    }

    struct JourneyFlags {
        bool humbled;
        bool selflessAct;
        bool giftedMostValuableAsset;
        bool grievedForAnother;
        bool mentoredAnother;
        bool anonymousRescue;
        bool reconciledEnemies;
        bool fairEmotions;
    }

    SoulForge public immutable soulForge;
    KarmicLedger public immutable karmicLedger;
    CoolToken public immutable coolToken;
    WeatherOracle public immutable weatherOracle;

    mapping(uint256 => SoulState) private _souls;
    mapping(uint256 => JourneyFlags) private _journeys;
    mapping(uint256 => bool) public initialized;
    mapping(uint256 => uint256) public divinePowerSuspensionEndsAt;

    string public worldQuestion;
    uint256 public lastWorldQuestionAskedAt;

    event SoulInitialized(uint256 indexed soulId, address indexed soulOwner);
    event MilestoneRecorded(uint256 indexed soulId, JourneyMilestone indexed milestone, string context);
    event StageAdvanced(uint256 indexed soulId, Stage indexed newStage);
    event DivineInterventionInvoked(uint256 indexed soulId, DivineSkill indexed skill, bytes32 indexed zkProof);
    event WorldQuestionAsked(uint256 indexed soulId, string question);

    constructor(
        address initialOwner,
        address soulForgeAddress,
        address karmicLedgerAddress,
        address coolTokenAddress,
        address weatherOracleAddress
    ) OwnableLite(initialOwner) {
        soulForge = SoulForge(soulForgeAddress);
        karmicLedger = KarmicLedger(karmicLedgerAddress);
        coolToken = CoolToken(coolTokenAddress);
        weatherOracle = WeatherOracle(weatherOracleAddress);
    }

    modifier onlySoulKeeper(uint256 soulId) {
        if (soulForge.ownerOf(soulId) != msg.sender && msg.sender != owner) {
            revert SoulNotOwned(soulId, msg.sender);
        }
        _;
    }

    modifier soulMustExist(uint256 soulId) {
        if (!initialized[soulId]) {
            revert SoulNotInitialized(soulId);
        }
        _;
    }

    function initializeSoul(uint256 soulId) external onlySoulKeeper(soulId) {
        if (initialized[soulId]) {
            revert SoulAlreadyInitialized(soulId);
        }

        initialized[soulId] = true;
        _souls[soulId].stage = uint8(Stage.Unknowing);
        coolToken.mint(soulForge.ownerOf(soulId), 1_000 ether);

        emit SoulInitialized(soulId, soulForge.ownerOf(soulId));
    }

    function stateOf(uint256 soulId) external view returns (SoulState memory) {
        return _souls[soulId];
    }

    function journeyOf(uint256 soulId) external view returns (JourneyFlags memory) {
        return _journeys[soulId];
    }

    function recordMilestone(
        uint256 soulId,
        JourneyMilestone milestone,
        string calldata context
    ) external onlySoulKeeper(soulId) soulMustExist(soulId) {
        JourneyFlags storage journey = _journeys[soulId];

        if (milestone == JourneyMilestone.HumblingDefeat) {
            if (journey.humbled) revert MilestoneAlreadyRecorded(soulId, milestone);
            journey.humbled = true;
            _awardSoulTokens(soulId, 25);
        } else if (milestone == JourneyMilestone.SelflessAct) {
            if (journey.selflessAct) revert MilestoneAlreadyRecorded(soulId, milestone);
            journey.selflessAct = true;
            _recordKarma(soulId, KarmicLedger.KarmaType.White, 100, 100, context);
        } else if (milestone == JourneyMilestone.GiftMostValuableAsset) {
            if (journey.giftedMostValuableAsset) revert MilestoneAlreadyRecorded(soulId, milestone);
            journey.giftedMostValuableAsset = true;
            _recordKarma(soulId, KarmicLedger.KarmaType.White, 250, 250, context);
        } else if (milestone == JourneyMilestone.CompassionateGrief) {
            if (journey.grievedForAnother) revert MilestoneAlreadyRecorded(soulId, milestone);
            journey.grievedForAnother = true;
            _recordKarma(soulId, KarmicLedger.KarmaType.White, 300, 300, context);
        } else if (milestone == JourneyMilestone.Mentorship) {
            if (journey.mentoredAnother) revert MilestoneAlreadyRecorded(soulId, milestone);
            journey.mentoredAnother = true;
            _recordKarma(soulId, KarmicLedger.KarmaType.White, 500, 500, context);
        } else if (milestone == JourneyMilestone.AnonymousRescue) {
            if (journey.anonymousRescue) revert MilestoneAlreadyRecorded(soulId, milestone);
            journey.anonymousRescue = true;
            _recordKarma(soulId, KarmicLedger.KarmaType.White, 750, 750, context);
        } else if (milestone == JourneyMilestone.EnemyReconciliation) {
            if (journey.reconciledEnemies) revert MilestoneAlreadyRecorded(soulId, milestone);
            journey.reconciledEnemies = true;
            _recordKarma(soulId, KarmicLedger.KarmaType.White, 1_500, 1_500, context);
        } else if (milestone == JourneyMilestone.FairEmotions) {
            if (journey.fairEmotions) revert MilestoneAlreadyRecorded(soulId, milestone);
            journey.fairEmotions = true;
            _recordKarma(soulId, KarmicLedger.KarmaType.White, 10_000, 10_000, context);
        }

        emit MilestoneRecorded(soulId, milestone, context);
    }

    function recordKarmicDebt(
        uint256 soulId,
        bool severe,
        uint256 amount,
        uint256 soulPenalty,
        string calldata context
    ) external onlySoulKeeper(soulId) soulMustExist(soulId) {
        if (severe) {
            _recordKarma(soulId, KarmicLedger.KarmaType.Black, amount, -int256(soulPenalty), context);
        } else {
            _recordKarma(soulId, KarmicLedger.KarmaType.Gray, amount, -int256(soulPenalty), context);
        }
    }

    function advanceStage(uint256 soulId) external onlySoulKeeper(soulId) soulMustExist(soulId) returns (Stage newStage) {
        SoulState storage soul = _souls[soulId];
        JourneyFlags storage journey = _journeys[soulId];
        Stage current = Stage(soul.stage);

        if (current == Stage.Unknowing) {
            if (!(journey.humbled && journey.selflessAct)) revert InvalidStageAdvance(soul.stage);
            newStage = Stage.Wanting;
        } else if (current == Stage.Wanting) {
            if (!journey.giftedMostValuableAsset) revert InvalidStageAdvance(soul.stage);
            newStage = Stage.Detached;
        } else if (current == Stage.Detached) {
            if (!journey.grievedForAnother) revert InvalidStageAdvance(soul.stage);
            newStage = Stage.Integrated;
        } else if (current == Stage.Integrated) {
            if (!journey.mentoredAnother) revert InvalidStageAdvance(soul.stage);
            newStage = Stage.Servant;
        } else if (current == Stage.Servant) {
            if (!journey.anonymousRescue) revert InvalidStageAdvance(soul.stage);
            newStage = Stage.Mysterious;
        } else if (current == Stage.Mysterious) {
            if (!(journey.reconciledEnemies && karmicAudit(soulId))) revert InvalidStageAdvance(soul.stage);
            newStage = Stage.GreatTeacher;
            soul.isGreatTeacher = true;
            _awardSoulTokens(soulId, 5_000);
        } else if (current == Stage.GreatTeacher) {
            if (!(journey.fairEmotions && karmicAudit(soulId))) revert InvalidStageAdvance(soul.stage);
            newStage = Stage.Enlightened;
            soul.isEnlightened = true;
            _awardSoulTokens(soulId, 100_000);
        } else {
            revert InvalidStageAdvance(soul.stage);
        }

        soul.stage = uint8(newStage);
        emit StageAdvanced(soulId, newStage);
    }

    function divineIntervention(
        uint256 soulId,
        uint8 skillType,
        bytes32 zkProof
    ) external onlySoulKeeper(soulId) soulMustExist(soulId) returns (bool) {
        _performDivineIntervention(soulId, skillType, zkProof);
        return true;
    }

    function invokeWeatherShift(
        uint256 soulId,
        string calldata zoneId,
        WeatherOracle.Weather weather,
        WeatherOracle.MoonPhase moonPhase,
        string calldata narrative,
        bytes32 zkProof,
        bool servesCollectiveGrowth
    ) external onlySoulKeeper(soulId) soulMustExist(soulId) returns (bool) {
        _performDivineIntervention(soulId, uint8(DivineSkill.Weather), zkProof);
        weatherOracle.setZoneWeather(zoneId, weather, moonPhase, narrative);

        if (!servesCollectiveGrowth) {
            divinePowerSuspensionEndsAt[soulId] = block.timestamp + 7 days;
            _recordKarma(soulId, KarmicLedger.KarmaType.Gray, 1_000, -1_000, "Weather used for ego.");
        }

        return true;
    }

    function _performDivineIntervention(uint256 soulId, uint8 skillType, bytes32 zkProof) internal {
        if (!_souls[soulId].isGreatTeacher) {
            revert OnlyGreatTeacher(soulId);
        }
        if (zkProof == bytes32(0)) {
            revert EmptyProof();
        }
        if (divinePowerSuspensionEndsAt[soulId] > block.timestamp) {
            revert DivinePowerSuspended(soulId, divinePowerSuspensionEndsAt[soulId]);
        }
        if (skillType > uint8(DivineSkill.FairEmotions)) {
            revert InvalidSkill(skillType);
        }

        if (skillType == uint8(DivineSkill.Weather)) {
            coolToken.burnFromAuthorized(msg.sender, 50 ether);
        } else if (skillType == uint8(DivineSkill.DeathDenied)) {
            coolToken.burnFromAuthorized(msg.sender, 150 ether);
        } else {
            coolToken.burnFromAuthorized(msg.sender, 500 ether);
            if (!_journeys[soulId].fairEmotions) {
                _journeys[soulId].fairEmotions = true;
                _recordKarma(soulId, KarmicLedger.KarmaType.White, 10_000, 10_000, "Fair emotions invoked.");
            }
        }

        emit DivineInterventionInvoked(soulId, DivineSkill(skillType), zkProof);
    }

    function karmicAudit(uint256 soulId) public view soulMustExist(soulId) returns (bool canAscend) {
        SoulState memory soul = _souls[soulId];
        return
            (soul.whiteKarma > soul.grayKarma * 2) &&
            (soul.blackKarma == 0 || soul.whiteKarma > soul.blackKarma * 10);
    }

    function askTheWorld(uint256 soulId, string calldata question) external onlySoulKeeper(soulId) soulMustExist(soulId) {
        if (!_souls[soulId].isEnlightened) {
            revert OnlyEnlightened(soulId);
        }
        require(block.timestamp > lastWorldQuestionAskedAt + 30 days, "Too soon");

        worldQuestion = question;
        lastWorldQuestionAskedAt = block.timestamp;

        emit WorldQuestionAsked(soulId, question);
    }

    function _recordKarma(
        uint256 soulId,
        KarmicLedger.KarmaType karmaType,
        uint256 amount,
        int256 soulDelta,
        string memory context
    ) internal {
        karmicLedger.recordKarma(soulId, karmaType, amount, soulDelta, context);

        if (soulDelta >= 0) {
            _souls[soulId].soulTokens += uint256(soulDelta);
        } else {
            uint256 penalty = uint256(-soulDelta);
            uint256 currentSoul = _souls[soulId].soulTokens;
            _souls[soulId].soulTokens = penalty >= currentSoul ? 0 : currentSoul - penalty;
        }

        _syncKarma(soulId);
    }

    function _awardSoulTokens(uint256 soulId, uint256 amount) internal {
        _souls[soulId].soulTokens += amount;
    }

    function _syncKarma(uint256 soulId) internal {
        KarmicLedger.KarmaBalance memory balance = karmicLedger.karmaOf(soulId);
        _souls[soulId].whiteKarma = balance.white;
        _souls[soulId].blackKarma = balance.black;
        _souls[soulId].grayKarma = balance.gray;
    }
}
