import { 
  useActiveAccount,
  useActiveWalletChain,
  useActiveWalletConnectionStatus 
} from 'thirdweb/react'
import { supportedChains } from '../constants/constants'
import { ReservoirChain } from '../types'

export const useWallet = () => {
  const account = useActiveAccount()
  const chain = useActiveWalletChain()
  const connectionStatus = useActiveWalletConnectionStatus()
  const network = supportedChains.find((c: ReservoirChain) => c.id === chain?.id)

  return { 
    address: account?.address,
    network,
    networkId: chain?.id,
    isConnected: connectionStatus === "connected"
  }
}

