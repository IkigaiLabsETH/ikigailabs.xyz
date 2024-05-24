import { map, prop } from 'ramda'
import React, { FC, useEffect } from 'react'

import { formatDistance } from 'date-fns'
import { formatAmountWithoutDecimals, getTokenDataFromTokenSetId, isMaker, truncateAddress } from '../../common/utils'
import { Network, Order } from '../../common/types'
import { Button } from '../Button'
import { Eth } from '../Eth'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { useWallet } from '../../common/useWallet'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { selectTokenOffers } from '../Collection/Token/token.selectors'
import { collectionTokenApi } from '../Collection/Token/token.api'
import { acceptOffer, cancelOrder } from '../Collection/Token/token.slice'
import { SkeletonLoader } from '../SkeletonLoader'
import { useInfiniteLoading } from '../../common/useInfiniteLoading'

interface OffersListProps {
  contract: string
  tokenId: string
  network: Network
  isOwner: boolean
}

export const OffersList: FC<OffersListProps> = ({ contract, tokenId, network, isOwner }) => {
  const { address } = useWallet()
  const dispatch = useAppDispatch()

  const { data: tokenOffers, status: tokenOffersStatus } = useAppSelector(
    selectTokenOffers({ contract, tokenId, network }),
  )

  useEffect(() => {
    if (tokenOffersStatus === QueryStatus.uninitialized) {
      dispatch(collectionTokenApi.endpoints.getTokenOffers.initiate({ contract, tokenId, network }))
    }
  }, [contract, tokenId, network, dispatch, tokenOffersStatus])

  const onCancelOrder = (id: string) => {
    dispatch(cancelOrder({ id, address, network: network as Network }))
  }

  const onAcceptOffer = (tokenSetId: string) => {
    const [contract, tokenId] = getTokenDataFromTokenSetId(tokenSetId)
    dispatch(acceptOffer({ contract, tokenId, address, network: network as Network }))
  }

  const { ref } = useInfiniteLoading(collectionTokenApi.endpoints.getTokenOffers.initiate, {
    contract,
    tokenId,
    network,
    continuation: tokenOffers?.continuation,
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
            {tokenOffers &&
              map((order: Order) => (
                <li className="flex flex-row border-b border-gray-400 py-2" key={order.id}>
                  <div className="flex flex-col w-2/3">
                    <div className="text-xs text-gray-500">
                      {formatDistance(new Date(order.createdAt), new Date())} ago
                    </div>
                    <div className="flex flex-row items-center my-1">
                      <span className="text-2xl font-bold">
                        <Eth amount={order.price.netAmount.decimal} />
                      </span>{' '}
                      <span className="text-xs text-slate-800 rounded bg-slate-100 p-0.5 ml-1">
                        $ {formatAmountWithoutDecimals(order.price.netAmount.usd)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">by {truncateAddress(order.maker)}</div>
                  </div>
                  <div className="w-1/3">
                    {isMaker(address)(order) ? (
                      <Button
                        loading={tokenOffersStatus === QueryStatus.pending}
                        className="w-full"
                        onClick={() => onCancelOrder(prop('id')(order))}
                      >
                        Cancel Offer
                      </Button>
                    ) : (
                      <></>
                    )}
                    {isOwner ? (
                      <Button
                        loading={tokenOffersStatus === QueryStatus.pending}
                        className="w-full"
                        onClick={() => onAcceptOffer(order.tokenSetId)}
                      >
                        Accept Offer
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </li>
              ))(tokenOffers.orders)}
          </ul>
          {tokenOffersStatus === QueryStatus.pending ? loader : null}
          <div ref={ref} />
        </div>
      </div>
    </div>
  )
}
