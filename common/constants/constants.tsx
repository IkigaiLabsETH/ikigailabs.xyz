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
import { mainnet, base, arbitrum } from 'wagmi/chains'
import { Berachain, Base, Arbitrum } from '../config/chains'
import { ActivityType, Network, Option } from '../types'

import { zeroAddress } from 'viem'

const CHAIN_ID = {
  MAINNET: 1,
  BASE: 8453,
  BERA: 80085,
} as const

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
  { id: 'BERA', name: 'BERA' },
  { id: 'HONEY', name: 'HONEY' },
  { id: 'WBERA', name: 'WBERA' },
]

export const PAYMENT_TOKENS = {
  [CHAIN_ID.BERA]: [
    {
      chainId: 80085,
      address: zeroAddress,
      symbol: 'BERA',
      name: 'BERA',
      decimals: 18,
    },
    {
      chainId: 80085,
      address: '0x6969696969696969696969696969696969696969',
      symbol: 'WBERA',
      name: 'WBERA', 
      decimals: 18,
    },
    {
      chainId: 80085,
      address: '0xfcbd14dc51f0a4d49d5e53c2e0950e0bc26d0dce',
      symbol: 'HONEY',
      name: 'Honey',
      decimals: 18,
    },
  ],
} as const

export const NETWORK_OPTIONS = [
  {
    id: 'ethereum',
    name: 'Ethereum',
  },
  {
    id: 'berachain',
    name: 'Berachain',
  },
  {
    id: 'base',
    name: 'Base',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
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
  [Network.BERA]: {
    id: 80085,
    name: 'Berachain',
    network: 'berachain',
    nativeCurrency: {
      name: 'BERA',
      symbol: 'BERA',
      decimals: 18,
    },
    rpc: "https://rpc.berachain.com",
    blockExplorers: [
      {
        name: "Berascan",
        url: "https://artio.beratrail.io"
      }
    ],
    testnet: false,
  },
} as const

export const CHAIN_ID = {
  [Network.MAINNET]: mainnet.id,
  [Network.BERA]: Berachain.id,
  [Network.BASE]: base.id,
  [Network.ARBITRUM]: arbitrum.id,
} as const

export const CHAINS = {
  [Network.MAINNET]: mainnet,
  [Network.BERA]: Berachain,
  [Network.BASE]: base,
  [Network.ARBITRUM]: arbitrum.id,
} as const

export const CHAIN_ICON_MAP = {
  ETH: <ETH size={20} />,
  [Network.MAINNET]: <ETH size={20} />,
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
      <FaCartShopping className="mr-1 !h-4 !w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
    </div>
  ),
}
