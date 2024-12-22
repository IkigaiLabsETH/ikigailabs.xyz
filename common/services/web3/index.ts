import { createPublicClient, http, PublicClient } from 'viem'
import { mainnet, polygon, optimism } from 'viem/chains'
import { Network, Web3Config } from '@/common/types'

const CHAIN_CONFIG: Record<Network, typeof mainnet> = {
  ethereum: mainnet,
  polygon: polygon,
  optimism: optimism,
}

const DEFAULT_CONFIG: Record<Network, Web3Config> = {
  ethereum: {
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || 'https://eth.llamarpc.com',
    chainId: 1,
    networkName: 'ethereum',
  },
  polygon: {
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || 'https://polygon.llamarpc.com',
    chainId: 137,
    networkName: 'polygon',
  },
  optimism: {
    rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL || 'https://optimism.llamarpc.com',
    chainId: 10,
    networkName: 'optimism',
  },
}

export class Web3Service {
  private clients: Partial<Record<Network, PublicClient>>

  constructor() {
    this.clients = Object.entries(DEFAULT_CONFIG).reduce((acc, [network, config]) => ({
      ...acc,
      [network]: createPublicClient({
        chain: CHAIN_CONFIG[network as Network],
        transport: http(config.rpcUrl),
      }),
    }), {})
  }

  private getClient(network: Network): PublicClient {
    const client = this.clients[network]
    if (!client) throw new Error(`No client found for network ${network}`)
    return client
  }

  async getBalance(address: string, network: Network = 'ethereum') {
    const client = this.getClient(network)
    return client.getBalance({ address })
  }

  async getBlockNumber(network: Network = 'ethereum') {
    const client = this.getClient(network)
    return client.getBlockNumber()
  }

  async getTransactionReceipt(hash: string, network: Network = 'ethereum') {
    const client = this.getClient(network)
    return client.getTransactionReceipt({ hash })
  }
}

export const web3Service = new Web3Service() 