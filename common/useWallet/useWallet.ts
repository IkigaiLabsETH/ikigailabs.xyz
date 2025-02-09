import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { supportedChains } from '../config/chains'
import { propEq } from 'ramda'

export const useWallet = () => {
  const account = useActiveAccount()
  const networkId = useActiveWalletChain()
  const network = supportedChains.find(propEq('id', networkId))
  const address = account?.address || ''

  return { 
    address, 
    network: network?.network // Changed from slug to network since that's what we have in ReservoirChain
  }
}
