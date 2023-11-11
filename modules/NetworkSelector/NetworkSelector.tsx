import React, { FC, useEffect, useState } from 'react'
import { Selector } from '../Form/Selector'
import { Network, Option } from '../../common/types'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { changeNetwork, selectedNetwork } from './NetworkSelector.slice'
import { find, propEq } from 'ramda'
import { useRouter } from 'next/router'

export const NetworkSelector: FC = () => {
  const dispatch = useAppDispatch()
  const storedSelection = useAppSelector(selectedNetwork)
  const router = useRouter()

  const NETWORKS = [
    {
      id: Network.MAINNET,
      name: 'Ethereum',
    },
    {
      id: Network.GOERLI,
      name: 'Goerli',
    },
    {
      id: Network.POLYGON,
      name: 'Polygon',
    },
    {
      id: Network.ARBITRUM,
      name: 'Arbitrum',
    },
  ] as Option[]

  const [selected, setSelected] = useState<Option>(NETWORKS[0])

  useEffect(() => {
    if (storedSelection) {
      setSelected(find(propEq('id', storedSelection))(NETWORKS) as Option)
    }
  }, [storedSelection])

  const onChangeNetwork = (value: Option) => {
    dispatch(changeNetwork({ network: value.id as Network }))
    router.push(`/${value.id}/explore`)
  }
  console.log(selected)
  return (
    <div className="mr-2">
      <Selector options={NETWORKS} onChange={onChangeNetwork} selected={selected} style="dark" />
    </div>
  )
}
