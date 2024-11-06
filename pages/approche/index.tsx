import Head from 'next/head'
import React, { FC } from 'react'
import { withLayout } from '../../common/layouts'
import { Footer } from '../../modules/Footer'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../common/constants'
import { Layout, Network } from '../../common/types'
import { useRouter } from 'next/router'

const Approche: FC = () => {
  const { asPath } = useRouter()
  const siteTitle = `${SITE_TITLE} | 'a ppr oc he' X Ikigai Labs Art`
  const siteDescription = 'a ppr oc he X Ikigai Labs Art'
  const url = `${SITE_URL}${asPath}`

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href={SITE_LOGO_PATH} />

        <meta name="title" content={siteTitle} />
        <meta name="description" content={siteDescription} />

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
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={SITE_LOGO_PATH} />
      </Head>
      <main className="w-full">
        <div className="bg-white w-full items-center justify-center flex py-20 px-10">
          <iframe
            src="https://www.spatial.io/s/a-ppr-oc-he-X-ikigai-66cc39a4a90d02467e6dd93a?share=4427510394877420095"
            width="1516px"
            height="720px"
            allow="camera; fullscreen; autoplay; display-capture; microphone; clipboard-write"
          ></iframe>
        </div>
      </main>
    </div>
  )
}

export default withLayout(Layout.main)(Approche)
