import { mainnet } from 'wagmi/chains'
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

export const supportedChains = [
  defaultChain,
  Berachain,
] as ReservoirChain[]
