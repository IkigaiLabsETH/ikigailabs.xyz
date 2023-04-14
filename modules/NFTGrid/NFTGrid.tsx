import { useRouter } from 'next/router'
import { map } from 'ramda'
import React, { FC } from 'react'

import { NFT } from '../../common/types'
import { Link } from '../Link'

interface NFTGridProps {
  nfts: NFT[]
}

export const NFTGrid: FC<NFTGridProps> = ({ nfts }) => {
  const {
    query: { contract },
  } = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-2xl p-8 pt-0 text-black">
      {map(({ token }: NFT) => (
        <div
          key={token.tokenId}
          className="border-2 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="overflow-clip h-52">
            <img src={token.image} alt={token.name} />
          </div>
          <div className="p-4">
            <h5 className="font-bold text-2xl mb-4">{token.name}</h5>
            <p className="text-black line-clamp-5">{token.description}</p>
            <div className="flex justify-center items-center">
              <Link href={`/collection/${contract}/${token.tokenId}`} title={token.name}>
                View &rarr;
              </Link>
            </div>
          </div>
        </div>
      ))(nfts)}
    </div>
  )
}
