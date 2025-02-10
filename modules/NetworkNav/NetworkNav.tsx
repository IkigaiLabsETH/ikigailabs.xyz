import Link from 'next/link'
import React, { FC } from 'react'
import { equals } from 'ramda'
import clsx from 'clsx'

import { Network } from '../../common/types'

interface NetworkNavProps {
  tab: string
  network: Network
  address: string
}

export const NetworkNav: FC<NetworkNavProps> = ({ tab, network, address }) => (
  <ul className="text-xl">
    <li className={clsx('p-1 pl-0', equals(network, Network.MAINNET) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.MAINNET}`}>Ethereum</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.ARBITRUM) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.ARBITRUM}`}>Arbitrum</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.BASE) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.BASE}`}>Base</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.BERA) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.BERA}`}>Berachain</Link>
    </li>
  </ul>
)
