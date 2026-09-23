// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WeatherOracle
 * @dev Stores world-state shifts authored by validated gameplay events.
 */
contract WeatherOracle {
    struct ZoneWeather {
        string zoneId;
        string mood;
        int16 temperatureShift;
        uint32 hazardLevel;
        uint64 updatedAt;
    }

    address public owner;
    address public controller;

    string public worldQuestion;
    string public collectiveAnswer;
    uint64 public answerExpiresAt;

    mapping(bytes32 => ZoneWeather) private zoneWeatherByKey;

    event ControllerUpdated(address indexed controller);
    event ZoneWeatherUpdated(string indexed zoneId, string mood, int16 temperatureShift, uint32 hazardLevel);
    event WorldQuestionUpdated(string question, string answer, uint64 expiresAt);

    error NotOwner();
    error NotController();
    error ZeroAddress();
    error EmptyZone();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyController() {
        if (msg.sender != controller) revert NotController();
        _;
    }

    constructor() {
        owner = msg.sender;
        controller = msg.sender;
    }

    function setController(address newController) external onlyOwner {
        if (newController == address(0)) revert ZeroAddress();
        controller = newController;
        emit ControllerUpdated(newController);
    }

    function updateZoneWeather(
        string calldata zoneId,
        string calldata mood,
        int16 temperatureShift,
        uint32 hazardLevel
    ) external onlyController {
        if (bytes(zoneId).length == 0) revert EmptyZone();

        zoneWeatherByKey[_zoneKey(zoneId)] = ZoneWeather({
            zoneId: zoneId,
            mood: mood,
            temperatureShift: temperatureShift,
            hazardLevel: hazardLevel,
            updatedAt: uint64(block.timestamp)
        });

        emit ZoneWeatherUpdated(zoneId, mood, temperatureShift, hazardLevel);
    }

    function setWorldQuestion(
        string calldata question,
        string calldata answer,
        uint64 duration
    ) external onlyController {
        worldQuestion = question;
        collectiveAnswer = answer;
        answerExpiresAt = uint64(block.timestamp) + duration;

        emit WorldQuestionUpdated(question, answer, answerExpiresAt);
    }

    function getZoneWeather(string calldata zoneId) external view returns (ZoneWeather memory) {
        return zoneWeatherByKey[_zoneKey(zoneId)];
    }

    function _zoneKey(string calldata zoneId) internal pure returns (bytes32) {
        return keccak256(bytes(zoneId));
    }
}
