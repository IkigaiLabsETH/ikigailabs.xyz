import React, { FC } from 'react'
import { useWallet } from '../../common/useWallet'
import { truncateAddress } from '../../common/utils'
import { Balance } from '../Balance'
import { Button } from '../Button'
import { ConnectWallet } from '@thirdweb-dev/react'
import { useAppDispatch } from '../../common/redux/store'
import { changeNetwork } from '../NetworkSelector'
import { Network } from '../../common/types'

interface ProfileProps {
  connectLabel?: string
  disconnectLabel?: string
}

export const Profile: FC<ProfileProps> = () => {
  const dispatch = useAppDispatch()

  const onSwitch = ({ slug }: { slug: string }) => {
    dispatch(changeNetwork({ network: slug as Network }))
  }

  return (
    <div className="border-2 border-yellow">
      <ConnectWallet
        theme="dark"
        className=" w-full rounded-none font-bold p-5 transition-colors border-2 bg-black text-yellow"
        networkSelector={{ onSwitch }}
      />
    </div>
  )
}
