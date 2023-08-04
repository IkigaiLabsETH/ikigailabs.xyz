/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Footer } from '../../../modules/Footer'
import { withLayout } from '../../../common/layouts/MainLayout/withLayout'
import { CollectionSet, Layout, Network } from '../../../common/types'
import { CollectionSets } from '../../../modules/CollectionSets'
import { COLLECTIONS } from '../../../common/config'

const SignatureCollection: FC = () => {
  const [collectionSets, setCollectionSets] = useState<CollectionSet[]>([])
  const { query } = useRouter()
  const { network } = query

  useEffect(() => {
    network && setCollectionSets(COLLECTIONS[network as string])
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
        {collectionSets?.length ? (
          <CollectionSets collectionSets={collectionSets} network={network as Network} />
        ) : (
          <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
            <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">No collection sets found</div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(SignatureCollection)
