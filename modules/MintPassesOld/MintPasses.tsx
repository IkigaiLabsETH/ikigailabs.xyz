import { map } from 'ramda'
import React, { FC } from 'react'
import { MINT_PASSES } from '../../common/config'
import { FreeMint } from '../FreeMint'

export const MintPasses:FC = () => {
  return (
    <div>
      <div className="md:grid-rows-3">
      {
        map(([contract, tokenId]: (string | number)[]) => (
          <div key={contract}>
            <FreeMint contract={contract as string} tokenId={tokenId as number} />
          </div>
        ))(MINT_PASSES)
      }
      </div>
    </div>
  )
}
