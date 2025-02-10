import { mainnet, base, arbitrum } from 'wagmi/chains'
import { Network } from '../types'

// Base chain type for Thirdweb
type ThirdwebChain = {
  id: number
  rpc: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  network: string
}

// Combined type for both Reservoir and Thirdweb requirements
export type ReservoirChain = ThirdwebChain & {
  name: string
  blockExplorers: {
    name: string
    url: string
  }[]
  testnet?: boolean
  // Reservoir specific fields
  lightIconUrl: string
  darkIconUrl: string
  reservoirBaseUrl: string
  proxyApi: string
  routePrefix: string
  apiKey?: string
  coingeckoId?: string
  collectionSetId?: string
  community?: string
}

export const defaultChain: ReservoirChain = {
  id: 1,
  name: 'Ethereum',
  network: 'ethereum',
  rpc: ["https://eth.llamarpc.com"],
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Etherscan",
      url: "https://etherscan.io"
    }
  ],
  lightIconUrl: '/icons/eth-icon-dark.svg',
  darkIconUrl: '/icons/eth-icon-light.svg',
  reservoirBaseUrl: 'https://api.reservoir.tools',
  proxyApi: '/api/reservoir/ethereum',
  routePrefix: 'ethereum',
  apiKey: process.env.ETH_RESERVOIR_API_KEY,
  coingeckoId: 'ethereum',
  collectionSetId: process.env.NEXT_PUBLIC_ETH_COLLECTION_SET_ID,
  community: process.env.NEXT_PUBLIC_ETH_COMMUNITY,
} as const

export const Berachain: ReservoirChain = {
  id: 80094,
  name: "Berachain",
  network: "berachain",
  rpc: ["https://rpc.berachain.com"],
  nativeCurrency: {
    name: "BERA",
    symbol: "BERA",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Berascan",
      url: "https://berascan.com"
    }
  ],
  testnet: false,
  lightIconUrl: '/icons/blast-icon-dark.svg',
  darkIconUrl: '/icons/blast-icon-light.svg',
  reservoirBaseUrl: 'https://api-berachain.reservoir.tools',
  proxyApi: '/api/reservoir/berachain',
  routePrefix: Network.BERA,
} as const;

export const Base: ReservoirChain = {
  id: base.id,
  name: "Base",
  network: "base",
  rpc: [base.rpcUrls.default.http[0]],
  nativeCurrency: base.nativeCurrency,
  blockExplorers: [
    {
      name: "BaseScan",
      url: base.blockExplorers.default.url
    }
  ],
  lightIconUrl: '/icons/base-icon-dark.svg',
  darkIconUrl: '/icons/base-icon-light.svg',
  reservoirBaseUrl: 'https://api-base.reservoir.tools',
  proxyApi: '/api/reservoir/base',
  routePrefix: Network.BASE,
  apiKey: process.env.BASE_RESERVOIR_API_KEY,
  coingeckoId: 'base',
  collectionSetId: process.env.NEXT_PUBLIC_BASE_COLLECTION_SET_ID,
  community: process.env.NEXT_PUBLIC_BASE_COMMUNITY,
} as const

export const Arbitrum: ReservoirChain = {
  id: arbitrum.id,
  name: "Arbitrum",
  network: "arbitrum",
  rpc: [arbitrum.rpcUrls.default.http[0]],
  nativeCurrency: arbitrum.nativeCurrency,
  blockExplorers: [
    {
      name: "ArbiScan",
      url: arbitrum.blockExplorers.default.url
    }
  ],
  lightIconUrl: '/icons/arbitrum-icon-dark.svg',
  darkIconUrl: '/icons/arbitrum-icon-light.svg',
  reservoirBaseUrl: 'https://api-arbitrum.reservoir.tools',
  proxyApi: '/api/reservoir/arbitrum',
  routePrefix: Network.ARBITRUM,
  apiKey: process.env.ARBITRUM_RESERVOIR_API_KEY,
  coingeckoId: 'arbitrum',
  collectionSetId: process.env.NEXT_PUBLIC_ARBITRUM_COLLECTION_SET_ID,
  community: process.env.NEXT_PUBLIC_ARBITRUM_COMMUNITY,
} as const

export const supportedChains = [
  defaultChain,
  Base,
  Arbitrum,
  Berachain,
] as ReservoirChain[]
