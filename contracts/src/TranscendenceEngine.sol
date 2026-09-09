// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./SoulForge.sol";
import "./KarmicLedger.sol";
import "./CoolToken.sol";

contract TranscendenceEngine is Ownable, ReentrancyGuard {
    enum WorldlyState { Crazy, Sexy, Cool, Integrated, Servant, Mysterious, GreatTeacher, Enlightened }
    enum GodSkill { WeatherChange, DeathDenied, FairEmotions }

    struct SoulState {
        WorldlyState stage;
        uint256 whiteKarma;
        uint256 blackKarma;
        uint256 grayKarma;
        uint256 soulTokens;
        uint256[50] jobLevels;
        uint256 mitochondrialPoints;
        bool overEvolved;
        uint256 lastAscensionTime;
        uint256 interventionsPerformed;
        uint256 interventionsReceived;
    }

    struct WeatherEffect {
        uint256 zoneId;
        uint8 weatherType;
        uint256 startTime;
        uint256 duration;
        address teacher;
    }

    SoulForge public soulForge;
    KarmicLedger public karmicLedger;
    CoolToken public coolToken;

    mapping(uint256 => SoulState) public soulStates;
    mapping(uint256 => WeatherEffect[]) public zoneWeatherHistory;
    mapping(uint256 => uint256) public lastDivineIntervention;

    uint256 public constant WEATHER_COST = 500 * 10**18;
    uint256 public constant DEATH_DENIED_COST = 1000 * 10**18;
    uint256 public constant FAIR_EMOTIONS_COST = 10000 * 10**18;
    uint256 public constant INTERVENTION_COOLDOWN = 7 days;
    uint256 public constant ASCENSION_LOCK = 1 days;

    uint256 public currentWorldQuestionBlock;
    string public currentWorldQuestion;
    mapping(address => string) public worldAnswers;
    address[] public worldAnswerers;

    event StageAdvanced(uint256 indexed soulId, WorldlyState newStage);
    event GreatTeacherBorn(uint256 indexed soulId, address indexed teacher);
    event EnlightenedAchieved(uint256 indexed soulId);
    event DivineIntervention(uint256 indexed targetSoul, GodSkill skill, bytes32 zkProof);
    event WeatherChanged(uint256 indexed zoneId, uint8 weatherType, uint256 duration);
    event DeathDenied(uint256 indexed savedSoul, uint256 indexed teacherSoul);
    event FairEmotions(uint256 indexed soul1, uint256 indexed soul2);
    event WorldQuestionAsked(string question, uint256 blockNumber);

    modifier onlySoulOwner(uint256 soulId) {
        require(soulForge.ownerOf(soulId) == msg.sender, "Not soul owner");
        _;
    }

    constructor(address _soulForge, address _karmicLedger, address _coolToken) Ownable(msg.sender) {
        soulForge = SoulForge(_soulForge);
        karmicLedger = KarmicLedger(_karmicLedger);
        coolToken = CoolToken(_coolToken);
    }

    function initializeSoulState(uint256 soulId) external {
        require(soulForge.ownerOf(soulId) != address(0), "Soul does not exist");
        require(
            soulStates[soulId].stage == WorldlyState.Crazy && soulStates[soulId].whiteKarma == 0,
            "Already initialized"
        );

        SoulForge.SoulBlueprint memory blueprint = soulForge.getSoulBlueprint(soulId);
        WorldlyState startingState;

        if (blueprint.temperament == 0) startingState = WorldlyState.Crazy;
        else if (blueprint.temperament == 2) startingState = WorldlyState.Sexy;
        else if (blueprint.temperament == 1) startingState = WorldlyState.Cool;
        else startingState = WorldlyState.Crazy;

        soulStates[soulId] = SoulState({
            stage: startingState,
            whiteKarma: 0,
            blackKarma: blueprint.karmicDebt,
            grayKarma: 0,
            soulTokens: 100 * 10**18,
            jobLevels: [uint256(0),0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            mitochondrialPoints: 0,
            overEvolved: false,
            lastAscensionTime: 0,
            interventionsPerformed: 0,
            interventionsReceived: 0
        });
    }

    function recordKarma(uint256 soulId, uint8 karmaType, uint256 amount) external onlyOwner {
        SoulState storage soul = soulStates[soulId];
        if (karmaType == 0) soul.whiteKarma += amount;
        else if (karmaType == 1) soul.blackKarma += amount;
        else if (karmaType == 2) soul.grayKarma += amount;
        karmicLedger.recordKarma(soulId, karmaType, amount, "");
    }

    function attemptAscension(uint256 soulId) external onlySoulOwner(soulId) nonReentrant {
        SoulState storage soul = soulStates[soulId];
        require(uint256(soul.stage) < 7, "Already at max stage");
        require(block.timestamp >= soul.lastAscensionTime + ASCENSION_LOCK, "Ascension on cooldown");

        bool pureIntention = (soul.whiteKarma > soul.grayKarma * 2) &&
                            (soul.blackKarma == 0 || soul.whiteKarma > soul.blackKarma * 10);
        require(pureIntention, "Karmic debt prevents ascension");

        bool requirementsMet = checkStageRequirements(soulId, soul.stage);
        require(requirementsMet, "Stage requirements not met");

        soul.stage = WorldlyState(uint256(soul.stage) + 1);
        soul.lastAscensionTime = block.timestamp;

        if (soul.stage == WorldlyState.GreatTeacher) {
            emit GreatTeacherBorn(soulId, msg.sender);
        } else if (soul.stage == WorldlyState.Enlightened) {
            emit EnlightenedAchieved(soulId);
        }

        emit StageAdvanced(soulId, soul.stage);
    }

    function checkStageRequirements(uint256 soulId, WorldlyState currentStage) internal view returns (bool) {
        SoulState storage soul = soulStates[soulId];

        if (currentStage == WorldlyState.Crazy) {
            return soul.jobLevels[0] >= 3;
        } else if (currentStage == WorldlyState.Sexy) {
            return soul.jobLevels[10] >= 3;
        } else if (currentStage == WorldlyState.Cool) {
            return soul.jobLevels[20] >= 3;
        } else if (currentStage == WorldlyState.Integrated) {
            return soul.jobLevels[0] >= 5 && soul.jobLevels[10] >= 5 && soul.jobLevels[20] >= 5;
        } else if (currentStage == WorldlyState.Servant) {
            return soul.interventionsPerformed >= 10;
        } else if (currentStage == WorldlyState.Mysterious) {
            return soul.interventionsPerformed >= 50;
        }
        return true;
    }

    function divineIntervention(
        uint256 targetSoul,
        GodSkill skill,
        uint256 zoneId,
        bytes32 zkProof
    ) external nonReentrant {
        uint256 teacherSoul = soulForge.getSoulByWallet(msg.sender);
        require(teacherSoul != 0, "No soul found");

        SoulState storage teacher = soulStates[teacherSoul];
        require(
            teacher.stage == WorldlyState.GreatTeacher || teacher.stage == WorldlyState.Enlightened,
            "Not Great Teacher"
        );
        require(
            block.timestamp >= lastDivineIntervention[teacherSoul] + INTERVENTION_COOLDOWN,
            "Intervention on cooldown"
        );
        require(verifyZKProof(zkProof), "Invalid zk-proof");

        if (skill == GodSkill.WeatherChange) {
            require(teacher.soulTokens >= WEATHER_COST, "Insufficient SOUL");
            teacher.soulTokens -= WEATHER_COST;
            executeWeatherChange(targetSoul, zoneId, zkProof);
        } else if (skill == GodSkill.DeathDenied) {
            require(teacher.soulTokens >= DEATH_DENIED_COST, "Insufficient SOUL");
            teacher.soulTokens -= DEATH_DENIED_COST;
            absorbTeacherShadow(teacherSoul);
            executeDeathDenied(targetSoul, teacherSoul);
        } else if (skill == GodSkill.FairEmotions) {
            require(teacher.soulTokens >= FAIR_EMOTIONS_COST, "Insufficient SOUL");
            teacher.soulTokens -= FAIR_EMOTIONS_COST;
            executeFairEmotions(targetSoul);
        }

        teacher.interventionsPerformed++;
        soulStates[targetSoul].interventionsReceived++;
        lastDivineIntervention[teacherSoul] = block.timestamp;

        emit DivineIntervention(targetSoul, skill, zkProof);
    }

    function verifyZKProof(bytes32 proof) internal pure returns (bool) {
        return uint256(proof) != 0;
    }

    function executeWeatherChange(uint256, uint256 zoneId, bytes32 zkProof) internal {
        uint8 weatherType = uint8(uint256(zkProof) % 5);
        uint256 duration = 1 hours + (uint256(zkProof) % 23 hours);

        zoneWeatherHistory[zoneId].push(WeatherEffect({
            zoneId: zoneId,
            weatherType: weatherType,
            startTime: block.timestamp,
            duration: duration,
            teacher: msg.sender
        }));

        emit WeatherChanged(zoneId, weatherType, duration);
    }

    function executeDeathDenied(uint256 savedSoul, uint256 teacherSoul) internal {
        emit DeathDenied(savedSoul, teacherSoul);
    }

    function executeFairEmotions(uint256 targetSoul) internal {
        emit FairEmotions(targetSoul, 0);
    }

    function absorbTeacherShadow(uint256 teacherSoul) internal {
        SoulState storage teacher = soulStates[teacherSoul];
        teacher.blackKarma += 100;
    }

    function askWorldQuestion(string calldata question) external {
        uint256 soulId = soulForge.getSoulByWallet(msg.sender);
        require(soulId != 0, "No soul");
        require(soulStates[soulId].stage == WorldlyState.Enlightened, "Not Enlightened");
        require(block.number >= currentWorldQuestionBlock + 216000, "Too soon");

        currentWorldQuestion = question;
        currentWorldQuestionBlock = block.number;
        delete worldAnswerers;

        emit WorldQuestionAsked(question, block.number);
    }

    function answerWorldQuestion(string calldata answer) external {
        uint256 soulId = soulForge.getSoulByWallet(msg.sender);
        require(soulId != 0, "No soul");
        require(bytes(answer).length > 0, "Empty answer");
        worldAnswers[msg.sender] = answer;
        worldAnswerers.push(msg.sender);
    }

    function levelUpJob(uint256 soulId, uint256 jobId) external onlySoulOwner(soulId) {
        require(jobId < 50, "Invalid job");
        SoulState storage soul = soulStates[soulId];
        soul.jobLevels[jobId]++;

        if (soul.mitochondrialPoints > 10000 && !soul.overEvolved) {
            soul.overEvolved = true;
        }
    }

    function addMitochondrialPoints(uint256 soulId, uint256 points) external onlyOwner {
        soulStates[soulId].mitochondrialPoints += points;
    }

    function earnSoulTokens(uint256 soulId, uint256 amount) external onlyOwner {
        soulStates[soulId].soulTokens += amount;
    }

    function burnSoulTokens(uint256 soulId, uint256 amount) external {
        require(soulForge.ownerOf(soulId) == msg.sender || msg.sender == address(this), "Unauthorized");
        SoulState storage soul = soulStates[soulId];
        require(soul.soulTokens >= amount, "Insufficient SOUL");
        soul.soulTokens -= amount;
    }

    function getSoulState(uint256 soulId) external view returns (SoulState memory) {
        return soulStates[soulId];
    }

    function getJobLevels(uint256 soulId) external view returns (uint256[50] memory) {
        return soulStates[soulId].jobLevels;
    }

    function getZoneWeather(uint256 zoneId) external view returns (WeatherEffect[] memory) {
        return zoneWeatherHistory[zoneId];
    }

    function canAscend(uint256 soulId) external view returns (bool) {
        SoulState storage soul = soulStates[soulId];
        bool pureIntention = (soul.whiteKarma > soul.grayKarma * 2) &&
                            (soul.blackKarma == 0 || soul.whiteKarma > soul.blackKarma * 10);
        return pureIntention && checkStageRequirements(soulId, soul.stage);
    }
}
