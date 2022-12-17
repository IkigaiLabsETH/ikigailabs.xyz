import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import debounce from 'lodash.debounce'
import { assocPath, equals, findIndex, map, mergeRight, path, pathOr, pipe, propEq, propOr, tap, unless } from 'ramda'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { fetchCollection, getCollectionByContract } from './collection.api'
import { Facet } from '../../common/types'
import { Loader } from '../Loader'
import { Activity } from '../Activity'
import { NFTGrid } from '../NFTGrid'
import { Facets } from '../Facets'
import { formatAttributes, toggleListItem } from '../../common/utils/utils'
import {
  selectNFTS,
  selectCollection,
  selectCollectionAttributes,
  selectCollectionActivity,
} from './collection.selectors'

import { collectionApi } from './collection.api'
import { CollectionHeader } from '../CollectionHeader'
import { CollectionStat } from '../CollectionStat'
import { format, parseISO } from 'date-fns/fp'

interface CollectionProps {
  contract: string
}

enum Tab {
  collection,
  activity,
}

export const Collection: FC<CollectionProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<Tab>(Tab.collection)
  const [facets, setFacets] = useState<Facet[]>([])

  const { data: collection, status: collectionStatus } = useAppSelector(selectCollection(contract))
  const { data: nfts, status: nftsStatus } = useAppSelector(
    selectNFTS({ contract, attributes: formatAttributes(facets) }),
  )
  const { data: activity, status: activityStatus } = useAppSelector(selectCollectionActivity(contract))
  const { data: attributes, status: attributesStatus } = useAppSelector(selectCollectionAttributes(contract))

  useEffect(() => {
    if (equals(attributesStatus, 'fulfilled')) {
      setFacets(map(mergeRight({ selected: [] }))(attributes.attributes))
    }
  }, [attributesStatus])

  const updateFacets = (key: string, facet: string) => {
    const index = findIndex(propEq('key', key))(facets)
    const f = assocPath([index, 'selected'], toggleListItem(facet)(path([index, 'selected'])(facets)))(facets)
    return setFacets(f as any)
  }

  const loadFacets = useCallback(
    debounce(() => {
      contract &&
        dispatch(
          collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
            contract,
            attributes: formatAttributes(facets),
          }),
        )
    }, 1500),
    [facets, contract],
  )

  useEffect(loadFacets, [facets, contract])

  useEffect(() => {
    contract && dispatch(fetchCollection({ contract }))
  }, [contract])

  const nftsDisplay = () => (
    <div className="flex flex-col">
      <div className="md:px-6 lg:px-8 mb-8">
        <Facets facets={facets} onClick={updateFacets} />
      </div>
      <NFTGrid nfts={nfts.tokens} />
    </div>
  )

  const collectionComponent = (
    <div>
      {match(nftsStatus)
        .with(QueryStatus.pending, () => <Loader />)
        .with(QueryStatus.fulfilled, nftsDisplay)
        .otherwise(() => null)}
    </div>
  )

  const activityComponent = (
    <div className="w-full flex justify-center">
      {match(activityStatus)
        .with(QueryStatus.pending, () => <Loader />)
        .with(QueryStatus.fulfilled, () => <Activity activity={activity.activities} />)
        .otherwise(() => null)}
    </div>
  )

  return (
    <div className="flex flex-col w-full">
      <CollectionHeader
        eyebrow="Collection"
        coverImage={propOr('', 'image')(collection)}
        name={propOr('', 'name')(collection)}
        description={propOr('', 'description')(collection)}
      >
        <div className="flex border-y border-y-gray-700 py-8 mt-6">
          <div className="grid grid-cols-4 gap-4 w-full">
            <CollectionStat label="Floor Price" value={pathOr('—', ['floorAsk', 'tokenCount'])(collection)} />
            <CollectionStat label="Top Offer" value={pathOr('—', ['topBid', 'price'])(collection)} />
            <CollectionStat label="Volume" value={pathOr('—', ['volume', 'allTime'])(collection)} />
            <CollectionStat label="Supply" value={propOr('—', 'tokenCount')(collection)} />
            <CollectionStat
              label="Created On"
              value={pipe(
                propOr('—', 'createdAt'),
                unless(equals('—'), pipe(parseISO, format('yyyy-MM-dd'))),
              )(collection)}
            />
          </div>
        </div>
      </CollectionHeader>
      <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
        <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">
          <div className="block w-full">
            <nav className="flex space-x-4 font-bold border-b border-b-gray-400 w-full" aria-label="Tabs">
              <button
                onClick={() => setActiveTab(Tab.collection)}
                className={`p-4 border-b-2 transition-colors hover:text-red hover:border-b-red ${
                  activeTab === Tab.collection ? 'text-black border-b-black' : 'text-gray-400 border-b-white'
                }`}
              >
                Collection
              </button>
              <button
                onClick={() => setActiveTab(Tab.activity)}
                className={`p-4 border-b-2 transition-colors hover:text-red hover:border-b-red ${
                  activeTab === Tab.activity ? 'text-black border-b-black' : 'text-gray-400 border-b-white'
                }`}
              >
                Activity
              </button>
            </nav>
          </div>
        </div>
        <div className="max-w-screen-2xl w-full m-4">
          {match(activeTab)
            .with(Tab.collection, () => collectionComponent)
            .with(Tab.activity, () => activityComponent)
            .otherwise(() => null)}
        </div>
      </div>
    </div>
  )
}
