import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import Head from 'next/head'

import { useAppDispatch, useAppSelector } from '../../../../../common/redux/store'
import { Layout, Network } from '../../../../../common/types'
import { withLayout } from '../../../../../common/layouts'
import { Footer } from '../../../../../modules/Footer'
import { DashboardNav } from '../../../../../modules/DashboardNav'
import { NetworkNav } from '../../../../../modules/NetworkNav'
import { lookupAddress, selectENSByAddress } from '../../../../../common/ens'
import { truncateAddress } from '../../../../../common/utils'
import { UserActivity } from '../../../../../modules/UserActivity'
import { useValidAddress } from '../../../../../common/useValidAddress'
import { useValidNetwork } from '../../../../../common/useValidNetwork'
import { InvalidAddress } from '../../../../../modules/InvalidAddress'
import { InvalidNetwork } from '../../../../../modules/InvalidNetwork'

export const ActivityDashboard: FC = ({}) => {
  const {
    query: { network, address },
  } = useRouter()
  const dispatch = useAppDispatch()
  const { data: ens, status: ensStatus } = useAppSelector(selectENSByAddress({ address: address as string }))
  const isValidAddress = useValidAddress(address as string)
  const isValidNetwork = useValidNetwork(network as Network)

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
    return <UserActivity />
  }

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Shaped by Photography" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <div className="text-yellow text-left w-full pt-32 max-w-screen-2xl pl-8 pb-8">
        <h1 className="font-normal">{ens?.name ? ens?.name : truncateAddress(address)}</h1>
        <h3 className="text-4xl pb-0 mb-0">Activity</h3>
        <h2 className="">
          on <span className="capitalize">{network}</span>
        </h2>
      </div>
      <main className="w-full">
        <div className="bg-white w-full flex py-4 justify-center items-center text-black flex-col">
          <div className="max-w-screen-2xl w-full m-4 flex md:px-6 lg:px-8">
            <div className="block w-full">
              <DashboardNav network={network as Network} currentTab="activity" address={address as string} />
            </div>
          </div>
          <div className="max-w-screen-2xl w-full m-4">
            <div className="flex flex-row">
              <div className="w-1/6">
                <div className="ml-8">
                  <NetworkNav network={network as Network} tab="activity" address={address as string} />
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
