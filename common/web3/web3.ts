import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { createClient } from '@reservoir0x/reservoir-sdk'
import { ethers } from 'ethers'

import { Network } from '../types'
import { URLS } from '../config'
import { getChainIdFromNetwork } from '../utils'
import { createWalletClient, custom } from 'viem'
import { TW_SUPPORTED_CHAINS } from '../config/chains'
import { createThirdwebClient } from 'thirdweb'
import { createWallet, walletConnect } from 'thirdweb/wallets'

let web3Provider: ethers.providers.Web3Provider | ethers.providers.BaseProvider | null = null
let signer: ethers.providers.JsonRpcSigner | null = null
const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
  `${URLS[Network.MAINNET].alchemy}/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
)
if (typeof window !== 'undefined') {
  web3Provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum as any)
      : ethers.providers.getDefaultProvider()
  signer = web3Provider instanceof ethers.providers.Web3Provider ? web3Provider.getSigner() : null
}

interface TWClientSettings {
  supportedChains: any[]
  clientId?: string
  secretKey?: string
  gassless?: {
    openzeppelin: {
      relayerUrl: string
    }
  }
}

interface URLConfig {
  reservoir: string
  tw: string
  alchemy: string
  explorer: string
  openzeppelin?: string
}

const getTWClient = (chain: Network) => {
  const settings: TWClientSettings = {
    supportedChains: TW_SUPPORTED_CHAINS,
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    secretKey: process.env.THIRDWEB_SECRET_KEY,
  }

  const urls = URLS as { [key in Network]: URLConfig }
  if (urls[chain]?.openzeppelin) {
    settings.gassless = {
      openzeppelin: {
        relayerUrl: urls[chain].openzeppelin!,
      },
    }
  }
  const sdk = new ThirdwebSDK(getChainIdFromNetwork(chain), settings)
  signer && sdk.updateSignerOrProvider(signer)
  return sdk
}

export const wallets = [
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet', {
    walletConfig: {
      options: 'smartWalletOnly',
    },
    chains: [TW_SUPPORTED_CHAINS],
    appMetadata: {
      name: 'IKIGAI Labs',
      description: 'Shaped by Photography',
      logoUrl: 'https://ikigailabs.xyz/assets/images/IKIGAI_LABS_logo.svg',
    },
  }),
  walletConnect(),
  createWallet('me.rainbow'),
  createWallet('app.phantom'),
]

const TWClient = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY || '',
})

const reservoirClient = (chain: Network) => {
  const urls = URLS as { [key in Network]: URLConfig }
  return createClient({
    apiBase: urls[chain]?.reservoir || '',
    apiKey: process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
    source: process.env.NEXT_PUBLIC_APP_NAME || 'ikigailabs.xyz',
    logLevel: 4,
    chains: [{
      id: getChainIdFromNetwork(chain),
      active: true,
      name: chain,
    }],
  })
}

const walletClient = (address: `0x${string}`) =>
  createWalletClient({
    account: address,
    transport: custom(window?.ethereum as any),
  })

export { getTWClient, signer, reservoirClient, walletClient, jsonRpcProvider, TWClient }
