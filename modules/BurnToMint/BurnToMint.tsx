import clsx from 'clsx'
import { isNil, map, pluck } from 'ramda'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { burnToMint, checkTokenBalancesForCollection, selectBurnToMint } from './burnToMint.slice'
import { selectContractCallStatus, selectTokensWithBalancesForAddress } from '../../common/web3/tokenBalance.slice'
import { selector } from '../Collection/Token/token.api'
import { addOrReplace } from '../../common/utils/utils'
import { Token } from '../../common/types'
import { Loader, Size } from '../Loader'

interface BurnToMintProps {
  sourceContract: string
  targets: {
    tokenId: number
    targetContract: string
  }[]
}

export const BurnToMint: FC<BurnToMintProps> = ({ sourceContract, targets }) => {
  const dispatch = useAppDispatch()
  const { address, connect } = useWallet()
  const tokensWithBalance = useAppSelector(selectTokensWithBalancesForAddress(address))
  const tokenSelector = useAppSelector(selector) as any
  const contractCallStatus = useAppSelector(selectContractCallStatus)
  const { status } = useAppSelector(selectBurnToMint)
  const [tokensToBurn, setTokensToBurn] = useState([])

  const handleConnect = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    connect()
  }

  const startBurn = async (tokenId: number) => {
    const target = targets.find(target => target.tokenId === tokenId)
    dispatch(
      burnToMint({ address, sourceContract, targetContract: target?.targetContract, tokenId: tokenId.toString() }),
    )
  }

  const checkEligibility = async (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(
      checkTokenBalancesForCollection({
        address,
        collection: { contract: sourceContract, tokenIds: pluck('tokenId')(targets) },
      }),
    )
  }

  useEffect(() => {
    if (tokensWithBalance.length > 0) {
      map(({ contract, tokenId }: { contract: string; tokenId: string }) => {
        const { data } = tokenSelector({ contract, tokenId })

        if (data?.token) {
          const tokenData = addOrReplace(tokensToBurn, data.token, 'tokenId')
          setTokensToBurn(tokenData)
        }
      })(tokensWithBalance)
    }
  }, [tokensWithBalance, tokenSelector])

  const tokenList = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {map((token: Token) => (
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
            <div className="flex justify-start items-start font-bold">
              <button onClick={() => startBurn(token.tokenId)}>
                {' '}
                <span
                  className={clsx(
                    'overflow-hidden inline-block translate-y-2 -translate-x-0.5',
                    status === 'loading' ? 'w-5' : 'w-5',
                  )}
                >
                  <Loader size={Size.s} />
                </span>{' '}
                Start Swap &rarr;{' '}
              </button>
            </div>
          </div>
        </div>
      ))(tokensToBurn)}
    </div>
  )

  return (
    <div className="flex flex-col relative justify-center items-center lg:min-h-screen bg-white text-black min">
      <div className="lg:w-2/3 p-16">
        <h1 className="boska lg:text-[6rem]">Odyssey Genesis Collection Contract Swap</h1>
        <p className="text-gray-800 text-xl">Swap your Dimitri Artwork</p>
        <div className="flex flex-row w-full">
          {contractCallStatus === 'succeeded'
            ? tokensToBurn.length > 0
              ? tokenList
              : 'No eligible tokens found'
            : match(address)
                .when(isNil, () => <Button onClick={handleConnect}>Connect</Button>)
                .otherwise(() => <Button onClick={checkEligibility}>Check eligibility</Button>)}
        </div>
      </div>
    </div>
  )
}
