import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import debounce from 'lodash.debounce'
import { assocPath, equals, findIndex, map, mergeRight, path, propEq, propOr, prop, subtract } from 'ramda'
import React, { FC, MouseEvent, useCallback, useEffect, useState } from 'react'
import { useAddress } from '@thirdweb-dev/react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { fetchCollection, claimNFT, fetchCollectionOwnedTokenIds } from './collection.slice'
import { ClaimCondition, Facet } from '../../common/types'
import { Loader } from '../Loader'
import { Eyebrow } from '../Eyebrow'
import { Button } from '../Button'
import { Activity } from '../Activity'
import { NFTGrid } from '../NFTGrid'
import { Facets } from '../Facets'
import { formatAttributes, toggleListItem } from '../../common/utils/utils'
import {
  selectCollectionStats,
  selectNFTS,
  selectNftClaimConditions,
  selectCollection,
  selectCollectionAttributes,
  selectOwnedTokens,
  selectCollectionActivity,
} from './collection.selectors'
import { selectOwnedTokenIds } from '../NFTDrop/NFTDrop.slice'
import { collectionApi, useGetCollectionTokensByContractWithAttributesQuery } from './collection.api'

interface CollectionProps {
  contract: string
}

enum Tab {
  collection,
  activity,
}

export const Collection: FC<CollectionProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const address = useAddress()
  const [activeTab, setActiveTab] = useState<Tab>(Tab.collection)
  const [facets, setFacets] = useState<Facet[]>([])
  
  const { data: collectionStats, status: collectionStatsStatus } = useAppSelector(selectCollectionStats(contract))
  const { data: claimConditions, status: claimConditionsStatus } = useAppSelector(selectNftClaimConditions)
  const { data: collection, status: collectionStatus } = useAppSelector(selectCollection)
  const { data: nfts, status: nftsStatus } = useAppSelector(selectNFTS({ contract, attributes: formatAttributes(facets) }))
  const { data: activity, status: activityStatus } = useAppSelector(selectCollectionActivity(contract))
  const { data: attributes, status: attributesStatus } = useAppSelector(selectCollectionAttributes(contract))
  const { data: ownedTokens, status: ownedTokenStatus } = useAppSelector(selectOwnedTokens)
  const { data: claimNFTData, status: claimNFTStatus } = useAppSelector(selectCollection)

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
      dispatch(collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({contract, attributes: formatAttributes(facets)}))
    }, 1500), [facets]
  )

  useEffect(loadFacets, [facets])  

  useEffect(() => {
    contract && dispatch(fetchCollection({ contract }))
  }, [contract])

  useEffect(() => {
    address && dispatch(fetchCollectionOwnedTokenIds({ contract, wallet: address }))
  }, [contract, address])

  const claim = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    dispatch(claimNFT({ contract, quantity: 1, address }))
  }

  const conditions = () =>
    map((claimCondition: ClaimCondition) => (
      <ul className="grid grid-cols-4 gap-4 w-full" key={claimCondition.startTime as unknown as string}>
        <div>
          <h4 className="text-xs uppercase tracking-widest m-0 grey">Max Quantity:</h4>
          <span className="font-bold text-2xl tracking-tight">{claimCondition.maxQuantity}</span>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest m-0 grey">Max per transaction:</h4>
          <span className="font-bold text-2xl tracking-tight">{claimCondition.quantityLimitPerTransaction}</span>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest m-0 grey">Available Supply:</h4>
          <span className="font-bold text-2xl tracking-tight">{claimCondition.availableSupply}</span>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest m-0 grey">Current mint supply:</h4>
          <span className="font-bold text-2xl tracking-tight">{claimCondition.currentMintSupply}</span>
        </div>
      </ul>
    ))(claimConditions as any)

  const dropMetadataDisplay = () => (
    <>
      <div className="flex relative flex-col lg:flex-row-reverse w-screen lg:h-screen items-center lg:min-h-[55rem]">
        <div
          className="w-full lg:w-1/2 h-96 lg:h-screen lg:min-h-[55rem] bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${propOr('', 'image')(collection)})` }}
        ></div>
        <div className="w-full lg:w-1/2 p-16 max-w-3xl">
          <Eyebrow>Signature</Eyebrow>
          <h2 className="text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska">
            {propOr('', 'name')(collection)}
          </h2>
          <p className="my-8 satoshi text-xl leading-relaxed">{propOr('', 'description')(collection)}</p>
          <div className="flex border-y border-y-gray-700 py-8 mt-6">
            <div className="grid grid-cols-4 gap-4 w-full">
              <div>
                <h4 className="text-xs uppercase tracking-widest m-0 grey">Total Supply:</h4>
                <span className="font-bold text-2xl tracking-tight">{propOr('', 'supply')(collectionStats)}</span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest m-0 grey">Claimed:</h4>
                <span className="font-bold text-2xl tracking-tight">
                  {propOr('', 'claimed')(collectionStats)}
                </span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest m-0 grey">Unclaimed:</h4>
                <span className="font-bold text-2xl tracking-tight">
                  {subtract(collectionStats.supply, collectionStats.claimed)}
                </span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest m-0 grey grey">Owned:</h4>
                <span className="font-bold text-2xl tracking-tight">
                  {match(ownedTokenStatus)
                    .with('loading', () => <Loader color="white" />)
                    .with('succeeded', () => <>{propOr(0, 'length')(ownedTokens)}</>)
                    .with('idle', () => 'Not connected')
                    .otherwise(() => (
                      <></>
                    ))}
                </span>
              </div>
            </div>
          </div>
          <div className="my-8">
            {match(claimConditionsStatus)
              .with('loading', () => <Loader color="white" />)
              .with('succeeded', conditions)
              .otherwise(() => (
                <></>
              ))}
          </div>
          <div className="flex">
            {match(claimConditions)
              .with('loading', () => <Loader color="white" />)
              .with('succeeded', () =>
                match(claimNFTStatus)
                  .with('loading', () => <Loader color="white" />)
                  .with('succeeded', () => <div>Congrats</div>)
                  .with('failed', () => <div>Something went wrong</div>)
                  .otherwise(() => (
                    <Button label={`Buy for ${claimConditions[0].currencyMetadata.displayValue} eth`} onClick={claim} />
                  )),
              )
              .otherwise(() => (
                <></>
              ))}
          </div>
        </div>
      </div>
    </>
  )

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
      <div className="flex">
        {match(collectionStatus)
          .with('loading', () => (
            <div className="h-screen flex w-screen justify-center items-center">
              <Loader color="white" />
            </div>
          ))
          .with('succeeded', dropMetadataDisplay)
          .otherwise(() => null)}
      </div>
      <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
        <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select id="tabs" name="tabs" className="block w-full">
              <option>Collection</option>
              <option>Activity</option>
            </select>
          </div>
          <div className="hidden sm:block w-full">
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
