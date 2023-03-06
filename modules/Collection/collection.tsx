import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import {
  assocPath,
  equals,
  findIndex,
  map,
  mergeRight,
  path,
  pathOr,
  pick,
  pipe,
  pluck,
  project,
  propEq,
  propOr,
  unless,
} from 'ramda'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { fetchCollection } from './collection.api'
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
import { Eth } from '../Eth'

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
  const [facets, setFacets] = useState<any[]>([])

  const { data: collection } = useAppSelector(selectCollection(contract))
  const { data: nfts, status: nftsStatus } = useAppSelector(
    selectNFTS({ contract, attributes: formatAttributes(facets) }),
  )
  console.log(nftsStatus)
  const { data: activity, status: activityStatus } = useAppSelector(selectCollectionActivity(contract))
  const { data: attributes, status: attributesStatus } = useAppSelector(selectCollectionAttributes(contract))

  useEffect(() => {
    console.log('dispatching getCollectionTokensByContractWithAttributes', contract)
    contract &&
      dispatch(
        collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
          contract,
          attributes: '',
        }),
      )
  }, [contract])

  const updateFacets = selection => {
    console.log(selection)
    // return collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
    //   contract,
    //   attributes: formatAttributes(selection),
    // })
  }

  useEffect(() => {
    contract && dispatch(fetchCollection({ contract }))
  }, [contract])

  const nftsDisplay = () => (
    <div className="flex flex-row">
      <div className="w-1/4">
        <Facets facets={attributes.attributes} onUpdateFacets={updateFacets} />
      </div>
      <div className="w-3/4">
        <NFTGrid nfts={nfts.tokens} />
      </div>
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
            <CollectionStat label="Floor Price">
              <Eth amount={pipe(pathOr('—', ['floorAsk', 'price', 'amount', 'decimal']), parseFloat)(collection)} />
            </CollectionStat>
            <CollectionStat label="Top Offer">
              <Eth amount={pipe(pathOr('—', ['topBid', 'price', 'amount', 'decimal']), parseFloat)(collection)} />
            </CollectionStat>
            <CollectionStat label="Volume">
              <Eth amount={pipe(pathOr('—', ['volume', 'allTime']), parseFloat)(collection)} />
            </CollectionStat>
            <CollectionStat label="Supply">{propOr('—', 'tokenCount')(collection)}</CollectionStat>
            <CollectionStat label="Created On">
              {pipe(propOr('—', 'createdAt'), unless(equals('—'), pipe(parseISO, format('yyyy-MM-dd'))))(collection)}
            </CollectionStat>
          </div>
        </div>
      </CollectionHeader>
      <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
        <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">
          <div className="block w-full">
            <nav className="flex space-x-4 font-bold border-b border-b-gray-400 w-full" aria-label="Tabs">
              <button
                onClick={() => setActiveTab(Tab.collection)}
                className={`p-4 border-b-4 border-white hover:border-black hover:text-black transition-all ${
                  activeTab === Tab.collection ? 'text-black' : 'text-gray-400 border-b-white'
                }`}
              >
                Collection
              </button>
              <button
                onClick={() => setActiveTab(Tab.activity)}
                className={`p-4 border-b-4 border-white hover:border-black hover:text-black transition-all ${
                  activeTab === Tab.activity ? 'text-black' : 'text-gray-400 border-b-white'
                }`}
              >
                Activity
              </button>
            </nav>
          </div>
        </div>
        <div className="max-w-screen-2xl w-full m-4 md:px-6 lg:px-8">
          {match(activeTab)
            .with(Tab.collection, () => collectionComponent)
            .with(Tab.activity, () => activityComponent)
            .otherwise(() => null)}
        </div>
      </div>
    </div>
  )
}
