// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WeatherOracle {
    struct WeatherState {
        string zoneId;
        string condition;
        uint8 severity;
        uint64 updatedAt;
    }

    address public immutable admin;
    WeatherState private currentState;

    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin');
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setWeather(string calldata zoneId, string calldata condition, uint8 severity) external onlyAdmin {
        currentState = WeatherState({
            zoneId: zoneId,
            condition: condition,
            severity: severity,
            updatedAt: uint64(block.timestamp)
        });
    }

    function getWeather() external view returns (WeatherState memory) {
        return currentState;
    }
}
