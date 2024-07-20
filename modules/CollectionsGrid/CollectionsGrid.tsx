import React, { FC } from 'react'
import Image from 'next/image'
import { map } from 'ramda'
import { Eth } from '../Eth'
import { Percentage } from '../Percentage'
import Link from 'next/link'
import { Collection, Network } from '../../common/types'

interface CollectionsGridProps {
  collections: Collection[]
  network: Network
  isLoading: boolean
}

export const CollectionsGrid: FC<CollectionsGridProps> = ({ collections, network, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-screen-2xl text-black mb-12">
      {map((collection: Collection) => (
        <Link
          href={`/${network}/${collection?.id}`}
          title={collection?.name}
          key={collection?.id}
          className="border-2 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-[32rem]"
        >
          <div className="overflow-clip h-1/2">
            {collection?.image ? <img src={collection?.image} alt={collection?.name} width="384" height="384" /> : null}
          </div>
          <div className="p-4 flex h-1/2">
            <div className="flex flex-col justify-between w-full">
              <h5 className="font-bold text-xl mb-2">{collection?.name}</h5>
              <div className="flex flex-row justify-between">
                <div className="text-black text-l font-bold m-0">
                  24h Volume:{' '}
                  <span className="font-bold">
                    <Eth amount={collection?.volume['1day']} />
                  </span>{' '}
                  <span className="!text-xs">
                    <Percentage amount={collection?.volumeChange['1day']} />
                  </span>
                </div>
                <div className="text-black text-l font-bold m-0">
                  24h sales:{' '}
                  <span className="font-bold">
                    <Eth amount={collection?.floorSale['1day']} />
                  </span>{' '}
                  <span className="!text-xs">
                    <Percentage amount={collection?.floorSaleChange['1day']} />
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-5 text-lg font-bold">&rarr;</div>
            </div>
          </div>
        </Link>
      ))(collections || [])}
    </div>
  )
}
