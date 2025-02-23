Below is an updated version of our README file for the Ikigai Labs XYZ Marketplace, now including a new proposal section outlining our planned tokenomics. This proposal section is clearly marked as “Not Yet Live” for transparency.

Ikigai Labs XYZ

The platform is a comprehensive, non-custodial, open-source Web3 application designed to empower creators and collectors while leveraging the advanced functionalities of Reservoir Tools and Thirdweb. Artists can securely mint, distribute, and sell their digital art across multiple chains, with smart contracts tailored through Transient Labs. By integrating Ikigai Labs’ T.R.A.C.E. system, authenticity and provenance are guaranteed, ensuring transparency in every transaction.

Curators play a pivotal role by crafting narratives and experiences through a seamless multi-chain aggregator that showcases over 150 marketplaces. Collectors are further engaged through innovative equity tokenization, offering them shared ownership and deeper community involvement. The platform not only supports digital art transactions but also fosters a dynamic, evolving ecosystem where creators, curators, and collectors thrive. The concept of ikigai guides this vision, blending technology, innovation, and passion to nurture both digital and physical art spaces through residencies and real-world experiences.

Table of Contents
	•	Getting Started
	•	Prerequisites
	•	Installation
	•	Usage
	•	Features
	•	Technologies
	•	Dependencies
	•	App Architecture
	•	API Reference
	•	Contributing
	•	License
	•	Proposal: Upcoming Tokenomics & Roadmap

Getting Started

These instructions will help you set up and run the project on your local machine.

Prerequisites
	•	Node.js (version X.X.X or higher)
	•	npm or yarn
	•	Thirdweb SDK
	•	Reservoir API key

Installation

Clone the repository:

git clone https://github.com/IkigaiLabsETH/ikigailabs.xyz.git

Navigate to the project directory:

cd project

Install dependencies:

npm install
# or
yarn install

Set up environment variables: Copy the .env.example file to .env and fill in the required values, including your Reservoir API key and Thirdweb project settings.

Usage

To start the development server:
	1.	Ensure you’re in the project directory.
	2.	Run one of the following commands:

npm run dev
# or
yarn dev
# or
pnpm dev

Open http://localhost:3000 in your browser to view the application.

The server will automatically reload if you make changes to the source files, and any lint errors will appear in the console.

For production, first build the application:

yarn build

App Architecture

Key architectural decisions include:
	•	Extensive use of React Server Components for improved performance.
	•	Client Components wrapped in Suspense with fallbacks.
	•	URL state management with nuqs.
	•	Mobile-first responsive design with Tailwind CSS.
	•	Optimized image handling using Next.js Image component.

Directory Overview
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

This structure promotes easy navigation, clear separation of concerns, and scalability.

API Reference

Our application leverages both Reservoir and Thirdweb APIs, alongside custom endpoints.

Reservoir Endpoints
	•	Get Collections:
GET /api/reservoir/collections – Fetches a list of NFT collections.
	•	Get Collection Details:
GET /api/reservoir/collections/{collectionId} – Retrieves detailed information about a specific collection.
	•	Get Tokens:
GET /api/reservoir/tokens – Fetches NFT tokens based on specified filters.

Thirdweb Endpoints
	•	Get Contract Metadata:
GET /api/thirdweb/contract/{contractAddress} – Retrieves metadata for a specific smart contract.
	•	Create Listing:
POST /api/thirdweb/marketplace/create-listing – Creates a new NFT listing on the marketplace.

Custom Endpoints
	•	User Authentication:
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/user – Handles user authentication and data retrieval.
	•	Marketplace Activity:
GET /api/activity – Combines data from Reservoir and on-chain events to fetch recent marketplace activity.

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
	•	User Performance: Bonuses from trade streaks, staking duration, and monthly volume, with combined multipliers reaching up to 4x the base reward.
	•	Dynamic Fee Reductions:
	•	Staking tiers can reduce fees by up to 30%.
	•	Trading volume can yield reductions up to 20%.
	•	Loyalty streaks offer up to 15% reduction, with a combined maximum fee reduction of 50%.

Supply Control & Adaptive Burn
	•	Adaptive Burn Rate:
	•	Base rate starts at 1% per transaction, scaling up to a maximum of 4% during peak periods.
	•	Emission Caps:
	•	Daily, weekly, and monthly mint limits are in place to responsibly manage token supply.
	•	Emergency Safeguards:
	•	Rolling caps and volume-based adjustments help protect against market shocks.

