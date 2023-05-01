import { ChainId, ChainOrRpc, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { createClient, getClient } from '@reservoir0x/reservoir-sdk'
import { ethers } from 'ethers'

let ethProvider = null
let signer = null

if (typeof window !== 'undefined') {
  ethProvider = new ethers.providers.Web3Provider(window.ethereum as any)
  signer = ethProvider.getSigner()
}

const chain = (process.env.NEXT_CHAIN || ChainId.Goerli) as ChainOrRpc
const sdk = new ThirdwebSDK(chain, {
  readonlySettings: {
    chainId: ChainId.Goerli,
    rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/uyDSscPAsHMY0vIhs7zKzF3XatffJMyi',
  },
})

signer && sdk.updateSignerOrProvider(signer)

createClient({
  chains: [
    {
      id: 5,
      baseApiUrl: 'https://api.reservoir.tools',
      default: true,
      apiKey: 'Y4c46f1f7-9c33-5a7b-bd4d-682a1d3e8ff0',
    },
  ],
  source: 'localhost',
})

const client = getClient()

export { sdk, signer, client }
