import React, { FC } from 'react'
import { Selector } from '../Form/Selector'
import { Network } from '../../common/types'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { changeNetwork, selectedNetwork } from './NetworkSelector.slice'
import { useWallet } from '../../common/useWallet'

type ValueOf<T> = T[keyof T]

export const NetworkSelector: FC = () => {
  const dispatch = useAppDispatch()
  const selected = useAppSelector(selectedNetwork)

  return (
    <div className="mr-2">
      <Selector
        options={Object.values(Network) as Array<ValueOf<Network>> as string[]}
        onChange={(value: string) => dispatch(changeNetwork({ network: value as Network }))}
        selected={selected}
      />
    </div>
  )
}
