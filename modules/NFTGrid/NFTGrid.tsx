import { isNil, map } from 'ramda'
import React, { FC } from 'react'

import { NFT, Network } from '../../common/types'
import Image from 'next/image'
import { useAppDispatch } from '../../common/redux/store'
import { showListToken } from '../Collection/Token/token.slice'
import Link from 'next/link'

interface NFTGridProps {
  nfts: NFT[]
  network: Network
}

export const NFTGrid: FC<NFTGridProps> = ({ nfts, network }) => {
  const dispatch = useAppDispatch()
  const onListToken = ({ network, contract, tokenId, name, media, description, image }) => {
    dispatch(showListToken({ network, contract, tokenId, name, media, description, image }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-2xl p-8 pt-0 text-black">
      {map(({ token: { contract, tokenId, name, media, description, image, lastSale }, ownership, market }: NFT) => (
        <Link
          href={`/${network}/${contract}/${tokenId}`}
          title={name}
          key={`${contract}-${tokenId}`}
          className="max-w-1/2 font-bold justify-end self-end hover:text-black"
        >
          <div className="border-2 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="overflow-clip">
              {image && (
                <Image
                  src={image}
                  alt={name}
                  width="512"
                  height="512"
                  className="w-full h-full object-cover aspect-square"
                />
              )}
            </div>
            <div className="p-4 flex justify-between flex-col min-h-[10rem]">
              <div>
                <h5 className="font-bold text-xl mb-2">{name}</h5>
                <div>
                  {!isNil(market?.floorAsk?.id) && (
                    <p className="text-black text-l font-bold m-0">
                      Floor: {market?.floorAsk?.price?.amount?.decimal} {market?.floorAsk?.price?.currency.symbol}
                    </p>
                  )}
                  {lastSale && (
                    <span className="text-black text-xs p-1 bg-gray-100 border-gray-100 rounded max-w-fit">
                      Last sale: {lastSale?.price?.amount?.decimal} {lastSale?.price?.currency.symbol}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                {parseInt(ownership?.tokenCount) > 0 ? (
                  <button
                    className="text-black font-bold hover:text-yellow border-b-2"
                    onClick={() => onListToken({ contract, tokenId, name, media, description, image, network })}
                  >
                    List
                  </button>
                ) : (
                  <span></span>
                )}
                &rarr;
              </div>
            </div>
          </div>
        </Link>
      ))(nfts)}
    </div>
  )
}
