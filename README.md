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

- **Contracts**: Foundry-based Solidity contracts in `/contracts`
- **Frontend**: React + TypeScript client in `/frontend`
- **Backend**: Node/TypeScript API services in `/backend`

## 🚀 Smart Contract Deployment (Base Sepolia)

1. Copy `/contracts/.env.example` to `/contracts/.env` and fill values.
2. From `/contracts`, run:

```bash
forge script script/Deploy.s.sol:Deploy \
  --rpc-url $BASE_SEPOLIA_RPC \
  --broadcast \
  --verify \
  --etherscan-api-key $BASESCAN_API_KEY
```

## 🔌 WalletConnect v2 Setup (Frontend)

1. Copy `/frontend/.env.example` to `/frontend/.env`.
2. Set:
   - `VITE_WALLETCONNECT_PROJECT_ID`
   - `VITE_RPC_URL` (optional override)
3. From `/frontend`, run:

```bash
npm install
npm run dev
```
