import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { supportedChains } from '../constants/constants'

export const useWallet = () => {
  const account = useActiveAccount()
  const networkId = useActiveWalletChain()
  const network = supportedChains.find(chain => chain.id === networkId?.id)
  const address = account?.address || ''

  return { 
    address, 
    network: network?.name.toLowerCase()
  }
}
