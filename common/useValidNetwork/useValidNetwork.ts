import { includes } from 'ramda'
import { Network } from '../types'

export const useValidNetwork = (network: string) => {
  const supportedNetworks = [
    Network.MAINNET,
    Network.ARBITRUM,
    Network.BASE,
    Network.BERA,
  ]

  return includes(network, supportedNetworks)
}
