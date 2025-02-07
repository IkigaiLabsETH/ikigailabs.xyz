import { defineChain } from 'thirdweb'
import {
  ethereum,
  optimism,
  polygon,
  arbitrum,
  arbitrumNova,
  zora,
  base,
  baseSepolia,
  avalanche,
} from 'thirdweb/chains'
import {
  FaArrowRightArrowLeft,
  FaSeedling,
  FaFireFlameCurved,
  FaTag,
  FaCartShopping,
  FaHand,
  FaRegCircleXmark,
} from 'react-icons/fa6'
import { ETH } from 'react-cryptoicon'

import { ActivityType, Network, Option } from '../types'

export const COLLECTION_METADATA_FIELDS = ['name', 'description', 'image']

export const COLLECTION_SORTING_OPTIONS = [
  { id: 'floorAskPrice-asc', name: 'Floor: Low to high' },
  { id: 'floorAskPrice-desc', name: 'Floor: High to low' },
  { id: 'rarity-asc', name: 'Rare to common' },
  { id: 'rarity-desc', name: 'Common to rare' },
]

export const SUPPORTED_CURRENCY = [
  { id: 'ETH', name: 'ETH' },
  { id: 'USDC', name: 'USDC' },
]

export const NETWORK_OPTIONS = [
  {
    id: 'ethereum',
    name: 'Ethereum',
  },
  {
    id: 'polygon',
    name: 'Polygon',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
  },
] as Option[]

export const EXPIRATION_DEFAULTS = [
  {
    id: '3600',
    name: '1 hour',
  },
  {
    id: '43200',
    name: '12 hours',
  },
  {
    id: '86400',
    name: '1 day',
  },
  {
    name: '3 days',
    id: '259200',
  },
  {
    id: '604800',
    name: '1 week',
  },
  {
    id: '2592000',
    name: '1 month',
  },
  {
    name: '3 months',
    id: '7776000',
  },
  {
    name: '6 months',
    id: '15552000',
  },
]

export const customChains = {
  [Network.BERA]: defineChain({
    id: 80094,
    name: 'Berachain',
    nativeCurrency: {
      name: 'BERA',
      symbol: 'BERA',
      decimals: 18,
    },
    blockExplorers: [
      {
        name: 'Beratrail',
        url: 'https://berascan.com',
      },
    ],
  }),
  [Network.LINEA]: defineChain({
    id: 59144,
    name: 'Linea',
    nativeCurrency: {
      name: 'Linea Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorers: [
      {
        name: 'Lineascan',
        url: 'https://lineascan.build',
      },
      {
        name: 'Blockscout',
        url: 'https://explorer.linea.build',
      },
      {
        name: 'L2scan',
        url: 'https://linea.l2scan.co',
      },
    ],
  }),
  [Network.SCROLL]: defineChain({
    id: 59145,
    name: 'Scroll',
    nativeCurrency: {
      name: 'Scroll Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorers: [
      {
        name: 'Scrollscan',
        url: 'https://scrollscan.build',
      },
    ],
  }),
  [Network.ZKSYNC]: defineChain({
    id: 324,
    name: 'ZkSync',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorers: [
      {
        name: 'zkSync Era Block Explorer',
        url: 'https://explorer.zksync.io',
      },
    ],
  }),
  [Network.BLAST]: defineChain({
    id: 59146,
    name: 'Blast',
    nativeCurrency: {
      name: 'Blast Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorers: [
      {
        name: 'Blastscan',
        url: 'https://blastscan.build',
      },
    ],
  }),
}

export const CHAINS = {
  [Network.MAINNET]: ethereum,
  [Network.OPTIMISM]: optimism,
  [Network.POLYGON]: polygon,
  [Network.ARBITRUM]: arbitrum,
  [Network.ARBITRUM_NOVA]: arbitrumNova,
  [Network.ZORA]: zora,
  [Network.BASE]: base,
  [Network.BASE_SEPOLIA]: baseSepolia,
  [Network.AVALANCHE]: avalanche,
  [Network.LINEA]: customChains[Network.LINEA],
  // [Network.SCROLL]: customChains[Network.SCROLL],
  [Network.ZKSYNC]: customChains[Network.ZKSYNC],
  // [Network.BLAST]: customChains[Network.BLAST],
  [Network.BERA]: customChains[Network.BERA],
}

export const CHAIN_ICON_MAP = {
  ETH: <ETH size={20} />,
  [Network.MAINNET]: <ETH size={20} />,
  [Network.OPTIMISM]: <ETH size={20} />,
}

export const ACTIVITY_ICON_MAP = {
  [ActivityType.mint]: (
    <div className="h-4 w-4 mr-2">
      <FaSeedling className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
    </div>
  ),
  [ActivityType.transfer]: (
    <div className="h-4 w-4 mr-2">
      <FaArrowRightArrowLeft className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
    </div>
  ),
  [ActivityType.burned]: (
    <div className="h-4 w-4 mr-2">
      <FaFireFlameCurved className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
    </div>
  ),
  [ActivityType.ask_cancel]: (
    <div className="h-4 w-4 mr-2">
      <FaRegCircleXmark className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
    </div>
  ),
  [ActivityType.bid_cancel]: (
    <div className="h-4 w-4 mr-2">
      <FaRegCircleXmark className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
    </div>
  ),
  [ActivityType.bid]: (
    <div className="h-4 w-4 mr-2">
      <FaHand className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
    </div>
  ),
  [ActivityType.ask]: (
    <div className="h-4 w-4 mr-2">
      <FaTag className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
    </div>
  ),
  [ActivityType.sale]: (
    <div className="h-4 w-4 mr-2">
      <FaCartShopping className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
    </div>
  ),
}
