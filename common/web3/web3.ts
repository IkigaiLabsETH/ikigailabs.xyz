import { useSigner } from '@thirdweb-dev/react'
import { ChainId, ChainOrRpc, ThirdwebSDK } from '@thirdweb-dev/sdk'
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

export { sdk }
