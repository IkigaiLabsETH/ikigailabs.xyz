import React, { ChangeEvent, FC } from 'react'

import { useAppDispatch } from '../../common/redux/store'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { joinAllowlist } from './FoundersMintPass.slice'

export const FoundersMintPass: FC = () => {
  const dispatch = useAppDispatch()
  const { address, connect } = useWallet()

  const join = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (address) {
      dispatch(joinAllowlist({ address }))
    }
  }

  const handleConnect = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    connect()
  }

  const cta = address ? (
    <Button onClick={join} label="Join allowlist" />
  ) : (
    <Button onClick={handleConnect} label="Connect &amp; Join allowlist" />
  )

  return (
    <div className="flex flex-col px-8 md:px-24 lg:px-48 bg-white text-black min-h-screen">
      <div className="flex flex-row space-x-6 mt-32">
        <div className="w-full">
          <h1 className="text-[4rem] lg:text-[6rem] boska">Founders Mint Pass</h1>
          <p className="text-black text-xl lg:text-2xl">
            LiveTheLifeTV is a curatorial platform and community that helps bring incredible works of photography to
            discerning collectors. The Founders Mint Pass acts as an access card to our community of digital artists and
            collectors as well as its exclusive events, including art and cultural trips, private auctions, gallery
            openings, and artist dinners. It unlocks priority mints from our roster of iconic and emerging artists! NFT
            is the product.{' '}
          </p>

          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Holders of The Founders Mint Pass NFTs have allowlist access to all our drops.
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Free gift of our upcoming limited edition LiveTheLifeTV Merch &amp; Print
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Access to Founders Mint Pass raffle giveaways on the LiveTheLifeTV Discord.
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Access to Collectors Club Discord channel only for Founders Mint Pass owners.
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Discount at all current, future, and affiliate LiveTheLifeTV co-work locations.
            </li>
            <li className="text-lg p-4 border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:border-red hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(127,29,29,1)] transition-all">
              Access to exclusive experiences, one example is our photogrammetry workshop.
            </li>
          </ul>
          <div className="flex font-extrabold justify-center items-center mt-16">{cta}</div>
        </div>
        {/* <div className='w-1/3'>
          <div className='border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
            <video controlsList="nodownload" poster="https://openseauserdata.com/files/c0272ec89d3bd2e950c5de4ea4aba9d3.jpg" preload="metadata"><source src="https://openseauserdata.com/files/a5571cf9ab8fe256ad77ea34b8fe6a05.mp4#t=0.001" type="video/mp4"/></video>
          </div>
        </div> */}
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
