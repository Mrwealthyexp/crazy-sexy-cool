// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import 'forge-std/Script.sol';
import {CoolToken} from '../src/CoolToken.sol';
import {KarmicLedger} from '../src/KarmicLedger.sol';
import {SoulForge} from '../src/SoulForge.sol';
import {TranscendenceEngine} from '../src/TranscendenceEngine.sol';
import {WeatherOracle} from '../src/WeatherOracle.sol';

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        CoolToken coolToken = new CoolToken();
        KarmicLedger karmicLedger = new KarmicLedger();
        SoulForge soulForge = new SoulForge();
        TranscendenceEngine transcendenceEngine = new TranscendenceEngine(address(karmicLedger));
        WeatherOracle weatherOracle = new WeatherOracle();

        coolToken;
        soulForge;
        transcendenceEngine;
        weatherOracle;

        vm.stopBroadcast();
    }
}
