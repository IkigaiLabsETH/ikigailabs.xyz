import { add, pathOr, propOr } from 'ramda'
import React, { FC, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { CurrencyChain, DropTypeStandards, Network } from '../../common/types'
import { CollectionHeader } from '../CollectionHeader'
import { CollectionStat } from '../CollectionStat'
import { Loader } from '../Loader'
import { getDropByContract, selectDrop } from './drop.api'
import { mintSuccess } from './drop.actions'
import { Amount } from '../Form/Amount'
import { TransactionButton } from 'thirdweb/react'
import { claimTo } from 'thirdweb/extensions/erc721'
import { transactionFailed, transactionSent } from '../../common/transaction'
import { useWallet } from '../../common/useWallet'
import { ContractOptions, getContract } from 'thirdweb'
import { TWClient } from '../../common/web3/web3'
import { CHAINS } from '../../common/constants'
import { getContractMetadata } from 'thirdweb/extensions/common'
import { TransactionReceipt } from 'thirdweb/dist/types/transaction/types'

interface DropProps {
  contractAddress: string
  tokenId: string
  network: Network
}

export const Drop: FC<DropProps> = ({ contractAddress, network }) => {
  const dispatch = useAppDispatch()
  const { address } = useWallet()
  const [localClaimedSupply, setLocalClaimedSupply] = useState(0)
  const [amountToMint, setAmountToMint] = useState(1)
  const { data, status } = useAppSelector(selectDrop({ contract: contractAddress, network, type: 'nft-drop' }))
  const [maxClaimable, setMaxClaimable] = useState<string | number>(1)
  const [contract, setContract] = useState<Readonly<ContractOptions<[]>> | null>(null)
  const [contractMetadata, setContractMetadata] = useState<any>(null)

  useEffect(() => {
    if (!contractAddress) return
    dispatch(getDropByContract.initiate({ contract: contractAddress, network, type: 'nft-drop' }))
  }, [contractAddress, dispatch, network])

  const onSuccess = ({ transactionHash, tokenId }) => {
    const data = {
      tokenId: tokenId.toString(),
      transactionHash,
      network,
      contract: contractAddress,
    }
    dispatch(mintSuccess(data))
    setLocalClaimedSupply(localClaimedSupply + amountToMint)
  }

  useEffect(() => {
    if (!contractAddress) return
    const contract = getContract({
      client: TWClient,
      chain: CHAINS[network],
      address: contractAddress,
    })
    setContract(contract)
    getContractMetadata({
      contract,
    }).then(setContractMetadata)
  }, [contractAddress, network])

  useEffect(() => {
    const claimedSupply = propOr(0, 'claimedSupply')(data) as number
    const maxClaimable = pathOr("1", ['claimConditions', 'maxClaimablePerWallet'])(data)
    setLocalClaimedSupply(claimedSupply)
    setMaxClaimable(maxClaimable)
  }, [data])

  const onPlus = () => {
    if (amountToMint >= (maxClaimable === 'unlimited' ? 9999999999 : parseInt(maxClaimable as string, 10))) return
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
          eyebrow="Welcome"
          coverImage={pathOr('', ['metadata', 'image'])(data)}
          name={pathOr('', ['metadata', 'name'])(data)}
          description={pathOr('', ['metadata', 'description'])(data)}
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4 w-full border-y border-y-gray-700 py-8 mt-6">
              <CollectionStat label="Price" loading={status === 'pending'}>
                {pathOr('', ['claimConditions', 'currencyMetadata', 'displayValue'])(data)}{' '}
                {pathOr('', ['claimConditions', 'currencyMetadata', 'symbol'])(data)}
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
                {new Date(pathOr('', ['claimConditions', 'startTime'])(data)).toLocaleDateString()}
              </CollectionStat>
            </div>
          </div>
          <div className="flex flex-row w-full mt-1 justify-between items-center">
            <div className="w-1/4 flex justify-center text-3xl font-bold">
              <Amount amount={amountToMint} onMinus={onMinus} onPlus={onPlus} />
            </div>
            <div className="w-3/4 pl-4">
              { maxClaimable === 'unlimited' || 0 < (maxClaimable as number) ? (
                <TransactionButton
                  className="!bg-yellow !text-black !w-full !border-black shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] !transition-all !epilogue !text-xl hover:cursor-pointer"
                  style={{ padding: '0.75rem', border: '2px solid yellow', borderRadius: '0' }}
                  transaction={() =>
                    claimTo({
                      contract,
                      to: address,
                      quantity: BigInt(amountToMint),
                    })
                  }
                  onTransactionSent={({ transactionHash }) => dispatch(transactionSent(transactionHash))}
                  onTransactionConfirmed={({ transactionHash }: TransactionReceipt ) => {
                    onSuccess({transactionHash, tokenId: BigInt(0)})
                  }}
                  onError={error => {
                    dispatch(transactionFailed(error))
                  }}
                >
                  Claim
                </TransactionButton>) : <>Not eligible to claim. Connect an eligible wallet.</> }
            </div>
          </div>
          <div className="flex flex-col w-full mt-1 text-gray-600 border-y border-y-gray-700 py-8 text-sm">
            <ul>
              <li>
                <span className="font-bold">Blockchain:</span>{' '}
                {CurrencyChain[pathOr('', ['claimConditions', 'currencyMetadata', 'name'])(data)]}
              </li>
              <li>
                <span className="font-bold">Contract Address:</span> {contractAddress}
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
