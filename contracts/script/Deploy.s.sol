// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {SoulForge} from "../src/SoulForge.sol";
import {KarmicLedger} from "../src/KarmicLedger.sol";
import {CoolToken} from "../src/CoolToken.sol";
import {WeatherOracle} from "../src/WeatherOracle.sol";
import {TranscendenceEngine} from "../src/TranscendenceEngine.sol";

contract Deploy is Script {
    function run() public {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);

        CoolToken coolToken = new CoolToken(msg.sender);
        SoulForge soulForge = new SoulForge(msg.sender);
        KarmicLedger karmicLedger = new KarmicLedger(msg.sender);
        WeatherOracle weatherOracle = new WeatherOracle(msg.sender);
        TranscendenceEngine engine = new TranscendenceEngine(
            msg.sender,
            address(soulForge),
            address(karmicLedger),
            address(coolToken),
            address(weatherOracle)
        );

        karmicLedger.setScribe(address(engine), true);
        coolToken.setMinter(address(engine), true);
        weatherOracle.setController(address(engine), true);

        vm.stopBroadcast();
    }
}
