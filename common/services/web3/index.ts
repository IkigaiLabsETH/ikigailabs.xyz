import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { Network } from '@/common/types'

const clients = {
  ethereum: createPublicClient({
    chain: mainnet,
    transport: http()
  })
}

export class Web3Service {
  private getClient(network: Network) {
    return clients[network]
  }

  async getBalance(address: string, network: Network = 'ethereum') {
    const client = this.getClient(network)
    return client.getBalance({ address })
  }

  async getBlockNumber(network: Network = 'ethereum') {
    const client = this.getClient(network)
    return client.getBlockNumber()
  }
}

export const web3Service = new Web3Service() 