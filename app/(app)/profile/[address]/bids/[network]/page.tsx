'use client'

import { useParams } from 'next/navigation'
import { useValidAddress } from '@/common/useValidAddress'
import { useValidNetwork } from '@/common/useValidNetwork'
import { Network } from '@/common/types'
import { InvalidAddress } from '@/components/InvalidAddress'
import { InvalidNetwork } from '@/components/InvalidNetwork'
import { Loader } from '@/components/Loader'
import { UserBids } from '@/components/UserBids'
import { useInfiniteLoading } from '@/hooks/useInfiniteLoading'
import { useAppSelector, useAppDispatch } from '@/store'
import { selectUserBids } from '@/store/user'
import { userApi } from '@/store/user/api'
import { isNil, isEmpty } from 'lodash'

export default function BidsPage() {
  const params = useParams()
  const { address, network } = params
  const dispatch = useAppDispatch()
  const isValidAddress = useValidAddress(address as string)
  const isValidNetwork = useValidNetwork(network as Network)

  const { data, status } = useAppSelector(
    selectUserBids({ address: address as string, network: network as Network })
  )

  const { ref: activityRef } = useInfiniteLoading(userApi.endpoints.getUserBidsMade.initiate, {
    address: address as string,
    continuation: data?.continuation,
    network,
  })

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

  if (!isNil(data?.orders) && !isEmpty(data?.orders)) {
    return (
      <>
        <div className="mr-8">
          <UserBids bids={data?.orders} network={network as Network} />
        </div>
        <div ref={activityRef} />
      </>
    )
  }

  if (status !== 'pending' && isEmpty(data?.orders)) {
    return <div className="w-full text-center">No bids found</div>
  }

  if (status === 'pending') {
    return (
      <div className="w-full text-center">
        <Loader />
      </div>
    )
  }

  return null
} 