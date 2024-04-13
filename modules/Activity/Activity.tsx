import { includes, map } from 'ramda'
import React, { FC, useEffect, useState } from 'react'
import {
  FaArrowRight,
  FaArrowRightArrowLeft,
  FaSeedling,
  FaFireFlameCurved,
  FaRegRectangleXmark,
  FaTag,
  FaCartShopping,
  FaHand,
} from 'react-icons/fa6'

import { Activity as IActivity, ActivityType, ActivityMap, Network } from '../../common/types'
import { formatDistance } from 'date-fns'
import { truncateAddress } from '../../common/utils'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { selectTokenActivity } from '../Collection/Token/token.selectors'
import { useInfiniteLoading } from '../../common/useInfiniteLoading'
import { collectionTokenApi } from '../Collection/Token/token.api'
import { Toggle } from '../Toggle'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'

interface ActivityProps {
  contract: string
  tokenId: string
  network: Network
}

const iconMapping = {
  [ActivityType.mint]: <FaSeedling className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.transfer]: (
    <FaArrowRightArrowLeft className="w- mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
  ),
  [ActivityType.burned]: <FaFireFlameCurved className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.ask_canceled]: (
    <FaRegRectangleXmark className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
  ),
  [ActivityType.bid_canceled]: (
    <FaRegRectangleXmark className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />
  ),
  [ActivityType.bid]: <FaHand className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.ask]: <FaTag className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
  [ActivityType.sale]: <FaCartShopping className="mr-1 h-4 w-4 text-neutral-400 md:mr-[10px] md:h-5 md:w-5" />,
}

export const Activity: FC<ActivityProps> = ({ contract, tokenId, network }) => {
  const dispatch = useAppDispatch()
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<ActivityType[]>([])

  const { data: tokenActivity, status: tokenActivityStatus } = useAppSelector(
    selectTokenActivity({ contract, tokenId, network, selectedActivityTypes, continuation: '' }),
  )

  useEffect(() => {
    if (tokenActivityStatus === QueryStatus.uninitialized) {
      dispatch(
        collectionTokenApi.endpoints.getTokenActivity.initiate({
          contract,
          tokenId,
          network,
          selectedActivityTypes,
          continuation: tokenActivity ? (tokenActivity as any).continuation : '',
        }),
      )
    }
  }, [contract, tokenId, network, dispatch, tokenActivityStatus, selectedActivityTypes, tokenActivity])

  const toggleActivity = (activityType: ActivityType) => {
    setSelectedActivityTypes(
      selectedActivityTypes.includes(activityType)
        ? selectedActivityTypes.filter(type => type !== activityType)
        : [...selectedActivityTypes, activityType],
    )
  }

  const { ref } = useInfiniteLoading(collectionTokenApi.endpoints.getTokenActivity.initiate, {
    contract,
    tokenId,
    network,
    selectedActivityTypes,
    continuation: tokenActivity?.continuation,
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
        <div className="overflow-hidden ring-black ring-opacity-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 py-2 ">
            <div className="mr-2">
              <Toggle
                label={`${ActivityMap[ActivityType.sale]}s`}
                onToggle={() => toggleActivity(ActivityType.sale)}
                size="sm"
                initialState={includes(ActivityType.sale)(selectedActivityTypes)}
              />
            </div>
            <div className="mr-1">
              <Toggle
                label={`${ActivityMap[ActivityType.ask]}s`}
                onToggle={() => toggleActivity(ActivityType.ask)}
                size="sm"
                initialState={includes(ActivityType.ask)(selectedActivityTypes)}
              />
            </div>
            <div className="mr-1">
              <Toggle
                label={`${ActivityMap[ActivityType.bid]}s`}
                onToggle={() => toggleActivity(ActivityType.bid)}
                size="sm"
                initialState={includes(ActivityType.bid)(selectedActivityTypes)}
              />
            </div>
            <div className="mr-1">
              <Toggle
                label={ActivityMap[ActivityType.transfer]}
                onToggle={() => toggleActivity(ActivityType.transfer)}
                size="sm"
                initialState={includes(ActivityType.transfer)(selectedActivityTypes)}
              />
            </div>
            <div className="mr-1">
              <Toggle
                label={ActivityMap[ActivityType.mint]}
                onToggle={() => toggleActivity(ActivityType.mint)}
                size="sm"
                initialState={includes(ActivityType.mint)(selectedActivityTypes)}
              />
            </div>
          </div>
          <ul>
            {tokenActivity &&
              map(({ type, fromAddress, toAddress, timestamp, price, order }: IActivity) => {
                return (
                  <li key={`${type}-${timestamp}}`} className="my-2 pb-2 border-b-2 border-black">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="flex flex-row">
                          <div className="h-6 w-6 justify-center items-center flex">{iconMapping[type]}</div>
                          <div className="flex items-baseline flex-row">
                            <div className="mr-1">{ActivityMap[type]}</div>
                            <div className="text-gray-500 text-xs">
                              {formatDistance(new Date(timestamp * 1000), new Date(), {
                                includeSeconds: true,
                                addSuffix: true,
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row items-baseline mt-1 ">
                          <div className="text-gray-600 text-xs mr-0.5">{price.currency.symbol}</div>{' '}
                          <div className="font-bold"> {price.amount.decimal}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-end">
                        {order?.source && (
                          <div className="flex flex-row items-center">
                            {order.source?.icon && <Image src={order.source.icon} width={20} height={20} alt={order.source.domain} /> }
                            <div className="text-gray-500 ml-1 -mt-0.5">{order.source.domain}</div>
                          </div>
                        )}
                        <div className="flex flex-row pt-2 pb-1">
                          <div className="text-gray-500 text-xs">{truncateAddress(fromAddress)}</div>
                          {toAddress && (
                            <div className="text-gray-500 text-xs">
                              <FaArrowRight className="inline font-light mx-0.5 -mt-0.5" />
                              {truncateAddress(toAddress)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })(tokenActivity.activities)}
          </ul>
          {tokenActivityStatus === QueryStatus.pending ? loader : null}
          <div ref={ref} />
        </div>
      </div>
    </div>
  )
}
