
import { ChainOrRpc, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

let ethProvider = null
let signer = null

if (typeof window !== "undefined") {
  ethProvider = new ethers.providers.Web3Provider(window.ethereum as any)
  signer = ethProvider.getSigner()
} 

const chain = (process.env.NEXT_CHAIN || 'goerli') as ChainOrRpc
export const sdk = ThirdwebSDK.fromSigner(signer, chain)
