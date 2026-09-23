# 🔥💜💙 CRAZY SEXY COOL
## A Transcendence Engine Metaverse

> *"Your birth determines your destiny. Your karma determines your power. Your enlightenment changes the world."*

**Crazy Sexy Cool (CSC)** is a wallet-native, spiritually-mechanical metaverse where players forge souls from cosmic data, evolve through worldly attachments, and achieve **Great Teacher** status with godlike powers. Built on **Base L2**, powered by **ERC-6551 Token-Bound Accounts**, and governed by on-chain karma.

---

## 🌌 The World

The year is **2075**. The climate has collapsed and reversed. **California** has been swallowed by the Pacific. **Florida** is a drowned graveyard of coral cathedrals. **Antarctica** has thawed to reveal **Aeterna** — a crystal megacity built by a pre-human civilization, ringed by a 500-meter wall and 2-kilometer god-statues.

This is not a game. It is a **mirror for the soul**.

---

## ⚡ Core Mechanics

| Feature | Description |
|---------|-------------|
| **Soul Forge** | Mint an ERC-6551 soul bound to your wallet. Your birth month, planetary alignment, moon phase, and temperament determine your destiny. |
| **Three Worldly States** | **Crazy** (fire/chaos), **Sexy** (water/desire), **Cool** (air/detachment). Master all three to transcend. |
| **Karmic Economy** | Every action is recorded as soulbound karma. White (given), Black (taken), Gray (self-serving). Your ledger determines if you can ascend. |
| **God Skills** | Great Teachers alter weather, deny death, and cause **Fair Emotions** — making enemies see each other's truth. |
| **World Question** | Enlightened players ask the server a question. The collective answer alters reality for 24 hours. |
| **Anonymous Intervention** | Divine acts use zk-proofs. The saved never know who saved them. The mystery IS the teaching. |

---

## 🏗️ Architecture

- `shared/game.ts`: Canonical game state + action contract used by backend and frontend
- `backend`: Express API for game state and action processing
- `frontend`: React UI for dashboard, soul forge controls, and world map interactions
- `contracts`: Foundry smart contracts and scripts

---

## 🚀 MVP Vertical Slice (Zone Entry + Combat Gating)

### Backend endpoints
- `GET /game/data` — Returns current game state
- `POST /game/action` — Accepts actions:
  - `ENTER_ZONE`
  - `ATTEMPT_COMBAT`
  - `TOGGLE_COMBAT_LICENSE`

### Combat rules
- `none`: Combat is blocked
- `licensed`: Combat requires active license
- `open`: Combat is always allowed

### Run locally
1. Backend:
   - `cd /home/runner/work/crazy-sexy-cool/crazy-sexy-cool/backend`
   - `npm install`
   - `npm run dev`
2. Frontend (new terminal):
   - `cd /home/runner/work/crazy-sexy-cool/crazy-sexy-cool/frontend`
   - `npm install`
   - `npm run dev`
3. Open the Vite URL and verify:
   - Load game data successfully
   - Enter a different zone
   - Attempt combat in a `none` zone (blocked)
   - Attempt combat in a `licensed` zone without license (blocked)
   - Toggle license and attempt combat again (allowed)

---

## 🧪 Validation

- Backend typecheck/build: `npm run build` (inside `backend`)
- Frontend typecheck/build: `npm run build` (inside `frontend`)
