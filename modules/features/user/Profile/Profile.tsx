import React, { FC } from 'react'

import { AutoConnect, ConnectButton, useActiveWalletConnectionStatus } from 'thirdweb/react'
import { TWClient, wallets } from '../../common/web3'
import { values } from 'ramda'
import { CHAINS } from '../../common/constants'
import { match } from 'ts-pattern'
import { Loader, Size } from '../Loader'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface ProfileProps {
  connectLabel?: string
  disconnectLabel?: string
}

export const Profile: FC<ProfileProps> = () => {
  const connectionStatus = useActiveWalletConnectionStatus()
  const router = useRouter()

  const connected = (
    <ConnectButton
      client={TWClient}
      wallets={wallets}
      theme={'dark'}
      connectModal={{ size: 'wide' }}
      chains={values(CHAINS)}
    />
  )

  const loading = (
    <div>
      <Loader size={Size.m} color="yellow" />
    </div>
  )

  const connect = (
    <Link
      href={`/connect?ref=${router.asPath}`}
      title="Connect"
      className="z-20 h-12 flex items-center justify-center mr-2 bg-black border border-solid border-gray-400 mt-0.5 rounded-lg px-5 hover:border-yellow"
    >
      Sign In
    </Link>
  )

  return (
    <div className="">
      <AutoConnect client={TWClient} timeout={10000} wallets={wallets} />
      {match(connectionStatus)
        .with('disconnected', () => connect)
        .with('connecting', () => loading)
        .with('connected', () => connected)
        .exhaustive()}
    </div>
  )
}
