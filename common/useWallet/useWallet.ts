import { useAddress, useChainId, useConnectionStatus } from '@thirdweb-dev/react'
import { supportedChains } from '../constants/constants'
import { ReservoirChain } from '../types'

export const useWallet = () => {
  const address = useAddress()
  const networkId = useChainId()
  const connectionStatus = useConnectionStatus()
  const network = supportedChains.find((chain: ReservoirChain) => chain.id === networkId)

  return { 
    address,
    network,
    networkId,
    isConnected: connectionStatus === "connected"
  }
}

