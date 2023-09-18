import { useChain, useConnectionStatus, useSwitchChain } from '@thirdweb-dev/react'
import { match } from 'ts-pattern'
import { Network } from '../types'
import { getChainIdFromNetwork } from '../utils'

export const useNetworkCheck = (requiredNetwork: Network) => {
  const { slug } = useChain()
  const status = useConnectionStatus()
  const switchChain = useSwitchChain()

  return match(status)
    .with('connected', () => {
      if (slug !== requiredNetwork) {
        return switchChain(getChainIdFromNetwork(requiredNetwork))
      }

      return null
    })
    .with('disconnected', () => {})
    .with('connecting', () => {})
    .with('unknown', () => {})
}
