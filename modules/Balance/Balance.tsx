import React, { FC, useEffect } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { formatAmount } from '../../common/utils/utils'
import { Loader, Size } from '../Loader'
import { fetchEthBalance, selectBalance, selectLoadingState } from './balance.slice'

interface BalanceProps {
  address?: string | null
}

export const Balance: FC<BalanceProps> = ({ address = null }) => {
  const dispatch = useAppDispatch()
  const balance = useAppSelector(selectBalance)
  const loadingState = useAppSelector(selectLoadingState)

  useEffect(() => {
    if (address) {
      dispatch(fetchEthBalance({ address }))
    }
  }, [address])

  const loader = <Loader size={Size.s} />
  const component = <span>&nbsp;&#926; {formatAmount(parseFloat(balance))}</span>

  return match(loadingState)
    .with('loading', () => loader)
    .with('succeeded', () => component)
    .otherwise(() => <></>)
}
