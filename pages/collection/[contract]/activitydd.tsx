/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Footer } from '../../../modules/Footer'

import { Activity } from '../../../modules/Activity'
import { useAppSelector } from '../../../common/redux/store'
import { selectCollection } from '../../../modules/Collection/activity/collectionActivity.selectors'
import { ActivityType } from '../../../common/types'

const CollectionActivity: FC = () => {
  const { query } = useRouter()
  const { contract } = query

  // const activity = useAppSelector(selectCollection(contract as string))

  const activity = {
    activity: [
      {
        type: ActivityType.mint,
        fromAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        toAddress: '0xc098b2a3aa256d2140208c3de6543aaef5cd3a94',
        price: '0.33',
        amount: 1,
        timestamp: 1666538665,
        txHash: '0xbacde183d066dd2450be5c5b09ab5da5665361d281db3702756196f2f0f56900',
        token: {
          tokenName: 'Token Name',
          tokenId: 'Token Id',
          tokenImage: '',
        },
      },
      {
        type: ActivityType.mint,
        fromAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        toAddress: '0xc098b2a3aa256d2140208c3de6543aaef5cd3a94',
        price: '0.33',
        amount: 1,
        timestamp: 1666538665,
        txHash: '0xbacde183d066dd2450be5c5b09ab5da5665361d281db3702756196f2f0f56900',
        token: {
          tokenName: 'Token Name',
          tokenId: 'Token Id',
          tokenImage: '',
        },
      },
      {
        type: ActivityType.mint,
        fromAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        toAddress: '0xc098b2a3aa256d2140208c3de6543aaef5cd3a94',
        price: '0.33',
        amount: 1,
        timestamp: 1666538665,
        txHash: '0xbacde183d066dd2450be5c5b09ab5da5665361d281db3702756196f2f0f56900',
        token: {
          tokenName: 'Token Name',
          tokenId: 'Token Id',
          tokenImage: '',
        },
      },
    ],
  }

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="The future of Photography" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <main className="w-full bg-white">
        <div className="max-w-screen-2xl p-8">
          <Activity activity={activity.activity} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CollectionActivity
