import React, { FC } from 'react'

interface EthProps {
  amount: number
}

export const Eth:FC<EthProps> = ({ amount }) => (
  <div className="flex flex-row justify-left items-center">
    <img src="/assets/images/eth-diamond.png" className='w-5 h-5 pr-2'/>{ new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2, notation: 'compact' }).format(amount) }
  </div>
)
