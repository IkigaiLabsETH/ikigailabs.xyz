import { 
  useWallet as useThirdwebWallet,
  useConnectionStatus
} from '@thirdweb-dev/react'
import { supportedChains } from '../constants/constants'
import { ReservoirChain } from '../types'

export const useWallet = () => {
  const wallet = useThirdwebWallet()
  const connectionStatus = useConnectionStatus()
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

