import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../../common/redux/store'
import { GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID } from '../../common/config'
import { collectionsApi } from '../Collections/collections.api'
import { Network } from '../../common/types'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'

export const GemsOnTheFloor: FC = () => {
  const dispatch = useAppDispatch()
  const network = Network.MAINNET

  // Fetch data using the RTK Query hook directly
  const { data: iconsFloors, error, isLoading, isSuccess, isError } = 
    collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.useQuery({ 
      collectionSetId: GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID 
    })

  // Determine the status to match with previous logic
  let iconsFloorsStatus: QueryStatus = QueryStatus.pending
  if (isLoading) iconsFloorsStatus = QueryStatus.pending
  if (isSuccess) iconsFloorsStatus = QueryStatus.fulfilled
  if (isError) iconsFloorsStatus = QueryStatus.rejected

  const featuredIcon = iconsFloors && iconsFloors.length > 0 ? iconsFloors[0] : null

  useEffect(() => {
    console.log('IconsFloors Data:', iconsFloors)
    console.log('IconsFloors Status:', iconsFloorsStatus)
    if (error) {
      console.error('Error fetching iconsFloors:', error)
    }
  }, [iconsFloors, iconsFloorsStatus, error])

  return (
    <div className="w-full">
      <h1 className="pt-16 pb-8 text-6xl lg:text-8xl text-black text-center">
        Featured Icon
      </h1>

      <div className="w-full text-black max-w-80 md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-2xl mx-auto mt-3">
        {iconsFloorsStatus === QueryStatus.pending && (
          <div className="mb-8">
            <SkeletonLoader height="h-8" style="light" />
          </div>
        )}

        {iconsFloorsStatus === QueryStatus.rejected && (
          <div className="text-red-500">
            Failed to load data. Please check network calls and API responses.
          </div>
        )}

        {iconsFloorsStatus === QueryStatus.fulfilled && !featuredIcon && (
          <div className="text-black">No icons available.</div>
        )}

        {iconsFloorsStatus === QueryStatus.fulfilled && featuredIcon && (
          <div className="bg-white p-4">
            {/* Adjust these fields if your data shape differs */}
            <img
              src={featuredIcon.imageUrl}
              alt={featuredIcon.name}
              className="w-full h-auto"
            />
            <h2 className="text-black text-xl mt-2">{featuredIcon.name}</h2>
          </div>
        )}
      </div>
    </div>
  )
}
