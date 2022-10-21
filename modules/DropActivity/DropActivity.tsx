import { match } from 'ts-pattern'
import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { Loader } from '../Loader'
import { fetchDropActivity, selectDropActivity } from './DropActivity.slice'

interface DropActivityProps {
  contract: string
}

export const DropActivity:FC<DropActivityProps> = ({ contract }) => {
  const dispatch = useAppDispatch()
  const { entities, loading, error } = useAppSelector(selectDropActivity) as any

  useEffect(() => {
    dispatch(fetchDropActivity({ contract }))
  }, [contract])

  const loader = (
    <div className="flex w-screen h-screen justify-center items-center bg-white">
      <Loader />
    </div>
  )

  const component = <div>Activity</div>

  return match(loading)
    .with('idle', () => loader)
    .with('loading', () => loader)
    .with('succeeded', () => component)
    .otherwise(() => <></>)
}