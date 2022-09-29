import React, { FC, useEffect } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { Loader, Size } from '../Loader'
import { fetchFeaturedDrop, selectfeaturedDrop, selectLoadingState } from './featuredDrop.slice'
import { NFTDropSummary } from '../NFTDrop'

interface featuredDropProps {
  contract: string
}

export const FeaturedDrop: FC<featuredDropProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const featuredDrop = useAppSelector(selectfeaturedDrop)
  const loadingState = useAppSelector(selectLoadingState)

  useEffect(() => {
    dispatch(fetchFeaturedDrop({ contract }))
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
    .with('loading', () => loader)
    .with('succeeded', () => component)
    .otherwise(() => <></>)
}
