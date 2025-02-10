import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { supportedChains } from '../constants/constants'
import { propEq } from 'ramda'

export const useWallet = () => {
  const account = useActiveAccount()
  const networkId = useActiveWalletChain()
  const network = supportedChains.find(propEq('id', networkId))
  const address = account?.address || ''

  return { 
    address, 
    network: network?.network 
  }
}
