import React, { FC } from 'react'
// import { ConnectWallet } from '@thirdweb-dev/react'
import { useAppDispatch } from '../../common/redux/store'
import { changeNetwork } from '../NetworkSelector'
import { Network } from '../../common/types'
import { ConnectButton } from 'thirdweb/react'
import { TWClient } from '../../common/web3/web3'

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
    <div className="">
      {/* <ConnectWallet
        theme="dark"
        className=" w-full rounded-none font-bold p-2 transition-colors bg-black text-yellow"
        networkSelector={{ onSwitch }}
      /> */}
      <ConnectButton client={TWClient} />
    </div>
  )
}
