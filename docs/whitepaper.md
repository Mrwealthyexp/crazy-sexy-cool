# Crazy Sexy Cool Whitepaper

## Executive Summary

Crazy Sexy Cool (CSC) is a wallet-native metaverse built around player-owned identity, creator-owned assets, regulated combat access, and on-chain reputation. The platform targets Ethereum L2 deployment, with Base as the primary chain scaffold in this repository.

## Core Identity and Wallet Architecture

### Wallet-first onboarding
Players connect with wallets instead of creating usernames and passwords. The frontend wallet entry point lives in `/frontend/src/utils/wagmi.ts`, while the onboarding shell is composed in `/frontend/src/App.tsx` and `/frontend/src/components/SoulForge.tsx`.

### Avatar identity and token-bound accounts
- Avatar identity is scaffolded in `/contracts/src/SoulForge.sol`
- ERC-6551 integration boundaries are defined in `/contracts/src/interfaces/IERC6551Registry.sol`
- Player-facing identity and balances belong in `/frontend/src/components/SoulDashboard.tsx`

### Reputation and licenses
Combat access is intended to be reputation-gated. The reputation and license eligibility scaffold belongs in `/contracts/src/KarmicLedger.sol` and is surfaced in `/frontend/src/components/SoulDashboard.tsx`.

## Token Economy

### `$COOL`
`$COOL` is the utility and governance token scaffolded in `/contracts/src/CoolToken.sol`. Its initial responsibilities are:
- spending and access control
- creator tipping
- governance participation
- progression and licensing sinks

### Stable credits
Stable commerce credits are not yet implemented, but they should be introduced as a dedicated protocol contract under `/contracts/src` once real marketplace flows are started.

## Marketplace and Asset Ownership

The repository does not yet include a marketplace contract. The intended split is:
- contracts own tokenized assets, royalty rules, and settlement
- backend owns index-friendly API responses and relay endpoints
- frontend owns browsing, listing, and purchase flows

Asset-display entry points are expected to grow from:
- `/frontend/src/components/SoulDashboard.tsx`
- `/frontend/src/components/WorldMap.tsx`
- `/frontend/src/utils/api.ts`

## Licensed Combat System

Combat is opt-in and license-gated. The current ownership split is:
- `/contracts/src/KarmicLedger.sol` for reputation and license eligibility
- `/contracts/src/TranscendenceEngine.sol` for unlock and progression checks
- `/backend/src/services/ShadowArena.ts` for match orchestration and queue state
- `/frontend/src/data/zones.ts` and `/frontend/src/components/WorldMap.tsx` for world presentation of safe and combat-enabled zones

## Governance

Governance is not yet implemented, but the target structure is:
- protocol contracts for staking, voting, and proposal execution
- frontend dashboard sections for participation and visibility
- whitepaper ownership for governance policy and decision rules

## Technical Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- wagmi/RainbowKit-compatible wallet scaffolding

### Backend
- Express API server
- gameplay and relay-friendly service boundaries

### Contracts
- Foundry-based smart contract workspace
- Base-focused deployment scaffold in `/contracts/script/Deploy.s.sol`

## Roadmap Alignment

### Phase 1
- wallet onboarding shell
- avatar and reputation contract scaffolds
- combat/world API scaffolds
- documentation alignment across product, game design, and lore

### Phase 2
- marketplace contracts and UI
- creator economy flows
- real token settlement and stable credits

### Phase 3
- land ownership and renting
- deeper PvP systems and bounty workflows
- governance participation UI

### Phase 4
- full metaverse services, creator tooling, and cross-system interoperability
