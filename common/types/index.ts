import { BigNumber } from '@ethersproject/bignumber'
import { ContractType, ContractPrimarySale, ClaimCondition } from '@thirdweb-dev/sdk'

export type { Axios as HTTP } from 'axios'

export enum Layout {
  main = 'main',
}

export enum Network {
  MAINNET = 'Mainnet',
  Goerli = 'Goerli',
  POLYGON = 'Polygon',
  POLYGON_MUMBAI = 'Mumbai',
  ARBITRUM = 'Arbitrum',
  ARBITRUM_GOERLI = 'Arbitrum Goerli',
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
  'Goerli Ether' = Network.Goerli,
  'Ether' = Network.MAINNET,
}

export interface Token {
  symbol: string
  name: string
  value: BigNumber
  decimals: number
  displayValue: string
}

export enum DropTypes {
  NFT = 'NFT',
  Edition = 'Edition',
}

export enum DropTypeStandards {
  Edition = 'ERC1155',
  NFT = 'ERC721',
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
  price: string
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
  image: string
  owner: string
  rarityRank: number
  tokenId: number
}

export interface NFT {
  market: {
    floorAsk: {
      price: Price | null
    }
    topBid: {
      price: Price | null
    }
  }
  token: Token
}
