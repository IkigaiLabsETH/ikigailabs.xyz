/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Footer } from '../../../modules/Footer'
import { withLayout } from '../../../common/layouts/MainLayout/withLayout'
import { CollectionSet, Layout, Network } from '../../../common/types'
import { COLLECTIONS } from '../../../common/config'
import { Collections } from '../../../modules/Collections'
import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { collectionsApi, selectCollectionsBySetId } from '../../../modules/Collections/collections.api'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { Selector } from '../../../modules/Form/Selector'
import { NetworkSelector } from '../../../modules/NetworkSelector/NetworkSelector'
import { useInfiniteLoading } from '../../../common/useInfiniteLoading'

const SignatureCollection: FC = () => {
  const { query } = useRouter()
  const { network } = query
  const dispatch = useAppDispatch()

  const [collectionSets, setCollectionSets] = useState<CollectionSet[]>([])
  const [collectionSet, setCollectionSet] = useState<CollectionSet>({} as CollectionSet)

  const { data, status } = useAppSelector(
    selectCollectionsBySetId({ collectionSetId: collectionSet.id, network: network as Network }),
  )

  useEffect(() => {
    network && setCollectionSets(COLLECTIONS[network as string])
  }, [network])

  useEffect(() => {
    if (network) {
      return setCollectionSet(COLLECTIONS[network as string][0])
    }
  }, [network])

  useEffect(() => {
    if (collectionSet) {
      dispatch(
        collectionsApi.endpoints.getCollectionsBySetId.initiate({
          collectionSetId: collectionSet.id,
          network: network as Network,
        }),
      )
    }
  }, [collectionSet, dispatch, network])

  const { ref: collectionsRef } = useInfiniteLoading(collectionsApi.endpoints.getCollectionsBySetId.initiate, {
    collectionSetId: collectionSet.id,
    continuation: data?.continuation,
    network,
  })

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
          <span className="mr-4">on</span> <NetworkSelector />
        </div>
      </div>
      <main className="w-full bg-white">
        {collectionSets?.length ? (
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <Selector
              options={collectionSets}
              onChange={value => setCollectionSet(value as CollectionSet)}
              selected={collectionSet}
              type="ghost"
              title="Collection:"
            />
          </div>
        ) : (
          <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
            <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">No collection sets found</div>
          </div>
        )}

        <Collections
          collections={data?.collections ? data.collections : []}
          isLoading={status === QueryStatus.pending}
          network={network as Network}
        />
        <div ref={collectionsRef} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(SignatureCollection)
