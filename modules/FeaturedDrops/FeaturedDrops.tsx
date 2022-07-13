import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { match } from 'ts-pattern'
import { useAppDispatch } from '../../common/redux/store'
import { map } from 'ramda'

import { ContractType } from '../../common/types'
import useWeb3 from '../../common/useWeb3'
import { Loader, Size } from '../Loader'
import { fetchFeaturedDrops, selectFeaturedDrops, selectLoadingState } from './featuredDrops.slice'
import { NFTDrop } from '../NFTDrop/NFTDrop'

interface FeaturedDropsProps {
  wallet: string
  contractType: ContractType
}

export const FeaturedDrops:FC<FeaturedDropsProps> = ({ wallet, contractType }) => {
  const dispatch = useAppDispatch()
  const NFTDrops = useSelector(selectFeaturedDrops)
  const loadingState = useSelector(selectLoadingState)
  const { getAllContractsByContractType } = useWeb3() 
  
  useEffect(() => {
    dispatch(fetchFeaturedDrops({ getAllContractsByContractType, wallet, contractType }))
  }, [])

  const loader = <Loader size={Size.s} />
  const component = (
    <ul className="w-full">
      {map(({ address, metadata }) => <li key={address}><NFTDrop address={address} metadata={metadata} /></li>)(NFTDrops)}
    </ul>
  )
  console.log(loadingState)
  return match(loadingState)
    .with('loading', () => loader)
    .with('succeeded', () => component)
    .otherwise(() => <></>)
}