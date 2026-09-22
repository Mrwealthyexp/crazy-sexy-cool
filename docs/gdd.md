# Game Design Document - Crazy Sexy Cool

## Overview

Crazy Sexy Cool is a wallet-native metaverse with creator commerce, zone-based exploration, reputation-gated combat, and avatar-centric progression.

## Player Fantasy

Players should feel that:
- their avatar is their persistent identity
- their wallet, reputation, and social status follow them across systems
- combat is earned, licensed, and risky rather than default chaos
- safe creative spaces and dangerous competitive spaces can coexist

## Core Loops

### Onboarding loop
1. Connect wallet
2. Mint or select avatar identity
3. Review reputation baseline and account state
4. Enter the world through civilian-safe zones

### Progression loop
1. Explore districts and creator spaces
2. Earn reputation, assets, and currency
3. Unlock stronger social, economic, and combat privileges
4. Move toward higher tiers of participation and governance

### Creator economy loop
1. Create or acquire tokenized assets
2. List assets in marketplace systems
3. Earn primary and secondary-sale revenue
4. Reinvest in visibility, land presence, or governance influence

### Licensed combat loop
1. Build enough reputation to qualify
2. Acquire a combat license tier
3. Enter combat-enabled spaces or queues
4. Accept consequences from PvP outcomes and misconduct

## Zone Design Rules

### Safe zones
- Cities
- Creator galleries
- Social lounges
- Music or event venues

These spaces should prioritize commerce, identity expression, and collaboration.

### Combat-enabled zones
- Training grounds
- Ranked arenas
- Territory districts
- War zones

These spaces should surface license requirements, visible risk, and consequence systems.

## Player-facing systems by repo area

- `/frontend/src/components/SoulForge.tsx` — onboarding and avatar identity flow
- `/frontend/src/components/SoulDashboard.tsx` — profile, licenses, balances, and achievements
- `/frontend/src/components/WorldMap.tsx` — zone overview and world navigation
- `/frontend/src/data/zones.ts` — static zone descriptors for the UI
- `/backend/src/services/ShadowArena.ts` — combat queue and battle orchestration scaffold

## Progression Responsibilities

- Contracts define canonical entitlement and eligibility state
- Backend services coordinate world and battle flows
- Frontend presents player state and available actions

## Out of Scope for This Document

This document should not be the primary home for protocol internals, deployment details, or low-level contract architecture. Those belong in the whitepaper and contract source files.
