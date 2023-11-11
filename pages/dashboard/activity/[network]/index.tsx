import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import Head from 'next/head'
import { isEmpty, isNil } from 'ramda'
import { useAddress } from '@thirdweb-dev/react'

import { userApi } from '../../../../modules/User'
import { useAppDispatch, useAppSelector } from '../../../../common/redux/store'
import { selectUserActivity } from '../../../../modules/User/user.api'
import { useInfiniteLoading } from '../../../../common/useInfiniteLoading'
import { Loader } from '../../../../modules/Loader'
import { Activity } from '../../../../modules/Activity'
import { Layout, Network } from '../../../../common/types'
import { withLayout } from '../../../../common/layouts/MainLayout/withLayout'
import { Footer } from '../../../../modules/Footer'
import { DashboardNav } from '../../../../modules/DashboardNav'
import { NetworkNav } from '../../../../modules/NetworkNav'

export const ActivityDashboard: FC = ({}) => {
  const {
    query: { network },
  } = useRouter()
  const dispatch = useAppDispatch()
  const address = useAddress()

  const { data: activity, status: activityStatus } = useAppSelector(
    selectUserActivity({ address: address as string, network: network as Network }),
  )

  const { ref: activityRef } = useInfiniteLoading(userApi.endpoints.getUserActivity.initiate, {
    address: address as string,
    continuation: activity?.continuation,
    network,
  })

  useEffect(() => {
    if (!address || !network) return
    dispatch(userApi.endpoints.getUserActivity.initiate({ address: address as string, network: network as Network }))
  }, [dispatch, address, network])

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <div className="text-yellow text-left w-full pt-32 max-w-screen-2xl pl-8 pb-8">
        <h1 className="text-8xl pb-0">Activity</h1>
        <h2 className="">
          on <span className="capitalize">{network}</span>
        </h2>
      </div>
      <main className="w-full">
        <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
          <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">
            <div className="block w-full">
              <DashboardNav network={network as Network} currentTab="activity" />
            </div>
          </div>
          <div className="max-w-screen-2xl w-full m-4">
            <div className="flex flex-row">
              <div className="w-1/6">
                <div className="ml-8">
                  <NetworkNav network={network as Network} tab="activity" />
                </div>
              </div>
              <div className="w-5/6">
                {!isNil(activity?.activities) && !isEmpty(activity?.activities) && (
                  <div className="mr-8">
                    <Activity activity={activity?.activities} showPrice={false} />
                  </div>
                )}
                {activityStatus !== QueryStatus.pending && isEmpty(activity?.activities) && (
                  <div className="w-full text-center">No activity found</div>
                )}
                {activityStatus === QueryStatus.pending && (
                  <div className="w-full text-center">
                    <Loader />
                  </div>
                )}
                {!address && <div className="w-full text-center">Not Connected</div>}
                <div ref={activityRef} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(ActivityDashboard as any)
