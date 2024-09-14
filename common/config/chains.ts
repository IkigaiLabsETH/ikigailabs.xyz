import {
  Ethereum,
  Zora,
  Base,
  Optimism,
  Arbitrum,
  ArbitrumNova,
  Polygon,
  PolygonZkevm,
  Avalanche,
  Linea,
  Mumbai,
  Scroll,
  Zksync,
  Blast,
  BerachainTestnet,
  BaseSepoliaTestnet,
} from '@thirdweb-dev/chains'
import {
  arbitrum,
  mainnet,
  polygon,
  optimism,
  Chain,
  polygonMumbai,
  zora,
  base,
  baseSepolia,
  arbitrumNova,
  polygonZkEvm,
  avalanche,
  linea,
  scroll,
  zkSync,
  sepolia,
  blast,
  berachainTestnet,
} from 'wagmi/chains'
import { Network } from '../types'

//CONFIGURABLE: The default export controls the supported chains for the marketplace. Removing
// or adding chains will result in adding more or less chains to the marketplace.
// They are an extension of the wagmi chain objects

export type ReservoirChain = Chain & {
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
  ...mainnet,
  // Any url to display the logo of the chain in light mode
  lightIconUrl: '/icons/eth-icon-dark.svg',
  // Any url to display the logo of the chain in dark mode
  darkIconUrl: '/icons/eth-icon-light.svg',
  // The base url of the reservoir api, this is used in the app when
  // directly interacting with the reservoir indexer servers (in the api proxy for example)
  // or when prefetching server side rendered data
  reservoirBaseUrl: 'https://api.reservoir.tools',
  // Used on the client side portions of the marketplace that need an api key added
  // Prevents the api key from being leaked in the clientside requests
  // If you'd like to disable proxying you can just change the proxyApi to the reservoirBaseUrl
  // Doing so will omit the api key unless further changes are made
  proxyApi: '/api/reservoir/ethereum',
  // A prefix used in the asset specific routes on the app (tokens/collections)
  routePrefix: 'ethereum',
  // Reservoir API key which you can generate at https://reservoir.tools/
  // This is a protected key and displays as 'undefined' on the browser
  // DO NOT add NEXT_PUBLIC to the key or you'll risk leaking it on the browser
  apiKey: process.env.ETH_RESERVOIR_API_KEY,
  // Coingecko id, used to convert the chain's native prices to usd. Can be found here:
  // https://www.coingecko.com/en/api/documentation#operations-coins-get_coins_list
  coingeckoId: 'ethereum',
  collectionSetId: process.env.NEXT_PUBLIC_ETH_COLLECTION_SET_ID,
  community: process.env.NEXT_PUBLIC_ETH_COMMUNITY,
}

