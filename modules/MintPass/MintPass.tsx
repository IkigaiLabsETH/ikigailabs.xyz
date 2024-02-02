import { useAddress } from '@thirdweb-dev/react'
import React, { FC } from 'react'
import Markdown from 'react-markdown'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { Button } from '../Button'
import { claim, selectToken } from '../MintPasses/mintPasses.slice'
import { selectedNetwork } from '../NetworkSelector'

interface MintPassProps {
  pass: string
}

export const MintPass: FC<MintPassProps> = ({ pass }) => {
  const { name, image, description, contract, tokenId } = useAppSelector(selectToken(pass))
  const dispatch = useAppDispatch()
  const address = useAddress()
  const network = useAppSelector(selectedNetwork)

  const claimPass = () => {
    dispatch(
      claim({
        contract,
        tokenId,
        address,
        amount: 1,
        network,
      }),
    )
  }

  return (
    <div className="bg-white">
      <img src={image} title={name} />
      <div className="m-8 mb-0 p-8 pb-16 bg-white">
        <div className="flex justify-between">
          <h1 className="boska">{name}</h1>
          <Button onClick={claimPass}>Claim</Button>
        </div>
        <div className="pt-2">
          <div className="text-black"><Markdown>{description}</Markdown></div>
        </div>
      </div>
    </div>
  )
}
