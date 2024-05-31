import { map } from 'ramda'
import React, { FC } from 'react'

import { NFT, Network } from '../../common/types'
import { useAppDispatch } from '../../common/redux/store'
import { showListToken } from '../Collection/Token/token.slice'
import { TokenCard } from '../TokenCard'

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
      {map((nft: NFT) => (
        <div>
          <TokenCard token={nft} network={network} />
          {parseInt(nft.ownership?.tokenCount) > 0 ? (
            <button
              className="inline-block mt-1 items-center justify-center px-3 overflow-hidden transition-all duration-150 ease-in-out border-2 group shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]  hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black border-black active:text-black bg-yellow font-bold hover:text-black disabled:cursor-not-allowed"
              onClick={() =>
                onListToken({
                  contract: nft.token.contract,
                  tokenId: nft.token.tokenId,
                  name: nft.token.name,
                  media: nft.token.media,
                  description: nft.token.description,
                  image: nft.token.image,
                  network,
                })
              }
            >
              List
            </button>
          ) : null}
        </div>
      ))(nfts)}
    </div>
  )
}
