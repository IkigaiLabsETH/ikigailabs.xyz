import Head from 'next/head'
import React, { FC } from 'react'
import { EditionDrop } from '../../modules/EditionDrop'
import { Layout, Network } from '../../common/types'
import { withLayout } from '../../common/layouts'
import { Footer } from '../../modules/Footer'
import { customChains } from '../../common/constants/constants'
import { Drop } from '../../modules/Drop'

const Bera: FC = () => {
  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography | About</title>
        <meta name="description" content="Shaped by Photography | About" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
        {/* <EditionDrop
          contractAddress={process.env.NEXT_PUBLIC_BERA_CONTRACT_ADDRESS}
          tokenId={process.env.NEXT_PUBLIC_BERA_TOKEN_ID}
          network={Network.BERA}
          chain={customChains[Network.BERA]}
        /> */}
        <Drop
          contractAddress={process.env.NEXT_PUBLIC_BERA_CONTRACT_ADDRESS}
          tokenId={process.env.NEXT_PUBLIC_BERA_TOKEN_ID}
          network={Network.BERA}
        />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(Bera)
