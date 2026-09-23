// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

import "../src/CoolToken.sol";
import "../src/KarmicLedger.sol";
import "../src/SoulForge.sol";
import "../src/TranscendenceEngine.sol";
import "../src/WeatherOracle.sol";

contract SoulForgeTest is Test {
    address internal player = address(0xA11CE);

    SoulForge internal soulForge;
    KarmicLedger internal karmicLedger;
    CoolToken internal coolToken;
    WeatherOracle internal weatherOracle;
    TranscendenceEngine internal engine;

    function setUp() public {
        soulForge = new SoulForge();
        karmicLedger = new KarmicLedger();
        coolToken = new CoolToken();
        weatherOracle = new WeatherOracle();
        engine = new TranscendenceEngine(address(soulForge), address(karmicLedger), address(coolToken), address(weatherOracle));

        soulForge.setController(address(engine));
        karmicLedger.setScribe(address(engine));
        coolToken.setMinter(address(engine), true);
        weatherOracle.setController(address(engine));
    }

    function testInitializeSoulRegistersIdentityAndRewards() public {
        vm.prank(player);
        uint256 soulId = engine.initializeSoul("Nova", "visionary", 7, keccak256("nova-tba"));

        SoulForge.SoulIdentity memory soul = soulForge.getSoulByOwner(player);
        KarmicLedger.KarmaProfile memory profile = karmicLedger.getProfile(player);

        assertEq(soulId, 1);
        assertEq(soul.soulId, 1);
        assertEq(soul.owner, player);
        assertEq(soul.displayName, "Nova");
        assertEq(soul.temperament, "visionary");
        assertEq(soul.birthMonth, 7);
        assertEq(profile.soulId, 1);
        assertEq(coolToken.balanceOf(player), 100 ether);
    }

    function testCombatRequiresLicense() public {
        vm.startPrank(player);
        engine.initializeSoul("Nova", "visionary", 7, keccak256("nova-tba"));
        vm.expectRevert(TranscendenceEngine.CombatLicenseRequired.selector);
        engine.engageCombat("shadow-arena", true);
        vm.stopPrank();
    }

    function testProgressionCombatAndTranscendenceFlow() public {
        vm.startPrank(player);
        engine.initializeSoul("Nova", "visionary", 7, keccak256("nova-tba"));

        engine.meditate();
        engine.meditate();
        engine.meditate();
        engine.createArtifact("soul-forge");
        engine.createArtifact("aeterna-gate");
        engine.createArtifact("shadow-arena");
        engine.createArtifact("oracle-district");
        engine.completeBounty(90);
        engine.grantCombatLicense();
        engine.engageCombat("shadow-arena", true);

        (bool canAscend, string memory reason) = engine.canTranscend(player);
        assertTrue(canAscend, reason);

        engine.transcend();
        engine.askWorldQuestion("What heals the city?", "Collective honesty.");
        vm.stopPrank();

        SoulForge.SoulIdentity memory soul = soulForge.getSoulByOwner(player);
        KarmicLedger.KarmaProfile memory profile = karmicLedger.getProfile(player);
        WeatherOracle.ZoneWeather memory weather = weatherOracle.getZoneWeather("shadow-arena");

        assertTrue(soul.combatLicensed);
        assertTrue(soul.transcended);
        assertEq(uint256(soul.focus), 112);
        assertEq(profile.white, 20);
        assertEq(profile.black, 0);
        assertEq(profile.gray, 8);
        assertEq(karmicLedger.reputationOf(player), 48);
        assertEq(coolToken.balanceOf(player), 510 ether);
        assertEq(weather.mood, "charged");
        assertEq(weatherOracle.worldQuestion(), "What heals the city?");
        assertEq(weatherOracle.collectiveAnswer(), "Collective honesty.");
    }
}
