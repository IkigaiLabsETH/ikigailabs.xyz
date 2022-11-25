/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { Footer } from '../../../modules/Footer'
import { Token as CollectionToken } from '../../../modules/Collection/Token'
import { useAppDispatch } from '../../../common/redux/store'
import { fetchCollectionToken } from '../../../modules/Collection/Token/token.actions'

const Token: FC = () => {
  const dispatch = useAppDispatch()
  const { query } = useRouter()
  const { contract, tokenId } = query

  useEffect(() => {
    if (contract && tokenId) {
      dispatch(fetchCollectionToken({ contract: contract as string, tokenId: tokenId as string }))
    }
  })

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <main className="w-full">
        <CollectionToken contract={contract as string} tokenId={tokenId as string} />
      </main>
      <Footer />
    </div>
  )
}

export default Token
