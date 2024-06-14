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
import { selectENSByAddress } from '../../../common/ens'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../../common/constants'

const Token: FC = () => {
  const dispatch = useAppDispatch()
  const { query, asPath } = useRouter()
  const { contract, tokenId, network } = query
  const { data: token, status: tokenStatus } = useAppSelector(
    selectCollectionToken({ contract: String(contract), tokenId: String(tokenId), network: network as Network }),
  )
  const { data: ens } = useAppSelector(selectENSByAddress({ address: token?.token?.owner }))
  useEffect(() => {
    if (contract && tokenId) {
      dispatch(
        fetchCollectionToken({ contract: contract as string, tokenId: tokenId as string, network: network as Network }),
      )
    }
  }, [contract, tokenId, network, dispatch])

  const siteTitle = `${SITE_TITLE} | ${token?.token?.collection.name} - ${token?.token?.name}`
  const url = `${SITE_URL}${asPath}`
  const image = token?.token?.imageSmall

  return (
    <div className="flex items-center flex-col">
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
        <meta property="og:image" content={image} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content={image} />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />
        <meta property="twitter:image" content={image} />
      </Head>
      <main className="w-full">
        {token ? <CollectionToken ens={ens?.displayName} token={token} network={network as Network} /> : null}
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(Token)
