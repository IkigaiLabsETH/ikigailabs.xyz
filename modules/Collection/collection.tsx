import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { equals, isNil, pathOr, pipe, propOr, unless } from 'ramda'
import React, { FC, Fragment, useState } from 'react'
import { match } from 'ts-pattern'
import { format, parseISO } from 'date-fns/fp'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'

import { Loader } from '../Loader'
import { NFTGrid } from '../NFTGrid'
import { Facets } from '../Facets'
import { CollectionHeader } from '../CollectionHeader'
import { CollectionStat } from '../CollectionStat'
import { Eth } from '../Eth'
import { Collection, NFT, Network, Option } from '../../common/types'
import { Selector } from '../Form/Selector'
import { COLLECTION_SORTING_OPTIONS } from '../../common/constants'
import { CollectionActivity } from '../CollectionActivity'
import { FaDiscord, FaGlobe, FaXTwitter, FaFilter } from 'react-icons/fa6'
import { formatAttributes } from '../../common/utils'
import { useInfiniteLoading } from '../../common/useInfiniteLoading'

interface CollectionProps {
  contract: string
  network: Network
  updateSort: (sort: Option) => void
  selectedSort: Option
  attributes?: any
  updateFacets: (selection: any) => void
  selectedAttributes: any
  collection: Collection
  status: QueryStatus
  nfts: { tokens: NFT[]; continuation: string; status: QueryStatus }
  loadMore: any
}

enum Tab {
  collection,
  activity,
}

export const CollectionComponent: FC<CollectionProps> = ({
  contract,
  network,
  updateSort,
  selectedSort,
  attributes,
  updateFacets,
  selectedAttributes,
  collection,
  status,
  nfts,
  loadMore,
}) => {
  const [showFilter, setShowFilter] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>(Tab.collection)

  const { ref } = useInfiniteLoading(loadMore, {
    contract,
    attributes: formatAttributes(selectedAttributes),
    continuation: nfts?.continuation,
    network,
    sortBy: selectedSort.id as string,
  })

  const nftsDisplay = (
    <div className="flex flex-col">
      <div
        className={clsx(
          'w-full flex flex-row mb-6 pr-8',
          attributes?.attributes.length ? 'justify-between' : 'justify-end',
        )}
      >
        {attributes?.attributes.length ? (
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={clsx(
              'bg-white text-black border-black rounded-md p-2 text-sm font-bold ml-8 border-2 w-11 flex justify-center items-center',
            )}
          >
            <FaFilter />
          </button>
        ) : null}
        <Selector options={COLLECTION_SORTING_OPTIONS} onChange={updateSort} selected={selectedSort} />
      </div>
      <div className="flex flex-row">
        <Transition.Root show={showFilter} as={Fragment}>
          <Dialog as="div" className="fixed z-500 h-full" onClose={setShowFilter}>
            <div className="fixed inset-0">
              <div className="absolute">
                <div className="flex max-w-full">
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
                      <div className="bg-white p-6 pt-16 text-black h-screen" style={{ maxHeight: '100vh' }}>
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

        {/* <div className={clsx('hidden ml-8 ', showFilter ? 'lg:block' : 'hidden', attributes?.attributes.length ? 'lg:w-1/6' : 'lg:w-0')}>
          {attributes?.attributes.length ? (
            <Facets facets={attributes?.attributes} onUpdateFacets={updateFacets} selected={selectedAttributes} />
          ) : (
            <></>
          )}
        </div> */}
        <div className={clsx('w-full lg:w-full')}>
          {nfts?.tokens.length ? <NFTGrid nfts={nfts.tokens} network={network} /> : <div>No results found</div>}
          {nfts?.status === 'pending' && (
            <div className="w-full text-center flex items-center justify-center">
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
      {status === QueryStatus.fulfilled && isNil(collection) ? (
        <div className="w-full text-center h-screen flex justify-center items-center">Nothing found</div>
      ) : (
        <>
          <CollectionHeader
            eyebrow="Collection"
            coverImage={propOr('', 'image')(collection)}
            name={propOr('', 'name')(collection)}
            description={propOr('', 'description')(collection)}
          >
            <div className="flex border-y border-y-gray-700 py-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <CollectionStat label="Floor" loading={status === QueryStatus.pending}>
                  <Eth amount={pipe(pathOr('—', ['floorAsk', 'price', 'amount', 'decimal']), parseFloat)(collection)} />
                </CollectionStat>
                <CollectionStat label="Items" loading={status === QueryStatus.pending}>
                  {propOr('—', 'tokenCount')(collection)}
                </CollectionStat>
                <CollectionStat label="Owners" loading={status === QueryStatus.pending}>
                  {propOr('—', 'ownerCount')(collection)}
                </CollectionStat>
                <CollectionStat label="Top Bid" loading={status === QueryStatus.pending}>
                  <Eth amount={pathOr('—', ['topBid', 'price', 'amount', 'decimal'])(collection)} />
                </CollectionStat>
                {/* <CollectionStat label="% Listed" loading={status === QueryStatus.pending}>
                  {pipe(divide((propOr(0, 'onSaleCount')(collection) as number)), multiply(100), formatNumber)(propOr(1, 'tokenCount')(collection) as number) }
                </CollectionStat> */}
                <CollectionStat label="Volume" loading={status === QueryStatus.pending}>
                  <Eth amount={Math.trunc(pathOr(0, ['volume', 'allTime'])(collection))} />
                </CollectionStat>
                <CollectionStat label="Created On" loading={status === QueryStatus.pending}>
                  {pipe(
                    propOr('—', 'createdAt'),
                    unless(equals('—'), pipe(parseISO, format('yyyy-MM-dd'))),
                  )(collection)}
                </CollectionStat>
              </div>
            </div>
            <div className="flex flex-row mt-3">
              {collection?.twitterUsername ? (
                <div className="w-9 h-9 text-white">
                  <a
                    href={`https://x.com/${collection?.twitterUsername}`}
                    title={`${collection?.name} on X`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-yellow"
                  >
                    <FaXTwitter />
                  </a>
                </div>
              ) : null}
              {collection?.discordUrl ? (
                <div className="w-9 h-9 text-white">
                  <a
                    href={collection?.discordUrl}
                    title={`${collection?.name} on X`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-yellow"
                  >
                    <FaDiscord />
                  </a>
                </div>
              ) : null}
              {collection?.externalUrl ? (
                <div className="w-9 h-9 text-white">
                  <a
                    href={collection?.externalUrl}
                    title={`${collection?.name} on X`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-yellow"
                  >
                    <FaGlobe />
                  </a>
                </div>
              ) : null}
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
      )}
    </div>
  )
}
