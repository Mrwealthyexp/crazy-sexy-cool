# Crazy Sexy Cool (CSC) Investor Whitepaper

## 1) Executive Summary

Crazy Sexy Cool (CSC) is a wallet-native metaverse ecosystem built for Ethereum L2, initially deployed on Base Sepolia and designed for Base mainnet readiness. CSC combines identity, progression, and economy through on-chain assets and wallet-linked game state.

The $COOL token is designed as the utility and coordination layer for ecosystem actions, marketplace activity, rewards, and governance signaling.

## 2) Vision and Product Scope

- Wallet-native user journey with direct wallet connection
- On-chain game-linked economy through smart contracts
- Avatar-centric identity with NFT-compatible expansion path
- Progressive decentralization of treasury and governance controls

## 3) Tokenomics Framework

### 3.1 Token Specification

- Name: Crazy Sexy Cool
- Symbol: COOL
- Decimals: 18
- Supply model: capped supply
- Initial network target: Base (testnet first, then mainnet)

### 3.2 Supply and Allocation Model (Proposed)

Total Max Supply: **1,000,000,000 COOL**

- Ecosystem Rewards: 35%
- Treasury and Operations: 20%
- Community and Growth: 15%
- Team: 15%
- Strategic Partnerships and Advisors: 10%
- Liquidity and Market Operations: 5%

### 3.3 Vesting and Unlock Policy (Proposed)

- Team: 12-month cliff, 36-month linear vesting
- Advisors/Partners: 6-month cliff, 24-month linear vesting
- Treasury: multisig-controlled with quarterly transparency reports
- Ecosystem rewards: emissions schedule tied to gameplay and participation milestones

### 3.4 Utility Model

$COOL utility includes:

- In-game payments and upgrades
- Reward distribution and event incentives
- Gated access for premium community features
- Governance signaling and proposal weighting (subject to legal clearance)

### 3.5 Governance and Treasury Controls

- Treasury authority starts with multisig control
- Governance decentralization follows staged milestones
- Emergency controls and incident-response powers are time-bounded and disclosed

## 4) Technical Architecture

### 4.1 Smart Contracts

- `CoolToken.sol`: capped ERC-20 utility token with owner-gated minting and burn support
- Existing game contracts remain modular for soul, karma, and progression systems

### 4.2 Wallet Integration

- WalletConnect v2 integrated in frontend wallet flow
- Required network guardrails for Base Sepolia during testnet phase
- Session persistence and reconnect behavior managed through wagmi

### 4.3 Deployment Controls

- Foundry deployment scripts with env-driven parameters
- Contract verification path on Basescan
- Published official contract addresses and deployment metadata per release

## 5) Compliance and Legal Positioning

### 5.1 Legal Workstream (Mandatory Before Public Launch)

- Securities analysis (Howey test and related jurisdictional tests)
- Jurisdiction strategy for token distribution, marketing, and access restrictions
- Claims policy for whitepaper, social channels, and token messaging

### 5.2 Marketing and Communication Guardrails

Until legal clearance is complete:

- No profit/yield guarantees
- No “investment return” messaging
- No unsupported utility or roadmap promises

## 6) On-Chain Identity and Namespace

- Primary domains: `crazysexycool.eth`, `csc.metaverse`
- Operational controls:
  - multisig ownership
  - recovery runbook
  - renewal calendar with alerting
- Official address registry publication policy for all production assets

## 7) Community and Access Controls

- Discord and Twitter launch requires legal-approved communication templates
- Wallet-gated channels tied to token/NFT ownership proofs
- Moderation and incident playbooks required before public invite expansion

## 8) Avatar and Content Production

- 3D avatar commissioning follows formal asset specification:
  - style targets
  - rigging standard
  - metadata compatibility
  - milestone-based delivery acceptance
- Assets must remain compatible with on-chain identity roadmap

## 9) Risk Disclosures

Key risk categories:

- Smart contract and wallet integration vulnerabilities
- Token liquidity and market volatility
- Regulatory interpretation changes across jurisdictions
- Third-party infrastructure dependencies (wallet providers, social platforms)

## 10) Launch Sequence and Readiness Gates

1. Legal sign-off and communications policy lock
2. Contract deployment, verification, and publication
3. Frontend wallet QA (including network mismatch and reconnect flows)
4. Community gating QA and moderation readiness
5. Soft launch to limited cohort
6. Expanded rollout with KPI and incident monitoring

## 11) Forward-Looking Statement

This document is for ecosystem planning and does not constitute legal, tax, or investment advice. Final token design, governance mechanics, and access policies are subject to legal review, security validation, and operational readiness.
