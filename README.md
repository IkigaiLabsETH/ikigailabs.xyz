Below is the complete README file with enhanced, clear, and structured markdown formatting. This version is designed for readability and ease of navigation.

# Ikigai Labs XYZ

The platform is a comprehensive, non-custodial, open-source Web3 application designed to empower creators and collectors while leveraging the advanced functionalities of **Reservoir Tools** and **Thirdweb**. Artists can securely mint, distribute, and sell their digital art across multiple chains, with smart contracts tailored through **Transient Labs**. By integrating Ikigai Labs' **T.R.A.C.E.** system, authenticity and provenance are guaranteed, ensuring transparency in every transaction.

Curators play a pivotal role by crafting narratives and experiences through a seamless multi-chain aggregator that showcases over **150 marketplaces**. Collectors are further engaged through innovative equity tokenization, offering them shared ownership and deeper community involvement. The platform not only supports digital art transactions but also fosters a dynamic, evolving ecosystem where creators, curators, and collectors thrive. The concept of *ikigai* guides this vision—blending technology, innovation, and passion to nurture both digital and physical art spaces through residencies and real-world experiences.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [App Architecture](#app-architecture)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Proposal: Upcoming Tokenomics & Roadmap](#proposal-upcoming-tokenomics--roadmap)

---

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- **Node.js** (version X.X.X or higher)
- **npm** or **yarn**
- **Thirdweb SDK**
- **Reservoir API key**

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/IkigaiLabsETH/ikigailabs.xyz.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd ikigailabs.xyz
    ```

3. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

4. **Set up environment variables:**

    - Copy the `.env.example` file to `.env`
    - Fill in the required values, including your Reservoir API key and Thirdweb project settings

---

## Usage

To start the development server:

1. Ensure you're in the project directory.
2. Run one of the following commands:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

*For production, build the application first:*

```bash
yarn build

App Architecture

Key Architectural Decisions:
	•	React Server Components: Extensive use for improved performance.
	•	Client Components: Wrapped in Suspense with fallbacks.
	•	URL State Management: Leveraging nuqs.
	•	Responsive Design: Mobile-first approach with Tailwind CSS.
	•	Optimized Images: Utilizes Next.js Image component.

Directory Structure Overview:
	•	/app: Next.js 13+ App Router structure
	•	/api: API routes
	•	/[locale]: Internationalized routes
	•	/components: Reusable UI components
	•	/ui: Shadcn UI components
	•	/hooks: Custom React hooks
	•	/lib: Utility functions and configurations
	•	/modules: Feature-specific modules
	•	/collections: Collection-related functionality
	•	page.tsx: Server Component for collections page
	•	collections-grid.tsx: Client Component for rendering collections
	•	use-collections.ts: Custom hook for collection data
	•	/providers: Context providers for state management
	•	/public: Static assets
	•	/styles: Global styles and Tailwind configuration
	•	/types: TypeScript type definitions and interfaces

API Reference

The application leverages both Reservoir and Thirdweb APIs along with custom endpoints.

Reservoir Endpoints
	•	Get Collections:

GET /api/reservoir/collections

Fetches a list of NFT collections.

	•	Get Collection Details:

GET /api/reservoir/collections/{collectionId}

Retrieves detailed information about a specific collection.

	•	Get Tokens:

GET /api/reservoir/tokens

Fetches NFT tokens based on specified filters.

Thirdweb Endpoints
	•	Get Contract Metadata:

GET /api/thirdweb/contract/{contractAddress}

Retrieves metadata for a specific smart contract.

	•	Create Listing:

POST /api/thirdweb/marketplace/create-listing

Creates a new NFT listing on the marketplace.

Custom Endpoints
	•	User Authentication:

POST /api/auth/login
POST /api/auth/logout
GET /api/auth/user

Handles user authentication and data retrieval.

	•	Marketplace Activity:

GET /api/activity

Combines data from Reservoir and on-chain events to fetch recent marketplace activity.

For detailed parameters and response formats, please refer to our API documentation.

Contributing
	1.	Fork the repository.
	2.	Create your feature branch:

git checkout -b feature/AmazingFeature


	3.	Commit your changes:

git commit -m 'Add some AmazingFeature'


	4.	Push to the branch:

git push origin feature/AmazingFeature


	5.	Open a Pull Request.

License

This project is licensed under the MIT License.

Proposal: Upcoming Tokenomics & Roadmap

Note: The following tokenomics details are part of our proposal and are not yet live.

IKIGAI Token Overview
	•	Token Standard: ERC20
	•	Symbol: IKIGAI
	•	Maximum Supply: 1,000,000,000 (1 billion)
	•	Initial Supply: 0 (fair launch)
	•	Decimals: 18

Emission Schedule & Distribution
	•	Year 1: Up to 250M tokens (25% of total supply)
	•	Year 2: Up to 200M tokens (20%)
	•	Year 3: Up to 150M tokens (15%)
	•	Year 4+: Emissions determined by protocol activity

Emission Sources:
	•	Trading Volume: 40%
	•	NFT Minting: 30%
	•	Staking Rewards: 20%
	•	Referrals & Combos: 10%

Advanced Reward Mechanisms
	•	Dynamic Multipliers:
	•	Market Activity: 1.5x multiplier when daily volume exceeds 1000 BERA.
	•	User Performance: Bonuses from trade streaks, staking duration, and monthly volume, with combined multipliers up to 4x the base reward.
	•	Dynamic Fee Reductions:
	•	Staking Tiers: Up to 30% fee reduction.
	•	Trading Volume: Up to 20% fee reduction.
	•	Loyalty Streaks: Up to 15% fee reduction.
	•	Combined Maximum Reduction: 50%.

Supply Control & Adaptive Burn
	•	Adaptive Burn Rate:
	•	Base rate of 1% per transaction, scaling up to a maximum of 4% during peak periods.
	•	Emission Caps:
	•	Daily, weekly, and monthly mint limits to responsibly manage token supply.
	•	Emergency Safeguards:
	•	Rolling caps and volume-based adjustments to protect against market shocks.

Token Utility & Governance
	•	Minting Access:
	•	IKIGAI tokens required for minting post-genesis NFTs. Higher stakes yield better minting discounts.
	•	Staking Benefits:
	•	Token staking provides trading fee reductions, minting discounts, and enhanced rewards.
	•	Governance:
	•	Token holders can vote on protocol parameters, including reward rates, fee structures, and treasury management.

Trading & Referral Controls
	•	Transfer Limits & Anti-Bot Measures:
	•	Maximum transfer limits per transaction.
	•	Cooldown periods between transfers.
	•	Batch operation limits and a robust anti-bot system including gradual trading enablement and a blacklist.
	•	Referral Program:
	•	A 1% reward per successful referral, with unlimited referral opportunities and instant reward distribution.

---

# Proof Of Collecting: A White Paper on the Ikigai Marketplace & Tokenomics

*Welcome to the Proof Of Collecting—our narrative exploration into the decentralized world of Ikigai Labs XYZ. This white paper is not just a technical document, but a story of creativity, community, and the bold frontier of digital collecting. Dive in to discover how our marketplace and tokenomics work in harmony to empower creators, collectors, and degens alike.*

---

## Table of Contents

1. [Introduction](#introduction)
2. [The Vision: A New Era of Digital Collecting](#the-vision)
3. [Marketplace Mechanics: The Heartbeat of Ikigai](#marketplace-mechanics)
    - [NFT Trading & Liquidity Management](#nft-trading--liquidity-management)
    - [Reservoir Integration & Multi-Chain Aggregation](#reservoir-integration--multi-chain-aggregation)
4. [IKIGAI Tokenomics: The Soul of the Ecosystem](#ikigai-tokenomics)
    - [Token Overview & Fair Launch](#token-overview--fair-launch)
    - [Emission Schedule & Distribution](#emission-schedule--distribution)
5. [Dynamic Incentives: Rewarding the Degen Spirit](#dynamic-incentives)
    - [Trading Combos: The Dance of the Degen](#trading-combos)
    - [Minting Rewards: Crafting Digital Art with a Twist](#minting-rewards)
    - [Staking: Locking in the Future, One Tier at a Time](#staking)
    - [Adaptive Burn: Keeping the Supply Tight](#adaptive-burn)
    - [Referral Program: Spreading the Degen Love](#referral-program)
6. [Governance: Power to the People (and Degens)](#governance)
7. [Technical Infrastructure & Security](#technical-infrastructure--security)
    - [Smart Contracts & Integration Layers](#smart-contracts--integration-layers)
    - [Security & Risk Mitigation](#security--risk-mitigation)
8. [Future Enhancements & Roadmap](#future-enhancements--roadmap)
9. [Conclusion: Our Journey in Proof Of Collecting](#conclusion)

---

## 1. Introduction

In the ever-evolving landscape of Web3, where art meets blockchain and creativity intertwines with technology, Ikigai Labs XYZ emerges as a beacon for digital collectors and creators. **Proof Of Collecting** is our narrative—a manifesto that documents our journey in building a decentralized marketplace and a robust tokenomics model that fuels sustainable growth. This white paper offers a deep dive into the mechanisms powering our ecosystem, explaining the "why" behind every feature while celebrating the spirit of innovation and the degen mindset.

---

## 2. The Vision: A New Era of Digital Collecting

At Ikigai Labs XYZ, we believe that collecting is more than ownership; it’s a vibrant, community-driven experience. Our vision is to empower every participant in the ecosystem:
- **Creators** gain the tools to mint, distribute, and monetize their art.
- **Curators** build narratives that amplify artistic expression.
- **Collectors** become active participants, investing in art while earning rewards.

Our marketplace is designed to be open, non-custodial, and built on trust, where each transaction is a step in the collective journey of innovation. By blending technology, passion, and degen energy, we create a space where art and finance coalesce in an ever-adapting ecosystem.

---

## 3. Marketplace Mechanics: The Heartbeat of Ikigai

### NFT Trading & Liquidity Management

Our marketplace is the stage where the drama of digital art unfolds. Leveraging advanced functionalities provided by **Reservoir Tools** and **Thirdweb**, we ensure:
- **Seamless NFT Trading:** A frictionless experience for buying and selling, supported by real-time data and liquidity management.
- **Automated Reward Distribution:** Every sale triggers smart contracts that distribute rewards to active participants, ensuring transparency and efficiency.
- **Transparent Fee Structures:** A fixed fee structure (e.g., 4.3% per transaction) is allocated across liquidity pools, staking rewards, and treasury operations, making the economics clear and predictable.

### Reservoir Integration & Multi-Chain Aggregation

Our integration with Reservoir enables us to tap into a vast network of over 150 marketplaces, creating a unified hub for NFT discovery and trade. This multi-chain aggregation ensures that:
- **Artists and Collectors** experience a global, decentralized marketplace.
- **Data Transparency** is maintained through robust APIs and real-time event tracking.
- **Cross-Chain Compatibility** provides a bridge between various blockchain ecosystems, expanding our reach and versatility.

---

## 4. IKIGAI Tokenomics: The Soul of the Ecosystem

### Token Overview & Fair Launch

The IKIGAI token is at the core of our ecosystem:
- **Standard:** ERC20
- **Symbol:** IKIGAI
- **Maximum Supply:** 1,000,000,000 (1 billion)
- **Initial Supply:** 0 (a fair launch ensuring equal opportunity for all participants)
- **Decimals:** 18

This fair launch approach is designed to build trust within the community, ensuring that every token is earned through active participation rather than pre-mining or private sales.

### Emission Schedule & Distribution

Our token emission is carefully calibrated to reward activity and sustain long-term growth:
- **Year 1:** Up to 250M tokens (25% of total supply)
- **Year 2:** Up to 200M tokens (20%)
- **Year 3:** Up to 150M tokens (15%)
- **Year 4+:** Emissions determined dynamically by protocol activity

**Emission Sources:**
- **Trading Volume:** 40%
- **NFT Minting:** 30%
- **Staking Rewards:** 20%
- **Referrals & Combos:** 10%

This distribution model aligns incentives across the board, ensuring that every action—from trading to staking—contributes to the ecosystem’s overall health.

---

## 5. Dynamic Incentives: Rewarding the Degen Spirit

### Trading Combos: The Dance of the Degen

Imagine a trading floor pulsating with energy. Every trade within a 24-hour window fuels a combo multiplier:
- **Base Reward:** 3% in IKIGAI tokens per trade.
- **Combo Mechanic:** Each consecutive trade boosts the multiplier (up to 5x), making each transaction a strategic move.
  
**Why It Works:**  
- **Incentivizes Engagement:** Rewards frequent trading, keeping the market active.
- **Gamifies Trading:** Introduces a competitive, fun element that resonates with the degen spirit.

**Challenges:**  
- **Reset Penalties:** Inactivity resets combos, which might frustrate some traders.
- **Market Variability:** Low volume periods may not fully activate the multiplier.

### Minting Rewards: Crafting Digital Art with a Twist

Minting is the act of bringing new art to life, and here it’s celebrated with tangible rewards:
- **Reward Structure:** 5% bonus in IKIGAI tokens for every mint.
- **Vesting Schedule:** Rewards vest over three months, with a one-week cliff, promoting long-term commitment.

**Benefits:**  
- **Aligns Interests:** Encourages artists to remain active within the ecosystem.
- **Fair Compensation:** Rewards early adopters without compromising immediate liquidity.

**Risks:**  
- **Delayed Gratification:** New artists might find the vesting period challenging in fast-paced markets.
- **Adoption Barriers:** Complex vesting terms could deter some users.

### Staking: Locking in the Future, One Tier at a Time

Staking is our answer to the classic yield farming playbook—enhanced with strategic depth:
- **Base Reward:** 2% yield, with tiered multipliers for increased stakes.
- **Tier System:** From Silver to Diamond, higher tiers offer greater rewards, encouraging deeper, longer-term investment.
- **Compounding Mechanism:** Rewards can be reinvested to amplify returns.

**Strengths:**  
- **Promotes Loyalty:** Long-term staking builds a stable, invested community.
- **Compounded Growth:** The power of compounding rewards transforms small stakes into significant returns over time.

**Potential Issues:**  
- **Lock-In Friction:** Extended lock periods may deter those seeking liquidity.
- **Exploitation Risks:** Aggressive yield strategies might stress the system if not carefully managed.

### Adaptive Burn: Keeping the Supply Tight

Scarcity is key to value, and our adaptive burn mechanism ensures that IKIGAI tokens remain precious:
- **Base Burn:** 1% per transaction, scaling up to 4% during peak demand.
- **Dynamic Adjustment:** The burn rate reacts to market activity, balancing liquidity and scarcity.

**Why It’s Innovative:**  
- **Encourages Holding:** A deflationary model rewards long-term token holders.
- **Responsive Supply Control:** Adjusts to market conditions, potentially increasing token value.

**Concerns:**  
- **Liquidity Impact:** Excessive burns could reduce available liquidity.
- **User Complexity:** The adaptive nature may confuse less experienced users.

### Referral Program: Spreading the Degen Love

Growth is a team effort, and our referral program turns every user into a potential ambassador:
- **Reward:** A 1% bonus in IKIGAI tokens for every successful referral.
- **Unlimited Referrals:** There’s no cap, encouraging organic, viral expansion.

**Advantages:**  
- **Community Expansion:** Empowers users to grow the ecosystem.
- **Incentive Alignment:** Rewards sharing and active promotion of the platform.

**Risks:**  
- **Abuse Potential:** Must be safeguarded against bots and spam.
- **Over-Saturation:** Excessive referrals might dilute the token value if not properly managed.

---

## 6. Governance: Power to the People (and Degens)

In our ecosystem, every IKIGAI token isn’t just a unit of value—it’s a voice. Governance mechanisms enable token holders to vote on critical protocol parameters:
- **Decentralized Voting:** Decide on fee structures, reward rates, and treasury allocations.
- **Adaptive Policies:** Regular votes allow the protocol to evolve in line with community needs.

**Positives:**  
- **Empowers Users:** Every holder can influence the future.
- **Agility:** Enables rapid response to market changes.

**Challenges:**  
- **Voter Engagement:** Requires active participation to be effective.
- **Decision Gridlock:** Conflicting interests could slow down governance processes.

---

## 7. Technical Infrastructure & Security

### Smart Contracts & Integration Layers

Our ecosystem is powered by a suite of smart contracts, each engineered for robustness and scalability:
- **IkigaiToken.sol:** Implements the ERC20 standard, with built-in adaptive burn and transfer controls.
- **IkigaiRewards.sol:** Manages reward distribution across trading, minting, staking, and referrals.
- **Governance Contracts:** Facilitate decentralized voting and treasury management.
- **Marketplace Contracts:** Handle NFT trading, liquidity pooling, and fee allocation.

Integration is seamless thanks to our use of Reservoir Tools and Thirdweb SDK, ensuring real-time responsiveness and secure interactions.

### Security & Risk Mitigation

Security is paramount in our design:
- **Access Control:** Role-based permissions, multi-signature wallets, and whitelisting safeguard critical functions.
- **Rate Limiting & Circuit Breakers:** Prevent abuse during volatile market conditions.
- **Audit & Testing:** Comprehensive unit tests, integration testing, and regular third-party audits fortify our smart contracts against vulnerabilities.

---

## 8. Future Enhancements & Roadmap

The journey doesn’t end here. Our roadmap includes:
- **Enhanced UI/UX:** More intuitive dashboards for real-time reward tracking, staking metrics, and governance proposals.
- **Cross-Chain Expansion:** Extending marketplace and tokenomics functionality to additional blockchain networks.
- **Advanced Analytics:** Incorporating machine learning to predict market trends and dynamically adjust parameters.
- **Community Initiatives:** Launching art residencies, special events, and seasonal challenges to keep the ecosystem vibrant and engaging.
- **Iterative Governance:** Regularly updating policies based on community feedback and market performance.

Each future enhancement is designed to refine the Proof Of Collecting narrative, ensuring that our platform remains adaptive, fun, and financially rewarding.

---

## 9. Conclusion: Our Journey in Proof Of Collecting

The Proof Of Collecting is more than just a white paper—it’s our manifesto for a future where art, finance, and community converge. With our marketplace and IKIGAI tokenomics, we’re setting the stage for a decentralized world where every trade, mint, and stake is a vote of confidence in the ecosystem’s future.

Our approach is bold, balancing degen excitement with rigorous risk management. We recognize that challenges lie ahead—from market volatility to user behavior—but each hurdle is an opportunity to innovate and evolve.

At Ikigai Labs XYZ, we invite every creator, collector, and degen to join us on this journey. Together, we’re not just collecting art; we’re building a vibrant, sustainable, and community-driven future.

---
