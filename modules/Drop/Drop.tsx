import { add, pathOr, propOr } from 'ramda'
import React, { FC, useEffect, useState } from 'react'
import { match } from 'ts-pattern'
import { Web3Button } from '@thirdweb-dev/react'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { TransactionResultWithId, TWNFT, CurrencyChain, DropTypeStandards, Network } from '../../common/types'
import { CollectionHeader } from '../CollectionHeader'
import { CollectionStat } from '../CollectionStat'
import { Loader } from '../Loader'
import { getDropByContract, selectDrop } from './drop.api'
import { mintSuccess } from './drop.actions'
import { Amount } from '../Form/Amount'

interface DropProps {
  contract: string
  tokenId: string
  network: Network
}

export const Drop: FC<DropProps> = ({ contract, network }) => {
  const dispatch = useAppDispatch()
  const [localClaimedSupply, setLocalClaimedSupply] = useState(0)
  const [amountToMint, setAmountToMint] = useState(1)
  const { data, status } = useAppSelector(selectDrop({ contract, network, type: 'nft-drop' }))

  useEffect(() => {
    if (!contract) return
    dispatch(getDropByContract.initiate({ contract, network, type: 'nft-drop' }))
  }, [contract, dispatch, network])

  const onSuccess = (result: TransactionResultWithId<TWNFT>[]) => {
    const data = {
      tokenId: result[0].id.toString(),
      transactionHash: result[0].receipt.transactionHash,
      network,
      contract,
    }
    dispatch(mintSuccess(data))
    setLocalClaimedSupply(localClaimedSupply + amountToMint)
  }

  useEffect(() => {
    const claimedSupply = propOr(0, 'claimedSupply')(data) as number
    setLocalClaimedSupply(claimedSupply)
  }, [data])

  const onPlus = () => {
    if (amountToMint >= pathOr(1, ['claimConditions', 0, 'maxClaimablePerWallet'])(data)) return
    setAmountToMint(amountToMint + 1)
  }

  const onMinus = () => {
    if (amountToMint <= 1) return
    setAmountToMint(amountToMint - 1)
  }

  const claimedSupply = propOr(0, 'claimedSupply')(data) as number
  const unclaimedSupply = propOr(0, 'unclaimedSupply')(data) as number

  const totalSupply = add(claimedSupply, unclaimedSupply)

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
                {pathOr('', ['claimConditions', 0, 'currencyMetadata', 'displayValue'])(data)}{' '}
                {pathOr('', ['claimConditions', 0, 'currencyMetadata', 'symbol'])(data)}
              </CollectionStat>
              <CollectionStat
                label="Minted"
                loading={status === 'pending'}
              >{`${localClaimedSupply}/${totalSupply?.toString()}`}</CollectionStat>
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
          <div className="flex flex-row w-full mt-1 justify-between items-center">
            <div className="w-1/4 flex justify-center text-3xl font-bold">
              <Amount amount={amountToMint} onMinus={onMinus} onPlus={onPlus} />
            </div>
            <div className="w-3/4 pl-4">
              <Web3Button
                contractAddress={contract}
                action={contract => contract.erc721.claim(amountToMint)}
                onError={console.log}
                onSuccess={onSuccess}
                isDisabled={totalSupply === localClaimedSupply}
                className="hover:text-yellow w-full border-black active:text-yellow focus-visible:outline-yellow bg-yellow hover:bg-black rounded-none font-bold p-5 transition-colors border-2 hover:border-yellow"
              >
                {totalSupply === localClaimedSupply ? 'Sold out!' : 'Mint Now'}
              </Web3Button>
            </div>
          </div>
          <div className="flex flex-col w-full mt-1 text-gray-600 border-y border-y-gray-700 py-8 text-sm">
            <ul>
              <li>
                <span className="font-bold">Blockchain:</span>{' '}
                {CurrencyChain[pathOr('', ['claimConditions', 0, 'currencyMetadata', 'name'])(data)]}
              </li>
              <li>
                <span className="font-bold">Contract Address:</span> {contract}
              </li>
              <li>
                <span className="font-bold">Token Standard:</span> {DropTypeStandards['nft-drop']}
              </li>
            </ul>
          </div>
        </CollectionHeader>
      </>
    ))
    .otherwise(() => <Loader />)

  return <div className="flex flex-col w-full">{header}</div>
}
