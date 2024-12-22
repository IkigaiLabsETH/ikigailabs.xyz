import { Network } from './common'

export interface Token {
  symbol: string
  name: string
  decimals: number
  address: string
  chainId: number
}

export interface Metadata {
  name: string
  description: string
  image: string
  external_url?: string
  attributes?: Array<{
    trait_type: string
    value: string | number
  }>
}

export interface NFT {
  tokenId: string
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  owner: string
  tokenUri: string
}

export interface TransactionResponse {
  hash: string
  wait: () => Promise<TransactionReceipt>
}

export interface TransactionReceipt {
  status: number
  transactionHash: string
  blockNumber: number
  gasUsed: bigint
  effectiveGasPrice: bigint
  blockHash: string
  logs: Array<{
    address: string
    topics: string[]
    data: string
    blockNumber: number
    transactionHash: string
    logIndex: number
  }>
}

export interface WalletState {
  address: string | undefined
  isConnected: boolean
  network: Network
}

export interface Web3Error extends Error {
  code: number
  data?: unknown
}

export interface Web3Config {
  rpcUrl: string
  chainId: number
  networkName: Network
} 