/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { Footer } from '../../../modules/Footer'
import { Collection } from '../../../modules/Collection'
import { withLayout } from '../../../common/layouts/MainLayout/withLayout'
import { Layout, Network } from '../../../common/types'

const SignatureCollection: FC = () => {
  const {
    query: { contract, network },
  } = useRouter()

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
        <Collection contract={contract as string} network={network as Network} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(SignatureCollection)
