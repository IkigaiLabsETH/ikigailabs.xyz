import React, { FC } from 'react'
import { useWallet } from '../../common/useWallet'
import { truncateAddress } from '../../common/utils'
import { Balance } from '../Balance'
import { Button } from '../Button'

interface ProfileProps {
  connectLabel?: string
  disconnectLabel?: string
}

export const Profile: FC<ProfileProps> = ({ connectLabel = 'Connect', disconnectLabel = 'Disconnect' }) => {
  const { address, connect, disconnect } = useWallet()

  return !address ? (
    <Button onClick={connect} className="mr-2">
      {connectLabel}
    </Button>
  ) : (
    <Button className="mr-2" onClick={disconnect}>
      {truncateAddress(address)} <span className="pl-1">|</span> <Balance address={address} />
    </Button>
  )
}
