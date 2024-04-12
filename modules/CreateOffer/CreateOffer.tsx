import React, { FC, useEffect, useState } from 'react'
import { addMonths, addSeconds } from 'date-fns/fp'
import Image from 'next/image'
import Flatpickr from 'react-flatpickr'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { createBid, selectCollectionTokenInteractionStatus } from '../Collection/Token/token.slice'
import { ethToWei } from '../../common/utils'
import { EXPIRATION_DEFAULTS, SUPPORTED_CURRENCY } from '../../common/constants/constants'
import { Network } from '../../common/types'
import { TextField } from '../Form'
import { ReservoirActionButton } from '../ReservoirActionButton/ReservoirActionButton'
import { Listbox } from '../Listbox'
import { Toggle } from '../Toggle'
import { useWallet } from '../../common/useWallet'

interface CreateOfferProps {
  contract: string
  tokenId: string
  network: Network
  image: string
  name: string
}

export const CreateOffer: FC<CreateOfferProps> = ({ contract, tokenId, network, image, name }) => {
  const [eth, setEth] = useState<string>('0')
  const { address } = useWallet()
  const dispatch = useAppDispatch()
  const { status: tokenInteractionStatus, data } = useAppSelector(selectCollectionTokenInteractionStatus)
  const [expiration, setExpiration] = useState<Date>(addMonths(1)(new Date()))
  const [platforms, setPlatforms] = useState<string[]>(['ikigai'])

  const onSetEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEth(e.target.value)
  }

  const onCreateBid = () => {
    const wei = ethToWei(parseFloat(eth)).toString()
    return dispatch(
      createBid({
        contract,
        tokenId,
        wei,
        address,
        network,
        currency: SUPPORTED_CURRENCY[0].id,
        expiration,
        platforms,
      }),
    )
  }

  const setEndDate = (item: any) => {
    const newDate = addSeconds(item.id)(new Date())
    setExpiration(newDate)
  }

  const setDate = (date: any) => {
    setExpiration(date[0])
  }

  const setPlatform = (platform: string) => (enabled: boolean) => {
    if (enabled) {
      setPlatforms([...platforms, platform])
    } else {
      setPlatforms(platforms.filter(p => p !== platform))
    }
  }

  return (
    <div className="h-full">
      <div className="pt-8 pb-2">
        <h1 className="text-2xl lg:text-6xl">Make offer:</h1>
      </div>
      <div className="flex flex-row">
        <div className="w-full md:w-1/2 hidden md:flex pr-10">
          <Image
            src={image}
            alt={name}
            width={800}
            height={800}
            className="border-black border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full relative"
          />
        </div>
        <div className="w-full md:w-1/2 bg-gray-100 h-full">
          <div className="p-4 lg:p-8">
            <div className="w-full flex flex-column flex-wrap lg:flex-row items-center">
              <div className="w-full md:w-3/4">
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
              <div className="md:pt-6 md:pl-4 text-xl w-full mb-5 md:w-1/4 md:mt-5 font-bold">ETH</div>
              {/* <div className='md:pt-6 md:pl-4 text-xl w-full mb-5 md:w-1/4 md:mt-5'>
                <Selector options={SUPPORTED_CURRENCY} selected={selectedCurrency} onChange={setSelectedCurrency}/>
              </div> */}
            </div>
            <div className="mb-6">
              <div className="text-lg font-bold mb-2 ">Expiration date:</div>
              <div className="grid grid-cols-2">
                <div className="mr-2">
                  <Listbox label="" items={EXPIRATION_DEFAULTS} onSelect={setEndDate} defaultItem={5} />
                </div>
                <div className="flex flex-row items-center">
                  <Flatpickr data-enable-time onChange={setDate} options={{ minDate: new Date() }} value={expiration} />
                  <div className="-translate-x-full pr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-lg font-bold mb-2">Where would you like to make an offer?</div>
              <div className="mt-6">
                <Toggle
                  label="Ikigai Labs"
                  description="Make offer on the Ikigai Labs marketplace "
                  disabled={true}
                  initialState={true}
                  onToggle={setPlatform('ikigai')}
                />
                <Toggle
                  label="Open Sea"
                  description="Make offer on the Open Sea marketplace"
                  initialState={false}
                  onToggle={setPlatform('opensea')}
                />
              </div>
            </div>
            <ReservoirActionButton
              onClick={onCreateBid}
              loading={tokenInteractionStatus === 'pending'}
              disabled={!address}
              label="Make Offer"
              network={network}
            ></ReservoirActionButton>

            {tokenInteractionStatus === 'failed' && (
              <p className="text-red mt-5 flex w-full justify-center font-bold">Failed to make offer</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
