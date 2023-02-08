import { add, propOr } from 'ramda'
import React, { FC, MouseEvent, useEffect } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { CollectionHeader } from '../CollectionHeader'
import { CollectionStat } from '../CollectionStat'
import { Loader } from '../Loader'
import {
  claimConditionsSelectors,
  claimedSupplySelectors,
  metadataSelectors,
  selectMetadataStatus,
  selectUniqueOwnersCount,
  unclaimedSupplySelectors,
} from './drop.selectors'
import { claimToken, fetchDrop, selectClaim } from './drop.slice'

interface DropProps {
  contract: string
}

export const Drop: FC<DropProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const { address } = useWallet()
  const dropStatus = useAppSelector(selectMetadataStatus)
  const drop = useAppSelector(state => metadataSelectors.selectById(state, contract))
  const ownersCount = useAppSelector(state => selectUniqueOwnersCount(state)(contract))
  const claimedSupply = useAppSelector(
    state => (claimedSupplySelectors.selectById(state, contract) as { claimedSupply: number })?.claimedSupply,
  )
  const unclaimedSupply = useAppSelector(
    state => (unclaimedSupplySelectors.selectById(state, contract) as { unclaimedSupply: number })?.unclaimedSupply,
  )
  const totalSupply = add((claimedSupply as number) || 0, (unclaimedSupply as number) || 0)
  const claimConditions = useAppSelector(state => claimConditionsSelectors.selectById(state, contract) as any)
  const { status } = useAppSelector(selectClaim)

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
          <div className="flex border-y border-y-gray-700 py-8 mt-6">
            <div className="grid grid-cols-4 gap-4 w-full">
              <CollectionStat label="Total Supply" value={totalSupply?.toString()} />
              <CollectionStat label="Claimed" value={claimedSupply?.toString()} />
              <CollectionStat label="Unique Owners" value={ownersCount?.toString()} />
              <CollectionStat
                label="Available:"
                value={new Date(claimConditions?.claimConditions[0]?.startTime).toLocaleDateString()}
              />
            </div>
          </div>
          <div className="flex flex-col w-full mt-8">
            <Button onClick={handleClaim} color='yellow' loading={status === 'loading'}>
              Mint for ${claimConditions?.claimConditions[0]?.currencyMetadata?.displayValue}
            </Button>
          </div>
        </CollectionHeader>
      </>
    ))
    .otherwise(() => <Loader />)

  return <div className="flex flex-col w-full">{header}</div>
}
