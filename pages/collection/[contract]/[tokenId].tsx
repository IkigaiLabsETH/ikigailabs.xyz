/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Footer } from '../../../modules/Footer'
import { NFT } from '../../../modules/Collection/Token'

const Token: FC = () => {
  const { query } = useRouter()
  const { contract, tokenId } = query

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <main className="w-full">
        <NFT contract={contract as string} tokenId={tokenId as string} />
      </main>
      <Footer />
    </div>
  )
}

export default Token
