# CSC Implementation Playbook

## 1) Foundation and Compliance First

### Required Actions

- Open legal review for token classification and Howey analysis
- Define approved and prohibited messaging for:
  - whitepaper
  - social channels
  - token-facing product copy
- Create jurisdiction matrix for launch, access, and distribution constraints

### Exit Criteria

- Counsel-approved legal memo
- Counsel-approved messaging matrix
- Risk register signed by operations owner

## 2) Product and Technical Requirement Lock

### Locked Requirements

- ENS + namespace operations requirements
- $COOL contract deployment and verification requirements
- WalletConnect v2 wallet UX and chain guardrails
- Wallet-gated community channel requirements

### Exit Criteria

- Versioned requirement doc ratified by product, engineering, legal

## 3) On-Chain Identity and Brand Namespace

### Required Actions

- Register `crazysexycool.eth`
- Register `csc.metaverse`
- Transfer domain ownership to treasury-controlled multisig
- Implement recovery and renewal runbook
- Publish official addresses

### Exit Criteria

- Domain ownership proven on-chain
- Renewal alarms active
- Public address registry published

## 4) Token Contract and Deployment

### Implemented in Repository

- `contracts/src/CoolToken.sol` implemented as capped ERC-20
- `contracts/script/Deploy.s.sol` deploys with env-driven supply/owner/treasury config
- `contracts/test/SoulForge.t.sol` upgraded with core token behavior tests

### Required Actions

- Deploy to Base Sepolia
- Verify on Basescan
- Publish contract address and deployment parameters

## 5) WalletConnect v2 Frontend Integration

### Implemented in Repository

- `frontend/src/utils/wagmi.ts` configured for WalletConnect v2 + Base Sepolia transport
- `frontend/src/main.tsx` now wraps app in Wagmi and Query providers
- `frontend/src/App.tsx` now supports connect, disconnect, address display, and chain switching safeguards
- `frontend/.env.example` includes `VITE_WALLETCONNECT_PROJECT_ID`

### Exit Criteria

- Successful wallet connection via injected wallet and WalletConnect QR flow
- Network mismatch guidance and chain-switch flow validated

## 6) Avatar and Ecosystem Readiness

### Required Actions

- Commission 3D artist for base avatar collection
- Deliverables must include:
  - style guide compliance
  - agreed rig format
  - NFT metadata compatibility
  - milestone acceptance checklist

### Exit Criteria

- Approved concept pack
- Technical compatibility review complete

## 7) Community Launch with Access Controls

### Required Actions

- Launch Discord and Twitter with legal-approved messaging
- Configure wallet-gated channels (token/NFT ownership rules)
- Publish moderation and incident-response playbooks

### Exit Criteria

- Role and gating policy tested
- Moderator escalation matrix active

## 8) Go-Live Sequence

1. Legal sign-off
2. Contract verification and publication
3. Frontend wallet QA complete
4. Community gating QA complete
5. Soft launch
6. General release with KPI tracking and incident runbook ownership
