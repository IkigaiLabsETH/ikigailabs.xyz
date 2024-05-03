/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { withLayout } from '../../../../../common/layouts'
import { ContractType, Layout, Network } from '../../../../../common/types'
import { EditionDrop } from '../../../../../modules/EditionDrop'
import { Footer } from '../../../../../modules/Footer'
import { CHAINS } from '../../../../../common/constants'

const DropPage: FC = () => {
  const {
    query: { contract, id, network, type },
  } = useRouter()

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
        {contract && id ? (
          <EditionDrop
            contractAddress={contract as string}
            tokenId={id as string}
            network={network as Network}
            type={type as ContractType}
            chain={CHAINS[network as Network]}
          />
        ) : null}
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(DropPage)
