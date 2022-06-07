import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../common/redux/store'
import useWeb3 from '../../common/useWeb3'
import { formatAmount } from '../../common/utils/utils'
import { fetchBalance, selectBalance, selectBalanceState } from './balance.slice'

interface BalanceProps {
  contract?: string | null
}

export const Balance: FC<BalanceProps> = ({ contract = null }) => {
  const dispatch = useAppDispatch()
  const balance = useSelector(selectBalance)
  const { getBalance } = useWeb3()
  const [ counter, setCounter ] = useState<number>(0)

  // very ugly workaround to rerender until the wallet info is correctly registered in the context
  useEffect(() => {
    counter < 3 && setTimeout(() => {setCounter(counter + 1)}, 0)
    counter === 3 && dispatch(fetchBalance({ getBalance, contract }))
  }, [counter])

  return balance && <span>&nbsp;&#926; {formatAmount(parseFloat(balance))}</span>
}
