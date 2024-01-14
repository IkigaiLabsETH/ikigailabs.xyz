import React, { FC, use, useEffect, useState } from 'react'
import { Network, Option } from '../../common/types'
import { TextField } from '../Form'
import { ReservoirActionButton } from '../ReservoirActionButton/ReservoirActionButton'
import { useAddress } from '@thirdweb-dev/react'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { listToken, selectCollectionTokenInteractionStatus } from '../Collection/Token/token.slice'
import { ethToWei } from '../../common/utils'
import Image from 'next/image'
import { Selector } from '../Form/Selector'
import { SUPPORTED_CURRENCY } from '../../common/constants/constants'

interface ListTokenProps {
  contract: string
  tokenId: string
  network: Network
  image: string
  name: string
}

export const ListToken: FC<ListTokenProps> = ({ contract, tokenId, network, image, name }) => {
  console.log({ contract, tokenId, network, image, name })
  const [eth, setEth] = useState<string>('0')
  const address = useAddress()
  const dispatch = useAppDispatch()
  const { status: tokenInteractionStatus } = useAppSelector(selectCollectionTokenInteractionStatus)
  const onSetEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEth(e.target.value)
  }
  const [selectedCurrency, setSelectedCurrency] = useState<Option>(SUPPORTED_CURRENCY[0]) 

  const onCreateAsk = () => {
    const wei = ethToWei(parseFloat(eth)).toString()
    return dispatch(listToken({ contract, tokenId, wei, address, network, currency: SUPPORTED_CURRENCY[0].id }))
  }

  useEffect(() => {
    console.log(contract)
  }, [contract])

  return (
    <div className="h-full">
      <div className="pt-8 pb-2">
        <h1 className="text-2xl lg:text-6xl">List for sale:</h1>
      </div>
      <div className="flex flex-row">
        <div className='w-full md:w-1/2 hidden md:flex pr-10'>
          <Image src={image} alt={name} width={800} height={800} className='border-black border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full relative'/>
        </div>
        <div className="w-full md:w-1/2 bg-gray-100 h-full">
          <div className="p-4 lg:p-8">
            <div className='w-full flex flex-column flex-wrap lg:flex-row items-center'>
              <div className='w-full md:w-3/4'>
                <TextField
                  label="Enter a price"
                  id="listAmount"
                  value={eth}
                  onChange={onSetEth}
                  type="number"
                  valid={true}
                  step={0.01}
                  min={0}
                />
              </div>
              {/* <div className='md:pt-6 md:pl-4 text-xl w-full mb-5 md:w-1/4 md:mt-5'>
                <Selector options={SUPPORTED_CURRENCY} selected={selectedCurrency} onChange={setSelectedCurrency}/>
              </div> */}
            </div>
            <ReservoirActionButton
              onClick={onCreateAsk}
              loading={tokenInteractionStatus === 'pending'}
              label="Set your price"
              network={network}
            ></ReservoirActionButton>

            {tokenInteractionStatus === 'failed' && <p className="text-red mt-5">Failed to list for sale</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
