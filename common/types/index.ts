import { BigNumber } from '@ethersproject/bignumber'
import { ContractType, ContractPrimarySale, ClaimCondition, Currency, Amount } from '@thirdweb-dev/sdk'

export type { Axios as HTTP } from 'axios'

export enum Layout {
  main = 'main',
}

export enum Network {
  MAINNET = 'ethereum',
  GOERLI = 'goerli',
  OPTIMISM = 'optimism',
  POLYGON = 'polygon',
  ARBITRUM = 'arbitrum',
  ARBITRUM_GOERLI = 'arbitrum-goerli',
  MUMBAI = 'mumbai',
}

export type Option = { id: string | number; name: string }

export type {
  ContractType,
  NFTDrop,
  EditionDrop,
  NFTMetadata,
  DropClaimConditions,
  SignatureDrop,
  TransactionResultWithId,
  ClaimCondition,
  NFT as TWNFT,
} from '@thirdweb-dev/sdk'

export interface Drop {
  name: string
  description: string
  image: string
  app_uri: string
  seller_fee_basis_points: number
  fee_recipient: string
  symbol: string
}

export interface Claim {
  id: string
}

export enum CurrencyChain {
  'Goerli Ether' = Network.GOERLI,
  'Ether' = Network.MAINNET,
  'MATIC' = Network.POLYGON,
}

export interface Token {
  symbol: string
  name: string
  value: BigNumber
  decimals: number
  displayValue: string
}

export enum DropTypes {
  NFT = 'nft-drop',
  Edition = 'edition-drop',
}

export enum DropTypeStandards {
  'edition-drop' = 'ERC1155',
  'nft-drop' = 'ERC721',
}

export interface ContractMetadata {
  name: string
  description?: string
  image?: string
}

export interface NFTDropWithNFTS {
  metadata: ContractMetadata
  primarySales: ContractPrimarySale
  nfts: any[]
  claimedSupply: string
  unclaimedSupply: string
  ownedTokenIds: string[]
  claimConditions: ClaimCondition[]
}

export interface ContractDefinition {
  address: string
  contractType: ContractType
  metadata: () => Promise<any>
}

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ErrorType = string | null | undefined

export enum ActivityType {
  mint = 'mint',
  transfer = 'transfer',
  burned = 'burned',
  ask_canceled = 'ask_canceled',
  bid_canceled = 'bid_canceled',
  ask = 'ask',
  buy = 'buy',
}

export interface Collection {
  collectionId: string
  collectionName: string
}

export interface Activity {
  type: ActivityType.mint
  fromAddress: string
  toAddress: string
  price: {
    amount: {
      decimal: number
    }
    currency: {
      symbol: string
    }
  }
  amount: number
  timestamp: number
  createdAt?: string
  contract?: string
  token: {
    tokenId: string
    tokenImage: string
    tokenName: string
  }
  collection?: Collection
  txHash: string
  logIndex?: number
  batchIndex?: number
}

export interface CollectionActivity {
  contract: string
  activity: Activity[]
}

export interface FacetValue {
  value: string
  count: number
}

export interface Facet {
  key: string
  values: FacetValue[]
}

// export interface Price {
//   amount: string
//   currency: string
// }

export interface ResCurrency {
  contract: string
  name: string
  symbol: string
  decimals: number
}

export interface ResAmount {
  raw: string
  decimal: number
  usd: number
  native: number
}

export interface ResNetAmount {
  raw: string
  decimal: number
  usd: number
  native: number
}

export interface ResPrice {
  currency: ResCurrency
  amount: ResAmount
  netAmount?: ResNetAmount
}

export interface LastSale {
  orderSource: string
  fillSource: string
  timestamp: number
  price: ResPrice
  marketplaceFeeBps: number
  paidFullRoyalty: boolean
  feeBreakdown: FeeBreakdown[]
}

export interface Token {
  rarity: number
  description: string
  name: string
  image?: string
  owner: string
  rarityRank: number
  tokenId: number
  contract: string
  media?: string
  lastSale?: LastSale
  attributes?: Record<string, unknown>[]
  kind?: string
  collection?: {
    name: string
  }
}

export interface Ownership {
  acquiredAt: string
  floorAsk: FloorAsk
  onSaleCount: string
  tokenCount: string
}

