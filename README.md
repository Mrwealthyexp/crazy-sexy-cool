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

---

## 🚀 Quick Start

### Prerequisites

- <a href="https://nodejs.org/">Node.js</a> 20+
- <a href="https://book.getfoundry.sh/getting-started/installation">Foundry</a>
- <a href="https://git-scm.com/">Git</a>
- A Web3 wallet (MetaMask, Rainbow, etc.)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/crazy-sexy-cool.git
cd crazy-sexy-cool
```

### 2. Contracts: Configure, Build, Test, Deploy

```bash
cd contracts
cp .env.example .env
# .env values:
# PRIVATE_KEY=0x_your_wallet_private_key
# BASESCAN_API_KEY=your_basescan_api_key
# BASE_SEPOLIA_RPC=https://sepolia.base.org
# BASE_MAINNET_RPC=https://mainnet.base.org

# Install dependencies
forge install OpenZeppelin/openzeppelin-contracts --no-commit

# Compile
forge build

# Test
forge test

# Deploy to Base Sepolia
source .env
forge script script/Deploy.s.sol --rpc-url $BASE_SEPOLIA_RPC --broadcast --verify
```

### 3. Frontend: Configure, Develop, Build

```bash
cd frontend
cp .env.example .env
# Edit .env: VITE_API_URL=http://localhost:3001   # or your Railway/Render URL

npm install
npm run dev        # Development
npm run build      # Production build
```

### 4. Backend: Configure, Build, Run

```bash
cd backend
cp .env.example .env
# Edit .env: OPENAI_API_KEY=sk-...

npm install
npm run build
npm start          # Production
npm run dev        # Development (ts-node)
```
