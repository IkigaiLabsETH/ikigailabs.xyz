import { map } from 'ramda'
import React, { FC } from 'react'

import { Network, Order } from '../../common/types'
import Image from 'next/image'
import { formatDateAndTime, truncateAddress } from '../../common/utils'
import { Button } from '../Button'
import { useAppDispatch } from '../../common/redux/store'
import { useAddress } from '@thirdweb-dev/react'
import { cancelOrder } from '../Collection/Token/token.slice'

interface UserAsksProps {
  asks: Order[]
  network: Network
}

export const UserAsks: FC<UserAsksProps> = ({ asks, network }) => {
  const dispatch = useAppDispatch()
  const address = useAddress()

  const onCancelListing = (id: string) => {
    dispatch(cancelOrder({ id, address, network }))
  }

  return (
    <div className="flex flex-col w-full">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden ring-black ring-opacity-5">
          <table className="min-w-full divide-black divide-y-2">
            <thead>
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Token
                </th>
                <th scope="col"></th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Taker
                </th>
                <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
                  Price
                </th>
                <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
                  Valid from
                </th>
                <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
                  Valid until
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {map(
                ({
                  criteria: {
                    data: { token },
                  },
                  taker,
                  price,
                  validFrom,
                  validUntil,
                  status,
                  id,
                }: Order) => {
                  return (
                    <tr key={id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {token?.image && <Image src={token?.image} width={40} height={40} alt={token?.name} />}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="font-medium text-gray-900">{token?.name}</div>
                      </td>
                      <td className="text-gray-500 px-3">{truncateAddress(taker)}</td>
                      <td className="text-gray-500 px-3">{`${price?.currency?.symbol} ${price?.amount.decimal}`}</td>
                      <td className="text-gray-500 px-3">{formatDateAndTime(validFrom)}</td>
                      <td className="px-3 text-gray-500">{formatDateAndTime(validUntil)}</td>
                      <td className="px-3 text-gray-500 capitalize">{status}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Button onClick={() => onCancelListing(id)}>Cancel</Button>
                      </td>
                    </tr>
                  )
                },
              )(asks)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
