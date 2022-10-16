import { isNil, map } from 'ramda'
import React, { ChangeEvent, FC } from 'react'
import { match } from 'ts-pattern'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { joinAllowlist, selectAllowlistLoadingState, selectTokens, showMintPassDetails } from './mintPasses.slice'

export const MintPasses: FC = () => {
  const dispatch = useAppDispatch()
  const allowlistLoadingState = useAppSelector(selectAllowlistLoadingState)
  const { data: mintPasses, status: mintPassesStatus, error: mintPassesError } = useAppSelector(selectTokens)
  const { address, connect } = useWallet()

  const join = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (address) {
      dispatch(joinAllowlist({ address }))
    }
  }

  const handleConnect = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    connect().then(console.log)
  }

  const getButton = match(address)
    .when(isNil, () => <Button onClick={handleConnect} label="Connect" />)
    .otherwise(() => <Button onClick={join} label="Join allowlist" />)

  const cta = match(allowlistLoadingState)
    .with('idle', () => getButton)
    .with('loading', () => <Loader />)
    .with('succeeded', () => <div>Epic! You're all set.</div>)
    .with('failed', () => <div>Whoops, something went wrong. Are you sure you aren't already on the list?</div>)
    .exhaustive()

  return (
    <div className="flex flex-col px-8 md:px-24 lg:px-48 bg-white text-black min-h-screen justify-center items-center">
      <div className="flex flex-row space-x-6 mt-32">
        <div className="w-full">
          <h1 className="text-[4rem] lg:text-[6rem] boska">Join the crew</h1>
          <p className="text-black text-xl lg:text-2xl">
            LiveTheLifeTV is a curatorial platform and community that helps bring incredible works of photography to
            discerning collectors. Mint Passes act as access cards to our community of digital artists and collectors as
            well as its exclusive events, including art and cultural trips, private auctions, gallery openings, and
            artist dinners. It unlocks priority mints from our roster of iconic and emerging artists!{' '}
          </p>

          {map(({ name }: { name: string }) => (
            <div
              key={name}
              className="text-[2rem] md:text-[4rem] lg:text-[5rem] leading-none boska font-bold border-b border-b-gray-400 py-5"
            >
              <button
                onClick={() => dispatch(showMintPassDetails({ pass: name }))}
                className="w-full text-left flex justify-between items-center p-2 hover:text-red transition-colors"
              >
                {name} <ChevronRightIcon className="w-8" />
              </button>
            </div>
          ))(mintPasses)}

          {/* <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
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
          </ul> */}
          <div className="flex font-extrabold justify-center items-center mt-16">{cta}</div>
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
