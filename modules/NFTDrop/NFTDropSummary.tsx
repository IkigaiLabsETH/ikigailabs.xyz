import React, { FC } from 'react'

import { ContractMetadata } from '../../common/types'
import { Eyebrow } from '../Eyebrow'
import { Link } from '../Link'

interface NFTDropSummaryProps {
  address: string
  metadata: ContractMetadata
}

export const NFTDropSummary: FC<NFTDropSummaryProps> = ({ address, metadata: { name, description, image } }) => (
  <div className="flex relative flex-col lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch border-t-gray-800 border-t border-b border-b-black">
    <div
      className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover sm:max-lg:h-96"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
    <div className="w-full lg:w-1/2 p-16">
      <Eyebrow>Exclusive</Eyebrow>
      <h2 className="text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska">{name}</h2>
      <p className="my-8 satoshi text-xl leading-relaxed">{description}</p>
      {
        <div className="flex flex-row w-full mt-16">
          <Link href={`drop/${address}`} title="Visit drop">
            Visit Drop &rarr;
          </Link>
        </div>
      }
    </div>
  </div>
)
