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
  
  // Only focusing on one category: Icons
  const { data: iconsFloors, status: iconsFloorsStatus } = useAppSelector(
    selectCollectionFloorsByCollectionSetId({ collectionSetId: GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID }),
  )

  useEffect(() => {
    // Only initiate the call for iconsFloors
    if (GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID) {
      dispatch(
        collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.initiate({
          collectionSetId: GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID,
        }),
      )
    }
  }, [dispatch, network])

  // Get one featured NFT (e.g. the first one)
  const featuredIcon = iconsFloors && iconsFloors.length > 0 ? iconsFloors[0] : null

  return (
    <div className="w-full">
      <div>
        <h1 className="flex boska w-full pt-16 pb-8 text-6xl lg:text-8xl text-black justify-center text-center">
          Featured Icon
        </h1>
      </div>
      <div className="w-full !text-black max-w-80 md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-2xl mt-3">
        {equals(iconsFloorsStatus, QueryStatus.pending) ? (
          <div className="mb-8">
            <SkeletonLoader height="h-8" style="light" />
          </div>
        ) : (
          featuredIcon && (
            <div className="bg-white p-4">
              {/* Replace with your NFT display component or a simple image/title as below */}
              <img src={featuredIcon.imageUrl} alt={featuredIcon.name} className="w-full h-auto" />
              <h2 className="text-black text-xl mt-2">{featuredIcon.name}</h2>
            </div>
          )
        )}
      </div>
    </div>
  )
}
