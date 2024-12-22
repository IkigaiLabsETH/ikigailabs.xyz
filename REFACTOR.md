# IkigaiLabs.xyz Refactoring Documentation

## Overview
This document outlines the refactoring process for IkigaiLabs.xyz, focusing on improving code organization, maintainability, and scalability.

## Architecture Overview
```mermaid
graph TD
    A[IkigaiLabs.xyz] --> B[Components]
    A --> C[Features]
    A --> D[Context]
    A --> E[Hooks]
    A --> F[Utils]
    A --> G[Types]

    B --> B1[Common]
    B --> B2[Layout]
    B --> B3[Primitives]
    B --> B4[Forms]
    B --> B5[Feedback]

    C --> C1[Marketplace]
    C --> C2[Collections]
    C --> C3[Profile]
    C --> C4[Wallet]

    D --> D1[WalletProvider]
    D --> D2[ThemeProvider]
    D --> D3[MarketProvider]

    E --> E1[useNFT]
    E --> E2[useWallet]
    E --> E3[useMarket]
    E --> E4[Common]

    F --> F1[Constants]
    F --> F2[Formatters]
    F --> F3[Validation]
    F --> F4[Web3]
```

## Component Architecture
```mermaid
graph TD
    subgraph Presentation
        UI[UI Components]
        Layout[Layout]
        Forms[Forms]
    end

    subgraph Logic
        Hooks[Hooks]
        Context[Context]
        Utils[Utils]
    end

    subgraph Features
        Market[Marketplace]
        Collections[Collections]
        Profile[Profile]
    end

    Logic --> Presentation
    Features --> Logic
    Features --> Presentation
```

## Data Flow
```mermaid
flowchart LR
    Client[Client] --> Components[Components]
    Components --> Hooks[Hooks]
    Hooks --> Context[Context]
    Context --> API[API Layer]
    API --> Blockchain[Blockchain]
    
    Context --> Cache[Cache Layer]
    Cache --> Components
```

## State Management
```mermaid
flowchart TD
    subgraph Client State
        UI[UI State]
        Forms[Form State]
        Modals[Modal State]
    end

    subgraph Server State
        NFTs[NFT Data]
        Collections[Collection Data]
        Market[Market Data]
    end

    subgraph Global State
        Wallet[Wallet]
        Theme[Theme]
        Network[Network]
    end

    Client State --> Components[Components]
    Server State --> Components
    Global State --> Components
```

## Feature Module Structure
```mermaid
graph TD
    subgraph Feature[Feature Module]
        C[Components]
        H[Hooks]
        T[Types]
        U[Utils]
    end

    subgraph Dependencies
        Context[Context]
        CommonUtils[Common Utils]
        CommonHooks[Common Hooks]
    end

    Dependencies --> Feature
```

## Directory Structure
```mermaid
graph TD
    Root[/] --> SRC[src]
    SRC --> Components[components]
    SRC --> Features[features]
    SRC --> Context[context]
    SRC --> Hooks[hooks]
    SRC --> Utils[utils]
    SRC --> Types[types]

    Components --> Common[common]
    Components --> Layout[layout]
    Components --> Forms[forms]
    
    Features --> Marketplace[marketplace]
    Features --> Collections[collections]
    Features --> Profile[profile]

    Context --> Providers[providers]
    Context --> Store[store]

    Utils --> Formatters[formatters]
    Utils --> Validation[validation]
    Utils --> Web3[web3]
```

## Implementation Strategy

### Component Migration Flow
```mermaid
flowchart LR
    A[Identify Component] --> B[Analyze Dependencies]
    B --> C[Create New Location]
    C --> D[Move Component]
    D --> E[Update Imports]
    E --> F[Test]
    F --> G{Issues?}
    G -- Yes --> B
    G -- No --> H[Next Component]
```

### Feature Migration Flow
```mermaid
flowchart LR
    A[Identify Feature] --> B[Extract Components]
    B --> C[Extract Hooks]
    C --> D[Create Types]
    D --> E[Move Utils]
    E --> F[Update Imports]
    F --> G[Test Feature]
```

## File Organization Example
```
src/
├── components/           # UI Components
│   ├── common/          # Shared components
│   │   ├── Button/
│   │   ├── Card/
│   │   └── Modal/
│   ├── layout/          # Layout components
│   └── forms/           # Form components
│
├── features/            # Domain features
│   ├── marketplace/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── collections/
│
├── context/             # Global context
├── hooks/               # Custom hooks
├── utils/              # Utilities
└── types/             # TypeScript types
```

## Import Conventions
```typescript
// Components
import { Button } from '@/components/common/Button'
import { Header } from '@/components/layout/Header'

// Features
import { MarketCard } from '@/features/marketplace/components/MarketCard'
import { useMarketplace } from '@/features/marketplace/hooks/useMarketplace'

// Utils
import { formatPrice } from '@/utils/formatters/price'
import { CHAIN_IDS } from '@/utils/constants/chains'
```