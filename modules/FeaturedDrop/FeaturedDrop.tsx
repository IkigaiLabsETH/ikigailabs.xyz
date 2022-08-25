import React, { FC, useEffect } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import useWeb3 from '../../common/useWeb3'
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
  const { getNFTDrop } = useWeb3()

  useEffect(() => {
    dispatch(fetchFeaturedDrop({ getNFTDrop, contract }))
  }, [])

  const loader = <Loader size={Size.s} />
  const component = (
    <div className="h-screen flex w-full items-center justify-center">
      <NFTDropSummary address={contract} metadata={featuredDrop} />
    </div>
  )

  return match(loadingState)
    .with('loading', () => loader)
    .with('succeeded', () => component)
    .otherwise(() => <></>)
}
