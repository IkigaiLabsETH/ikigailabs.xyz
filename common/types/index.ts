import { BigNumber } from '@ethersproject/bignumber'
import { ContractType, NFTMetadataOwner, ContractPrimarySale, ClaimCondition } from '@thirdweb-dev/sdk'
import { string } from 'ts-pattern/dist/patterns'

export type { Axios as HTTP } from 'axios'

export enum Layout {
  main = 'main',
}

export enum Modal {
  mintPass = 'mintPass',
}

export type {
  ContractType,
  NFTDrop,
  EditionDrop,
  NFTMetadata,
  DropClaimConditions,
  SignatureDrop,
  TransactionResultWithId,
  NFTMetadataOwner,
  ClaimCondition,
} from '@thirdweb-dev/sdk'

export interface Token {
  symbol: string
  name: string
  value: BigNumber
  decimals: number
  displayValue: string
}

export interface ContractMetadata {
  name: string
  description?: string
  image?: string
}

export interface NFTDropWithNFTS {
  metadata: ContractMetadata
  primarySales: ContractPrimarySale<any>
  nfts: NFTMetadataOwner[]
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

export interface Token {
  tokenId: string
  tokenImage: string
  tokenName: string
}

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
  token: Token
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
  selected: string[]
}

export interface Price {
  amount: string
  currency: string
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
  token: {
    rarity: number
    description: string
    name: string
    image: string
    owner: string
    rarityRank: number
    tokenId: number
  }
}
