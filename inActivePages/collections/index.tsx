/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC, useEffect } from 'react'

import { Footer } from '../../modules/Footer'
import { withLayout } from '../../common/layouts/MainLayout/withLayout'
import { Layout } from '../../common/types'
import { store } from '../../common/redux/store'
import { collectionsApi } from '../../modules/Collections/collections.api'

const Collections: FC = () => {
  useEffect(() => {
  }, [])
  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="Live the life - Collections" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <main className="w-full">Collections</main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  store.dispatch(collectionsApi.endpoints.getCollectionsSetId.initiate({}))

  return { props: {} }
}

export default withLayout(Layout.main)(Collections)
