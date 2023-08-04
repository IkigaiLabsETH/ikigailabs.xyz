import React, { FC } from 'react'

import { CollectionSet, Network } from '../../common/types'
import { map } from 'ramda'

interface CollectionSetsProps {
  collectionSets: CollectionSet[]
  network: Network
}

export const CollectionSets: FC<CollectionSetsProps> = ({ collectionSets, network }) => (
  <div className="w-full text-black mx-auto p-8 max-w-screen-2xl">
    <ul>
      {map((collectionSet: CollectionSet) => (
        <li className="p-4">
          <h1>
            <a href={`/${network}/collection-set/${collectionSet.id}`}>{collectionSet.name} &rarr;</a>
          </h1>
        </li>
      ))(collectionSets)}
    </ul>
  </div>
)
