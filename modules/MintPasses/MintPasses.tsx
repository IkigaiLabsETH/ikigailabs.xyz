import React, { FC, useEffect } from 'react'
import { map } from 'ramda'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { getDropTokenByContractAndTokenId, selectToken } from '../Drop'
import { TokenDefinition } from '../../common/types'
import Link from 'next/link'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

interface MintPassesProps {
  contracts: TokenDefinition[]
}

export const MintPasses: FC<MintPassesProps> = ({ contracts }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    map((mintpass: TokenDefinition) => {
      dispatch(getDropTokenByContractAndTokenId.initiate(mintpass))
    })(contracts)
  }, [dispatch, contracts])

  const { status: foundersStatus, data: foundersData } = useAppSelector(selectToken(contracts[0]))
  const { status: artistsStatus, data: artistsData } = useAppSelector(selectToken(contracts[1]))
  const { status: collectorsStatus, data: collectorsData } = useAppSelector(selectToken(contracts[2]))

  return (
    <div className="flex flex-col px-8 md:px-24 lg:px-48 bg-white text-black min-h-screen justify-center items-center">
      <div className="flex flex-row space-x-6 mt-32">
        <div className="w-full">
          <h1 className="text-[4rem] lg:text-[6rem] boska">Join the crew</h1>
          <p className="text-black text-xl lg:text-2xl">
            Ikigai Labs is a curator ial platform and community that helps bring incredible works of photography to
            discerning collectors. Mint Passes act as access cards to our community of digital artists and collectors as
            well as its exclusive events, including art and cultural trips, private auctions, gallery openings, and
            artist dinners. It unlocks priority mints from our roster of iconic and emerging artists!{' '}
          </p>

          <ul>
            {foundersStatus === QueryStatus.fulfilled ? (
              <li className="text-[2rem] md:text-[4rem] lg:text-[5rem] leading-none boska font-bold border-b border-b-gray-400 py-10">
                <Link
                  href={`/${contracts[0].network}/drop/${contracts[0].contract}`}
                  className="flex justify-between w-full"
                >
                  <div>
                    {foundersData?.metadata?.name}
                    <p className="lg:text-2xl font-normal text-gray-600 mt-3 pl-1 text-lg">
                      {foundersData?.metadata?.description}
                    </p>
                  </div>{' '}
                  <ChevronRightIcon className="w-24 h-24 inline-block" />
                </Link>
              </li>
            ) : null}
            {artistsStatus === QueryStatus.fulfilled ? (
              <li className="text-[2rem] md:text-[4rem] lg:text-[5rem] leading-none boska font-bold border-b border-b-gray-400 py-10">
                <Link
                  href={`/${contracts[0].network}/drop/${contracts[0].contract}`}
                  className="flex justify-between w-full"
                >
                  <div>
                    {artistsData?.metadata?.name}
                    <p className="lg:text-2xl font-normal text-gray-600 mt-3 pl-1 text-lg">
                      {artistsData?.metadata?.description}
                    </p>
                  </div>{' '}
                  <ChevronRightIcon className="w-24 h-24 inline-block" />
                </Link>
              </li>
            ) : null}
            {collectorsStatus === QueryStatus.fulfilled ? (
              <li className="text-[2rem] md:text-[4rem] lg:text-[5rem] leading-none boska font-bold border-b border-b-gray-400 py-10">
                <Link
                  href={`/${contracts[0].network}/drop/${contracts[0].contract}`}
                  className="flex justify-between w-full"
                >
                  <div>
                    {collectorsData?.metadata?.name}
                    <p className="lg:text-2xl text-lg font-normal text-gray-600 mt-3 pl-1">
                      {collectorsData?.metadata?.description}
                    </p>
                  </div>{' '}
                  <ChevronRightIcon className="w-24 h-24 inline-block" />
                </Link>
              </li>
            ) : null}
          </ul>
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
