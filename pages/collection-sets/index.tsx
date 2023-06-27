/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'

import { Footer } from '../../modules/Footer'
import { withLayout } from '../../common/layouts/MainLayout/withLayout'
import { CollectionSet, Layout } from '../../common/types'
import { CollectionSets } from '../../modules/CollectionSets'
import { COLLECTIONS } from '../../common/config'
import { useRouter } from 'next/router'

const SignatureCollection: FC = () => {
  const [collectionSets, setCollectionSets] = useState<CollectionSet[]>([])
  const { query } = useRouter()
  const { network } = query

  useEffect(() => {
    setCollectionSets(COLLECTIONS[network as string])
  }, [network])

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <h1 className="text-yellow text-8xl text-left p-8 w-full pt-32 max-w-screen-2xl">Collection Sets</h1>
      <main className="w-full bg-white ">
        <CollectionSets collectionSets={collectionSets} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(SignatureCollection)
