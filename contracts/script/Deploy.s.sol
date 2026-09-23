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
        address deployer = vm.addr(deployerKey);

        vm.startBroadcast(deployerKey);

        CoolToken coolToken = new CoolToken(deployer);
        SoulForge soulForge = new SoulForge(deployer);
        KarmicLedger karmicLedger = new KarmicLedger(deployer);
        WeatherOracle weatherOracle = new WeatherOracle(deployer);
        TranscendenceEngine engine = new TranscendenceEngine(
            deployer,
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
