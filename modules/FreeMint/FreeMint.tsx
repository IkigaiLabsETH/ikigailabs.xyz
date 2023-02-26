import { isNil } from 'ramda'
import React, { ChangeEvent, FC, useEffect } from 'react'
import { match } from 'ts-pattern'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { claim, fetchToken, selectClaimLoadingState, selectToken } from './freeMint.slice'
import { CONFETTI_CONFIG } from '../../common/config'
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

  useEffect(() => {
    dispatch(fetchToken({ contract, tokenId }))
  }, [])

  const particlesInit = async (main: any) => {
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
    .when(isNil, () => <Button onClick={handleConnect}>Connect</Button>)
    .otherwise(() => (
      <Button onClick={handleClaim} loading={claimLoadingState === 'loading'}>
        Mint for free
      </Button>
    ))

  const idle = <>{<div className="flex flex-row w-full mt-16">{getButton}</div>}</>

  const succeeded = (
    <>
      <Particles id="tsparticles" options={CONFETTI_CONFIG as any} init={particlesInit} />
    </>
  )

  const failed = (
    <div className="flex">
      <div className="text-red text-2xl">Sorry, something went wrong.</div>
    </div>
  )

  const content = match(claimLoadingState)
    .with('idle', () => idle)
    .with('loading', () => idle)
    .with('succeeded', () => succeeded)
    .with('failed', () => failed)
    .exhaustive()

  return (
    <div className="flex relative flex-col lg:flex-row-reverse lg:h-screen items-center lg:min-h-min">
      <div
        className="w-full lg:w-1/2 h-96 lg:h-screen bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${token.image})` }}
      ></div>
      <div className="w-full lg:w-1/2 p-16">
        <Eyebrow>Exclusive Free Mint</Eyebrow>
        <h2 className="text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska">{token.name}</h2>
        <p className="my-8 satoshi text-xl leading-relaxed">{token.description}</p>
        {content}
      </div>
    </div>
  )
}
