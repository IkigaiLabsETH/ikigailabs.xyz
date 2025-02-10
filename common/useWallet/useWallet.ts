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

  return { 
    wallet,
    connectionStatus,
    address: wallet?.account.address,
    network,
    networkId: chain?.id,
    isConnected: connectionStatus === "connected"
  }
}

