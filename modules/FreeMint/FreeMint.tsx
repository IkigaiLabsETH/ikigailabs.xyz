import React, { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { Button } from '../Button'
import { Eyebrow } from '../Eyebrow'
import { Network } from '../../common/types'
import { getDropMetadataByContract, selectDropMetadata } from '../Drop'

interface FreeMintProps {
  contract: string
  tokenId?: number
  network: Network
}

export const FreeMint: FC<FreeMintProps> = ({ contract, network }) => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectDropMetadata({ contract, network, type: 'nft-drop' }))

  useEffect(() => {
    dispatch(getDropMetadataByContract.initiate({ contract, network, type: 'nft-drop' }))
  }, [contract, dispatch, network])

  return (
    <div className="flex relative flex-col lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch">
      <div
        className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover sm:max-lg:h-96"
        style={{ backgroundImage: `url(${data?.image})` }}
      ></div>
      <div className="w-full lg:w-1/2 p-16">
        <Eyebrow>Exclusive Free Mint</Eyebrow>
        <h2 className="text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska">{data?.name}</h2>
        <p className="my-8 satoshi text-xl leading-relaxed">{data?.description}</p>
        <Button href={`/${network}/drop/${contract}`}>Mint for free</Button>
      </div>
    </div>
  )
}