export interface FloorAsk {
  id: string | null
  kind: string | null
  maker: string | null
  price: ResPrice | null
  source: any
  validFrom: string | null
  validUntil: string | null
}
export interface NFT {
  market: {
    floorAsk: FloorAsk
    lastBuy: LastBuy
    topBid: {
      price: ResPrice | null
    }
  }
  token: Token
  ownership: Ownership
}

export interface DynamicPricing {
  kind: string
  data: {
    price: {
      start: ResPrice
      end: ResPrice
      time: {
        start: number
        end: number
      }
    }
  }
}

export interface ResSource {
  id: string
  domain: string
  name: string
  icon: string
  url: string
}

export interface FeeBreakdown {
  kind: 'marketplace' | 'royalty'
  recipient: string
  bps: number
}

export interface ResCriteria {
  kind: string
  data: {
    token?: {
      tokenId: string
      image: string
      name: string
    }
    collection?: {
      id: string
      name: string
      image: string
    }
  }
}

export interface Order {
  id: string
  kind: string
  side: 'sell' | 'buy'
  status: 'active' | 'inactive' | 'expired' | 'canceled' | 'filled'
  tokenSetId: string
  tokenSetSchemaHash: string
  contract: string
  contractKind: string
  maker: string
  taker: string
  price: ResPrice
  validFrom: number
  validUntil: number
  quantityFilled: number
  quantityRemaining: number
  dynamicPricing: DynamicPricing | null
  criteria: ResCriteria
  source: ResSource
  feeBps: number
  feeBreakdown: FeeBreakdown[]
  expiration: number
  isReservoir: boolean
  isDynamic: boolean
  createdAt: string
  updatedAt: string
  originatedAt: string
  rawData: Record<string, unknown>
  isNativeOffChainCancellable: boolean
  depth: {
    price: number
    quantity: number
  }
  continuation: string
}

export interface TopBid {
  id: string
  price: ResPrice
  maker: string
  createdAt: string
  validFrom: number
  validUntil: number
  floorDifferencePercentage: number
  source: ResSource
  feeBreakdown: FeeBreakdown[]
  criteria: ResCriteria
  token: {
    contract: string
    tokenId: string
    name: string
    image: string
    floorAskPrice: ResPrice | null
    lastSalePrice: ResPrice | null
    collection: {
      id: string
      name: string
      imageUrl: string
      floorAskPrice: ResPrice | null
    }
  }
  continuation: string
}

export interface CollectionSet {
  id: string
  name: string
}

export interface TopBid {
  id: string
  sourceDomain: string
  price: ResPrice
  maker: string
  validFrom: number
  validUntil: number
}

export interface Royalties {
  recipient: string
  bps: number
  breakdown: {
    recipient: string
    bps: number
  }[]
}

export interface LastBuy {
  value: number
  timestamp: number
}

export interface DateInterval {
  '1day': number
  '7day': number
  '30day': number
}

export interface DateIntervalAllTime {
  '1day': number
  '7day': number
  '30day': number
  'allTime': number
}

export interface MintStagePrice {
  startTime: number
  endTime: number
  maxMintsPerWallet: number
}

export interface Collection {
  id: string
  slug: string
  createdAt: string
  name: string
  image: string
  banner: string
  discordUrl: string
  externalUrl: string
  twitterUsername: string
  openseaVerificationStatus: string
  description: string
  sampleImages: string[]
  tokenCount: number
  onSaleCount: string
  primaryContract: string
  tokenSetId: string
  royalties: Royalties
  lastBuy: LastBuy
  floorAsk: FloorAsk
  topBid: TopBid
  rank: DateIntervalAllTime
  volume: DateIntervalAllTime
  volumeChange: DateInterval
  floorSale: DateInterval
  floorSaleChange: DateInterval
  salesCount: DateIntervalAllTime
  collectionBidSupported: boolean
  ownerCount: number
  attributes: {
    key: string
    kind: 'string' | 'number' | 'date' | 'range'
    count: number
  }[]
  count: number
  contractKind: string
  mintedTimestamp: number
  mintStages: {
    stage: string
    kind: string
    price: MintStagePrice
  }[]
}

export interface TokenDefinition {
  contract: string
  tokenId: string
  network: Network
  type: ContractType
}
