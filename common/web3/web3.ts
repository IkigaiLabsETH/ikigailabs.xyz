import { ChainId, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { Ethereum, Goerli, Polygon, Arbitrum, ArbitrumGoerli, Mumbai } from '@thirdweb-dev/chains'
import { createClient } from '@reservoir0x/reservoir-sdk'
import { ethers } from 'ethers'

import { Network } from '../types'
import { URLS } from '../config'
import { getChainIdFromNetwork } from '../utils'
import { createWalletClient, custom, http } from 'viem'

let ethProvider = null
let signer = null

if (typeof window !== 'undefined') {
  ethProvider = new ethers.providers.Web3Provider(window.ethereum as any)
  signer = ethProvider.getSigner()
}

const getTWClient = (chain: Network) => {
  const settings = {
    supportedChains: [Ethereum, Goerli, Polygon, Arbitrum, ArbitrumGoerli, Mumbai] as any,
    readonlySettings: {
      chainId: getChainIdFromNetwork(chain),
      rpcUrl: `${URLS[chain].alchemy}/v2/${process.env.ALCHEMY_KEY}`,
    },
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
        baseApiUrl: URLS.ethereum.reservoir,
        active: true,
      },
    ],
    source: process.env.NEXT_PUBLIC_APP_NAME || 'localhost',
  })

const walletClient = (address: `0x${string}`) =>
  createWalletClient({
    account: address,
    transport: custom(window?.ethereum),
  })

export { getTWClient, signer, reservoirClient, walletClient }
