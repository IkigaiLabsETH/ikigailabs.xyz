import React, { FC } from 'react'
import { Eyebrow } from '../Eyebrow'
import Markdown from 'react-markdown'
import { replaceImageResolution } from '../../common/utils'

interface AmbassadorHeaderProps {
  name: string
  intro: string
  coverImage: string
}

export const AmbassadorHeader:FC<AmbassadorHeaderProps> = ({name, intro, coverImage}) => {
   return (
    <div className="flex relative flex-col lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch collection-header bg-gradient">
      <div
        className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover h-96 lg:h-auto"
        style={{ backgroundImage: `url(${replaceImageResolution(2000)(coverImage)})` }}
      ></div>
      <div className="w-full lg:w-1/2 p-16 max-w-3xl flex justify-center flex-col">
        <Eyebrow>Exclusive</Eyebrow>
        <h2 className="text-[2rem] md:text-[4rem] lg:text-[5rem] leading-none font-bold mb-4 tracking-tight boska break-words">
          {name}
        </h2>
        <div className="my-8 satoshi text-lg lg:text-2xl leading-relaxed">
          <Markdown>{intro}</Markdown>
        </div>
      </div>
    </div>
   )
}
