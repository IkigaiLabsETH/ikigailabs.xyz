import React, { FC } from 'react'

interface EthProps {
  amount: number | string
}

export const Eth: FC<EthProps> = ({ amount }) => (
  <div className="flex flex-row justify-left items-center">
    <img src="/assets/images/eth-diamond.png" className="w-5 h-5 pr-2" />
    {typeof amount === 'number' && !Number.isNaN(amount)
      ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(amount)
      : '—'}
  </div>
)
