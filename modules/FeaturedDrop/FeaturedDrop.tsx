import React, { FC, useEffect } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { Loader, Size } from '../Loader'
import { NFTDropSummary } from '../NFTDrop'
import { getDropByContract, selectDrop } from '../Drop'
import { selectedNetwork } from '../NetworkSelector'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

interface featuredDropProps {
  contract: string
}

export const FeaturedDrop: FC<featuredDropProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const network = useAppSelector(selectedNetwork)
  const { data: featuredDrop, status: loadingState } = useAppSelector(
    selectDrop({ contract, network, type: 'nft-drop' }),
  )

  useEffect(() => {
    dispatch(getDropByContract.initiate({ contract, network, type: 'nft-drop' }))
  }, [])

  const loader = (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loader size={Size.s} color="white" />
    </div>
  )
  const component = (
    <div className="lg:h-screen flex w-full items-center justify-center">
      <NFTDropSummary address={contract} metadata={featuredDrop} />
    </div>
  )

  return match(loadingState)
    .with(QueryStatus.pending, () => loader)
    .with(QueryStatus.fulfilled, () => component)
    .otherwise(() => <></>)
}
