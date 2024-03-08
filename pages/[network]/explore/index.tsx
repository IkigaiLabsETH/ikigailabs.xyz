/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { append, has, keys, map, pipe } from 'ramda'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

import { Footer } from '../../../modules/Footer'
import { withLayout } from '../../../common/layouts/MainLayout/withLayout'
import { CollectionSet, Layout, Network, Option } from '../../../common/types'
import { Collections } from '../../../modules/Collections'
import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import {
  collectionsApi,
  selectCollectionSets,
  selectCollectionsByCommunity,
  selectCollectionsBySetId,
  selectSupportedNetworkTableIdByNetwork,
  selectSupportedNetworks,
} from '../../../modules/Collections/collections.api'
import { Selector } from '../../../modules/Form/Selector'
import { NetworkSelector } from '../../../modules/NetworkSelector/NetworkSelector'
import { useInfiniteLoading } from '../../../common/useInfiniteLoading'
import { GridListToggle } from '../../../modules/GridListToggle'
import { slugify } from '../../../common/utils'

const SignatureCollection: FC = () => {
  const { query } = useRouter()
  const { network } = query
  const dispatch = useAppDispatch()
  const [active, setActive] = useState<'grid' | 'list'>('grid')

  const [networkOptions, setNetworkOptions] = useState<Option[]>(null)
  const [selectedNetworkOption, setSelectedNetworkOption] = useState<Option>(null)

  const [collectionSets, setCollectionSets] = useState<CollectionSet[]>([])
  const [collectionSet, setCollectionSet] = useState<CollectionSet>({} as CollectionSet)
  const { data: supportedNetworks, status: getSupportedNetworksStatus } = useAppSelector(
    selectSupportedNetworks(undefined),
  )
  const tableId = useAppSelector(selectSupportedNetworkTableIdByNetwork(selectedNetworkOption?.name as Network))
  const { data: managedCollectionSets, status: collectionSetsStatus } = useAppSelector(selectCollectionSets({ tableId }))

  const { data, status } = useAppSelector(
    selectCollectionsBySetId({ collectionSetId: collectionSet?.id, network: network as Network }),
  )

  const { data: communityCollections, status: getCollectionsByCommunityStatus } = useAppSelector(
    selectCollectionsByCommunity({ community: 'artblocks' }),
  )

  useEffect(() => {
    if (getSupportedNetworksStatus === QueryStatus.fulfilled) {
      const networkOptions = pipe(
        keys,
        map((network: string) => ({
          id: slugify(network),
          name: network,
        })),
      )(supportedNetworks)
      setNetworkOptions(networkOptions)
      setSelectedNetworkOption(networkOptions.find(option => option.id === network))
    }
  }, [supportedNetworks, getSupportedNetworksStatus, network])

  useEffect(() => {
    dispatch(collectionsApi.endpoints.getSupportedNetworks.initiate())
  })

  useEffect(() => {
    console.log(tableId)
    if (tableId) {
      dispatch(collectionsApi.endpoints.getCollectionSets.initiate({ tableId }))
    }
  }, [tableId, dispatch])

  useEffect(() => {
    if (collectionSet?.id && collectionSet.id !== 'artblocks') {
      dispatch(
        collectionsApi.endpoints.getCollectionsBySetId.initiate({
          collectionSetId: collectionSet.id,
          network: network as Network,
        }),
      )
    }

    if (collectionSet?.id === 'artblocks') {
      dispatch(
        collectionsApi.endpoints.getCollectionsByCommunity.initiate({
          community: 'artblocks',
        }),
      )
    }
  }, [collectionSet, dispatch, network])

  useEffect(() => {
    if (collectionSets?.length) {
      setCollectionSet(collectionSets[0])
    }
  }, [collectionSets])

  useEffect(() => {
    if (selectedNetworkOption?.id === 'ethereum') {
      const allCollectionSets = append({ name: 'ArtBlocks', id: 'artblocks' })(managedCollectionSets)
      return setCollectionSets(allCollectionSets)
    }

    setCollectionSets(managedCollectionSets)
  }, [managedCollectionSets, network, selectedNetworkOption])

  const getInfiniteLoadingEndpoint = () => {
    if (collectionSet?.id === 'artblocks') {
      return collectionsApi.endpoints.getCollectionsByCommunity.initiate
    }
    return collectionsApi.endpoints.getCollectionsBySetId.initiate
  }

  const getInfiniteLoadingOptions = () => {
    if (collectionSet?.id === 'artblocks') {
      return { community: 'artblocks', continuation: communityCollections?.continuation }
    }
    return {
      collectionSetId: collectionSet?.id,
      continuation: data?.continuation,
      network,
    }
  }

  const { ref: collectionsRef } = useInfiniteLoading(getInfiniteLoadingEndpoint(), getInfiniteLoadingOptions())

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <div className="text-left w-full p-8 pt-32 max-w-screen-2xl">
        <h1 className="text-yellow text-8xl ">Explore</h1>
        <div className="flex items-center">
          <span className="mr-4 text-yellow">on</span>{' '}
          {networkOptions?.length ? (
            <NetworkSelector networks={networkOptions} selected={selectedNetworkOption} />
          ) : null}
        </div>
      </div>
      <main className="w-full bg-white">
        <div className="flex justify-between max-w-screen-2xl mx-auto">
          <div>
            {collectionSets?.length && has('name')(collectionSets[0]) ? (
              <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <Selector
                  options={collectionSets}
                  onChange={value => setCollectionSet(value as CollectionSet)}
                  selected={collectionSet}
                  type="ghost"
                  title="Collection:"
                />
              </div>
            ) : null}
          </div>
          <div className="mt-8">
            <GridListToggle active={active} onToggle={setActive} />
          </div>
        </div>
        {data?.collections.length && (
          <Collections
            collections={collectionSet?.id === 'artblocks' ? communityCollections?.collections : data?.collections ? data.collections : []}
            isLoading={status === QueryStatus.pending || collectionSetsStatus === QueryStatus.pending}
            network={network as Network}
            active={active}
          />
        )}
        <div ref={collectionsRef} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(SignatureCollection)
