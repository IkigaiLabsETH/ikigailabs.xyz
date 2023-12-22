import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { createClient } from '@reservoir0x/reservoir-sdk'
import { ethers } from 'ethers'

import { Network } from '../types'
import { URLS } from '../config'
import { getChainIdFromNetwork } from '../utils'
import { createWalletClient, custom } from 'viem'
import { TW_SUPPORTED_CHAINS } from '../config/chains'

let ethProvider = null
let signer = null

if (typeof window !== 'undefined') {
  ethProvider = new ethers.providers.Web3Provider(window.ethereum as any)
  console.log(ethProvider)
  signer = ethProvider.getSigner()
}

const getTWClient = (chain: Network) => {
  const settings = {
    supportedChains: TW_SUPPORTED_CHAINS,
    readonlySettings: {
      chainId: getChainIdFromNetwork(chain),
      rpcUrl: `${URLS[chain].alchemy}/v2/${process.env.ALCHEMY_KEY}`,
    },
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
    source: process.env.NEXT_PUBLIC_APP_NAME || 'Ikigai Labs',
    logLevel: 4,
  })

const walletClient = (address: `0x${string}`) =>
  createWalletClient({
    account: address,
    transport: custom(window?.ethereum),
  })

export { getTWClient, signer, reservoirClient, walletClient }
