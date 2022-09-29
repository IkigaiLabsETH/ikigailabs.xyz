import { match } from 'ts-pattern'
import React, { FC, useEffect } from 'react'
import { map } from 'ramda'

import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { fetchSignatureDropNFT, selectNft, selectNftLoadingState } from './NFT.slice'
import { Loader } from '../../Loader'
import { NFTMetadataOwner } from '../../../common/types'

interface NFTProps {
  contract: string
  tokenId: string
}

export const NFT: FC<NFTProps> = ({ contract, tokenId }) => {
  const dispatch = useAppDispatch()

  const nft = useAppSelector(selectNft) as NFTMetadataOwner
  const nftLoadingState = useAppSelector(selectNftLoadingState)

  useEffect(() => {
    dispatch(fetchSignatureDropNFT({ contract, tokenId }))
  }, [contract, tokenId])

  const loader = (
    <div className="flex w-screen h-screen justify-center items-center bg-white">
      <Loader />
    </div>
  )

  const component = () => {
    const { image, name, description, attributes } = nft.metadata
    return (
      <div className="w-full bg-white flex items-center flex-col">
        <img src={image} title={name as string} className="w-full" />
        <div className="p-16 max-w-screen-2xl">
          <h1 className="boska text-[2rem] lg:text-[4rem] text-black mb-8">{name}</h1>
          <div className="flex bg-white text-black">
            <div className="w-2/3">
              <p className="text-lg text-black pr-16">{description}</p>
              {attributes && (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mr-8">
                  {map((attribute: { trait_type: string; value: string }) => (
                    <li
                      key={attribute.value}
                      className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4"
                    >
                      <div className="font-bold">{attribute.trait_type}</div>
                      <div>{attribute.value}</div>
                    </li>
                  ))(attributes as [])}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return match(nftLoadingState)
    .with('idle', () => loader)
    .with('loading', () => loader)
    .with('succeeded', component)
    .otherwise(() => <></>)
}
