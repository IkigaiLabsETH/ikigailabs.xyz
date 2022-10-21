import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { DropActivity } from '../../../modules/DropActivity'
import { Footer } from '../../../modules/Footer'

const Activity:FC = ({}) => {
  const { query } = useRouter()
  const { contract } = query

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <main className="w-full">
        <div className="w-full bg-white flex items-center flex-col">
          <DropActivity contract={contract as string} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Activity
