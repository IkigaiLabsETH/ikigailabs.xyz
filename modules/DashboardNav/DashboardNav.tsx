import Link from 'next/link'
import React, { FC } from 'react'
import { equals } from 'ramda'
import clsx from 'clsx'

import { Network } from '../../common/types'

interface DashboardNavProps {
  network: Network
  currentTab: string
}

export const DashboardNav: FC<DashboardNavProps> = ({ network, currentTab }) => (
  <nav className="flex space-x-4 font-bold border-b border-b-gray-400 w-full pt-11" aria-label="Tabs">
    <Link
      href={`/dashboard/collected/${network}`}
      className={clsx(
        'p-4 border-white border-b-4 transition-all',
        equals(currentTab, 'collected') ? 'border-b-black text-yellow' : 'hover:border-black',
      )}
    >
      Owned
    </Link>
    <Link
      href={`/dashboard/bids/${network}`}
      className={clsx(
        'p-4 border-white border-b-4 transition-all',
        equals(currentTab, 'bids') ? 'border-b-black text-yellow' : 'hover:border-black',
      )}
    >
      Bids made
    </Link>
    <Link
      href={`/dashboard/offers/${network}`}
      className={clsx(
        'p-4 border-white border-b-4 transition-all',
        equals(currentTab, 'offers') ? 'border-b-black text-yellow' : 'hover:border-black',
      )}
    >
      Offers received
    </Link>
    <Link
      href={`/dashboard/asks/${network}`}
      className={clsx(
        'p-4 border-white border-b-4 transition-all',
        equals(currentTab, 'asks') ? 'border-b-black text-yellow' : 'hover:border-black',
      )}
    >
      Asks
    </Link>
    <Link
      href={`/dashboard/activity/${network}`}
      className={clsx(
        'p-4 border-white border-b-4 transition-all',
        equals(currentTab, 'activity') ? 'border-b-black text-yellow' : 'hover:border-black',
      )}
    >
      Activity
    </Link>
  </nav>
)
