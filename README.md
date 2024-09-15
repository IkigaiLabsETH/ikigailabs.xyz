# Ikigai Labs XYZ

The platform is a comprehensive, non-custodial, open-source Web3 application, designed to empower creators and collectors while leveraging the advanced functionalities of Reservoir Tools and Thirdweb. Artists can securely mint, distribute, and sell their digital art across multiple chains, with smart contracts tailored through Transient Labs. By integrating T.R.A.C.E. system, authenticity and provenance are guaranteed. We like to call it RWA - Real World Art. Curators play a pivotal role, crafting narratives and experiences through a seamless multi-chain aggregator that showcases over 150 marketplaces. We feature the top 420 collections from the past 6.9 years. The concept of 'ikigai' guides this vision, blending technology, innovation, and passion to nurture both digital and physical art spaces through residencies and real-world experiences. 

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [App Architecture](#app-architecture)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Features

- Seamless NFT browsing and trading experience
- Real-time pricing and advanced filtering
- Multi-chain support
- Optimized performance with React Server Components

## Technologies

- Next.js 13+ with App Router
- React 18+
- TypeScript
- Shadcn UI
- Radix UI
- Tailwind CSS
- Reservoir Tools
- Thirdweb SDK

## Dependencies

Our project relies on several key dependencies to function. Here's an overview of the main packages used:

- `next`: ^13.4.7 - The React framework for production.
- `react`: ^18.2.0 - A JavaScript library for building user interfaces.
- `react-dom`: ^18.2.0 - React package for working with the DOM.
- `@reservoir0x/reservoir-kit-ui`: ^1.0.1 - UI components for Reservoir protocol integration.
- `@thirdweb-dev/react`: ^3.14.40 - React hooks and components for Thirdweb integration.
- `@thirdweb-dev/sdk`: ^3.10.59 - Thirdweb SDK for interacting with smart contracts.
- `ethers`: ^5.7.2 - Library for interacting with Ethereum.
- `nuqs`: ^1.11.0 - Next.js URL Query State management.
- `tailwindcss`: ^3.3.2 - A utility-first CSS framework.
- `typescript`: ^5.1.5 - TypeScript language support.

For a complete list of dependencies and their versions, please refer to the `package.json` file in the project root.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (version X.X.X or higher)
- npm or yarn
- Thirdweb SDK
- Reservoir API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IkigaiLabsETH/ikigailabs.xyz.git
   ```

2. Navigate to the project directory:
   ```bash
   cd project
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:
   Copy the `.env.example` file to `.env` and fill in the required values, including your Reservoir API key and Thirdweb project settings.

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

The server will automatically reload if you make changes to the source files. You'll see any lint errors in the console.

For production, build the application first: yarn build

## App Architecture

Key architectural decisions:
- Extensive use of React Server Components for improved performance
- Client Components wrapped in Suspense with fallbacks
- URL state management with `nuqs`
- Mobile-first responsive design with Tailwind CSS
- Optimized image handling with Next.js Image component

Our application follows a modular and organized structure to enhance maintainability and scalability. Here's an overview of the main directories and their purposes:

- `/app`: Next.js 13+ App Router structure
  - `/api`: API routes
  - `/[locale]`: Internationalized routes
- `/components`: Reusable UI components
  - `/ui`: Shadcn UI components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and configurations
- `/modules`: Feature-specific modules
  - `/collections`: Collection-related functionality
    - `page.tsx`: Server Component for collections page
    - `collections-grid.tsx`: Client Component for rendering collections
    - `use-collections.ts`: Custom hook for collection data
- `/providers`: Context providers for state management
- `/public`: Static assets
- `/styles`: Global styles and Tailwind configuration
- `/types`: TypeScript type definitions and interfaces
- `/ama`: Components for our AMA (incl. lib and types folder)

This structure allows for easy navigation, separation of concerns, and scalability as the project grows.

## API Reference

Our application leverages both Reservoir and Thirdweb APIs, as well as AI endpoints.

### Thesis: The Impact of o1 on IkigAI Labs XYZ’s Evolution in Web3 and AI Integration

#### Introduction
The advent of agentic AI systems, such as o1, represents a paradigm shift in how products are conceived, designed, and deployed. At IkigAI Labs XYZ, a Web3-focused innovation hub blending avant-garde technology with the future of decentralized systems, o1 offers a unique capability: the potential to serve as the orchestrator of product development. This thesis explores how o1, in conjunction with faster models like Sonnet 3.5, can redefine the architecture of IkigAI Labs' projects, from NFTs and crypto solutions to AI-driven DApps.

#### A New Era of Autonomous Development
The traditional model of AI-assisted development primarily revolves around models that offer code completion and task execution based on token-by-token prediction. However, o1’s agentic ability introduces something fundamentally different. By leveraging full context windows, o1 can engage in reasoning, planning, and delegation, taking on the role of a product director within the development ecosystem. At IkigAI Labs, this will shift the workflow from manual oversight to an automated, hierarchical structure, where o1 plans development tasks holistically, allowing the team to focus on higher-order strategy.

**Key impacts:**
- **Delegation to Specialized Models:** o1’s ability to orchestrate and distribute tasks across multiple specialized models, such as Sonnet 3.5, will optimize efficiency. Faster models can execute repetitive or lower-level tasks, while o1 manages complex, multi-layered decisions, streamlining development processes.
- **Context-Aware Planning:** By using its full context window, o1 can anticipate needs and constraints across the entire codebase or project. This aligns well with IkigAI Labs' modular approach, where architectural foresight is critical. For example, in creating the hybrid NFT-backed marketplace with MPL 404 technology, o1 can not only oversee system design but also adjust components dynamically to meet evolving goals.

#### Enhanced Product Iteration and Innovation
One of IkigAI Labs' strengths is its modular, API-driven approach to product development, where components such as Reservoir Tools SDK, Thirdweb, and Perplexity are integrated into a cohesive platform. With o1, product iteration will be faster and more innovative. The agent will be able to:
- **Test and Refine Architectures:** o1 can simulate different architectural scenarios, identifying the most efficient paths for scaling applications like the non-custodial NFT platform. By executing codebase-wide changes, it will enhance agility in integrating new Web3 and AI-driven features.
- **Optimize Cross-Chain Solutions:** As IkigAI Labs expands its focus on cross-chain ecosystems, o1’s ability to reason through the nuances of multi-chain interactions and liquidity management will be invaluable. It will ensure seamless integration, particularly in tokenized economies like those envisioned in the MPL 404 project.

#### Democratizing AI in Web3 through Delegation
At IkigAI Labs, we strive to push the boundaries of creativity and democratization in Web3 by providing users the tools to interact with AI in meaningful ways. o1’s ability to autonomously direct and delegate makes it feasible to scale solutions to a broader audience. By delegating tasks to Sonnet 3.5 or similar faster models, the platform can offer user-friendly, real-time AI-powered features, such as AI-generated insights in decentralized finance or customizable AI models in art creation.

**Example Use Case:**
- **Investment DApp with AI Insights:** o1 could manage complex, long-term financial planning algorithms, while Sonnet 3.5 handles rapid feedback loops for users. This model would deliver sustainable, AI-powered investment advice that is both real-time and future-forward, aligning with the lab’s mission to blend Web3 and sustainability for younger generations like Gen Z and Gen Alpha.

#### Conclusion: o1’s Strategic Role in IkigAI Labs' Future
The introduction of o1 into IkigAI Labs' development pipeline represents a quantum leap in our ability to build, iterate, and scale. By positioning o1 as the central "brain" that oversees complex planning and delegation, and by utilizing faster models for execution, the lab can continue innovating across its core projects—from NFTs to AI-driven decentralized apps. This hierarchical, multi-agent workflow will not only increase productivity but also ensure that IkigAI Labs remains at the cutting edge of Web3, AI, and decentralized systems.

#### Next Steps
To fully realize o1’s potential at IkigAI Labs XYZ, we need to:
1. **Design and test a multi-agent architecture** where o1 manages the development lifecycle and faster models execute individual tasks.
2. **Integrate this architecture into ongoing projects**, such as the NFT marketplace, and measure performance and agility improvements.
3. **Develop a framework for user interaction**, where users can directly engage with both o1 and delegated models for personalized AI-driven insights and actions.

This will mark the next chapter in IkigAI Labs' journey—where intelligent systems, rather than developers, drive the process of creation and innovation. That being said a CTO will always be key!!!

- ride the wave of code generating LLMs
- become a big picture architect
- constantly switch to the best AI tools & models
- design with natural language 1st
- don’t compete with the AI, use it to work better

### Reservoir Endpoints

1. Get Collections
   ```
   GET /api/reservoir/collections
   ```
   Fetches a list of NFT collections using Reservoir's API.

2. Get Collection Details
   ```
   GET /api/reservoir/collections/{collectionId}
   ```
   Retrieves detailed information about a specific collection.

3. Get Tokens
   ```
   GET /api/reservoir/tokens
   ```
   Fetches NFT tokens based on specified filters.

### Thirdweb Endpoints

1. Get Contract Metadata
   ```
   GET /api/thirdweb/contract/{contractAddress}
   ```
   Retrieves metadata for a specific smart contract.

2. Create Listing
   ```
   POST /api/thirdweb/marketplace/create-listing
   ```
   Creates a new NFT listing on the marketplace.

### Custom Endpoints

1. User Authentication
   ```
   POST /api/auth/login
   POST /api/auth/logout
   GET /api/auth/user
   ```
   Handles user authentication and retrieval of user data.

2. Marketplace Activity
   ```
   GET /api/activity
   ```
   Fetches recent marketplace activity, combining data from Reservoir and on-chain events.

For detailed parameters and response formats, please refer to our API documentation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

