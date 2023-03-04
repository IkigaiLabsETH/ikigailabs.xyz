/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { withLayout } from '../../common/layouts/MainLayout/withLayout'
import { Layout } from '../../common/types'
import { Drop } from '../../modules/Drop'
import { Footer } from '../../modules/Footer'

const DropPage: FC = () => {
  const {
    query: { contract },
  } = useRouter()

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <main className="w-full">
        <Drop contract={contract as string} />
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(DropPage)
