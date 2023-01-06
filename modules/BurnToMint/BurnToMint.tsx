import { isNil } from 'ramda'
import React, { ChangeEvent, FC } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch } from '../../common/redux/store'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { burnToMint } from './burnToMint.slice'

interface BurnToMintProps {
  elevenFiftyFiveContractAddress: string
  sevenTwentyOneContractAddress: string
}

export const BurnToMint:FC<BurnToMintProps> = ({ elevenFiftyFiveContractAddress, sevenTwentyOneContractAddress }) => {
  const dispatch = useAppDispatch()
  const { address, connect } = useWallet()

  const handleConnect = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    connect()
  }

  const handleBurnToMint = async (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(burnToMint({ address, elevenFiftyFiveContractAddress, sevenTwentyOneContractAddress, tokenId: '0' }))
  }
  
  return (
    <div className='flex relative justify-center items-center lg:min-h-screen bg-white text-black min'>
      <div className='w-full lg:w-2/3 p-16 flex justify-center items-center flex-col'>
        <h1 className="boska lg:text-[6rem]">Token Swap</h1>
        <p className='text-gray-800 text-xl text-justify'>
          Swap your Dimitri Artwork
        </p>
        {match(address)
          .when(isNil, () => <Button onClick={handleConnect} label="Connect" />)
          .otherwise(() => <Button onClick={handleBurnToMint} label="Start token swap" />)
        }
        <div className="border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-black mt-8">
          <video autoPlay={true} className="" controls={true} controlsList="nodownload" loop={true} muted={true} playsInline={true} poster="https://i.seadn.io/gcs/files/c0272ec89d3bd2e950c5de4ea4aba9d3.jpg?w=500&amp;auto=format" preload="metadata" style={{objectFit: 'contain', borderRadius: 'initial' }}><source src="https://openseauserdata.com/files/a5571cf9ab8fe256ad77ea34b8fe6a05.mp4#t=0.001" type="video/mp4" /></video>
        </div>
      </div>
    </div>
  )
}