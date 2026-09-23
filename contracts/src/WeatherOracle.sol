// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableLite} from "./utils/OwnableLite.sol";

/**
 * @title WeatherOracle
 * @dev Stores world weather and moon-phase state for named zones.
 */
contract WeatherOracle is OwnableLite {
    error UnauthorizedController(address account);
    error ZeroAddress();
    error EmptyZoneId();

    enum Weather {
        Clear,
        Rain,
        Sunbreak,
        Storm,
        Snow,
        Rainbow,
        Dark
    }

    enum MoonPhase {
        NewMoon,
        Waxing,
        FullMoon,
        Waning,
        DarkMoon
    }

    struct ZoneWeather {
        Weather weather;
        MoonPhase moonPhase;
        uint64 updatedAt;
        string narrative;
    }

    mapping(bytes32 => ZoneWeather) private _zoneWeather;
    mapping(address => bool) public controllers;

    event ControllerUpdated(address indexed account, bool isController);
    event ZoneWeatherUpdated(
        bytes32 indexed zoneKey,
        string indexed zoneId,
        Weather weather,
        MoonPhase moonPhase,
        string narrative
    );

    constructor(address initialOwner) OwnableLite(initialOwner) {}

    modifier onlyController() {
        if (!controllers[msg.sender] && msg.sender != owner) {
            revert UnauthorizedController(msg.sender);
        }
        _;
    }

    function setController(address account, bool isController) external onlyOwner {
        if (account == address(0)) {
            revert ZeroAddress();
        }

        controllers[account] = isController;
        emit ControllerUpdated(account, isController);
    }

    function zoneKey(string memory zoneId) public pure returns (bytes32) {
        return keccak256(bytes(zoneId));
    }

    function setZoneWeather(
        string calldata zoneId,
        Weather weather,
        MoonPhase moonPhase,
        string calldata narrative
    ) external onlyController {
        if (bytes(zoneId).length == 0) {
            revert EmptyZoneId();
        }

        bytes32 key = zoneKey(zoneId);
        _zoneWeather[key] = ZoneWeather({
            weather: weather,
            moonPhase: moonPhase,
            updatedAt: uint64(block.timestamp),
            narrative: narrative
        });

        emit ZoneWeatherUpdated(key, zoneId, weather, moonPhase, narrative);
    }

    function weatherForZone(string calldata zoneId) external view returns (ZoneWeather memory) {
        return _zoneWeather[zoneKey(zoneId)];
    }
}
