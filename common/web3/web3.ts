import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { createClient } from '@reservoir0x/reservoir-sdk'
import { ethers } from 'ethers'

import { Network } from '../types'
import { URLS } from '../config'
import { getChainIdFromNetwork } from '../utils'
import { createWalletClient, http, custom, createPublicClient } from "viem"
import { TW_SUPPORTED_CHAINS } from '../config/chains'
import { createThirdwebClient } from 'thirdweb'
import { sepolia } from 'viem/chains'

let web3Provider = null
let signer = null
const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
  `${URLS[Network.SEPOLIA].alchemy}/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
)
if (typeof window !== 'undefined') {
  web3Provider =
    window.ethereum != null ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider()
  signer = web3Provider.getSigner?.()
}

const getTWClient = (chain: Network) => {
  const settings = {
    supportedChains: TW_SUPPORTED_CHAINS,
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    secretKey: process.env.THIRDWEB_SECRET_KEY,
  }

  if (URLS[chain].openzeppelin) {
    settings['gassless'] = {
      openzeppelin: {
        relayerUrl: URLS[chain].openzeppelin,
      },
    }
  }
  const sdk = new ThirdwebSDK(getChainIdFromNetwork(chain), settings)
  signer && sdk.updateSignerOrProvider(signer)
  return sdk
}

const TWClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
})

const reservoirClient = (chain: Network) =>
  createClient({
    chains: [
      {
        id: getChainIdFromNetwork(chain),
        baseApiUrl: URLS[chain]?.reservoir,
        active: true,
        name: chain,
      },
    ],
    source: process.env.NEXT_PUBLIC_EXPLORER_SOURCE || 'ikigailabs.xyz',
    apiKey: process.env.NEXT_PUBLIC_RESERVOIR_KEY || '',
  })

const walletClient = (address: `0x${string}`) => {
  return createWalletClient({
    account: address,
    chain: sepolia,
    transport: custom(window.ethereum!),
  })
}

export { getTWClient, signer, reservoirClient, walletClient, jsonRpcProvider, TWClient }
