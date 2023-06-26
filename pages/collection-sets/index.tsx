/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'

import { Footer } from '../../modules/Footer'
import { withLayout } from '../../common/layouts/MainLayout/withLayout'
import { CollectionSet, Layout } from '../../common/types'
import { useAppSelector } from '../../common/redux/store'
import { selectedNetwork } from '../../modules/NetworkSelector'
import { CollectionSets } from '../../modules/CollectionSets'
import { COLLECTIONS } from '../../common/config'

const SignatureCollection: FC = () => {
  const network = useAppSelector(selectedNetwork)
  const [collectionSets, setCollectionSets] = useState<CollectionSet[]>([])

  useEffect(() => {
    setCollectionSets(COLLECTIONS[network])
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
