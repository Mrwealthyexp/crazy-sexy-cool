// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SoulForge.sol";
import "../src/TranscendenceEngine.sol";
import "../src/KarmicLedger.sol";
import "../src/CoolToken.sol";
import "../src/WeatherOracle.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        CoolToken coolToken = new CoolToken();
        console.log("CoolToken:", address(coolToken));

        KarmicLedger karmicLedger = new KarmicLedger();
        console.log("KarmicLedger:", address(karmicLedger));

        SoulForge soulForge = new SoulForge(address(0), address(0));
        console.log("SoulForge:", address(soulForge));

        TranscendenceEngine engine = new TranscendenceEngine(
            address(soulForge),
            address(karmicLedger),
            address(coolToken)
        );
        console.log("TranscendenceEngine:", address(engine));

        WeatherOracle weatherOracle = new WeatherOracle();
        console.log("WeatherOracle:", address(weatherOracle));

        coolToken.addMinter(address(engine));
        karmicLedger.transferOwnership(address(engine));

        vm.stopBroadcast();
    }
}
