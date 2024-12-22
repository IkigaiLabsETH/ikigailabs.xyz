import { Network } from './common'

export interface Token {
  symbol: string
  name: string
  decimals: number
  address: string
  chainId: number
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