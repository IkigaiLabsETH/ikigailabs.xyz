import { isNil } from 'ramda'
import React, { ChangeEvent, FC } from 'react'
import { match } from 'ts-pattern'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { claim, selectClaimLoadingState, selectToken } from './freeMint.slice'
import { CONFETTI_CONFIG } from '../../common/config'
import { Link } from '../Link'
import { Eyebrow } from '../Eyebrow'

interface FreeMintProps {
  contract: string
  tokenId: number
}

export const FreeMint: FC<FreeMintProps> = ({ contract, tokenId }) => {
  const dispatch = useAppDispatch()
  const claimLoadingState = useAppSelector(selectClaimLoadingState(`${contract}_${tokenId}`))
  const token = useAppSelector(selectToken(`${contract}_${tokenId}`))
  const { address, connect } = useWallet()

  const particlesInit = async main => {
    await loadFull(main)
  }

  const handleClaim = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (address) {
      dispatch(claim({ contract, address, tokenId, amount: 1 }))
    }
  }

  const handleConnect = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    connect()
  }

  const getButton = match(address)
    .when(isNil, () => <Button onClick={handleConnect} label="Connect" />)
    .otherwise(() => <Button onClick={handleClaim} label="Mint for free" />)

  const idle = (
    <>
      <h1 className="text-[2rem] lg:text-[3rem] boska leading-none">{token.name}</h1>
      <p>{token.description}</p>
      <div className="flex font-extrabold w-full">{getButton}</div>
    </>
  )

  const loading = (
    <div className="flex font-extrabold w-full">
      <Loader />
    </div>
  )

  const succeeded = (
    <>
      <div className="flex">
        <div className="">
          <h1 className="text-[2rem] lg:text-[3rem] boska py-4 leading-none bg-black">Epic! You're all set.</h1>
          <div className="flex">
            <Link href="/view" title="View NFT">
              View NFT
            </Link>
          </div>
        </div>
      </div>
      <Particles id="tsparticles" options={CONFETTI_CONFIG as any} init={particlesInit} />
    </>
  )

  const failed = (
    <div className="flex">
      <div className="bg-white border-2 shadow-[5px_5px_0px_0px_rgba(127,29,29,1)] border-red text-red p-4 leading-none text-2xl absolute">
        Whoops, something went wrong.
      </div>
    </div>
  )

  const content = match(claimLoadingState)
    .with('idle', () => idle)
    .with('loading', () => loading)
    .with('succeeded', () => succeeded)
    .with('failed', () => failed)
    .exhaustive()

  return (
    <div
      className="bg-white relative h-screen flex bg-cover bg-center"
      style={{ backgroundImage: `url("${token.image}")` }}
    >
      <div className="w-full pb-12">
        <div className="px-8 py-4 pb-8 bg-black absolute w-full md:w-1/2 xl:w-1/3 max-w-xl">
          <Eyebrow>Free mint</Eyebrow>
          {content}
        </div>
      </div>
    </div>
  )
}
