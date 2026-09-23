// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {SoulForge} from "../src/SoulForge.sol";
import {KarmicLedger} from "../src/KarmicLedger.sol";
import {CoolToken} from "../src/CoolToken.sol";
import {WeatherOracle} from "../src/WeatherOracle.sol";
import {TranscendenceEngine} from "../src/TranscendenceEngine.sol";

contract SoulForgeTest is Test {
    SoulForge internal soulForge;
    KarmicLedger internal karmicLedger;
    CoolToken internal coolToken;
    WeatherOracle internal weatherOracle;
    TranscendenceEngine internal engine;

    address internal player = address(0xA11CE);

    function setUp() public {
        soulForge = new SoulForge(address(this));
        karmicLedger = new KarmicLedger(address(this));
        coolToken = new CoolToken(address(this));
        weatherOracle = new WeatherOracle(address(this));
        engine = new TranscendenceEngine(
            address(this),
            address(soulForge),
            address(karmicLedger),
            address(coolToken),
            address(weatherOracle)
        );

        karmicLedger.setScribe(address(engine), true);
        coolToken.setMinter(address(engine), true);
        weatherOracle.setController(address(engine), true);
    }

    function test_forgeSoulStoresBlueprintAndBlocksDuplicates() public {
        uint256 soulId = _forgeSoul(player);
        SoulForge.SoulBlueprint memory blueprint = soulForge.blueprintOf(soulId);

        assertEq(soulForge.ownerOf(soulId), player);
        assertEq(soulForge.walletToSoul(player), soulId);
        assertEq(blueprint.birthMonth, 9);
        assertTrue(blueprint.blueprintHash != bytes32(0));

        vm.expectRevert(abi.encodeWithSelector(SoulForge.SoulAlreadyForged.selector, player));
        _forgeSoul(player);
    }

    function test_progressionCanReachEnlightened() public {
        uint256 soulId = _forgeSoul(player);

        vm.startPrank(player);
        engine.initializeSoul(soulId);
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.HumblingDefeat, "A public loss broke the ego.");
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.SelflessAct, "Protected a stranger after losing.");
        engine.advanceStage(soulId);
        engine.recordMilestone(
            soulId,
            TranscendenceEngine.JourneyMilestone.GiftMostValuableAsset,
            "Gave away their most precious relic."
        );
        engine.advanceStage(soulId);
        engine.recordMilestone(
            soulId,
            TranscendenceEngine.JourneyMilestone.CompassionateGrief,
            "Mourned another soul and intervened."
        );
        engine.advanceStage(soulId);
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.Mentorship, "Guided another player.");
        engine.advanceStage(soulId);
        engine.recordMilestone(
            soulId,
            TranscendenceEngine.JourneyMilestone.AnonymousRescue,
            "Saved a rival without revealing their name."
        );
        engine.advanceStage(soulId);
        engine.recordMilestone(
            soulId,
            TranscendenceEngine.JourneyMilestone.EnemyReconciliation,
            "Ended a feud and made peace possible."
        );
        engine.advanceStage(soulId);
        engine.recordMilestone(
            soulId,
            TranscendenceEngine.JourneyMilestone.FairEmotions,
            "Helped enemies witness each other's truth."
        );
        engine.advanceStage(soulId);
        engine.askTheWorld(soulId, "What are you really fighting for?");
        vm.stopPrank();

        TranscendenceEngine.SoulState memory soul = engine.stateOf(soulId);
        assertEq(soul.stage, uint8(TranscendenceEngine.Stage.Enlightened));
        assertTrue(soul.isGreatTeacher);
        assertTrue(soul.isEnlightened);
        assertEq(engine.worldQuestion(), "What are you really fighting for?");
        assertTrue(coolToken.balanceOf(player) == 1_000 ether);
    }

    function test_weatherShiftBurnsCoolAndUpdatesZone() public {
        uint256 soulId = _forgeSoul(player);
        _ascendToStage(soulId, player, TranscendenceEngine.Stage.GreatTeacher);

        uint256 startingBalance = coolToken.balanceOf(player);

        vm.prank(player);
        engine.invokeWeatherShift(
            soulId,
            "red-district",
            WeatherOracle.Weather.Storm,
            WeatherOracle.MoonPhase.FullMoon,
            "Purifying storm for the furious.",
            bytes32("weather-proof"),
            true
        );

        WeatherOracle.ZoneWeather memory zoneWeather = weatherOracle.weatherForZone("red-district");
        assertEq(coolToken.balanceOf(player), startingBalance - 50 ether);
        assertEq(uint8(zoneWeather.weather), uint8(WeatherOracle.Weather.Storm));
        assertEq(uint8(zoneWeather.moonPhase), uint8(WeatherOracle.MoonPhase.FullMoon));
    }

    function test_egoicWeatherCreatesGrayKarmaAndSuspension() public {
        uint256 soulId = _forgeSoul(player);
        _ascendToStage(soulId, player, TranscendenceEngine.Stage.GreatTeacher);

        vm.prank(player);
        engine.invokeWeatherShift(
            soulId,
            "glass-tower",
            WeatherOracle.Weather.Snow,
            WeatherOracle.MoonPhase.Waning,
            "Stillness imposed for vanity.",
            bytes32("ego-proof"),
            false
        );

        TranscendenceEngine.SoulState memory soul = engine.stateOf(soulId);
        assertEq(soul.grayKarma, 1_000);
        assertGt(engine.divinePowerSuspensionEndsAt(soulId), block.timestamp);
    }

    function test_initializeSoulCannotRunTwice() public {
        uint256 soulId = _forgeSoul(player);

        vm.startPrank(player);
        engine.initializeSoul(soulId);
        vm.expectRevert(abi.encodeWithSelector(TranscendenceEngine.SoulAlreadyInitialized.selector, soulId));
        engine.initializeSoul(soulId);
        vm.stopPrank();
    }

    function test_advanceStageRequiresMilestones() public {
        uint256 soulId = _forgeSoul(player);

        vm.startPrank(player);
        engine.initializeSoul(soulId);
        vm.expectRevert(abi.encodeWithSelector(TranscendenceEngine.InvalidStageAdvance.selector, uint8(0)));
        engine.advanceStage(soulId);
        vm.stopPrank();
    }

    function test_grayKarmaBlocksGreatTeacherAscension() public {
        uint256 soulId = _forgeSoul(player);
        _ascendToStage(soulId, player, TranscendenceEngine.Stage.Servant);

        vm.startPrank(player);
        engine.recordKarmicDebt(soulId, false, 2_000, 100, "Ego poisoned the rescue.");
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.EnemyReconciliation, "reconcile");
        vm.expectRevert(abi.encodeWithSelector(TranscendenceEngine.InvalidStageAdvance.selector, uint8(5)));
        engine.advanceStage(soulId);
        vm.stopPrank();
    }

    function test_divineInterventionRequiresGreatTeacher() public {
        uint256 soulId = _forgeSoul(player);

        vm.startPrank(player);
        engine.initializeSoul(soulId);
        vm.expectRevert(abi.encodeWithSelector(TranscendenceEngine.OnlyGreatTeacher.selector, soulId));
        engine.divineIntervention(soulId, uint8(TranscendenceEngine.DivineSkill.Weather), bytes32("proof"));
        vm.stopPrank();
    }

    function test_worldQuestionRequiresEnlightenmentAndRespectsCooldown() public {
        uint256 soulId = _forgeSoul(player);
        _ascendToStage(soulId, player, TranscendenceEngine.Stage.GreatTeacher);

        vm.startPrank(player);
        vm.expectRevert(abi.encodeWithSelector(TranscendenceEngine.OnlyEnlightened.selector, soulId));
        engine.askTheWorld(soulId, "Can I skip the last lesson?");
        engine.recordMilestone(
            soulId,
            TranscendenceEngine.JourneyMilestone.FairEmotions,
            "Helped enemies witness each other's truth."
        );
        engine.advanceStage(soulId);
        engine.askTheWorld(soulId, "What are you really fighting for?");
        vm.expectRevert(bytes("Too soon"));
        engine.askTheWorld(soulId, "What remains when the fight ends?");
        vm.stopPrank();
    }

    function test_canAdvanceToMysteriousStage() public {
        uint256 soulId = _forgeSoul(player);
        _ascendToStage(soulId, player, TranscendenceEngine.Stage.Servant);

        vm.startPrank(player);
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.EnemyReconciliation, "reconcile");
        engine.advanceStage(soulId);
        vm.stopPrank();

        TranscendenceEngine.SoulState memory soul = engine.stateOf(soulId);
        assertEq(soul.stage, uint8(TranscendenceEngine.Stage.Mysterious));
        assertTrue(!soul.isGreatTeacher);
    }

    function _ascendToStage(uint256 soulId, address soulOwner, TranscendenceEngine.Stage targetStage) internal {
        vm.startPrank(soulOwner);
        engine.initializeSoul(soulId);
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.HumblingDefeat, "humbling defeat");
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.SelflessAct, "selfless act");
        if (targetStage == TranscendenceEngine.Stage.Unknowing) {
            vm.stopPrank();
            return;
        }
        engine.advanceStage(soulId);
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.GiftMostValuableAsset, "gift");
        if (targetStage == TranscendenceEngine.Stage.Wanting) {
            vm.stopPrank();
            return;
        }
        engine.advanceStage(soulId);
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.CompassionateGrief, "grief");
        if (targetStage == TranscendenceEngine.Stage.Detached) {
            vm.stopPrank();
            return;
        }
        engine.advanceStage(soulId);
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.Mentorship, "mentor");
        if (targetStage == TranscendenceEngine.Stage.Integrated) {
            vm.stopPrank();
            return;
        }
        engine.advanceStage(soulId);
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.AnonymousRescue, "rescue");
        if (targetStage == TranscendenceEngine.Stage.Servant) {
            vm.stopPrank();
            return;
        }
        engine.advanceStage(soulId);
        if (targetStage == TranscendenceEngine.Stage.Mysterious) {
            vm.stopPrank();
            return;
        }
        engine.recordMilestone(soulId, TranscendenceEngine.JourneyMilestone.EnemyReconciliation, "reconcile");
        engine.advanceStage(soulId);
        vm.stopPrank();
    }

    function _forgeSoul(address recipient) internal returns (uint256) {
        return soulForge.forgeSoul(
            recipient,
            SoulForge.SoulBlueprint({
                sex: 0,
                birthMonth: 9,
                rulingPlanet: 4,
                moonPhase: 2,
                temperament: 1,
                signatureTimestamp: 1725753600,
                blueprintHash: bytes32(0)
            })
        );
    }
}
