import React, { FC } from 'react'
import { useWallet } from '../../common/useWallet'
import { truncateAddress } from '../../common/utils'
import { Balance } from '../Balance'
import { Button } from '../Button'
import { ConnectWallet } from '@thirdweb-dev/react'

interface ProfileProps {
  connectLabel?: string
  disconnectLabel?: string
}

export const Profile: FC<ProfileProps> = ({ connectLabel = 'Connect', disconnectLabel = 'Disconnect' }) => {
  const { address, connect, disconnect } = useWallet()

  return ( 
    <div className='border-2 border-yellow'>
      <ConnectWallet theme='dark' className=" w-full rounded-none font-bold p-5 transition-colors border-2 bg-black text-yellow" />
    </div>
  )

  return !address ? (
    <ConnectWallet className="hover:text-yellow w-full border-black active:text-yellow focus-visible:outline-yellow bg-yellow hover:bg-black rounded-none font-bold p-5 transition-colors border-2 hover:border-yellow"/>
  ) : (
    <Button className="mr-2" onClick={disconnect}>
      {truncateAddress(address)} <span className="pl-1">|</span> <Balance address={address} />
    </Button>
  )
}
