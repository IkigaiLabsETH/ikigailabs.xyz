import { map } from 'ramda'
import React, { FC } from 'react'
import { FiExternalLink, FiRepeat, FiTrash2, FiXSquare } from 'react-icons/fi'
import { FaSeedling } from 'react-icons/fa'

import { Activity as IActivity, ActivityType } from '../../common/types'
import { formatDistance } from 'date-fns'
import { truncateAddress } from '../../common/utils'

interface ActivityProps {
  activity: IActivity[]
  showPrice?: boolean
}

const iconMapping = {
  [ActivityType.mint]: <FaSeedling className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.transfer]: <FiRepeat className="w- mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.burned]: <FiTrash2 className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.ask_canceled]: <FiXSquare className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.bid_canceled]: <FiXSquare className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.ask]: null,
  [ActivityType.buy]: null,
}

export const Activity: FC<ActivityProps> = ({ activity, showPrice = true }) => (
  <div className="flex flex-col w-full">
    <div className="inline-block min-w-full align-middle">
      <div className="overflow-hidden ring-black ring-opacity-5">
        <table className="min-w-full divide-black divide-y-2">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Event
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Item
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                From
              </th>
              <th scope="col"></th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                To
              </th>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-right">
                Amount
              </th>
              {showPrice && (
                <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-right">
                  Price
                </th>
              )}
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black">
            {map(({ type, fromAddress, toAddress, txHash, price, amount, token, timestamp }: IActivity) => {
              return (
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 justify-center items-center flex">{iconMapping[type]}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="font-medium text-gray-900">{token?.tokenName}</div>
                  </td>
                  <td className="text-gray-500 text-xs px-3">{truncateAddress(fromAddress)}</td>
                  <td className="text-gray-500">&rarr;</td>
                  <td className="text-gray-500 text-xs px-3">{truncateAddress(toAddress)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{amount}</td>
                  {showPrice && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                      {price ? `${price?.currency?.symbol} ${price?.amount?.decimal}` : ''}
                    </td>
                  )}
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDistance(new Date(timestamp * 1000), new Date(), {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a
                      href={`https://etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#000000"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
              )
            })(activity)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
