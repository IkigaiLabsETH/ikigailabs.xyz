import React, { FC, useEffect, useState } from 'react'
import { Selector } from '../Form/Selector'
import { Network, Option } from '../../common/types'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { changeNetwork, selectedNetwork } from './NetworkSelector.slice'
import { find, propEq } from 'ramda'
import { useRouter } from 'next/router'
import { NETWORK_OPTIONS } from '../../common/constants/constants'

interface NetworkSelectorProps {
  networks: Option[]
  selected: Option
}

export const NetworkSelector: FC<NetworkSelectorProps> = ({ networks, selected }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onChangeNetwork = (value: Option) => {
    dispatch(changeNetwork({ network: value.id as Network }))
    router.push(`/${value.id}/explore`)
  }

  return (
    <div className="mr-2">
      <Selector options={networks} onChange={onChangeNetwork} selected={selected} style="dark" />
    </div>
  )
}
