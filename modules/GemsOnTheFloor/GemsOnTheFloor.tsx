import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { 
  GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID,
} from '../../common/config'
import { collectionsApi, selectCollectionFloorsByCollectionSetId } from '../Collections/collections.api'
import { Network } from '../../common/types'
import { equals } from 'ramda'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'

export const GemsOnTheFloor: FC = () => {
  const dispatch = useAppDispatch()
  const network = Network.MAINNET
  
  // Only focusing on ICONS
  const { data: iconsFloors, status: iconsFloorsStatus } = useAppSelector(
    selectCollectionFloorsByCollectionSetId({ collectionSetId: GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID }),
  )

  useEffect(() => {
    if (GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID) {
      dispatch(
        collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.initiate({
          collectionSetId: GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID,
        })
      )
    }
  }, [dispatch, network])

  // Just pick the first NFT if available
  const featuredIcon = iconsFloors && iconsFloors.length > 0 ? iconsFloors[0] : null

  console.log('IconsFloors Data:', iconsFloors)
  console.log('IconsFloors Status:', iconsFloorsStatus)

  return (
    <div className="w-full">
      <h1 className="pt-16 pb-8 text-6xl lg:text-8xl text-black text-center">
        Featured Icon
      </h1>

      <div className="w-full !text-black max-w-80 md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-2xl mx-auto mt-3">
        {equals(iconsFloorsStatus, QueryStatus.pending) && (
          <div className="mb-8">
            <SkeletonLoader height="h-8" style="light" />
          </div>
        )}

        {iconsFloorsStatus === QueryStatus.rejected && (
          <div className="text-red-500">Failed to load data. Please check the network calls and API responses.</div>
        )}

        {iconsFloorsStatus === QueryStatus.fulfilled && !featuredIcon && (
          <div className="text-white">No icons available.</div>
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
