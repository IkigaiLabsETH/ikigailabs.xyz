/* eslint-disable react/function-component-definition */
import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

import { Footer } from '../../../modules/Footer'
import { withLayout } from '../../../common/layouts'
import { Layout, Network } from '../../../common/types'
import { collectionsApi, selectCollectionsBySetId } from '../../../modules/Collections/collections.api'
import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { Collections } from '../../../modules/Collections'
import { useInfiniteLoading } from '../../../common/useInfiniteLoading'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../../common/constants'

const CollectionsPage: FC = () => {
  const { query, pathname } = useRouter()
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

  const siteTitle = `${SITE_TITLE} | Collections`
  const url = `${SITE_URL}${pathname}`

  return (
    <div className="flex items-center flex-col ">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_LOGO_PATH} />

        <meta name="title" content={siteTitle} />
        <meta name="description" content={SITE_DESCRIPTION} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={SITE_LOGO_PATH} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content={SITE_LOGO_PATH} />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />
        <meta property="twitter:image" content={SITE_LOGO_PATH} />
      </Head>
      <h1 className="text-yellow text-6xl lg:text-8xl text-left p-8 w-full pt-32 max-w-screen-2xl">Collections</h1>
      <main className="w-full bg-white ">
        <Collections
          collections={data?.collections}
          isLoading={status === QueryStatus.pending}
          network={network}
          active="list"
        />
        <div ref={ref} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(CollectionsPage as any)
