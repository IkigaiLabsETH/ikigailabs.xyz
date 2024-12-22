import React, { FC, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { formatAmount } from '../../common/utils'
import { Loader, Size } from '../Loader'
import { getBalance, selectWalletBalance } from '../../common/web3/wallet.api'
import { selectedNetwork } from '../NetworkSelector'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

interface BalanceProps {
  address?: string | null
}

export const Balance: FC<BalanceProps> = ({ address = null }) => {
  const dispatch = useAppDispatch()
  const network = useAppSelector(selectedNetwork)
  const { status, data } = useAppSelector(selectWalletBalance({ address, network }))
  const [balance, setBalance] = useState<string>('0')

  useEffect(() => {
    if (address) {
      dispatch(getBalance.initiate({ address, network }))
    }
  }, [address])

  useEffect(() => {
    if (data?.balance.displayValue) {
      setBalance(formatAmount(parseFloat(data.balance.displayValue)))
    }
  }, [data])

  const loader = <Loader size={Size.s} />
  const component = <span>&nbsp;&#926; {balance}</span>

  return match(status)
    .with(QueryStatus.pending, () => loader)
    .with(QueryStatus.fulfilled, () => component)
    .otherwise(() => <></>)
}
