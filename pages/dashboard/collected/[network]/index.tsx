import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import { isEmpty, isNil } from 'ramda'
import { useAddress } from '@thirdweb-dev/react'

import { useAppDispatch, useAppSelector } from '../../../../common/redux/store'
import { userApi, selectCollectedTokens } from '../../../../modules/User'
import { Layout, Network } from '../../../../common/types'
import { withLayout } from '../../../../common/layouts/MainLayout/withLayout'
import { NFTGrid } from '../../../../modules/NFTGrid'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { Loader } from '../../../../modules/Loader'
import { useInfiniteLoading } from '../../../../common/useInfiniteLoading'
import { Footer } from '../../../../modules/Footer'
import { DashboardNav } from '../../../../modules/DashboardNav'
import { NetworkNav } from '../../../../modules/NetworkNav'

export const Collected: FC = ({}) => {
  const {
    query: { network },
  } = useRouter()
  const dispatch = useAppDispatch()
  const address = useAddress()

  const { data: ownedTokens, status: ownedStatus } = useAppSelector(
    selectCollectedTokens({ address: address as string, network: network as Network }),
  )

  const { ref: nftRef } = useInfiniteLoading(userApi.endpoints.getOwnedTokens.initiate, {
    address: address as string,
    continuation: ownedTokens?.continuation,
    network,
  })

  useEffect(() => {
    if (!address || !network) return
    dispatch(userApi.endpoints.getOwnedTokens.initiate({ address: address as string, network: network as Network }))
  }, [address, dispatch, network])

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <div className="text-yellow text-left w-full pt-32 max-w-screen-2xl pl-8 pb-8">
        <h1 className="text-8xl pb-0">Collected</h1>
        <h2 className="">
          on <span className="capitalize">{network}</span>
        </h2>
      </div>
      <main className="w-full">
        <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
          <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">
            <div className="block w-full">
              <DashboardNav network={network as Network} currentTab="collected" />
            </div>
          </div>
          <div className="max-w-screen-2xl w-full m-4">
            <div className="flex flex-row">
              <div className="w-1/6">
                <div className="ml-8">
                  <NetworkNav network={network as Network} tab="collected" />
                </div>
              </div>
              <div className="w-5/6">
                {!isNil(ownedTokens?.tokens) && !isEmpty(ownedTokens?.tokens) && (
                  <NFTGrid nfts={ownedTokens?.tokens} network={network as Network} />
                )}
                {ownedStatus !== QueryStatus.pending && isEmpty(ownedTokens?.tokens) && (
                  <div className="w-full text-center">No tokens found</div>
                )}
                {ownedStatus === QueryStatus.pending && (
                  <div className="w-full text-center">
                    <Loader />
                  </div>
                )}
                {!address && <div className="w-full text-center">Not Connected</div>}
                <div ref={nftRef} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(Collected as any)
