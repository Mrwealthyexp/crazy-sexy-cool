# Crazy Sexy Cool

Crazy Sexy Cool (CSC) is a wallet-native metaverse community where identity, assets, social status, and progression are designed to live on-chain.

## Product direction

CSC combines:
- **wallet-first onboarding** with no email or password
- **ERC-6551 token-bound avatars** so the avatar can act as the player wallet
- **soulbound reputation and combat licensing** for regulated PvP access
- **dual-token commerce** with `$COOL` for utility and governance plus stable credits for day-to-day trade
- **creator-owned assets** across avatars, wearables, land, vehicles, music, and apps

## Repository ownership map

### Product and architecture
- `/docs/whitepaper.md` — full product, token, governance, and protocol specification
- `/docs/gdd.md` — player-facing systems, progression, combat loops, and world rules
- `/docs/lore-bible.md` — setting, factions, and world fiction

### Frontend
- `/frontend/src/App.tsx` — top-level application shell for onboarding, dashboard, world, marketplace, combat, and governance
- `/frontend/src/components/SoulForge.tsx` — avatar minting and identity onboarding
- `/frontend/src/components/SoulDashboard.tsx` — balances, reputation, licenses, assets, and profile state
- `/frontend/src/components/WorldMap.tsx` — zone discovery, land overview, safe zones, and war zones
- `/frontend/src/utils/wagmi.ts` — wallet and chain configuration entry point
- `/frontend/src/stores/gameStore.ts` — client-side derived session state
- `/frontend/src/data/zones.ts` — static zone metadata used by the UI
- `/frontend/src/utils/api.ts` — typed frontend API client for platform, world, and combat endpoints

### Backend
- `/backend/src/index.ts` — API gateway for platform overview, world reads, relays, and combat services
- `/backend/src/services/ShadowArena.ts` — combat orchestration and queue state
- `/backend/src/services/EmotionOracle.ts` — optional narrative or experimental systems

### Smart contracts
- `/contracts/src/SoulForge.sol` — avatar identity bootstrapping and minting
- `/contracts/src/interfaces/IERC6551Registry.sol` — ERC-6551 registry integration boundary
- `/contracts/src/KarmicLedger.sol` — reputation, misconduct, and combat-license eligibility
- `/contracts/src/CoolToken.sol` — `$COOL` utility token scaffold
- `/contracts/src/TranscendenceEngine.sol` — progression and unlock evaluation
- `/contracts/src/WeatherOracle.sol` — world-state experiment hook
- `/contracts/script/Deploy.s.sol` — Foundry deployment orchestration
- `/contracts/test/SoulForge.t.sol` — protocol test coverage starting point

## Current implementation status

This repository now provides aligned scaffolding for the target product direction, but it is still an early-stage build. The codebase is organized so that wallet onboarding, protocol primitives, combat services, and product docs can evolve independently without losing architectural clarity.

## Tooling

### Frontend
```bash
cd frontend
npm install
npm run build
```

### Backend
```bash
cd backend
npm install
npm run build
```

### Contracts
```bash
cd contracts
forge test
```
