import { map, prop } from 'ramda'
import React, { FC } from 'react'

import { formatDistance } from 'date-fns'
import { isMaker, isOwner, truncateAddress } from '../../common/utils'
import { Order } from '../../common/types'
import { Button } from '../Button'
import { Eth } from '../Eth'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { useAddress } from '@thirdweb-dev/react'

interface OffersListProps {
  orders: Order[]
  status: QueryStatus
  onCancel: (id: string) => void
  onAccept: (tokenSetId: string) => void
  isOwner: boolean
}

export const OffersList: FC<OffersListProps> = ({ orders, status, onCancel, onAccept, isOwner }) => {
  const address = useAddress()
  return (
    <div className="flex flex-col w-full">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden ring-black ring-opacity-5">
          <ul>
            {map((order: Order) => (
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
                      $ {order.price.netAmount.usd}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">by {truncateAddress(order.maker)}</div>
                </div>
                <div className="w-1/3">
                  {isMaker(address)(order) ? (
                    <Button
                      loading={status === QueryStatus.pending}
                      className="w-full"
                      onClick={() => onCancel(prop('id')(order))}
                    >
                      Cancel Offer
                    </Button>
                  ) : (
                    <></>
                  )}
                  {isOwner ? (
                    <Button
                      loading={status === QueryStatus.pending}
                      className="w-full"
                      onClick={() => onAccept(order.tokenSetId)}
                    >
                      Accept Offer
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </li>
            ))(orders)}
          </ul>
        </div>
      </div>
    </div>
  )
}
