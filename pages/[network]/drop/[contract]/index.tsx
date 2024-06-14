/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { withLayout } from '../../../../common/layouts'
import { Layout, Network } from '../../../../common/types'
import { Drop } from '../../../../modules/Drop'
import { Footer } from '../../../../modules/Footer'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../../../common/constants'

const DropPage: FC = () => {
  const {
    query: { contract, id, network },
    pathname,
  } = useRouter()

  const siteTitle = `${SITE_TITLE} | Drop`
  const url = `${SITE_URL}${pathname}`

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
        <meta property="og:image" content={SITE_LOGO_PATH} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content={SITE_LOGO_PATH} />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />
        <meta property="twitter:image" content={SITE_LOGO_PATH} />
      </Head>
      <main className="w-full">
        <Drop contractAddress={contract as string} tokenId={id as string} network={network as Network} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(DropPage)
