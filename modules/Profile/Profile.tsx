import React, { FC, useState } from 'react'
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
    <Button label={connectLabel} onClick={connect} type="ghost" />
  ) : (
    <div className="mr-1 text-lg text-black bg-white p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
      {truncateAddress(address)} <span className="pl-1">|</span> <Balance address={address} />
    </div>
  )
}
