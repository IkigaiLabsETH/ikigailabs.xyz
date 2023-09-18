import Link from 'next/link'
import React, { FC } from 'react'
import { equals } from 'ramda'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Network } from '../../common/types'

interface DashboardNavProps {
  address: string
  network: Network
  currentTab: string
}

export const DashboardNav:FC<DashboardNavProps> = ({ address, network, currentTab }) => (
  <nav className="flex space-x-4 font-bold border-b border-b-gray-400 w-full pt-11" aria-label="Tabs">
    <Link href={`/dashboard/${address}/collected/${network}`}>
      <a className={clsx("p-4 border-white border-b-4 transition-all", equals(currentTab, 'collected') ? 'border-b-black text-yellow' : 'hover:border-black')}>
        Owned
      </a>
    </Link>
    <Link href={`/dashboard/${address}/offers/${network}`}>
      <a className={clsx("p-4 border-white border-b-4 transition-all", equals(currentTab, 'offers') ? 'border-b-black text-yellow' : 'hover:border-black')}>
        Offers
      </a>
    </Link>
    <Link href={`/dashboard/${address}/listings/${network}`}>
      <a className={clsx("p-4 border-white border-b-4 transition-all", equals(currentTab, 'listings') ? 'border-b-black text-yellow' : 'hover:border-black')}>
        Listings
      </a>
    </Link>
    <Link href={`/dashboard/${address}/activity/${network}`}>
      <a className={clsx("p-4 border-white border-b-4 transition-all", equals(currentTab, 'activity') ? 'border-b-black text-yellow' : 'hover:border-black')}>Activity</a>
    </Link>
  </nav>
)
