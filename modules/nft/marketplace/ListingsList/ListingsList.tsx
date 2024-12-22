import { map, prop } from 'ramda'
import React, { FC, useEffect } from 'react'

import { formatDistance } from 'date-fns'
import { formatAmountWithoutDecimals, getTokenDataFromTokenSetId, truncateAddress } from '../../common/utils'
import { Network, Order } from '../../common/types'
import { Button } from '../Button'
import { Eth } from '../Eth'
import { isMaker } from '../../common/utils'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { useWallet } from '../../common/useWallet'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { selectTokenListings } from '../Collection/Token/token.selectors'
import { collectionTokenApi } from '../Collection/Token/token.api'
import { buyToken } from '../Collection'
import { cancelOrder } from '../Collection/Token/token.slice'
import { SkeletonLoader } from '../SkeletonLoader'
import { useInfiniteLoading } from '../../common/useInfiniteLoading'

interface ListingsListProps {
  contract: string
  tokenId: string
  network: Network
}

export const ListingsList: FC<ListingsListProps> = ({ contract, tokenId, network }) => {
  const { address } = useWallet()
  const { data: tokenListings, status: tokenListingsStatus } = useAppSelector(
    selectTokenListings({ contract, tokenId, network }),
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (tokenListingsStatus === QueryStatus.uninitialized) {
      dispatch(collectionTokenApi.endpoints.getTokenListings.initiate({ contract, tokenId, network }))
    }
  }, [contract, tokenId, network, dispatch, tokenListingsStatus])

  const onBuyListing = (tokenSetId: string) => {
    const [contract, tokenId] = getTokenDataFromTokenSetId(tokenSetId)
    dispatch(buyToken({ contract, tokenId, address, network: network as Network }))
  }

  const onCancelOrder = (id: string) => {
    dispatch(cancelOrder({ id, address, network: network as Network }))
  }

  const { ref } = useInfiniteLoading(collectionTokenApi.endpoints.getTokenListings.initiate, {
    contract,
    tokenId,
    network,
    continuation: tokenListings?.continuation,
  })

  const loader = (
    <div className="">
      <SkeletonLoader style="light" height="h-9" />
      <SkeletonLoader style="light" height="h-9" />
      <SkeletonLoader style="light" height="h-9" />
    </div>
  )

  return (
    <div className="flex flex-col w-full">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden ring-black ring-opacity-5">
          <ul>
            {tokenListings &&
              map((order: Order) => (
                <li className="flex flex-row border-b border-gray-400 py-2" key={order.id}>
                  <div className="flex flex-col w-2/3">
                    <div className="text-xs text-gray-500">
                      {formatDistance(new Date(order.createdAt), new Date())} ago
                    </div>
                    <div className="flex flex-row items-center my-1">
                      <span className="text-2xl font-bold">
                        <Eth amount={order.price.amount.decimal} />
                      </span>{' '}
                      <span className="text-xs text-slate-800 rounded bg-slate-100 p-0.5 ml-1">
                        $ {formatAmountWithoutDecimals(order.price.amount.usd)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">by {truncateAddress(order.maker)}</div>
                  </div>
                  <div className="w-1/3">
                    {isMaker(address)(order) ? (
                      <Button
                        loading={tokenListingsStatus === QueryStatus.pending}
                        className="w-full"
                        onClick={() => onCancelOrder(prop('id')(order))}
                      >
                        Cancel Listing
                      </Button>
                    ) : (
                      <Button
                        loading={tokenListingsStatus === QueryStatus.pending}
                        className="w-full"
                        onClick={() => onBuyListing(order.tokenSetId)}
                      >
                        Buy
                      </Button>
                    )}
                  </div>
                </li>
              ))(tokenListings.orders)}
          </ul>
          {tokenListingsStatus === QueryStatus.pending ? loader : null}
          <div ref={ref} />
        </div>
      </div>
    </div>
  )
}
