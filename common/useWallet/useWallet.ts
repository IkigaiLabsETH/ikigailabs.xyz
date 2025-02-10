import { 
  useActiveWallet,
  useActiveWalletChain,
  useActiveWalletConnectionStatus
} from 'thirdweb/react'
import { supportedChains } from '../constants/constants'
import { ReservoirChain } from '../types'

export const useWallet = () => {
  const wallet = useActiveWallet()
  const connectionStatus = useActiveWalletConnectionStatus()
  const chain = useActiveWalletChain()
  const network = chain ? supportedChains.find((c) => c.id === Number(chain.id)) : undefined
  const address = wallet ? wallet.getAddress() : undefined

  return { 
    wallet,
    connectionStatus,
    address,
    network,
    networkId: chain?.id,
    isConnected: connectionStatus === "connected"
  }
}

