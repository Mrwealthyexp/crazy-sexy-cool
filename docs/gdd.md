# Game Design Document — Crazy Sexy Cool

## High-Level Premise

Crazy Sexy Cool is a spiritually-mechanical metaverse where players move through emotional, moral, and social states rather than traditional classes. The game loop is designed to make **choice**, **motive**, and **consequence** visible.

## Design Pillars

1. **Destiny from birth** — character creation should feel sacred and deterministic
2. **Transcendence through play** — progression should require lived transformation, not grinding alone
3. **Power with consequence** — the strongest abilities must carry meaningful cost
4. **Mystery as teaching** — not every intervention should be attributable or explainable
5. **World as mirror** — weather, zones, and collective questions should reflect the soul-state of the server

## Core Player Loop

1. Forge a soul from wallet + cosmology inputs
2. Enter the world trapped in attachment
3. Complete quests, conflicts, trades, and social interactions
4. Accumulate white, gray, or black karma
5. Unlock stage gates through specific moral-emotional trials
6. Become a Great Teacher capable of altering the world
7. Reach Enlightened stewardship and influence world rules

## Systems

### Soul Forge
- one soul per wallet
- immutable blueprint
- deterministic identity preview in the frontend
- birth month determines elemental affinity
- ruling planet determines eventual divine power profile

### Karmic Ledger
- stores white, gray, and black karma
- stores action history
- gates late-stage ascension
- gives product meaning to intention, not just outcome

### Transcendence Engine
- tracks current stage
- records stage milestones
- enforces stage advancement gates
- runs karmic audit
- enables divine interventions and world questions

### COOL / SOUL Economy
- COOL pays for intervention usage
- SOUL reflects earned transcendence
- egoic use of power should burn value and slow ascension

### Weather Oracle
- named zones store weather and moon phase
- Great Teachers can change zone weather
- misuse of weather shifts creates gray karma and cooldowns

## Stage Design

| Stage | Fantasy | Gate |
| --- | --- | --- |
| Crazy | survival through chaos | humbling defeat + selfless act |
| Sexy | desire and visibility | surrender highest-value asset |
| Cool | detached mastery | grief-driven intervention |
| Integrated | balanced identity | teach another player |
| Servant | hidden compassion | anonymous rescue |
| Mysterious | catalytic presence | reconcile enemies |
| Great Teacher | divine stewardship | fair emotions + karmic audit |
| Enlightened | world-scale presence | final steward status |

## Zone Design

### The Red District
- dominant energy: Crazy
- expected loop: combat, provocation, reckless gain
- teacher weather: Storm

### The Velvet Lounge
- dominant energy: Sexy
- expected loop: seduction, artistry, luxury, status
- teacher weather: Rain

### The Glass Tower
- dominant energy: Cool
- expected loop: calculation, markets, observation
- teacher weather: Snow

### The Nexus
- dominant energy: integration
- expected loop: synthesis, teaching, revelation
- teacher weather: Rainbow

### The Shadow Realm
- dominant energy: hidden self
- expected loop: shadow quests and symbolic encounters
- teacher weather: Dark

### The Throne Room
- dominant energy: Great Teacher
- expected loop: revelation and stewardship
- teacher weather: Sunbreak

## Frontend MVP Requirements

- form-driven Soul Forge input experience
- deterministic local soul preview
- live stage tracker
- milestone simulation buttons
- karmic audit feedback
- world map cards with stage-gated access

## Smart Contract MVP Requirements

- SoulForge minting
- KarmicLedger recording
- COOL minting and burn costs
- WeatherOracle zone updates
- TranscendenceEngine stage progression and audits
- deployment script wiring
- Foundry tests

## Success Criteria

The MVP succeeds if a new contributor or investor can:

1. understand the metaphysics of the world
2. see how those metaphysics map to contracts and UI
3. believe the system can be expanded into a persistent wallet-native metaverse
