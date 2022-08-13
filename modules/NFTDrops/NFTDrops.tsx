import { map } from 'ramda'
import React, { FC } from 'react'

import { NFTDropSlider } from './NFTDropSlider/NFTDropSlider'
import { NFTDrops as contracts } from '../../common/config'

export const NFTDrops: FC = () => (
  <ul className="mt-16 ml-16 mb-16">
    {map((contract: string) => (
      <li key={contract} className="border-t-2 border-gray-800 px-16 py-16 first:border-t-0">
        <NFTDropSlider contract={contract} />
      </li>
    ))(contracts)}
  </ul>
)
