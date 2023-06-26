import React, { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { getDropTokenByContractAndTokenId, selectToken } from '../Drop'
import { MINT_PASSES } from '../../common/config'
import { showMintPassDetails } from './mintPasses.slice'
import { map } from 'ramda'
import { Button } from '../Button'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export const MintPasses: FC = () => {
  const dispatch = useAppDispatch()
  const foundersMintPassContractData = MINT_PASSES[0]
  const artistsMintPassContractData = MINT_PASSES[1]
  const collectorsMintPassContractData = MINT_PASSES[2]

  const { data: foundersData, status: foundersMintPassStatus } = useAppSelector(selectToken({ contract: foundersMintPassContractData[0], tokenId: foundersMintPassContractData[1], network: foundersMintPassContractData[2], type: 'edition-drop' }))
  const { data: artistsData, status: artistsMintPassStatus } = useAppSelector(selectToken({ contract: artistsMintPassContractData[0], tokenId: artistsMintPassContractData[1], network: artistsMintPassContractData[2], type: 'edition-drop' }))
  const { data: collectorsData, status: collectorsMintPassStatus } = useAppSelector(selectToken({ contract: collectorsMintPassContractData[0], tokenId: collectorsMintPassContractData[1], network: collectorsMintPassContractData[2], type: 'edition-drop' }))

  useEffect(() => {
    if (!foundersData) {
      dispatch(getDropTokenByContractAndTokenId.initiate({ contract: foundersMintPassContractData[0], tokenId: foundersMintPassContractData[1], network: foundersMintPassContractData[2], type: 'edition-drop' }))
    }
  }, [foundersData])

  useEffect(() => {
    if (!artistsData) {
      dispatch(getDropTokenByContractAndTokenId.initiate({ contract: artistsMintPassContractData[0], tokenId: artistsMintPassContractData[1], network: artistsMintPassContractData[2], type: 'edition-drop' }))
    }
  }, [artistsData])

  useEffect(() => {
    if (!collectorsData) {
      dispatch(getDropTokenByContractAndTokenId.initiate({ contract: collectorsMintPassContractData[0], tokenId: collectorsMintPassContractData[1], network: collectorsMintPassContractData[2], type: 'edition-drop' }))
    }
  }, [collectorsData])

  return (
    <div className="flex flex-col px-8 md:px-24 lg:px-48 bg-white text-black min-h-screen justify-center items-center">
      <div className="flex flex-row space-x-6 mt-32">
        <div className="w-full">
          <h1 className="text-[4rem] lg:text-[6rem] boska">Join the crew</h1>
          <p className="text-black text-xl lg:text-2xl">
            Ikigai Labs is a curatorial platform and community that helps bring incredible works of photography to
            discerning collectors. Mint Passes act as access cards to our community of digital artists and collectors as
            well as its exclusive events, including art and cultural trips, private auctions, gallery openings, and
            artist dinners. It unlocks priority mints from our roster of iconic and emerging artists!{' '}
          </p>

          {foundersData?.metadata && artistsData?.metadata && collectorsData?.metadata ? map(({ name }: { name: string }) => (
            <div
              key={name}
              className="text-[2rem] md:text-[4rem] lg:text-[5rem] leading-none boska font-bold border-b border-b-gray-400 py-5"
            >
              <Button
                onClick={() => dispatch(showMintPassDetails({ pass: name }))}
                className="w-full text-left flex justify-between items-center p-2 hover:text-red transition-colors"
              >
                {name} <ChevronRightIcon className="w-8" />
              </Button>
            </div>
          ))([foundersData?.metadata, artistsData?.metadata, collectorsData?.metadata]) : null}

          {/* <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Holders of The Founders Mint Pass NFTs have allowlist access to all our drops.
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Free gift of our upcoming limited edition Ikigai Labs Merch &amp; Print
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Access to Founders Mint Pass raffle giveaways on the Ikigai Labs Discord.
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Access to Collectors Club Discord channel only for Founders Mint Pass owners.
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Discount at all current, future, and affiliate Ikigai Labs co-work locations.
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Access to exclusive experiences, one example is our photogrammetry workshop.
            </li>
          </ul> */}
        </div>
      </div>
      <div className="flex flex-col items-center mt-16">
        {/* <p className='my-4 text-[4rem] italic text-black text-center'>The Metaverse is the digital customer experience.</p> */}
        <div className="flex flex-row space-x-5">
          {/* <Link href="" title="Spatial"><a>Spatial</a></Link>
          <Link href="" title="oncyber"><a>oncyber</a></Link> */}
        </div>
      </div>
    </div>
  )
}
