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
  primarySales: ContractPrimarySale<any>
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
  listing_canceled = 'listing_canceled',
  offer_canceled = 'offer_canceled',
  ask = 'ask',
  buy = 'buy',
}

// export interface Token {
//   tokenId: string
//   tokenImage: string
//   tokenName: string
// }

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

export interface Price {
  amount: string
  currency: string
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
  price: Price | null
  source: any
  validFrom: string | null
  validUntil: string | null
}
export interface NFT {
  market: {
    floorAsk: FloorAsk
    topBid: {
      price: Price | null
    }
  }
  token: Token
  ownership: Ownership
}

export interface CollectionSet {
  id: string
  name: string
}

export interface RCurrency {
  contract: string
  name: string
  symbol: string
  decimals: number
}
export interface RAmount {
  raw: string
  decimal: number
  usd: number
  native: number
}
export interface RNetAmount {
  raw: string
  decimal: number
  usd: number
  native: number
}
export interface BidPrice {
  curruncy: RCurrency
  amount: RAmount
  netAmount: RNetAmount
}

export interface TopBid {
  id: string
  sourceDomain: string
  price: BidPrice
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
  tokenCount: string
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
