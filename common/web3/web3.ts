import { ChainId, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { Ethereum, Goerli, Polygon, Arbitrum, ArbitrumGoerli, Mumbai } from '@thirdweb-dev/chains'
import { createClient } from '@reservoir0x/reservoir-sdk'
import { ethers } from 'ethers'

import { Network } from '../types'
import { URLS } from '../config'

let ethProvider = null
let signer = null

if (typeof window !== 'undefined') {
  ethProvider = new ethers.providers.Web3Provider(window.ethereum as any)
  signer = ethProvider.getSigner()
}

const getTWClient = (chain: Network) => {
  const sdk = new ThirdwebSDK(Ethereum, {
    supportedChains: [Ethereum, Goerli, Polygon, Arbitrum, ArbitrumGoerli, Mumbai] as any,
    readonlySettings: {
      chainId: chain as any,
      rpcUrl: `${URLS[ChainId[chain]].alchemy}/v2/uyDSscPAsHMY0vIhs7zKzF3XatffJMyi`,
    },
  })
  signer && sdk.updateSignerOrProvider(signer)
  return sdk
}

const reservoirClient = createClient({
  chains: [
    {
      id: ChainId.Mainnet,
      baseApiUrl: URLS.Mainnet.reservoir,
      default: true,
      apiKey: 'Y4c46f1f7-9c33-5a7b-bd4d-682a1d3e8ff0',
    },
  ],
  source: process.env.NEXT_PUBLIC_APP_NAME || 'localhost',
})

export { getTWClient, signer, reservoirClient }
