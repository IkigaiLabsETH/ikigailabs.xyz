import { 
  useActiveWallet,
  useActiveWalletChain,
  useActiveWalletConnectionStatus,
  useActiveAccount
} from 'thirdweb/react'
import { supportedChains } from '../constants/constants'

export const useWallet = () => {
  const wallet = useActiveWallet()
  const connectionStatus = useActiveWalletConnectionStatus()
  const chain = useActiveWalletChain()
  const account = useActiveAccount()
  const network = chain ? supportedChains.find((c) => c.id === Number(chain.id)) : undefined

  return { 
    wallet,
    connectionStatus,
    address: account?.address,
    network,
    networkId: chain?.id,
    isConnected: connectionStatus === "connected"
  }
}

