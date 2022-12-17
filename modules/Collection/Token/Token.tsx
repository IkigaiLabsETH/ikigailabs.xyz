import { match } from 'ts-pattern'
import React, { FC, useEffect } from 'react'
import { isEmpty, map, path, pathOr, prop, propOr } from 'ramda'

import { useAppSelector } from '../../../common/redux/store'
import { Loader } from '../../Loader'
import { selectCollectionToken } from './token.selectors'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

interface TokenProps {
  contract: string
  tokenId: string
}

export const Token: FC<TokenProps> = ({ contract, tokenId }) => {
  const { data: token, status: tokenStatus } = useAppSelector(selectCollectionToken({ contract, tokenId }))
  const loader = (
    <div className="flex w-screen h-screen justify-center items-center bg-white">
      <Loader />
    </div>
  )

  const component = () => {
    const {
      token: { image, name, description, attributes, owner, contract, tokenId, kind },
      market: { floorAsk, topBid },
    } = token as any
    const floorPriceSource = prop('source')(floorAsk)
    const topBidSource = prop('source')(topBid)
    return (
      <div className="w-full bg-white flex items-center flex-col">
        <img src={image} title={name as string} className="w-full" />
        <div className="p-16 max-w-screen-2xl">
          <div className="mb-8">
            <h1 className="boska text-[2rem] lg:text-[4rem] text-black mb-0">{name}</h1>
          </div>
          <div className="flex bg-white text-black">
            <div className="w-2/3">
              <p className="text-lg text-black pr-16">{description}</p>
              <div className="border-t-2 mt-8 border-black mr-16">
                <ul className="text-gray-800 text-xs p-4 pl-0">
                  <li className="mb-1">
                    <span className="font-bold">Contract:</span> {contract}
                  </li>
                  <li className="mb-1">
                    <span className="font-bold">Token Id:</span> {tokenId}
                  </li>
                  <li className="mb-1">
                    <span className="font-bold">Standard:</span> {kind}
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-1/3">
              <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
                <div className="grid grid-cols-2 gap-5 mb-8">
                  <div>
                    <div className="font-bold">Floor price:</div>
                    {pathOr('—', ['price', 'amount', 'native'])(floorAsk)}
                    {isEmpty(floorPriceSource) ? '' : `on ${propOr('', 'name')(floorPriceSource)}`}
                  </div>
                  <div>
                    <div className="font-bold">Top bid:</div>
                    {pathOr('—', ['price', 'amount', 'native'])(topBid)}
                    {isEmpty(topBidSource) ? '' : `on ${propOr('', 'name')(topBidSource)}`}
                  </div>
                </div>
                <p className="text-s text-black pl-1 mb-0">
                  <span className="font-bold">Owner:</span> {owner}
                </p>
              </div>
              {attributes && (
                <ul className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                  {map(
                    (attribute: {
                      key: string
                      value: string
                      floorAskPrice: number | null
                      onSaleCount: number
                      tokenCount: number
                    }) => (
                      <li
                        key={attribute.value}
                        className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4"
                      >
                        <div className="flex justify-between">
                          <div className="font-bold">{attribute.key}</div>
                        </div>
                        <div>{attribute.value}</div>
                        <div className="flex justify-between text-xs mt-2">
                          <div>Floor Price: {attribute.floorAskPrice ? attribute.floorAskPrice : '—'}</div>
                          <div>On sale: {attribute.onSaleCount}</div>
                        </div>
                      </li>
                    ),
                  )(attributes as [])}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return match(tokenStatus)
    .with(QueryStatus.uninitialized, () => loader)
    .with(QueryStatus.pending, () => loader)
    .with(QueryStatus.fulfilled, component)
    .otherwise(() => <></>)
}
