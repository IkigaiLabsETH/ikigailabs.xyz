import { match } from 'ts-pattern'
import React, { FC, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { Loader } from '../Loader'
import { getDropTokenByContractAndTokenId, selectToken } from './editionDrop.api'
import { ContractType, Network } from '../../common/types'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { Eyebrow } from '../Eyebrow'
import { TransactionButton } from 'thirdweb/react'
import { Chain, getContract } from 'thirdweb'
import { claimTo, getActiveClaimCondition } from 'thirdweb/extensions/erc1155'
import { getContractMetadata } from 'thirdweb/extensions/common'
import { useWallet } from '../../common/useWallet'
import { TWClient } from '../../common/web3/web3'
import { mintSuccess } from '../Drop/drop.actions'
import { transactionFailed, transactionSent } from '../../common/transaction'
import { CollectionStat } from '../CollectionStat'
import { set } from 'date-fns'
import { formatDateAndTime } from '../../common/utils'

interface EditionDropProps {
  contractAddress: string
  tokenId: string
  chain?: Chain
  network?: Network
  type?: ContractType
}

export const EditionDrop: FC<EditionDropProps> = ({ contractAddress, tokenId, network, type, chain }) => {
  const { data: token, status } = useAppSelector(
    selectToken({ contract: contractAddress, tokenId, network, type }),
  ) as any
  const dispatch = useAppDispatch()
  const { address } = useWallet()
  const [contract, setContract] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [contractMetadata, setContractMetadata] = useState<any>(null)
  const [activeClaimConditions, setActiveClaimConditions] = useState<any>(null)

  useEffect(() => {
    if (!token) {
      dispatch(getDropTokenByContractAndTokenId.initiate({ contract: contractAddress, tokenId, network, type }))
    }
  }, [contractAddress, tokenId, network, dispatch, token, type])

  useEffect(() => {
    if (contractAddress) {
      const contract = getContract({
        client: TWClient,
        chain,
        address: contractAddress,
      })
      setContract(contract)
      getContractMetadata({
        contract,
      }).then(setContractMetadata)
    }
  }, [contractAddress, chain])

  useEffect(() => {
    if (contract && tokenId) {
      getActiveClaimCondition({ contract, tokenId: BigInt(tokenId) }).then(setActiveClaimConditions)
    }
  }, [contract, tokenId])

  const onPlus = () => {
    // if (quantity >= pathOr(1, ['claimConditions', 0, 'maxClaimablePerWallet'])(data)) return
    setQuantity(quantity + 1)
  }

  const onMinus = () => {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
  }

  const loader = (
    <div className="flex w-screen h-screen justify-center items-center bg-yellow">
      <Loader />
    </div>
  )
  const component = () => {
    const {
      metadata: { image, name, description },
      supply,
    } = token
    return (
      <div className="flex relative flex-col lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch border-t-gray-800 border-t border-b border-b-black">
        <div
          className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover h-96 lg:h-auto"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="w-full lg:w-1/2 p-16 max-w-[798px] pt-32">
          <Eyebrow>Free Edition</Eyebrow>
          <h2 className="text-[2rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
            {name}
          </h2>
          <div className="my-8 satoshi text-xl leading-relaxed">{description}</div>
          {contract && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full border-y border-y-gray-700 py-8">
                <CollectionStat label="Claimed:" loading={status === 'pending'}>
                  {supply}
                </CollectionStat>
                <CollectionStat label="Price:" loading={status === 'pending'}>
                  Free
                </CollectionStat>
                <CollectionStat label="Opens:" loading={status === 'pending'}>
                  {activeClaimConditions?.startTimestamp}
                  {activeClaimConditions?.startTimestamp
                    ? `${formatDateAndTime(Number(activeClaimConditions.startTimestamp))}`
                    : null}
                </CollectionStat>
              </div>
              <div className="grid grid-cols-3 justify-center items-center mt-10">
                <TransactionButton
                  className="!bg-yellow !text-black !w-full !border-black shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] !transition-all !epilogue !text-xl hover:cursor-pointer"
                  style={{ padding: '0.75rem', border: '2px solid yellow', borderRadius: '0' }}
                  transaction={() =>
                    claimTo({
                      contract,
                      to: address,
                      quantity: BigInt(1),
                      tokenId: BigInt(0),
                    })
                  }
                  onTransactionSent={({ transactionHash }) => dispatch(transactionSent(transactionHash))}
                  onTransactionConfirmed={({ transactionHash }) => {
                    dispatch(mintSuccess({ tokenId, network: Network.BASE, transactionHash }))
                    dispatch(
                      getDropTokenByContractAndTokenId.initiate({ contract: contractAddress, tokenId, network, type }),
                    )
                  }}
                  onError={error => {
                    dispatch(transactionFailed(error))
                  }}
                >
                  Claim
                </TransactionButton>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return match(status)
    .with(QueryStatus.uninitialized, () => loader)
    .with(QueryStatus.pending, () => loader)
    .with(QueryStatus.fulfilled, component)
    .otherwise(() => <></>)
}