Token Utility & Governance
	•	Minting Access:
	•	IKIGAI tokens will be required for minting post-genesis NFTs. Higher stakes yield better minting discounts.
	•	Staking Benefits:
	•	Token staking will offer trading fee reductions, mint discounts, and enhanced rewards.
	•	Governance:
	•	Token holders will have voting rights to influence protocol parameters, including reward rates and treasury management.

Trading & Referral Controls
	•	Transfer Limits & Anti-Bot Measures:
	•	Maximum transfer limits per transaction, cooldown periods between transfers, and batch operation limits will be enforced.
	•	A robust anti-bot system, including gradual trading enablement, transfer cooldowns, and a blacklist, will be implemented.
	•	Referral Program:
	•	A 1% reward will be offered for every successful referral, with unlimited referral opportunities and instant reward distribution.

This proposal outlines our vision for a robust, community-driven tokenomics model that aligns incentives across trading, minting, staking, and referral activities—ultimately driving sustainable growth for the Ikigai Labs ecosystem.

Let’s break down the implementation details of our tokenomics proposal, aligning technical, operational, and governance aspects to ensure a smooth integration into our ecosystem.

1. Smart Contract Development
	•	Token Contract (IkigaiToken.sol):
We’ll implement an ERC20 token contract with deflationary features. This includes:
	•	Adaptive Burn Mechanism: A base burn rate starting at 1%, dynamically scaling up to 4% during high-demand periods.
	•	Transfer Limits: Safeguards like maximum transaction amounts and cooldown periods to thwart bots.
	•	Rewards Contract (IkigaiRewards.sol):
This contract will manage reward distribution across trading, minting, staking, and referrals. Key features include:
	•	Dynamic Reward Calculations: Incorporating multipliers for market activity (e.g., 1.5x when volume exceeds 1000 BERA) and user performance (trade streaks, staking duration).
	•	Vesting Logic: For minting rewards, implementing a linear vesting over three months with an initial one-week cliff.
	•	Emergency Safeguards: Circuit breakers and rate limiting to protect against market anomalies.
	•	Governance & Treasury Contracts:
We’ll include modules for treasury operations and governance, ensuring that:
	•	Multi-signature Wallets: Protect treasury and administrative functions.
	•	Voting Mechanisms: Enable token holders to influence parameters like fee structures and reward rates.

2. Backend Integration & API Updates
	•	Reservoir & Thirdweb Integration:
Our existing API endpoints will be extended to interact with the new reward contracts. For example:
	•	Reward Distribution Hooks: Triggering reward calculations when a trade is executed.
	•	Dynamic Fee Adjustments: Implementing API endpoints that reflect real-time fee reductions based on staking tiers and trading activity.
	•	Data Transparency & Monitoring:
Implement logging and event tracking within the smart contracts. This will allow us to:
	•	Monitor reward distributions in real-time.
	•	Track compliance with minting limits and emergency safeguards.

3. UI/UX and Frontend Adjustments
	•	Dashboard Updates:
Integrate dynamic displays that:
	•	Show real-time metrics like current multipliers, burn rates, and staking benefits.
	•	Allow users to view vesting schedules and their reward history.
	•	User Onboarding:
Enhance the onboarding experience by providing clear instructions on how users can stake tokens, refer others, and participate in governance.

4. Testing, Audits, and Rollout Strategy
	•	Testnet Deployment:
Before a live rollout, deploy all new contracts on a testnet to simulate:
	•	Reward calculations and multipliers.
	•	Emergency scenarios and circuit breaker activations.
	•	Security Audits:
Engage third-party auditors to review all smart contracts, focusing on:
	•	Adaptive burn mechanisms and dynamic fee reductions.
	•	Multi-signature and governance functionalities.
	•	Staged Rollout:
Once audited, initiate a phased deployment with:
	•	An initial beta phase allowing a subset of users to interact with the tokenomics.
	•	Continuous monitoring and feedback loops to refine parameters.

5. Governance and Future Enhancements
	•	Community Voting:
Once the tokenomics are live, we will roll out governance modules that allow token holders to vote on adjustments to reward rates, fee structures, and emission schedules.
	•	Iterative Improvement:
Maintain an agile approach with regular reviews to adjust the multipliers, burn rates, and reward parameters based on actual market behavior and user feedback.
