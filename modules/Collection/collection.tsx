import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { equals, isEmpty, isNil, pathOr, pipe, propOr, unless } from 'ramda'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { match } from 'ts-pattern'
import { format, parseISO } from 'date-fns/fp'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { fetchCollection, collectionApi } from './collection.api'
import { Loader, Size } from '../Loader'
import { NFTGrid } from '../NFTGrid'
import { Facets } from '../Facets'
import { formatAttributes } from '../../common/utils'
import {
  selectNFTS,
  selectCollection,
  selectCollectionAttributes,
} from './collection.selectors'
import { CollectionHeader } from '../CollectionHeader'
import { CollectionStat } from '../CollectionStat'
import { Eth } from '../Eth'
import { useInfiniteLoading } from '../../common/useInfiniteLoading'
import { Network, Option } from '../../common/types'
import { Selector } from '../Form/Selector'
import { COLLECTION_SORTING_OPTIONS } from '../../common/constants'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'
import { CollectionActivity } from '../CollectionActivity'

interface CollectionProps {
  contract: string
  network: Network
}

enum Tab {
  collection,
  activity,
}

export const Collection: FC<CollectionProps> = ({ contract, network }) => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<Tab>(Tab.collection)
  const [selectedAttributes, setSelectedAttributes] = useState<any>([])
  const [selectedSort, setSelectedSort] = useState<Option>(COLLECTION_SORTING_OPTIONS[0])
  const [nfts, setNfts] = useState({ tokens: [], continuation: '', status: 'idle' })
  const [showFilter, setShowFilter] = useState(false)
  
  const { data: nftData, status } = useAppSelector(
    selectNFTS({
      contract,
      attributes: formatAttributes(selectedAttributes),
      continuation: '',
      network,
      sortBy: selectedSort.id as string,
    }),
  )

  const { data: collection, status: collectionDataStatus } = useAppSelector(selectCollection({ contract, network }))
  const { data: attributes } = useAppSelector(selectCollectionAttributes({ contract, network }))

  const { ref } = useInfiniteLoading(collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate, {
    contract,
    attributes: formatAttributes(selectedAttributes),
    continuation: nfts?.continuation,
    network,
    sortBy: selectedSort.id as string,
  })

  useEffect(() => {
    nftData && setNfts({ tokens: nftData.tokens, continuation: nftData.continuation, status })
  }, [nftData, setNfts, status])

  const updateFacets = selection => {
    setSelectedAttributes(selection)
    return dispatch(
      collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
        contract,
        attributes: formatAttributes(selection),
        continuation: nfts?.continuation || '',
        network,
        sortBy: selectedSort.id as string,
      }),
    )
  }

  useEffect(() => {
    contract && dispatch(fetchCollection({ contract, network }))
  }, [contract, network, dispatch])

  const updateSort = selection => {
    setSelectedSort(selection)
    return dispatch(
      collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
        contract,
        attributes: formatAttributes(selectedAttributes),
        continuation: nfts?.continuation || '',
        network,
        sortBy: selection.id as string,
      }),
    )
  }

  const nftsDisplay = (
    <div className="flex flex-col">
      <div className="w-full justify-between lg:justify-end flex flex-row mb-6 pr-8">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={clsx(
            'bg-white text-black border border-black rounded-md p-2 text-sm font-bold ml-8 lg:hidden',
            showFilter ? 'bg-black text-white' : '',
          )}
        >
          Filters
        </button>
        <Selector options={COLLECTION_SORTING_OPTIONS} onChange={updateSort} selected={selectedSort} />
      </div>
      <div className="flex flex-row">
        <Transition.Root show={showFilter} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowFilter}>
            <div className="fixed inset-0">
              <div className="absolute inset-0">
                <div className="fixed inset-y-0 right-0 flex max-w-full pr-10 sm:pr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="w-screen max-w-md">
                      <div className="bg-white p-6 pt-16 text-black overflow-scroll" style={{ maxHeight: '100vh' }}>
                        <div className="pb-6 font-bold text-xl w-full flex justify-between">
                          Filters{' '}
                          <div>
                            <button onClick={() => setShowFilter(false)}>&times;</button>
                          </div>
                        </div>
                        <Facets
                          facets={attributes?.attributes}
                          onUpdateFacets={updateFacets}
                          selected={selectedAttributes}
                        />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:block lg:w-1/5">
          {attributes ? (
            <Facets facets={attributes?.attributes} onUpdateFacets={updateFacets} selected={selectedAttributes} />
          ) : (
            <></>
          )}
        </div>
        <div className="w-full lg:w-4/5">
          {nfts?.tokens.length ? <NFTGrid nfts={nfts.tokens} network={network} /> : <div>No results found</div>}
          {nfts?.status === 'pending' && (
            <div className="w-full text-center">
              <Loader />
            </div>
          )}
          <div ref={ref} />
        </div>
      </div>
    </div>
  )

  const activityComponent = (
    <div className="w-full flex justify-center">
      <CollectionActivity contract={contract} network={network} />
    </div>
  )

  return (
    <div className="flex flex-col w-full">
      {collectionDataStatus === QueryStatus.pending && (
        <div className="w-full text-center h-screen flex flex-col items-center justify-center">
          <Loader size={Size.l} color='white'  />
        </div>
      )} 
      {collectionDataStatus === QueryStatus.fulfilled && !isNil(collection) ? (
        <>
          <CollectionHeader
            eyebrow="Collection"
            coverImage={propOr('', 'image')(collection)}
            name={propOr('', 'name')(collection)}
            description={propOr('', 'description')(collection)}
          >
            <div className="flex border-y border-y-gray-700 py-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <CollectionStat label="Floor Price" loading={collectionDataStatus === 'pending'}>
                  <Eth amount={pipe(pathOr('—', ['floorAsk', 'price', 'amount', 'decimal']), parseFloat)(collection)} />
                </CollectionStat>
                <CollectionStat label="Top Bid" loading={collectionDataStatus === 'pending'}>
                  <Eth amount={pipe(pathOr('—', ['topBid', 'price', 'amount', 'decimal']), parseFloat)(collection)} />
                </CollectionStat>
                <CollectionStat label="Volume" loading={collectionDataStatus === 'pending'}>
                  <Eth amount={pipe(pathOr('—', ['volume', 'allTime']), parseFloat)(collection)} />
                </CollectionStat>
                <CollectionStat label="Supply" loading={collectionDataStatus === 'pending'}>
                  {propOr('—', 'tokenCount')(collection)}
                </CollectionStat>
                <CollectionStat label="Created On" loading={collectionDataStatus === 'pending'}>
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
                .with(Tab.collection, () => nftsDisplay)
                .with(Tab.activity, () => activityComponent)
                .otherwise(() => null)}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full text-center h-screen flex flex-col items-center justify-center">
          This collection cannot be found
        </div>
      )}
    </div>
  )
}
