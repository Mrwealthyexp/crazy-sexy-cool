// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherOracle is Ownable {
    enum WeatherType { Rain, Storm, Snow, Sunbreak, Rainbow }

    struct ZoneWeather {
        WeatherType currentWeather;
        uint256 startTime;
        uint256 duration;
        uint256 lastUpdate;
    }

    mapping(uint256 => ZoneWeather) public zoneWeather;
    uint256 public constant WEATHER_CYCLE = 1 hours;

    event WeatherCycled(uint256 indexed zoneId, WeatherType newWeather);

    constructor() Ownable(msg.sender) {}

    function cycleWeather(uint256 zoneId) external {
        require(block.timestamp >= zoneWeather[zoneId].lastUpdate + WEATHER_CYCLE, "Too soon");

        WeatherType newWeather = WeatherType(uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            zoneId
        ))) % 5);

        zoneWeather[zoneId] = ZoneWeather({
            currentWeather: newWeather,
            startTime: block.timestamp,
            duration: WEATHER_CYCLE,
            lastUpdate: block.timestamp
        });

        emit WeatherCycled(zoneId, newWeather);
    }

    function getCurrentWeather(uint256 zoneId) external view returns (WeatherType, uint256, uint256) {
        ZoneWeather memory weather = zoneWeather[zoneId];
        return (weather.currentWeather, weather.startTime, weather.duration);
    }

    function forceWeatherChange(uint256 zoneId, WeatherType newWeather) external onlyOwner {
        zoneWeather[zoneId] = ZoneWeather({
            currentWeather: newWeather,
            startTime: block.timestamp,
            duration: WEATHER_CYCLE,
            lastUpdate: block.timestamp
        });
        emit WeatherCycled(zoneId, newWeather);
    }
}
