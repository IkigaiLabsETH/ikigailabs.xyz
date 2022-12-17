import { propOr } from 'ramda'
import React, { FC, ReactNode } from 'react'
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
    <div className="flex relative flex-col lg:flex-row-reverse lg:h-screen items-center lg:min-h-[55rem]">
      <div
        className="w-full lg:w-1/2 h-96 lg:h-screen lg:min-h-[55rem] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${coverImage})` }}
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
