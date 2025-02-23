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

This proposal outlines our vision for a robust, community-driven tokenomics model that aligns incentives across trading, minting, staking, and referral activities—ultimately driving sustainable growth for the Ikigai Labs ecosystem.

---
