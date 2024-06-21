import React, { FC } from 'react'
import { Button } from '../Button'
import { formatDateAndTime, truncateAddress } from '../../common/utils'
import { equals, map } from 'ramda'
import { Network, Order } from '../../common/types'
import Image from 'next/image'
import { useAppDispatch } from '../../common/redux/store'
import { cancelOrder } from '../Collection/Token/token.slice'
import { useWallet } from '../../common/useWallet'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import Link from 'next/link'

interface UserBidsProps {
  bids: Order[]
  network: Network
}

export const UserBids: FC<UserBidsProps> = ({ bids, network }) => {
  const dispatch = useAppDispatch()
  const { address } = useWallet()

  const onCancelBid = (id: string) => {
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
                  tokenSetId,
                  maker,
                  contract
                }: Order) => {

                  return (
                    <tr key={`${id}${tokenSetId}`}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {token?.tokenId}
                      </td>

                      <td className="text-gray-500 px-3">{!equals(taker, "0x0000000000000000000000000000000000000000") ? truncateAddress(taker) : "–"}</td>
                      <td className="text-gray-500 px-3">{`${price?.currency?.symbol} ${price?.amount.decimal}`}</td>
                      <td className="text-gray-500 px-3">{formatDateAndTime(validFrom)}</td>
                      <td className="px-3 text-gray-500">{formatDateAndTime(validUntil)}</td>
                      <td className="px-3 text-gray-500 capitalize">{status}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {equals(address, maker) ? <Button onClick={() => onCancelBid(id)}>Cancel</Button> : null}
                      </td>
                      <td>
                        <Link href={`/${network}/${contract}/${token?.tokenId}`}><FaArrowUpRightFromSquare /></Link>
                      </td>
                    </tr>
                  )
                },
              )(bids)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
