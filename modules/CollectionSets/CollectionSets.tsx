import React, { FC } from 'react'

import { CollectionSet } from '../../common/types'
import { useAppSelector } from '../../common/redux/store'
import { selectedNetwork } from '../NetworkSelector'
import { map } from 'ramda'

interface CollectionSetsProps {
  collectionSets: CollectionSet[]
}

export const CollectionSets: FC<CollectionSetsProps> = ({ collectionSets }) => (
  <div className="w-full text-black mx-auto p-8 max-w-screen-2xl">
    <ul>
      {map((collectionSet: CollectionSet) => (
        <li className="p-4">
          <h1>
            <a href={`/collection-set/${collectionSet.id}`}>{collectionSet.name} &rarr;</a>
          </h1>
        </li>
      ))(collectionSets)}
    </ul>
  </div>
)
