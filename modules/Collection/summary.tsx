import React, { FC } from 'react'

import { ContractMetadata } from '../../common/types'
import { Eyebrow } from '../Eyebrow'
import { Link } from '../Link'

interface CollectionSummaryProps {
  address: string
  metadata: ContractMetadata
}

export const CollectionSummary: FC<CollectionSummaryProps> = ({ address, metadata: { name, description, image } }) => (
  <div className="flex relative flex-col lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch">
    <div
      className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover sm:max-lg:h-96"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
    <div className="w-full lg:w-1/2 p-16 max-w-3xl">
      <Eyebrow>Exclusive</Eyebrow>
      <h2 className="text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska">{name}</h2>
      <p className="my-8 satoshi text-xl leading-relaxed">{description}</p>
      {/* <div className="flex flex-row w-full mt-16">
        <Link href={`drops/${address}`} title="Visit collection">
          Visit Collection &rarr;
        </Link>
      </div> */}
    </div>
  </div>
)
