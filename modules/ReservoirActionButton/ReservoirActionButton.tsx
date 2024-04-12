import React, { FC } from 'react'
import { Button } from '../Button'
import { match } from 'ts-pattern'
import { Network } from '../../common/types'
import {
  useActiveWalletChain,
  useActiveWalletConnectionStatus,
  useSwitchActiveWalletChain,
  ConnectButton,
} from 'thirdweb/react'
import { getChainIdFromNetwork } from '../../common/utils'
import { TWClient } from '../../common/web3/web3'

interface ReservoirActionButtonProps {
  onClick?: () => Promise<any>
  label: string
  network: Network
  disabled?: boolean
  loading?: boolean
}

export const ReservoirActionButton: FC<ReservoirActionButtonProps> = ({
  onClick,
  label,
  disabled,
  loading,
  network,
}) => {
  const chain = useActiveWalletChain()
  const status = useActiveWalletConnectionStatus()
  const switchChain = useSwitchActiveWalletChain()

  return match(status)
    .with('connected', () => {
      if (chain?.name !== network) {
        return (
          <Button
            onClick={() => switchChain(getChainIdFromNetwork(network))}
            className="w-full text-xl"
            loading={false}
            disabled={false}
          >
            Switch Network
          </Button>
        )
      }

      return (
        <Button onClick={onClick} className="w-full text-xl" loading={loading} disabled={disabled}>
          {label}
        </Button>
      )
    })
    .with('disconnected', () => {
      return <ConnectButton client={TWClient} />
    })
    .with('connecting', () => {
      return (
        <Button className="w-full text-xl" loading={false} disabled={true}>
          Connecting...
        </Button>
      )
    })
    .exhaustive()
}
