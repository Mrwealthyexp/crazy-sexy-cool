// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {CoolToken} from '../src/CoolToken.sol';
import {KarmicLedger} from '../src/KarmicLedger.sol';
import {SoulForge} from '../src/SoulForge.sol';
import {TranscendenceEngine} from '../src/TranscendenceEngine.sol';
import {WeatherOracle} from '../src/WeatherOracle.sol';
import {CSCMarketplace} from '../src/CSCMarketplace.sol';

contract Deploy {
    function run()
        external
        returns (
            CoolToken coolToken,
            KarmicLedger karmicLedger,
            SoulForge soulForge,
            TranscendenceEngine transcendenceEngine,
            WeatherOracle weatherOracle,
            CSCMarketplace marketplace
        )
    {
        coolToken = new CoolToken();
        karmicLedger = new KarmicLedger();
        soulForge = new SoulForge(address(0), address(0));
        transcendenceEngine = new TranscendenceEngine(address(soulForge), address(karmicLedger), address(coolToken));
        weatherOracle = new WeatherOracle();
        marketplace = new CSCMarketplace(address(coolToken), msg.sender, msg.sender);
    }
}
