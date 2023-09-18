import Link from 'next/link'
import React, { FC } from 'react'
import { equals } from 'ramda'
import clsx from 'clsx'

import { Network } from '../../common/types'

interface NetworkNavProps {
  address: string
  tab: string
  network: Network
}

export const NetworkNav:FC<NetworkNavProps> = ({ address, tab, network }) => (
  <ul className="text-xl">
    <li className={clsx('p-1 pl-0', equals(network, Network.MAINNET) ? 'font-bold' : '')}>
      <Link href={`/dashboard/${address}/${tab}/${Network.MAINNET}`}>Ethereum</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.OPTIMISM) ? 'font-bold' : '')}>
      <Link href={`/dashboard/${address}/${tab}/${Network.OPTIMISM}`}>Optimism</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.POLYGON) ? 'font-bold' : '')}>
      <Link href={`/dashboard/${address}/${tab}/${Network.POLYGON}`}>Polygon</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.ARBITRUM) ? 'font-bold' : '')}>
      <Link href={`/dashboard/${address}/${tab}/${Network.ARBITRUM}`}>Arbitrum</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.MUMBAI) ? 'font-bold' : '')}>
      <Link href={`/dashboard/${address}/${tab}/${Network.MUMBAI}`}>Mumbai</Link>
    </li>
  </ul>
)
