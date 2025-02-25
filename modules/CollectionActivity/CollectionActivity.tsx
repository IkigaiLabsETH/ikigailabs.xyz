import React, { FC, useEffect, useState } from 'react'
import { ActivityMap, ActivityType, Network } from '../../common/types'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { selectCollectionActivity } from '../Collection/collection.selectors'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'
import { collectionApi } from '../Collection/collection.api'
import { useInfiniteLoading } from '../../common/useInfiniteLoading'
import { Toggle } from '../Toggle'
import { has, includes, isNil, map } from 'ramda'
import { ACTIVITY_ICON_MAP, CHAIN_ICON_MAP } from '../../common/constants/constants'
import { truncateAddress } from '../../common/utils'
import { FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { formatDistance } from 'date-fns'
import { URLS } from '../../common/config'

interface CollectionActivityProps {
  contract: string
  network: Network
}

export const CollectionActivity: FC<CollectionActivityProps> = ({ contract, network }) => {
  const dispatch = useAppDispatch()
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<ActivityType[]>([])

  const { data: activity, status: activityStatus } = useAppSelector(
    selectCollectionActivity({ contract, network, selectedActivityTypes }),
  )

  useEffect(() => {
    if (activityStatus === QueryStatus.uninitialized) {
      dispatch(
        collectionApi.endpoints.getCollectionActivityByContract.initiate({
          contract,
          network,
          selectedActivityTypes,
          continuation: activity ? (activity as any).continuation : '',
        }),
      )
    }
  }, [contract, network, dispatch, activityStatus, selectedActivityTypes, activity])

  const toggleActivity = (activityType: ActivityType) => {
    setSelectedActivityTypes(
      selectedActivityTypes.includes(activityType)
        ? selectedActivityTypes.filter(type => type !== activityType)
        : [...selectedActivityTypes, activityType],
    )
  }

  const { ref } = useInfiniteLoading(collectionApi.endpoints.getCollectionActivityByContract.initiate, {
    contract,
    network,
    selectedActivityTypes,
    continuation: activity?.continuation,
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
        <div className="overflow-hidden ring-black ring-opacity-5 px-4">
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
          <ul className="hidden lg:block">
            {activity && activity.activities &&
              activity.activities.map((activityItem: any) => {
                const isCollection = isNil(activityItem.token.tokenId)
                return (
                  <li
                    key={
                      has('txHash')(activityItem) && has('logIndex')(activityItem)
                        ? `${activityItem.txHash}-${activityItem.logIndex}`
                        : activityItem?.order?.id
                    }
                    className="my-4 pb-4 border-b-2 border-black"
                  >
                    <div className="grid grid-cols-6 justify-center items-center">
                      <div className="flex flex-row items-center">
                        {ACTIVITY_ICON_MAP[activityItem.type]} {isCollection ? 'Collection ' : ''}{' '}
                        {ActivityMap[activityItem.type]}
                      </div>
                      <div className="flex flex-row items-center justify-center">
                        {activityItem.token ? (
                          <>
                            {activityItem.token.tokenImage && (
                              <img
                                src={activityItem.token.tokenImage}
                                alt={activityItem.token.tokenName}
                                width={50}
                                height={50}
                              />
                            )}
                          </>
                        ) : null}
                      </div>
                      <div className="flex flex-row items-center">
                        <span className="mr-2 inline-block">{CHAIN_ICON_MAP[network]}</span> {activityItem.price}
                      </div>
                      <div className="flex justify-center items-center flex-col">
                        <div className="text-gray-500 text-xs">{truncateAddress(activityItem.fromAddress)}</div>
                        {activityItem.toAddress && (
                          <div className="text-gray-500 text-xs">
                            <FaArrowRight className="inline font-light mx-0.5 -mt-0.5" />
                            {truncateAddress(activityItem.toAddress)}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center items-center flex-col">
                        {activityItem.order?.source && (
                          <div className="flex flex-row items-center">
                            {activityItem.order.source?.icon && (
                              <img
                                src={activityItem.order.source.icon}
                                width={20}
                                height={20}
                                alt={activityItem.order.source.domain}
                              />
                            )}
                            <div className="text-gray-500 ml-1 -mt-0.5">{activityItem.order.source.domain}</div>
                          </div>
                        )}
                        <div className="text-gray-500 text-xs">
                          {formatDistance(new Date(activityItem.timestamp * 1000), new Date(), {
                            includeSeconds: true,
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                      <div className="flex items-end justify-end">
                        {activityItem.type === ActivityType.transfer && (
                          <a href={`${URLS[network].explorer}/tx/${activityItem.txHash}`}>
                            <FaArrowUpRightFromSquare />
                          </a>
                        )}
                      </div>
                    </div>
                    <span className="text-neutral-400">{activityItem.description}</span>
                  </li>
                )
              })}
          </ul>
          <ul className="block lg:hidden">
            {activity && activity.activities &&
              map((activityItem: any) => {
                const isCollection = isNil(activityItem.token.tokenId)
                return (
                  <li
                    key={
                      has('txHash')(activityItem) && has('logIndex')(activityItem)
                        ? `${activityItem.txHash}-${activityItem.logIndex}`
                        : activityItem?.order?.id
                    }
                    className="my-4 pb-4 border-b-2 border-black"
                  >
                    <div className="grid grid-cols-2 justify-center items-center">
                      <div className="flex items-start flex-col">
                        <div className="flex flex-row items-center mb-4">
                          {ACTIVITY_ICON_MAP[activityItem.type]} {isCollection ? 'Collection ' : ''}{' '}
                          {ActivityMap[activityItem.type]}
                        </div>
                        <div className="flex flex-row items-center">
                          {activityItem.token ? (
                            <>
                              {activityItem.token.tokenImage && (
                                <img
                                  src={activityItem.token.tokenImage}
                                  alt={activityItem.token.tokenName}
                                  width={50}
                                  height={50}
                                />
                              )}
                              <div className="ml-4">{activityItem.token.tokenId}</div>
                            </>
                          ) : null}
                        </div>
                        <div className="mt-4">
                          <div className="text-gray-500 text-xs">{truncateAddress(activityItem.fromAddress)}</div>
                          <div>
                            {activityItem.toAddress && (
                              <div className="text-gray-500 text-xs">
                                <FaArrowRight className="inline font-light mx-0.5 -mt-0.5" />
                                {truncateAddress(activityItem.toAddress)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-end">
                        <div className="flex flex-col justify-between">
                          <div className="font-bold text-xl">
                            {CHAIN_ICON_MAP.ETH} {activityItem.price}
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs">
                              {formatDistance(new Date(activityItem.timestamp * 1000), new Date(), {
                                includeSeconds: true,
                                addSuffix: true,
                              })}
                            </div>
                            {activityItem.order?.source && (
                              <div className="flex flex-row items-center">
                                {activityItem.order.source?.icon && (
                                  <img
                                    src={activityItem.order.source.icon}
                                    width={20}
                                    height={20}
                                    alt={activityItem.order.source.domain}
                                  />
                                )}
                                <div className="text-gray-500 ml-1 -mt-0.5">{activityItem.order.source.domain}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          {activityItem.type === ActivityType.transfer && (
                            <a href={`${URLS[network].explorer}/tx/${activityItem.txHash}`}>
                              <FaArrowUpRightFromSquare />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-neutral-400">{activityItem.description}</span>
                  </li>
                )
              }, activity.activities)}
          </ul>
          {activityStatus === QueryStatus.pending ? loader : null}
          <div ref={ref} />
        </div>
      </div>
    </div>
  )
}
