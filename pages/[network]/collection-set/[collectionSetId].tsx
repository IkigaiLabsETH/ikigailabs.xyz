/* eslint-disable react/function-component-definition */
import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

import { Footer } from '../../../modules/Footer'
import { withLayout } from '../../../common/layouts/MainLayout/withLayout'
import { Layout, Network } from '../../../common/types'
import { collectionsApi, selectCollectionsBySetId } from '../../../modules/Collections/collections.api'
import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { Collections } from '../../../modules/Collections'
import { useInfiniteLoading } from '../../../common/useInfiniteLoading'

const CollectionsPage: FC = () => {
  const { query } = useRouter()
  const { collectionSetId, network } = query as { collectionSetId: string; network: Network }

  const dispatch = useAppDispatch()
  const { data, status } = useAppSelector(selectCollectionsBySetId({ collectionSetId, network }))

  useEffect(() => {
    if (collectionSetId) {
      dispatch(collectionsApi.endpoints.getCollectionsBySetId.initiate({ collectionSetId, network }))
    }
  }, [collectionSetId, dispatch, network])

  const { ref } = useInfiniteLoading(collectionsApi.endpoints.getCollectionsBySetId.initiate, {
    collectionSetId,
    continuation: data?.continuation,
  })

  return (
    <div className="flex items-center flex-col ">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Live the life - Collections" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <h1 className="text-yellow text-8xl text-left p-8 w-full pt-32 max-w-screen-2xl">Collections</h1>
      <main className="w-full bg-white ">
        <Collections collections={data?.collections} isLoading={status === QueryStatus.pending} network={network} />
        <div ref={ref} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(CollectionsPage as any)
