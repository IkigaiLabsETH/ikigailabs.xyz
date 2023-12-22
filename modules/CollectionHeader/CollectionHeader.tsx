import { propOr } from 'ramda'
import React, { FC, ReactNode } from 'react'
import { replaceImageResolution } from '../../common/utils'
import { CollectionStat } from '../CollectionStat'
import { Eyebrow } from '../Eyebrow'

interface CollectionHeaderProps {
  eyebrow: string
  children: ReactNode
  coverImage: string
  name: string
  description: string
}

export const CollectionHeader: FC<CollectionHeaderProps> = ({ children, eyebrow, coverImage, name, description }) => (
  <>
    <div className="flex relative flex-col lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch">
      <div
        className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover sm:max-lg:h-96"
        style={{ backgroundImage: `url(${replaceImageResolution(2000)(coverImage)})` }}
      ></div>
      <div className="w-full lg:w-1/2 p-16 max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska">{name}</h2>
        <p className="my-8 satoshi text-xl leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  </>
)
