import React, { FC, useState } from 'react'
import { Network } from '../../common/types'
import { TextField } from '../Form'
import { ReservoirActionButton } from '../ReservoirActionButton/ReservoirActionButton'
import { useAddress } from '@thirdweb-dev/react'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { listToken, selectCollectionTokenInteractionStatus } from '../Collection/Token/token.slice'
import { ethToWei } from '../../common/utils'

interface ListTokenProps {
  contract: string
  tokenId: string
  network: Network
  image: string
  name: string
}

export const ListToken: FC<ListTokenProps> = ({ contract, tokenId, network, image, name }) => {
  const [eth, setEth] = useState<string>('0')
  const address = useAddress()
  const dispatch = useAppDispatch()
  const { status: tokenInteractionStatus } = useAppSelector(selectCollectionTokenInteractionStatus)
  const onSetEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEth(e.target.value)
  }

  const onCreateAsk = () => {
    const wei = ethToWei(parseFloat(eth)).toString()
    return dispatch(listToken({ contract, tokenId, wei, address, network }))
  }

  return (
    <div className="flex flex-wrap flex-col md:flex-row w-full min-h-[380px]">
      <div
        className="w-full md:w-1/2 min-h-[100px] box-border bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="w-full md:w-1/2">
        <div className="p-4 lg:p-8 pb-0">
          <h1 className="text-sm md:text-xl lg:text-4xl">List item for sale:</h1>
        </div>
        <div className="p-4 lg:p-8">
          <TextField
            label="Set your price"
            id="listAmount"
            value={eth}
            onChange={onSetEth}
            type="number"
            valid={true}
            step={0.01}
            min={0}
          />

          <ReservoirActionButton
            onClick={onCreateAsk}
            loading={tokenInteractionStatus === 'pending'}
            label="Set your price"
            network={network}
          ></ReservoirActionButton>

          {tokenInteractionStatus === 'failed' && <p className="text-red mt-5">Failed to list item for sale</p>}
        </div>
      </div>
    </div>
  )
}
