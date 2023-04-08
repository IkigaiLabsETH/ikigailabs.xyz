import { match } from 'ts-pattern'
import React, { FC, useEffect } from 'react'
import { map } from 'ramda'

import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { fetchDropTokenMetadata, selectDropTokenById, selectDropTokenStatus } from './token.slice'
import { Loader } from '../../Loader'
import { fetchDropMetadata } from '../drop.slice'

interface NFTProps {
  contract: string
  tokenId: string
}

export const NFT: FC<NFTProps> = ({ contract, tokenId }) => {
  const token = useAppSelector(selectDropTokenById(contract, tokenId)) as any
  const tokenLoadingStatus = useAppSelector(selectDropTokenStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!token) {
      dispatch(fetchDropTokenMetadata({ contract, tokenId }))
    }
  }, [contract, tokenId])

  const loader = (
    <div className="flex w-screen h-screen justify-center items-center bg-yellow">
      <Loader />
    </div>
  )

  const component = () => {
    const { image, name, description, attributes } = token.metadata
    return (
      <div className="w-full bg-yellow flex items-center flex-col">
        <img src={image} title={name as string} className="w-full" />
        <div className="p-16 max-w-screen-2xl">
          <h1 className="boska text-[3rem] lg:text-[8rem] text-black my-16 -ml-16">{name}</h1>
          <div className="flex bg-yellow text-black">
            <div className="w-2/3">
              <p className="text-2xl text-black pr-16 mb-16">{description}</p>
              {attributes && (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mr-8">
                  {map((attribute: { trait_type: string; value: string }) => (
                    <li
                      key={attribute.value}
                      className="border-2 border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4"
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

  return match(tokenLoadingStatus)
    .with('idle', () => loader)
    .with('pending', () => loader)
    .with('succeeded', component)
    .otherwise(() => <></>)
}
