import React, { FC, use, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { GEMS_ON_THE_FLOOR_COLLECTION_SET_ID } from '../../common/config'
import { collectionsApi, selectCollectionFloorsByCollectionSetId, selectCollectionsBySetId } from '../Collections/collections.api'
import { Collection, NFT, Network, Token } from '../../common/types'
import { equals, join, map, pipe, pluck } from 'ramda'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { SkeletonLoader } from '../SkeletonLoader'
import { collectionApi } from '../Collection'
import { NFTGrid } from '../NFTGrid'

interface GemsOnTheFloorProps {

}

export const GemsOnTheFloor:FC<GemsOnTheFloorProps> = ({}) => {
  const dispatch = useAppDispatch()
  const network = Network.MAINNET
  const { data: floors, status } = useAppSelector(selectCollectionFloorsByCollectionSetId({ collectionSetId: GEMS_ON_THE_FLOOR_COLLECTION_SET_ID }))

  useEffect(() => {
    if (GEMS_ON_THE_FLOOR_COLLECTION_SET_ID) {
      dispatch(collectionsApi.endpoints.getCollectionFloorsByCollectionSetId.initiate({ collectionSetId: GEMS_ON_THE_FLOOR_COLLECTION_SET_ID }))
    }
  }, [dispatch, network])

  return (
    <div>
      <div>
        <h1 className='flex items-center boska w-full pt-16 pb-8 text-[6rem] text-black justify-center text-center'>Gems on the <br/>floor</h1>
      </div>
      <div>
        {equals(status, QueryStatus.pending) ?
          <div className='grid grid-cols-4 gap-4 mb-8'>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div> : 
          (floors && <NFTGrid nfts={floors} network={Network.MAINNET}/>)
        }
      </div>
    </div>
  )
}
