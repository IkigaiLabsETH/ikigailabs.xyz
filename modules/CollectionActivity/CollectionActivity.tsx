import React, { FC, useEffect, useState } from 'react'
import { ActivityMap, ActivityType, Network } from '../../common/types'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { selectCollectionActivity } from '../Collection/collection.selectors'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'
import { collectionApi } from '../Collection/collection.api'
import { useInfiniteLoading } from '../../common/useInfiniteLoading'
import { Toggle } from '../Toggle'
import { includes, isNil, map } from 'ramda'
import { ACTIVITY_ICON_MAP, CHAIN_ICON_MAP } from '../../common/constants/constants'
import Image from 'next/image'
import { truncateAddress } from '../../common/utils'
import { FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { formatDistance } from 'date-fns'
import { URLS } from '../../common/config'

interface CollectionActivityProps {
  contract: string
  network: Network
}

export const CollectionActivity:FC<CollectionActivityProps> = ({ contract, network }) => {
  const dispatch = useAppDispatch()
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<ActivityType[]>([])

  const { data: activity, status: activityStatus } = useAppSelector(selectCollectionActivity({ contract, network, selectedActivityTypes }))

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
          <ul className='hidden lg:block'>
            {activity &&
              map((activity: any) => {
                const collection = isNil(activity.token.tokenId)
                return (
                <li key={activity.type === ActivityType.transfer ? `${activity.txHash}-${activity.logIndex}`  : activity.order.id} className="my-4 pb-4 border-b-2 border-black">
                  <div className='grid grid-cols-6 justify-center items-center'>
                    <div className='flex flex-row items-center'>
                      {ACTIVITY_ICON_MAP[activity.type]} {collection ? 'Collection ' : ''} {ActivityMap[activity.type]}
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                      {activity.token ? <>
                        {activity.token.tokenImage && <Image src={activity.token.tokenImage} alt={activity.token.tokenName} width={50} height={50} />}
                      </>
                      : null }
                    </div>
                    <div className='flex flex-row items-center'>
                      <span className='mr-2 inline-block w-5 h-5'>{CHAIN_ICON_MAP[network]}</span> {activity.price}
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                      <div className="text-gray-500 text-xs">{truncateAddress(activity.fromAddress)}</div>
                        {activity.toAddress && (
                          <div className="text-gray-500 text-xs">
                            <FaArrowRight className="inline font-light mx-0.5 -mt-0.5" />
                            {truncateAddress(activity.toAddress)}
                          </div>
                        )}
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                      {activity.order?.source && (
                        <div className="flex flex-row items-center">
                          {activity.order.source?.icon && <Image src={activity.order.source.icon} width={20} height={20} alt={activity.order.source.domain} /> }
                          <div className="text-gray-500 ml-1 -mt-0.5">{activity.order.source.domain}</div>
                        </div>
                      )}
                      <div className="text-gray-500 text-xs">
                        {formatDistance(new Date(activity.timestamp * 1000), new Date(), {
                          includeSeconds: true,
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <div className='flex items-end justify-end'>
                      {activity.type === ActivityType.transfer &&  <a href={`${URLS[network].explorer}/tx/${activity.txHash}`}><FaArrowUpRightFromSquare /></a> }
                    </div>
                  </div>
                  <span className="text-neutral-400">{activity.description}</span>
                </li>
              )})((activity as any).activities)}
          </ul>
          <ul className='block lg:hidden'>
            {activity &&
              map((activity: any) => {
                const collection = isNil(activity.token.tokenId)
                return (
                <li key={activity.type === ActivityType.transfer ? `${activity.txHash}-${activity.logIndex}` : activity.order.id} className="my-4 pb-4 border-b-2 border-black">
                  <div className='grid grid-cols-2 justify-center items-center'>
                    <div className='flex items-start flex-col'>
                      <div className='flex flex-row items-center mb-4'>
                        {ACTIVITY_ICON_MAP[activity.type]} {collection ? 'Collection ' : ''} {ActivityMap[activity.type]}
                      </div>
                      <div className='flex flex-row items-center'>
                        {activity.token ? <>
                            {activity.token.tokenImage && <Image src={activity.token.tokenImage} alt={activity.token.tokenName} width={50} height={50} />}
                            <div className='ml-4'>{activity.token.tokenId}</div>
                          </>
                          : null }
                      </div>
                      <div className='mt-4'>
                        <div className="text-gray-500 text-xs">{truncateAddress(activity.fromAddress)}</div>
                        <div>
                          {activity.toAddress && (
                            <div className="text-gray-500 text-xs">
                              <FaArrowRight className="inline font-light mx-0.5 -mt-0.5" />
                              {truncateAddress(activity.toAddress)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-row items-start justify-end'>
                      <div className='flex flex-col justify-between'>
                        <div className='font-bold text-xl'>
                          {CHAIN_ICON_MAP.ETH} {activity.price}
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">
                            {formatDistance(new Date(activity.timestamp * 1000), new Date(), {
                              includeSeconds: true,
                              addSuffix: true,
                            })}
                          </div>
                          {activity.order?.source && (
                            <div className="flex flex-row items-center">
                              {activity.order.source?.icon && <Image src={activity.order.source.icon} width={20} height={20} alt={activity.order.source.domain} /> }
                              <div className="text-gray-500 ml-1 -mt-0.5">{activity.order.source.domain}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                      {activity.type === ActivityType.transfer &&  <a href={`${URLS[network].explorer}/tx/${activity.txHash}`}><FaArrowUpRightFromSquare /></a> }
                      </div>
                    </div>
                  </div>
                  <span className="text-neutral-400">{activity.description}</span>
                </li>
              )})((activity as any).activities)}
          </ul>
          {activityStatus === QueryStatus.pending ? loader : null}
          <div ref={ref} />
        </div>
      </div>
    </div>
  )
}