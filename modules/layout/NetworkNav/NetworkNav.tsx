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
    <li className={clsx('p-1 pl-0', equals(network, Network.OPTIMISM) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.OPTIMISM}`}>Optimism</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.POLYGON) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.POLYGON}`}>Polygon</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.ARBITRUM) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.ARBITRUM}`}>Arbitrum</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.MUMBAI) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.MUMBAI}`}>Mumbai</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.ZORA) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.ZORA}`}>Zora</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.BASE) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.BASE}`}>Base</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.BLAST) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.BLAST}`}>Blast</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.SCROLL) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.SCROLL}`}>Scroll</Link>
    </li>
    <li className={clsx('p-1 pl-0', equals(network, Network.SEPOLIA) ? 'font-bold' : '')}>
      <Link href={`/profile/${address}/${tab}/${Network.SEPOLIA}`}>Sepolia</Link>
    </li>
  </ul>
)
