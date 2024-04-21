import { includes, isNil, map } from 'ramda'
import React, { FC, useEffect, useState } from 'react'

import { Activity as IActivity, ActivityType, ActivityMap, Network } from '../../common/types'
import { formatDistance } from 'date-fns'
import { truncateAddress } from '../../common/utils'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { useInfiniteLoading } from '../../common/useInfiniteLoading'
import { Toggle } from '../Toggle'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'
import { ACTIVITY_ICON_MAP } from '../../common/constants/constants'
import { FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { useRouter } from 'next/router'
import { selectUserActivity, userApi } from '../User'
import { URLS } from '../../common/config'

export const UserActivity: FC = () => {
  const {
    query: { network, address },
  } = useRouter()
  const dispatch = useAppDispatch()
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<ActivityType[]>([])

  const { data: activity, status } = useAppSelector(
    selectUserActivity({ address: address as string, network: network as Network, selectedActivityTypes }),
  )

  useEffect(() => {
    if (status === QueryStatus.uninitialized && address && network) {
      dispatch(
        userApi.endpoints.getUserActivity.initiate({
          address: address as string,
          network: network as Network,
          selectedActivityTypes,
          continuation: activity ? (activity as any).continuation : '',
        }),
      )
    }
  }, [address, dispatch, status, selectedActivityTypes, activity, network])

  const toggleActivity = (activityType: ActivityType) => {
    setSelectedActivityTypes(
      selectedActivityTypes.includes(activityType)
        ? selectedActivityTypes.filter(type => type !== activityType)
        : [...selectedActivityTypes, activityType],
    )
  }

  const { ref } = useInfiniteLoading(userApi.endpoints.getUserActivity.initiate, {
    address,
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
        <div className="overflow-hidden ring-black ring-opacity-5 pb-5">
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
                <li key={`${activity.txHash}-${activity.logIndex}`} className="my-4 pb-4 border-b-2 border-black">
                  <div className='grid grid-cols-5 justify-center items-center'>
                    <div className='flex flex-row items-center'>
                      {ACTIVITY_ICON_MAP[activity.type]} {collection ? 'Collection ' : ''} {ActivityMap[activity.type]}
                    </div>
                    <div className='flex flex-row items-center'>
                      {activity.token ? <>
                        {activity.token.tokenImage && <img src={activity.token.tokenImage} alt={activity.token.tokenName} width={50} height={50} className='mr-2'/>} {activity.token.tokenName}
                      </>
                      : null }
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
                      <div className="text-gray-500 text-xs">
                        {formatDistance(new Date(activity.timestamp * 1000), new Date(), {
                          includeSeconds: true,
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <div className='flex items-end justify-end'>
                      {activity.type === ActivityType.transfer &&  <a href={`${URLS[network as string].explorer}/tx/${activity.txHash}`}><FaArrowUpRightFromSquare /></a> }
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
                <li key={`${activity.txHash}-${activity.logIndex}`} className="my-4 pb-4 border-b-2 border-black">
                  <div className='grid grid-cols-2 justify-center items-center'>
                    <div className='flex items-start flex-col'>
                      <div className='flex flex-row items-center mb-4'>
                        {ACTIVITY_ICON_MAP[activity.type]} {collection ? 'Collection ' : ''} {ActivityMap[activity.type]}
                      </div>
                      <div className='flex flex-row items-center'>
                        {activity.token ? <>
                            {activity.token.tokenImage && <img src={activity.token.tokenImage} alt={activity.token.tokenName} width={50} height={50} className='mr-2'/>}
                            <div className='ml-4'>{activity.token.tokenName}</div>
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
                        <div>
                          <div className="text-gray-500 text-xs">
                            {formatDistance(new Date(activity.timestamp * 1000), new Date(), {
                              includeSeconds: true,
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </div>
                      <div>
                      {activity.type === ActivityType.transfer &&  <a href={`${URLS[network as string].explorer}/tx/${activity.txHash}`}><FaArrowUpRightFromSquare /></a> }
                      </div>
                    </div>
                  </div>
                  <span className="text-neutral-400">{activity.description}</span>
                </li>
              )})((activity as any).activities)}
          </ul>
          {status === QueryStatus.pending ? loader : null}
          <div ref={ref} className='h-1'/>
        </div>
      </div>
    </div>
  )
}
