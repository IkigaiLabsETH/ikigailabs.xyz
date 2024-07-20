/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { QueryStatus } from '@reduxjs/toolkit/query'

import { Footer } from '../../../modules/Footer'
import {
  Collection,
  collectionApi,
  fetchCollection,
  selectCollection,
  selectCollectionAttributes,
  selectNFTS,
} from '../../../modules/Collection'
import { withLayout } from '../../../common/layouts'
import { Layout, Network, Option } from '../../../common/types'
import { COLLECTION_SORTING_OPTIONS, SITE_TITLE, SITE_URL } from '../../../common/constants'
import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { formatAttributes } from '../../../common/utils'

const Contract: InferGetServerSidePropsType<typeof getServerSideProps> = ({ name, description, image }) => {
  const {
    query: { contract, network },
    asPath,
  } = useRouter()

  const siteTitle = `${SITE_TITLE} | Collection ${name || contract}`
  const url = `${SITE_URL}${asPath}`

  const dispatch = useAppDispatch()
  const [selectedAttributes, setSelectedAttributes] = useState<any>([])
  const [selectedSort, setSelectedSort] = useState<Option>(COLLECTION_SORTING_OPTIONS[0])
  const [nfts, setNfts] = useState({ tokens: [], continuation: '', status: QueryStatus.uninitialized })

  const { data: nftData, status } = useAppSelector(
    selectNFTS({
      contract: contract as string,
      attributes: formatAttributes(selectedAttributes),
      continuation: '',
      network: network as Network,
      sortBy: selectedSort.id as string,
    }),
  )

  const { data: collection, status: collectionDataStatus } = useAppSelector(
    selectCollection({ contract: contract as string, network: network as Network }),
  )
  const { data: attributes } = useAppSelector(
    selectCollectionAttributes({ contract: contract as string, network: network as Network }),
  )

  useEffect(() => {
    nftData && setNfts({ tokens: nftData.tokens, continuation: nftData.continuation, status })
  }, [nftData, setNfts, status])

  const updateFacets = selection => {
    setSelectedAttributes(selection)
    return dispatch(
      collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
        contract: contract as string,
        attributes: formatAttributes(selection),
        continuation: nfts?.continuation || '',
        network: network as Network,
        sortBy: selectedSort.id as string,
      }),
    )
  }

  const loadMore = collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate

  useEffect(() => {
    contract && dispatch(fetchCollection({ contract: contract as string, network: network as Network }))
  }, [contract, network, dispatch])

  const updateSort = selection => {
    setSelectedSort(selection)
    return dispatch(
      collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
        contract: contract as string,
        attributes: formatAttributes(selectedAttributes),
        continuation: nfts?.continuation || '',
        network: network as Network,
        sortBy: selection.id as string,
      }),
    )
  }

  useEffect(() => {
    dispatch(
      collectionApi.endpoints.getCollectionTokensByContractWithAttributes.initiate({
        contract: contract as string,
        attributes: formatAttributes(selectedAttributes),
        continuation: '',
        network: network as Network,
        sortBy: selectedSort.id as string,
      }),
    )
  }, [])

  return (
    <div className="flex items-center flex-col bg-gradient">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={image} />

        <meta name="title" content={siteTitle} />
        <meta name="description" content={description} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content={image} />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Head>
      <main className="w-full">
        <Collection
          contract={contract as string}
          network={network as Network}
          updateSort={updateSort}
          selectedSort={selectedSort}
          attributes={attributes}
          updateFacets={updateFacets}
          selectedAttributes={selectedAttributes}
          collection={collection}
          status={collectionDataStatus}
          nfts={nfts}
          loadMore={loadMore}
        />
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const { contract, network } = query
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const currentUrl = `${protocol}://${req.headers.host}`

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  const response = await fetch(
    `${currentUrl}/api/reservoir/${network}/collections/v7?id=${contract}&&includeSalesCount=true&includeMintStages=true&includeSecurityConfigs=true&normalizeRoyalties=false`,
  )
  const result = await response.json()

  return {
    props: result?.collections[0],
  }
}

export default withLayout(Layout.main)(Contract)
