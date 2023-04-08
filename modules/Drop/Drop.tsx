import { add, isNil, propOr } from 'ramda'
import React, { FC, MouseEvent, useEffect } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { CurrencyChain, DropTypeStandards } from '../../common/types'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { CollectionHeader } from '../CollectionHeader'
import { CollectionStat } from '../CollectionStat'
import { Loader } from '../Loader'
import {
  claimConditionsSelectors,
  selectClaimConditionsStatus,
  selectClaimedSupplyById,
  selectClaimedSupplyStatus,
  selectClaimStatus,
  selectLatestClaimForAddress,
  selectMetadataById,
  selectMetadataStatus,
  selectUnclaimedSupplyById,
  selectUniqueOwnersCount,
} from './drop.selectors'
import { claimToken, fetchDrop } from './drop.slice'

interface DropProps {
  contract: string
  tokenId: string
}

export const Drop: FC<DropProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const { address } = useWallet()

  // drop
  const dropStatus = useAppSelector(selectMetadataStatus)
  const drop = useAppSelector(selectMetadataById(contract))

  // owners
  const ownersCount = useAppSelector(selectUniqueOwnersCount(contract))

  // supply
  const claimedSupply = useAppSelector(selectClaimedSupplyById(contract)) as any
  const claimedSupplyStatus = useAppSelector(selectClaimedSupplyStatus)

  const unclaimedSupply = useAppSelector(selectUnclaimedSupplyById(contract)) as any

  const totalSupply = add(
    (claimedSupply?.claimedSupply as number) || 0,
    (unclaimedSupply?.unclaimedSupply as number) || 0,
  )

  // claimconditions
  const claimConditions = useAppSelector(state => claimConditionsSelectors.selectById(state, contract) as any)
  const claimConditionsStatus = useAppSelector(selectClaimConditionsStatus)

  // claim
  const claim = useAppSelector(selectLatestClaimForAddress(address)) as any
  const claimStatus = useAppSelector(selectClaimStatus)

  useEffect(() => {
    dispatch(fetchDrop({ contract }))
  }, [contract])

  const handleClaim = (event: MouseEvent) => {
    event.preventDefault()
    dispatch(claimToken({ contract, address, quantity: 1 }))
  }

  const header = match(dropStatus)
    .with('succeeded', () => (
      <>
        <CollectionHeader
          eyebrow="Signature drop"
          coverImage={propOr('', 'image')(drop)}
          name={propOr('', 'name')(drop)}
          description={propOr('', 'description')(drop)}
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4 w-full border-y border-y-gray-700 py-8 mt-6">
              <CollectionStat label="Price" loading={claimConditionsStatus === 'pending'}>
                {claimConditions?.claimConditions[0]?.currencyMetadata?.displayValue}
              </CollectionStat>
              <CollectionStat
                label="Minted"
                loading={claimedSupplyStatus === 'pending'}
              >{`${claimedSupply?.claimedSupply.toString()}/${totalSupply?.toString()}`}</CollectionStat>
              <CollectionStat label="Unique Owners" loading={isNil(ownersCount)}>
                {ownersCount?.toString()}
              </CollectionStat>
            </div>
            <div className="grid grid-cols-1 gap-4 w-full border-b border-b-gray-700 py-8">
              <CollectionStat label="Opens:" loading={claimConditionsStatus === 'pending'}>
                {new Date(claimConditions?.claimConditions[0]?.startTime).toLocaleDateString()}
              </CollectionStat>
            </div>
          </div>
          <div className="flex flex-col w-full mt-8">
            {claimStatus !== 'succeeded' ? (
              <Button onClick={handleClaim} color="yellow" loading={claimStatus === 'pending'}>
                Mint Now
              </Button>
            ) : (
              <Button href={`/drop/${contract}/${claim?.id}`} color="yellow">
                View your NFT
              </Button>
            )}
          </div>
          <div className="flex flex-col w-full mt-8 text-gray-600 border-y border-y-gray-700 py-8 text-sm">
            <ul>
              <li>
                <span className="font-bold">Blockchain:</span>{' '}
                {CurrencyChain[claimConditions?.claimConditions[0]?.currencyMetadata?.symbol]}
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
