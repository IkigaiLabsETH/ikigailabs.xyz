import React, { FC } from 'react'

import { ConnectButton } from 'thirdweb/react'
import { TWClient } from '../../common/web3/web3'
import { createWallet, inAppWallet, walletConnect } from 'thirdweb/wallets'
import { values } from 'ramda'
import { CHAINS } from '../../common/constants'
import { Network } from '../../common/types'

interface ProfileProps {
  connectLabel?: string
  disconnectLabel?: string
}

export const Profile: FC<ProfileProps> = () => {
  const wallets = [
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    walletConnect(),
    inAppWallet({
      auth: {
        options: ['email', 'google', 'apple', 'facebook'],
      },
    }),
    createWallet('me.rainbow'),
    createWallet('app.phantom'),
  ]

  return (
    <div className="">
      <ConnectButton
        client={TWClient}
        wallets={wallets}
        theme={'dark'}
        connectModal={{ size: 'wide' }}
        chains={values(CHAINS)}
      />
    </div>
  )
}
