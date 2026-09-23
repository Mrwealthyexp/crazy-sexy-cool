# Crazy Sexy Cool Whitepaper

## Executive Summary

Crazy Sexy Cool is a wallet-native metaverse prototype where each player forges one sovereign soul, earns COOL through visible contribution, and can only access combat after meeting karmic licensing requirements. The current implementation spans contracts, backend orchestration, and frontend play surfaces so identity, economy, progression, and world state all describe the same player journey.

## Technical Architecture

### Smart Contracts
- **SoulForge** mints one canonical soul identity per wallet, tracks focus, world state, combat licensing, and transcendence flags.
- **KarmicLedger** records white, black, and gray karma while deriving reputation from player behavior.
- **CoolToken** mints the reward currency used to represent skilled contribution and milestone rewards.
- **TranscendenceEngine** coordinates initialization, creation, earnings, combat licensing, combat outcomes, and transcendence thresholds.
- **WeatherOracle** stores zone-level climate shifts and the collective world question issued by transcended players.
- **IERC6551Registry** preserves the interface boundary for token-bound account derivation.

### Backend
- `GET /game/data` returns the current player snapshot plus mutable world state.
- `POST /game/action` executes the canonical action loop: `forge-soul`, `meditate`, `create-artifact`, `complete-bounty`, `license-combat`, `engage-combat`, and `transcend`.
- **EmotionOracle** derives a dominant emotional state from focus and karma.
- **ShadowArena** enforces license-gated combat and resolves battle outcomes.

### Frontend
- The app centers on three integrated surfaces: **Soul Forge**, **Soul Dashboard**, and **World Map**.
- Wallet identity is the entry point, soul status is persistent, and every action rehydrates the same world model.
- Zone cards expose creation, meditation, and combat loops without leaving the main world view.

## Core Economy and Progression
- Soul initialization grants **100 COOL**.
- Artifact creation grants **15 COOL**, +15 focus, +3 white karma, and +1 gray karma.
- Bounty completion grants **masteryScore COOL**, plus focus and karma based on quality.
- Combat licensing requires **25 focus** and **5 reputation**.
- Transcendence requires **100 focus**, **20 white karma**, **black karma at or below 5**, **25 reputation**, and an active combat license.
- Successful transcendence grants **250 COOL** and unlocks the world question for 24 hours.

## World Ownership Thesis
Crazy Sexy Cool is structured so that identity, progress, value creation, and conflict all route through the player's wallet-linked soul. The backend mirrors the same rules as the contracts, and the frontend exposes those rules transparently, making the world feel owned instead of merely visited.
