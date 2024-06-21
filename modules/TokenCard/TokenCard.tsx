import React, { FC } from 'react'
import { NFT } from '../../common/types'
import Link from 'next/link'
import { formatAmount, formatAmountWithoutDecimals, formatNumber } from '../../common/utils'
import { isNil } from 'ramda'
import { Eth } from '../Eth'

interface TokenCardProps {
  token: NFT
  network: string
}

export const TokenCard: FC<TokenCardProps> = ({
  token: {
    token: { contract, tokenId, name, media, description, image, lastSale, supply, kind },
    ownership,
    market,
  },
  network,
}) => {
  return (
    <div>
      <Link
        href={`/${network}/${contract}/${tokenId}`}
        title={name}
        key={`${contract}-${tokenId}`}
        className="max-w-1/2 font-bold justify-end self-end hover:text-black"
      >
        <div className="border-2 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <div className='absolute'>
              {
                parseInt(ownership?.tokenCount, 10) > 0 ? 
                <div className="text-xs p-1 rounded-sm inline m-1 bg-yellow">
                  &times; {formatNumber(parseInt(ownership?.tokenCount, 10))}
                </div> : null
              }
              {kind === 'erc1155' ? (
                <div className="text-xs p-1 bg-gray-100 rounded-sm inline m-1">
                  &times; {formatNumber(supply)}
                </div>
              ) : null}
            </div>
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
          <div className="p-4 flex justify-between flex-col min-h-[10rem] bg-white">
            <div>
              <h5 className="font-bold text-xl mb-2">{name ? name : `# ${tokenId}`}</h5>
              <div className="flex flex-col">
                {!isNil(market?.floorAsk?.id) && (
                  <>
                    <p className="text-black text-2xl font-bold m-0">
                      <Eth amount={market?.floorAsk?.price?.amount?.decimal} />
                    </p>
                    <span className="italic text-xs text-gray-600 text-nowrap">
                      $ {formatAmountWithoutDecimals(market?.floorAsk?.price?.amount?.usd)}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              {lastSale && (
                <div className="text-xs p-1 bg-gray-100 border-gray-100 rounded max-w-fit">
                  Last sale: {formatAmount(lastSale?.price?.amount?.decimal)} {lastSale?.price?.currency.symbol}
                </div>
              )}
              <div className="flex justify-end font-bold text-lg">&rarr;</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
