import { map } from 'ramda'
import React, { FC } from 'react'

import { NFTDropSlider } from './NFTDropSlider/NFTDropSlider'
import { NFTDrops as contracts } from '../../common/config'

export const NFTDrops: FC = () => (
  <div className="max-w-screen-2xl mx-auto">
    <ul className="mt-16 ml-16 mb-16 ">
      {map((contract: string) => (
        <li key={contract} className="border-t-2 border-gray-800 px-28 py-28 first:border-t-0 pr-8 pl-0">
          <NFTDropSlider contract={contract} />
        </li>
      ))(contracts)}
    </ul>
  </div>
)
