import React, { FC } from 'react'

import { CollectionSet, Network } from '../../common/types'
import { map } from 'ramda'

interface CollectionSetsProps {
  collectionSets: CollectionSet[]
  onSelect: (collectionSetId: string) => void
}

export const CollectionSets: FC<CollectionSetsProps> = ({ collectionSets, onSelect }) => (
  <div className="w-full text-black mx-auto p-8 max-w-screen-2xl">
    <ul>
      {map((collectionSet: CollectionSet) => (
        <li className="p-4">
          <button onClick={() => onSelect(collectionSet.id)}>{collectionSet.name} &rarr;</button>
        </li>
      ))(collectionSets)}
    </ul>
  </div>
)
