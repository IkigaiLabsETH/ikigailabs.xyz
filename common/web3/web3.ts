import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { createClient } from '@reservoir0x/reservoir-sdk'
import { ethers } from 'ethers'
import { createWalletClient, custom } from 'viem'
import { TW_SUPPORTED_CHAINS } from '../config/chains'
import { Network } from '../types'
import { getChainIdFromNetwork } from '../utils'

let web3Provider: ethers.providers.Web3Provider | ethers.providers.BaseProvider | null = null
let signer: ethers.Signer | null = null

if (typeof window !== 'undefined') {
  web3Provider = window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum as any)
    : ethers.providers.getDefaultProvider()
  signer = web3Provider instanceof ethers.providers.Web3Provider ? web3Provider.getSigner() : null
}

export class Web3 extends ThirdwebSDK {
  constructor(chain: Network) {
    super(getChainIdFromNetwork(chain), {
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id-here"
    })
  }
}

// Create a new instance of Web3 for each chain
const web3Instance = new Web3(Network.MAINNET)
export const getTWClient = () => web3Instance

export const wallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    connector: () => new Web3(Network.MAINNET),
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    connector: () => new Web3(Network.MAINNET),
  },
]

export { ThirdwebSDK as TWClient }
