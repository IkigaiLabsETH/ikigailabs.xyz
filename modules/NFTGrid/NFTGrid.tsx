import { isNil, map } from 'ramda'
import React, { FC } from 'react'

import { NFT, Network } from '../../common/types'
import { useAppDispatch } from '../../common/redux/store'
import { showListToken } from '../Collection/Token/token.slice'
import Link from 'next/link'
import { formatAmountWithoutDecimals, formatNumber } from '../../common/utils'
import { Eth } from '../Eth'

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
      {map(
        ({
          token: { contract, tokenId, name, media, description, image, lastSale, supply, kind },
          ownership,
          market,
        }: NFT) => (
          <div>
            <Link
              href={`/${network}/${contract}/${tokenId}`}
              title={name}
              key={`${contract}-${tokenId}`}
              className="max-w-1/2 font-bold justify-end self-end hover:text-black"
            >
              <div className="border-2 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  {kind === 'erc1155' ? (
                    <div className="text-xs p-1 bg-gray-100 rounded-sm inline m-1 absolute">
                      &times; {formatNumber(supply)}
                    </div>
                  ) : null}
                  <div className="overflow-clip">
                    {image && (
                      <img
                        src={image}
                        alt={name}
                        width="512"
                        height="512"
                        className="w-full h-full object-cover aspect-square"
                      />
                    )}
                  </div>
                </div>
                <div className="p-4 flex justify-between flex-col min-h-[10rem]">
                  <div>
                    <h5 className="font-bold text-xl mb-2">{name ? name : `# ${tokenId}`}</h5>
                    <div className='flex flex-col'>
                      {!isNil(market?.floorAsk?.id) && (
                        <>
                          <p className="text-black text-2xl font-bold m-0">
                            <Eth amount={market?.floorAsk?.price?.amount?.decimal} />
                          </p>
                          <span className='italic text-xs text-gray-600 text-nowrap'>$ {formatAmountWithoutDecimals(market?.floorAsk?.price?.amount?.usd)}</span>
                        </>
                      )}
                      
                    </div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    {lastSale && (
                      <div className="text-xs p-1 bg-gray-100 border-gray-100 rounded max-w-fit">
                        Last sale: {lastSale?.price?.amount?.decimal} {lastSale?.price?.currency.symbol}
                      </div>
                    )}
                    <div className="flex justify-end font-bold text-lg">&rarr;</div>
                  </div>
                </div>
              </div>
            </Link>
            {parseInt(ownership?.tokenCount) > 0 ? (
              <button
                className="inline-block mt-1 items-center justify-center px-3 overflow-hidden transition-all duration-150 ease-in-out border-2 group shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]  hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black border-black active:text-black bg-yellow font-bold hover:text-black disabled:cursor-not-allowed"
                onClick={() => onListToken({ contract, tokenId, name, media, description, image, network })}
              >
                List
              </button>
            ) : null}
          </div>
        ),
      )(nfts)}
    </div>
  )
}