export const supportedChains = [
  defaultChain,
  {
    ...polygon,
    lightIconUrl: '/icons/polygon-icon-dark.svg',
    darkIconUrl: '/icons/polygon-icon-light.svg',
    reservoirBaseUrl: 'https://api-polygon.reservoir.tools',
    proxyApi: '/api/reservoir/polygon',
    routePrefix: 'polygon',
    apiKey: process.env.POLYGON_RESERVOIR_API_KEY,
    coingeckoId: 'matic-network',
    collectionSetId: process.env.NEXT_PUBLIC_POLYGON_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_POLYGON_COMMUNITY,
  },
  {
    ...arbitrum,
    name: 'Arbitrum',
    lightIconUrl: '/icons/arbitrum-icon-dark.svg',
    darkIconUrl: '/icons/arbitrum-icon-light.svg',
    reservoirBaseUrl: 'https://api-arbitrum.reservoir.tools',
    proxyApi: '/api/reservoir/arbitrum',
    routePrefix: 'arbitrum',
    apiKey: process.env.ARBITRUM_RESERVOIR_API_KEY,
    coingeckoId: 'arbitrum-iou',
    collectionSetId: process.env.NEXT_PUBLIC_ARBITRUM_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_ARBITRUM_COMMUNITY,
  },
  {
    ...optimism,
    name: 'Optimism',
    lightIconUrl: '/icons/optimism-icon-dark.svg',
    darkIconUrl: '/icons/optimism-icon-light.svg',
    reservoirBaseUrl: 'https://api-optimism.reservoir.tools',
    proxyApi: '/api/reservoir/optimism',
    routePrefix: 'optimism',
    apiKey: process.env.OPTIMISM_RESERVOIR_API_KEY,
    coingeckoId: 'optimism',
    collectionSetId: process.env.NEXT_PUBLIC_OPTIMISM_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_OPTIMISM_COMMUNITY,
  },
  {
    ...arbitrumNova,
    routePrefix: Network.ARBITRUM_NOVA,
    reservoirBaseUrl: 'https://api-arbitrum-nova.reservoir.tools',
    lightIconUrl: '/icons/arbitrum-nova-icon-dark.svg',
    darkIconUrl: '/icons/arbitrum-nova-icon-light.svg',
  },
  {
    ...zora,
    routePrefix: Network.ZORA,
    reservoirBaseUrl: 'https://api-zora.reservoir.tools',
    lightIconUrl: '/icons/zora-icon-dark.svg',
    darkIconUrl: '/icons/zora-icon-light.svg',
  },
  {
    ...base,
    routePrefix: Network.BASE,
    reservoirBaseUrl: 'https://api-base.reservoir.tools',
    lightIconUrl: '/icons/base-icon-dark.svg',
    darkIconUrl: '/icons/base-icon-light.svg',
  },
  {
    ...baseSepolia,
    routePrefix: Network.BASE_SEPOLIA,
    reservoirBaseUrl: 'https://api-base-sepolia.reservoir.tools',
    lightIconUrl: '/icons/base-icon-dark.svg',
    darkIconUrl: '/icons/base-icon-light.svg',
  },
  {
    ...sepolia,
    routePrefix: Network.SEPOLIA,
    reservoirBaseUrl: 'https://api-sepolia.reservoir.tools',
    lightIconUrl: '/icons/eth-icon-dark.svg',
    darkIconUrl: '/icons/eth-icon-light.svg',
  },
  {
    ...polygonZkEvm,
    routePrefix: Network.ZKEVM,
    reservoirBaseUrl: 'https://api-polygon-zkevm.reservoir.tools',
    lightIconUrl: '/icons/polygon-zkevm-icon-dark.svg',
    darkIconUrl: '/icons/polygon-zkevm-icon-light.svg',
  },
  {
    ...avalanche,
    routePrefix: Network.AVALANCHE,
    reservoirBaseUrl: 'https://api-avalanche.reservoir.tools',
    lightIconUrl: '/icons/avalanche-icon-dark.svg',
    darkIconUrl: '/icons/avalanche-icon-light.svg',
  },
  {
    ...linea,
    routePrefix: Network.LINEA,
    reservoirBaseUrl: 'https://api-linea.reservoir.tools',
    lightIconUrl: '/icons/linea-icon-dark.svg',
    darkIconUrl: '/icons/linea-icon-light.svg',
  },
  {
    ...scroll,
    routePrefix: Network.SCROLL,
    reservoirBaseUrl: 'https://api-scroll.reservoir.tools',
    lightIconUrl: '/icons/scroll-testnet-icon-dark.svg',
    darkIconUrl: '/icons/scroll-testnet-icon-light.svg',
  },
  {
    ...zkSync,
    routePrefix: Network.ZKSYNC,
    reservoirBaseUrl: 'https://api-zksync.reservoir.tools',
    lightIconUrl: '/icons/zksync-icon-dark.svg',
    darkIconUrl: '/icons/zksync-icon-light.svg',
  },
  {
    ...blast,
    routePrefix: Network.BLAST,
    reservoirBaseUrl: 'https://api-blast.reservoir.tools',
    lightIconUrl: '/icons/blast-icon-dark.svg',
    darkIconUrl: '/icons/blast-icon-light.svg',
  },
  {
    ...BerachainTestnet,
    routePrefix: Network.BERA,
    reservoirBaseUrl: 'https://api-berachain-testnet.reservoir.tools',
    lightIconUrl: '/icons/blast-icon-dark.svg',
    darkIconUrl: '/icons/blast-icon-light.svg',
  },
] as ReservoirChain[]

export const TW_SUPPORTED_CHAINS = [
  Ethereum,
  Mumbai,
  Arbitrum,
  Zora,
  Base,
  BaseSepoliaTestnet,
  Optimism,
  ArbitrumNova,
  Polygon,
  PolygonZkevm,
  Avalanche,
  Linea,
  Scroll,
  Zksync,
  Blast,
  BerachainTestnet,
] as any
