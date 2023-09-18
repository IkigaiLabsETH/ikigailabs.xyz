/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import { Footer } from '../../../modules/Footer'
import { Token as CollectionToken } from '../../../modules/Collection/Token'
import { useAppDispatch } from '../../../common/redux/store'
import { fetchCollectionToken } from '../../../modules/Collection/Token/token.actions'
import { Layout, Network } from '../../../common/types'
import { withLayout } from '../../../common/layouts/MainLayout/withLayout'

const Token: FC = () => {
  const dispatch = useAppDispatch()
  const { query } = useRouter()
  const { contract, tokenId, network } = query

  useEffect(() => {
    if (contract && tokenId) {
      dispatch(
        fetchCollectionToken({ contract: contract as string, tokenId: tokenId as string, network: network as Network }),
      )
    }
  })

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
        <CollectionToken contract={contract as string} tokenId={tokenId as string} network={network as Network} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(Token)
