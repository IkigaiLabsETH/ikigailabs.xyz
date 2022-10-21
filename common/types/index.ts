import { BigNumber } from '@ethersproject/bignumber'
import { ContractType, NFTMetadataOwner, ContractPrimarySale, ClaimCondition } from '@thirdweb-dev/sdk'

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
