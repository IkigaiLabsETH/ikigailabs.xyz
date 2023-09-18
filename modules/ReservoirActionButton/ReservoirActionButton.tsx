import React, { FC, useState } from 'react'
import { Button } from '../Button'
import { match } from 'ts-pattern'
import { Network } from '../../common/types'
import { metamaskWallet, useChain, useConnect, useConnectionStatus, useSwitchChain } from '@thirdweb-dev/react'
import { getChainIdFromNetwork } from '../../common/utils'

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
  const chain = useChain()
  const status = useConnectionStatus()
  const connect = useConnect()
  const switchChain = useSwitchChain()

  return match(status)
    .with('connected', () => {
      if (chain?.slug !== network) {
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
      return (
        <Button
          onClick={() => connect(metamaskWallet())}
          className="w-full text-xl"
          loading={loading}
          disabled={disabled}
        >
          Connect
        </Button>
      )
    })
    .with('connecting', () => {
      return (
        <Button className="w-full text-xl" loading={false} disabled={true}>
          Connecting...
        </Button>
      )
    })
    .with('unknown', () => {
      return (
        <Button className="w-full text-xl" loading={false} disabled={true}>
          Unsupported Network
        </Button>
      )
    })
    .exhaustive()
}
