import React, { FC, useEffect, useState } from 'react'
import { Selector } from '../Form/Selector'
import { Network, Option } from '../../common/types'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { changeNetwork, selectedNetwork } from './NetworkSelector.slice'
import { find, propEq } from 'ramda'
import { useRouter } from 'next/router'
import { NETWORK_OPTIONS } from '../../common/constants/constants'

export const NetworkSelector: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { network } = router.query

  const [selected, setSelected] = useState<Option>(NETWORK_OPTIONS[0])

  useEffect(() => {
    if (network) {
      setSelected(find(propEq('id', network))(NETWORK_OPTIONS) as Option)
    }
  }, [network])

  const onChangeNetwork = (value: Option) => {
    dispatch(changeNetwork({ network: value.id as Network }))
    router.push(`/${value.id}/explore`)
  }

  return (
    <div className="mr-2">
      <Selector options={NETWORK_OPTIONS} onChange={onChangeNetwork} selected={selected} style="dark" />
    </div>
  )
}
