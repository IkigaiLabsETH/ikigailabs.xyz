import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { TW_SUPPORTED_CHAINS } from '../config/chains'
import { propEq } from 'ramda'

export const useWallet = () => {
  const account = useActiveAccount()
  const networkId = useActiveWalletChain()
  const network = TW_SUPPORTED_CHAINS.find(propEq('id', networkId))
  const address = account?.address || ''

  return { address, network: network?.slug }
}
