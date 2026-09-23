# 🔥💜💙 CRAZY SEXY COOL
## A Transcendence Engine Metaverse

> *“Your birth determines your destiny. Your karma determines your power. Your enlightenment changes the world.”*

**Crazy Sexy Cool (CSC)** is a wallet-native metaverse concept on Ethereum L2 where spiritual progression, social systems, and celestial mechanics are expressed as on-chain game logic. The current repository now implements the first three major build tracks:

1. **Smart contract suite** for soul creation, karmic accounting, weather state, and transcendence progression
2. **Front-end Soul Forge flow** for generating and exploring a deterministic soul blueprint
3. **Lore and whitepaper docs** that present the product as a coherent spiritual-mechanical world

---

## 🌌 Core Vision

Players begin in attachment and evolve through a staged path:

**Crazy → Sexy → Cool → Integrated → Servant → Mysterious → Great Teacher → Enlightened**

Each soul is shaped by:

- wallet signature timestamp
- birth month
- sex
- moon phase
- temperament
- ruling planet

Every major action contributes to a karmic ledger:

- **White karma** — selfless, healing, generous actions
- **Gray karma** — self-serving service or ego-driven intervention
- **Black karma** — exploitative or harmful actions

Ascension depends on both **meeting stage gates** and **passing karmic audit**.

---

## 🏗️ Repository Structure

### `/contracts`

Foundry-based Solidity contracts for the transcendence engine:

- `SoulForge.sol` — one-soul-per-wallet soul minting with immutable blueprint data
- `KarmicLedger.sol` — white/gray/black karma accounting and action history
- `CoolToken.sol` — lightweight COOL token used to pay divine intervention costs
- `WeatherOracle.sol` — zone weather and moon-phase storage
- `TranscendenceEngine.sol` — stage progression, karmic audits, world questions, and divine interventions

### `/frontend`

React + TypeScript prototype for:

- forging a soul blueprint
- previewing planetary and lunar effects
- simulating karmic actions and stage progression
- visualizing zone access and Great Teacher weather effects

### `/docs`

Narrative and design documentation:

- `whitepaper.md`
- `gdd.md`
- `lore-bible.md`

---

## ⚙️ Local Development

### Frontend

```bash
cd /home/runner/work/crazy-sexy-cool/crazy-sexy-cool/frontend
npm install
npm run build
```

### Backend

```bash
cd /home/runner/work/crazy-sexy-cool/crazy-sexy-cool/backend
npm install
npm run build
```

### Contracts

Contracts use **Foundry**.

Deployment entrypoint:

- `/home/runner/work/crazy-sexy-cool/crazy-sexy-cool/contracts/script/Deploy.s.sol`

Expected environment:

- `BASE_SEPOLIA_RPC`
- `PRIVATE_KEY`
- `BASESCAN_API_KEY`

Typical commands:

```bash
cd /home/runner/work/crazy-sexy-cool/crazy-sexy-cool/contracts
forge build
forge test
forge script script/Deploy.s.sol --rpc-url $BASE_SEPOLIA_RPC --broadcast
```

---

## ✨ Immediate Product Pillars

### 1. Soul Blueprint Generator
Wallet and birth inputs create a deterministic soul identity with:

- elemental affinity
- shadow work profile
- planetary destiny
- moon-cycle consequences

### 2. Karmic Economy
Selfless acts yield SOUL, egoic use of power creates karmic debt, and gray karma can block ascension.

### 3. Divine Intervention
Great Teachers can:

- change world weather
- deny defeat
- cause fair emotions

Each intervention carries a real karmic or economic cost.

### 4. The World Question
Enlightened souls can ask a once-per-month question that alters the mood and rules of the world.

---

## 📚 Documentation

For the complete product framing, read:

- `/home/runner/work/crazy-sexy-cool/crazy-sexy-cool/docs/whitepaper.md`
- `/home/runner/work/crazy-sexy-cool/crazy-sexy-cool/docs/gdd.md`
- `/home/runner/work/crazy-sexy-cool/crazy-sexy-cool/docs/lore-bible.md`
