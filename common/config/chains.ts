import { Ethereum } from '@thirdweb-dev/chains'
import { mainnet, Chain } from 'wagmi/chains'
import { Network } from '../types'

//CONFIGURABLE: The default export controls the supported chains for the marketplace. Removing
// or adding chains will result in adding more or less chains to the marketplace.
// They are an extension of the wagmi chain objects

export type ReservoirChain = {
  id: number
  name: string
  network: string
  rpc: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
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
  rpc: "https://eth.llamarpc.com",
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
  nativeCurrency: {
    name: "BERA",
    symbol: "BERA",
    decimals: 18,
  },
  rpc: "https://rpc.berachain.com",
  blockExplorers: [
    {
      name: "Berascan",
      url: "https://berascan.com"
    }
  ],
  testnet: false,
  // Add required Reservoir fields
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
