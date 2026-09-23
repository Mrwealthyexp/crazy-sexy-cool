// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";

import "../src/CoolToken.sol";
import "../src/KarmicLedger.sol";
import "../src/SoulForge.sol";
import "../src/TranscendenceEngine.sol";
import "../src/WeatherOracle.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        SoulForge soulForge = new SoulForge();
        KarmicLedger karmicLedger = new KarmicLedger();
        CoolToken coolToken = new CoolToken();
        WeatherOracle weatherOracle = new WeatherOracle();
        TranscendenceEngine engine = new TranscendenceEngine(
            address(soulForge), address(karmicLedger), address(coolToken), address(weatherOracle)
        );

        soulForge.setController(address(engine));
        karmicLedger.setScribe(address(engine));
        coolToken.setMinter(address(engine), true);
        weatherOracle.setController(address(engine));

        vm.stopBroadcast();
    }
}
