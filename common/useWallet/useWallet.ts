import { useActiveAccount, useActiveWalletChain } from '@thirdweb-dev/react'
import { supportedChains } from '../constants'
import { ReservoirChain } from '../types'

export const useWallet = () => {
  const account = useActiveAccount()
  const networkId = useActiveWalletChain()
  const network = supportedChains.find((chain: ReservoirChain) => chain.id === networkId)
  const address = account?.address || ''

  return { 
    address,
    network,
    networkId,
    isConnected: !!account
  }
}

