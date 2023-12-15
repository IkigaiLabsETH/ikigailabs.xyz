import { map } from 'ramda'
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
        <div
          key={`${contract}-${tokenId}`}
          className="border-2 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="overflow-clip h-1/2">
            {image && <Image src={image} alt={name} width="384" height="384" />}
            {media && <video src={media} controls={false} width="384" height="384" />}
          </div>
          <div className="p-4 flex h-1/2">
            <div className="flex flex-col justify-between w-full">
              <h5 className="font-bold text-xl mb-2">{name}</h5>
              <div>
                {market?.floorAsk && (
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
              <div className="flex justify-between mt-5">
                <Link href={`/${network}/${contract}/${tokenId}`} title={name} className="max-w-1/2 font-bold">
                  View &rarr;
                </Link>
                {parseInt(ownership?.tokenCount) > 0 ? (
                  <button
                    className="ml-4 text-black font-bold hover:text-yellow"
                    onClick={() => onListToken({ contract, tokenId, name, media, description, image, network })}
                  >
                    List &rarr;
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ))(nfts)}
    </div>
  )
}
