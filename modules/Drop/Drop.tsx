import { add, pathOr, propOr } from 'ramda'
import React, { FC, MouseEvent, useEffect } from 'react'
import { match } from 'ts-pattern'
import { Web3Button, useClaimNFT, useContract } from '@thirdweb-dev/react'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { CurrencyChain, DropTypeStandards } from '../../common/types'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { CollectionHeader } from '../CollectionHeader'
import { CollectionStat } from '../CollectionStat'
import { Loader } from '../Loader'
import { getDropByContract, selectDrop } from './drop.api'
import { selectedNetwork } from '../NetworkSelector'

interface DropProps {
  contract: string 
  tokenId: string
}

export const Drop: FC<DropProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const { address } = useWallet()
  const network = useAppSelector(selectedNetwork)
  const { contract: c } = useContract(contract);
  const { mutate: claimNft, isLoading, error } = useClaimNFT(c);

  const { data, status } = useAppSelector(selectDrop({ contract, network, type: 'nft-drop' }))

  useEffect(() => {
    if (!contract) return
    dispatch(getDropByContract.initiate({ contract, network, type: 'nft-drop' }))
  }, [contract])

  const claimedSupply = propOr(0, 'claimedSupply')(data) as number
  const unclaimedSupply = propOr(0, 'unclaimedSupply')(data) as number

  const totalSupply = add(
    claimedSupply,
    unclaimedSupply
  )

  const header = match('succeeded')
    .with('succeeded', () => (
      <>
        <CollectionHeader
          eyebrow="Signature drop"
          coverImage={pathOr('', ['metadata', 'image'])(data)}
          name={pathOr('', ['metadata', 'name'])(data)}
          description={pathOr('', ['metadata', 'description'])(data)}
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4 w-full border-y border-y-gray-700 py-8 mt-6">
              <CollectionStat label="Price" loading={status === 'pending'}>
                {pathOr('', ['claimConditions', 0, 'currencyMetadata', 'displayValue'])(data)} {pathOr('', ['claimConditions', 0, 'currencyMetadata', 'symbol'])(data)}
              </CollectionStat>
              <CollectionStat
                label="Minted"
                loading={status === 'pending'}
              >{`${claimedSupply.toString()}/${totalSupply?.toString()}`}</CollectionStat>
              {/* <CollectionStat label="Unique Owners" loading={isNil(ownersCount)}>
                {ownersCount?.toString()}
              </CollectionStat> */}
            </div>
            <div className="grid grid-cols-1 gap-4 w-full border-b border-b-gray-700 py-8">
              <CollectionStat label="Opens:" loading={status === 'pending'}>
                {new Date(pathOr('', ['claimConditions', 0, 'startTime'])(data)).toLocaleDateString()}
              </CollectionStat>
            </div>
          </div>
          <div className="flex flex-col w-full mt-8">
            {!isLoading ? (
              <Web3Button
                contractAddress={contract}
                action={() =>
                  claimNft({
                    to: address,
                    quantity: 1,
                  })
                }
                className='hover:text-yellow border-black active:text-yellow focus-visible:outline-yellow bg-yellow hover:bg-black rounded-none font-bold p-5 transition-colors border-2 hover:border-yellow'
              >
                Mint Now
              </Web3Button>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col w-full mt-8 text-gray-600 border-y border-y-gray-700 py-8 text-sm">
            <ul>
              <li>
                <span className="font-bold">Blockchain:</span>{' '}
                {CurrencyChain[pathOr('', ['claimConditions', 0, 'currencyMetadata', 'name'])(data)]}
              </li>
              <li>
                <span className="font-bold">Contract Address:</span> {contract}
              </li>
              <li>
                <span className="font-bold">Token Standard:</span> {DropTypeStandards.NFT}
              </li>
            </ul>
          </div>
        </CollectionHeader>
      </>
    ))
    .otherwise(() => <Loader />)

  return <div className="flex flex-col w-full">{header}</div>
}
