import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { GEMS_ON_THE_FLOOR_AI_COLLECTION_SET_ID, GEMS_ON_THE_FLOOR_GEMS_COLLECTION_SET_ID, GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID, GEMS_ON_THE_FLOOR_PHOTOGRAPHY_COLLECTION_SET_ID } from '../../common/config'
import { collectionsApi, selectCollectionFloorsByCollectionSetId } from '../Collections/collections.api'
import { Network } from '../../common/types'
import { equals } from 'ramda'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'
import { TokenCarousel } from '../TokenCarousel'

export const GemsOnTheFloor: FC = () => {
  const dispatch = useAppDispatch()
  const network = Network.MAINNET
  const { data: photographyFloors, status: photographyFloorsStatus } = useAppSelector(
    selectCollectionFloorsByCollectionSetId({ collectionSetId: GEMS_ON_THE_FLOOR_PHOTOGRAPHY_COLLECTION_SET_ID }),
  )
  const { data: aiFloors, status: aiFloorsStatus } = useAppSelector(
    selectCollectionFloorsByCollectionSetId({ collectionSetId: GEMS_ON_THE_FLOOR_AI_COLLECTION_SET_ID }),
  )
  const { data: iconsFloors, status: iconsFloorsStatus } = useAppSelector(
    selectCollectionFloorsByCollectionSetId({ collectionSetId: GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID }),
  )

  const { data: gemsFloors, status: gemsFloorsStatus } = useAppSelector(
    selectCollectionFloorsByCollectionSetId({ collectionSetId: GEMS_ON_THE_FLOOR_GEMS_COLLECTION_SET_ID }),
  )

  useEffect(() => {
    if (GEMS_ON_THE_FLOOR_PHOTOGRAPHY_COLLECTION_SET_ID) {
      dispatch(
        collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.initiate({
          collectionSetId: GEMS_ON_THE_FLOOR_PHOTOGRAPHY_COLLECTION_SET_ID,
        }),
      )
    }

    if (GEMS_ON_THE_FLOOR_AI_COLLECTION_SET_ID) {
      dispatch(
        collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.initiate({
          collectionSetId: GEMS_ON_THE_FLOOR_AI_COLLECTION_SET_ID,
        }),
      )
    }

    if (GEMS_ON_THE_FLOOR_GEMS_COLLECTION_SET_ID) {
      dispatch(
        collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.initiate({
          collectionSetId: GEMS_ON_THE_FLOOR_GEMS_COLLECTION_SET_ID,
        }),
      )
    }

    if (GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID) {
      dispatch(
        collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.initiate({
          collectionSetId: GEMS_ON_THE_FLOOR_ICONS_COLLECTION_SET_ID,
        }),
      )
    }
  }, [dispatch, network])

  return (
    <div className="w-full">
      <div>
        <h1 className="flex boska w-full pt-16 pb-8 text-4xl md:text-6xl lg:text-8xl text-black justify-center text-center">
          On the floor
        </h1>
      </div>
      <div className='w-full !text-black max-w-80 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mt-3'>
        <h1 className="ml-3 text-3xl lg:text-6xl text-black lg:translate-y-11">Photography</h1>
        <div className="bg-white">
          {equals(photographyFloorsStatus, QueryStatus.pending) ? (
            <div className="grid grid-cols-4 gap-4 mb-8">
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
            </div>
          ) : (
            photographyFloors && <TokenCarousel nfts={photographyFloors} network={network} />
          )}
        </div>
      </div>

      <div className='w-full !text-black max-w-80 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mt-3'>
        <h1 className="ml-3 text-3xl lg:text-6xl text-black lg:translate-y-11">AI</h1>
        <div className="bg-white">
          {equals(aiFloorsStatus, QueryStatus.pending) ? (
            <div className="grid grid-cols-4 gap-4 mb-8">
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
            </div>
          ) : (
            aiFloors && <TokenCarousel nfts={aiFloors} network={network} />
          )}
        </div>
      </div>

      <div className='w-full !text-black max-w-80 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mt-3'>
        <h1 className="ml-3 text-3xl lg:text-6xl text-black lg:translate-y-11">Gems</h1>
        <div className="bg-white">
          {equals(gemsFloorsStatus, QueryStatus.pending) ? (
            <div className="grid grid-cols-4 gap-4 mb-8">
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
            </div>
          ) : (
            iconsFloors && <TokenCarousel nfts={gemsFloors} network={network} />
          )}
        </div>
      </div>

      <div className='w-full !text-black max-w-80 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mt-3'>
        <h1 className="ml-3 text-3xl lg:text-6xl text-black lg:translate-y-11">Icons</h1>
        <div className="bg-white">
          {equals(iconsFloorsStatus, QueryStatus.pending) ? (
            <div className="grid grid-cols-4 gap-4 mb-8">
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
              <SkeletonLoader height='h-8' style='light'/>
            </div>
          ) : (
            iconsFloors && <TokenCarousel nfts={iconsFloors} network={network} />
          )}
        </div>
      </div>
    </div>
  )
}
