import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export class ENSService {
  async getENSName(address: string): Promise<string | null> {
    try {
      const ensName = await client.getEnsName({ address: address as `0x${string}` })
      return ensName
    } catch (error) {
      console.error('Error resolving ENS name:', error)
      return null
    }
  }

  async getENSAvatar(address: string): Promise<string | null> {
    try {
      const ensAvatar = await client.getEnsAvatar({ name: address })
      return ensAvatar
    } catch (error) {
      console.error('Error resolving ENS avatar:', error)
      return null
    }
  }

  async getAddressFromENS(ensName: string): Promise<string | null> {
    try {
      const address = await client.getEnsAddress({ name: ensName })
      return address
    } catch (error) {
      console.error('Error resolving address from ENS:', error)
      return null
    }
  }
}

export const ensService = new ENSService() 