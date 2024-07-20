import React, { FC } from 'react'
import { map } from 'ramda'

import { Eyebrow } from '../Eyebrow'
import { Button } from '../Button'
import { Network } from '../../common/types'

interface FeaturedToken {
  image: string
  contract: string
  network: string
  tokenId: string
  name: string
  collectionName: string
  description: string
}

interface FeaturedProps {
  features: FeaturedToken[]
}

export const Featured: FC<FeaturedProps> = ({ features }) => {
  return (
    <div>
      {map(({ image, contract, tokenId, name, description, collectionName, network }: FeaturedToken) => (
        <div
          className="flex relative flex-col even:lg:flex-row odd:lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch"
          key={`${contract}:${tokenId}`}
        >
          <div
            className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover h-96 lg:h-auto"
            style={{ backgroundImage: `url('${image}')` }}
          ></div>
          <div className="w-full lg:w-1/2 p-16 flex flex-col justify-center">
            <Eyebrow>{collectionName}</Eyebrow>
            <h2 className="text-[2rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold tracking-tight boska break-words text-black">
              {name}
            </h2>
            <p className="my-8 mt-0 satoshi text-lg lg:text-2xl leading-relaxed max-w-3xl text-black">{description}</p>
            <div className="block mt-4">
              <Button href={`/${network}/${contract}/${tokenId}`}>Visit artwork</Button>
            </div>
          </div>
        </div>
      ))(features)}
    </div>
  )
}
