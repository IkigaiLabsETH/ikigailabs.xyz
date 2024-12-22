import React, { FC } from 'react'

import { Collection, Network } from '../../common/types'
import { CollectionsList } from '../CollectionsList'
import { CollectionsGrid } from '../CollectionsGrid'

interface CollectionsProps {
  collections: Collection[]
  isLoading: boolean
  network: Network
  active: 'grid' | 'list'
}

export const Collections: FC<CollectionsProps> = ({ collections, isLoading, network, active }) => {
  return (
    <div className="w-full text-black mx-auto max-w-screen-2xl px-6 lg:px-4 mt-8">
      {active === 'list' ? (
        <CollectionsList collections={collections} isLoading={isLoading} network={network} />
      ) : (
        <CollectionsGrid collections={collections} isLoading={isLoading} network={network} />
      )}
    </div>
  )
}
