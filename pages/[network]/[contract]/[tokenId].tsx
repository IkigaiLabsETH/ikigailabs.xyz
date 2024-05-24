/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import { Footer } from '../../../modules/Footer'
import { CollectionToken, selectCollectionToken } from '../../../modules/Collection/Token'
import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { fetchCollectionToken } from '../../../modules/Collection/Token/token.actions'
import { Layout, Network } from '../../../common/types'
import { withLayout } from '../../../common/layouts'
import { fetchCollection } from '../../../modules/Collection'
import { selectCollection } from '../../../modules/Collection/collection.selectors'
import { selectENSByAddress } from '../../../common/ens'

const Token: FC = () => {
  const dispatch = useAppDispatch()
  const { query } = useRouter()
  const { contract, tokenId, network } = query

  const { data: token, status: tokenStatus } = useAppSelector(
    selectCollectionToken({ contract: String(contract), tokenId: String(tokenId), network: network as Network }),
  )
  const collectionId = token?.token?.collection?.id
  const { data: collection } = useAppSelector(selectCollection({ contract: collectionId, network: network as Network }))
  const { data: ens } = useAppSelector(selectENSByAddress({ address: token?.token?.owner }))
  useEffect(() => {
    if (contract && tokenId) {
      dispatch(
        fetchCollectionToken({ contract: contract as string, tokenId: tokenId as string, network: network as Network }),
      )
    }
  }, [contract, tokenId, network, dispatch])
  
  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
        {token ? <CollectionToken collection={collection} ens={ens?.displayName} token={token} network={network as Network} /> : null}
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(Token)
