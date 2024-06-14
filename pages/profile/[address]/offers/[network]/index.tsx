import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import Head from 'next/head'
import { isEmpty, isNil } from 'ramda'

import { userApi } from '../../../../../modules/User'
import { useAppDispatch, useAppSelector } from '../../../../../common/redux/store'
import { selectUserBidsReceived } from '../../../../../modules/User/user.api'
import { useInfiniteLoading } from '../../../../../common/useInfiniteLoading'
import { Loader } from '../../../../../modules/Loader'
import { Layout, Network } from '../../../../../common/types'
import { withLayout } from '../../../../../common/layouts'
import { Footer } from '../../../../../modules/Footer'
import { DashboardNav } from '../../../../../modules/DashboardNav'
import { NetworkNav } from '../../../../../modules/NetworkNav'
import { UserBidsReceived } from '../../../../../modules/UserBidsReceived'
import { lookupAddress, selectENSByAddress } from '../../../../../common/ens'
import { truncateAddress } from '../../../../../common/utils'
import { useValidAddress } from '../../../../../common/useValidAddress'
import { useValidNetwork } from '../../../../../common/useValidNetwork'
import { InvalidAddress } from '../../../../../modules/InvalidAddress'
import { InvalidNetwork } from '../../../../../modules/InvalidNetwork'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../../../../common/constants'

export const ActivityDashboard: FC = ({}) => {
  const {
    query: { network, address },
    asPath,
  } = useRouter()
  const dispatch = useAppDispatch()
  const isValidAddress = useValidAddress(address as string)
  const isValidNetwork = useValidNetwork(network as Network)

  const siteTitle = `${SITE_TITLE} | Offers received on ${network} by ${address}`
  const url = `${SITE_URL}${asPath}`

  const { data, status } = useAppSelector(
    selectUserBidsReceived({ address: address as string, network: network as Network }),
  )
  const { data: ens, status: ensStatus } = useAppSelector(selectENSByAddress({ address: address as string }))

  const { ref: activityRef } = useInfiniteLoading(userApi.endpoints.getUserBidsReceived.initiate, {
    address: address as string,
    continuation: data?.continuation,
    network,
  })

  useEffect(() => {
    if (!address || !network) return
    dispatch(
      userApi.endpoints.getUserBidsReceived.initiate({ address: address as string, network: network as Network }),
    )
  }, [dispatch, address, network])

  useEffect(() => {
    if (!ens?.name && ensStatus !== QueryStatus.pending && address) {
      dispatch(lookupAddress.initiate({ address: address as string }))
    }
  }, [ens, address, ensStatus, dispatch])

  const content = () => {
    if (!isValidAddress) {
      return (
        <div className="flex justify-center items-center h-full">
          <InvalidAddress />
        </div>
      )
    }

    if (!isValidNetwork) {
      return (
        <div className="flex justify-center items-center h-full">
          <InvalidNetwork />
        </div>
      )
    }

    if (!isNil(data?.topBids) && !isEmpty(data?.topBids)) {
      return (
        <>
          <div className="mr-8">
            <UserBidsReceived bids={data?.topBids} network={network as Network} owner={address as string} />
          </div>
          <div ref={activityRef} />
        </>
      )
    }

    if (status !== QueryStatus.pending && isEmpty(data?.topBids)) {
      return <div className="w-full text-center">No offers found</div>
    }

    if (status === QueryStatus.pending) {
      return (
        <div className="w-full text-center">
          <Loader />
        </div>
      )
    }
  }

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
      <div className="text-yellow text-left w-full pt-32 max-w-screen-2xl pl-8 pb-8">
        <h1 className="font-normal">{ens?.name ? ens?.name : truncateAddress(address)}</h1>
        <h3 className="text-4xl pb-0 mb-0">Offers received</h3>
        <h2 className="">
          on <span className="capitalize">{network}</span>
        </h2>
      </div>
      <main className="w-full">
        <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
          <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">
            <div className="block w-full">
              <DashboardNav network={network as Network} currentTab="offers" address={address as string} />
            </div>
          </div>
          <div className="max-w-screen-2xl w-full m-4">
            <div className="flex flex-row">
              <div className="w-1/6">
                <div className="ml-8">
                  <NetworkNav network={network as Network} tab="offers" address={address as string} />
                </div>
              </div>
              <div className="w-5/6">{content()}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(ActivityDashboard as any)
