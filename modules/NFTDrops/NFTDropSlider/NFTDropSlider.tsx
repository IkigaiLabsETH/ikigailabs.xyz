import { map, prop, propOr } from 'ramda'
import React, { FC } from 'react'
import { match } from 'ts-pattern'

import { useAppSelector } from '../../../common/redux/store'
import { Link } from '../../Link'
import { Loader } from '../../Loader'
import { selectLoadingState, selectNFTDrop } from '../NFTDrops.slice'

interface NFTDropSliderProps {
  contract: string
}

export const NFTDropSlider: FC<NFTDropSliderProps> = ({ contract }) => {
  const loadingState = useAppSelector(selectLoadingState)
  const { metadata, nfts } = useAppSelector(selectNFTDrop(contract))

  const loader = <Loader />
  const component = () => (
    <div>
      <div className="flex flex-row justify-between w-full">
        <div>
          <h2 className="text-[4rem]">{prop('name')(metadata)}</h2>
          <p className="text-xl">{prop('description')(metadata)}</p>
        </div>
        <div className="flex self-start mt-2 justify-end">
          <Link href={`drops/${contract}`} title="explore">
            Explore
          </Link>
        </div>
      </div>
      <ul className="flex flex-1 flex-row overflow-scroll h-80 w-[96rem] mt-16">
        {map(({ metadata: nft }: any) => (
          <li className="relative mr-4" key={nft?.id.toString()}>
            {
              <div className="w-96">
                <img src={propOr('', 'image')(nft)} className="object-scale-down w-96 h-80" />
              </div>
            }
          </li>
        ))(nfts)}
      </ul>
    </div>
  )
  return match(loadingState)
    .with('succeeded', () => component())
    .otherwise(() => loader)
}
