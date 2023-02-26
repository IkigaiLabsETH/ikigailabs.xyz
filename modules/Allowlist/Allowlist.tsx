import { isNil } from 'ramda'
import React, { ChangeEvent, FC, useState } from 'react'
import { match } from 'ts-pattern'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'

import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { selectAllowlistSignUp, signUp } from './allowlist.api'

interface AllowlistProps {}

export const Allowlist: FC<AllowlistProps> = ({}) => {
  const { address, connect } = useWallet()
  const dispatch = useAppDispatch()
  const [request, setRequest] = useState<string>('')
  const { isLoading, isError, isSuccess } = useAppSelector(selectAllowlistSignUp(request))

  const handleConnect = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    connect()
  }

  const handleSubmission = (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const { requestId } = dispatch(signUp.initiate(address))
    setRequest(requestId)
  }

  const getButton = match(address)
    .when(isNil, () => <Button onClick={handleConnect}>Connect</Button>)
    .otherwise(() => (
      <Button onClick={handleSubmission} loading={isLoading}>
        Sign up
      </Button>
    ))

  const getAction = () => {
    if (isError) {
      return <p className="text-black">Something went wrong</p>
    }

    if (isSuccess) {
      return <p className="text-black">Welcome to the allow list</p>
    }

    return getButton
  }

  return (
    <div className="flex flex-col w-full p-10 ">
      <h1 className="text-[2rem] lg:text-[3rem] boska leading-none">Allowlist</h1>
      <p className="text-black">Get on the allowlist when live the life goes live.</p>
      <div className="flex flex-col w-48">{getAction()}</div>
    </div>
  )
}
