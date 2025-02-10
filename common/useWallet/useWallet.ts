import { 
  useWallet as useThirdwebWallet,
  useActiveWalletConnectionStatus 
} from 'thirdweb/react'
import { supportedChains } from '../constants/constants'
import { ReservoirChain } from '../types'

export const useWallet = () => {
  const wallet = useThirdwebWallet()
  const connectionStatus = useActiveWalletConnectionStatus()
  const network = supportedChains.find((c: ReservoirChain) => c.id === wallet?.chain?.id)

  return { 
    wallet,
    connectionStatus,
    address: wallet?.address,
    network,
    networkId: wallet?.chain?.id,
    isConnected: connectionStatus === "connected"
  }
}

