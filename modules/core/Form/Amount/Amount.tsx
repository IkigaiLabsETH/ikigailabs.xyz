import React, { FC } from 'react'

interface AmountProps {
  amount: number
  onPlus: (e: React.MouseEvent<HTMLElement>) => void
  onMinus: (e: React.MouseEvent<HTMLElement>) => void
}

export const Amount: FC<AmountProps> = ({ amount, onPlus, onMinus }) => {
  return (
    <div className="flex flex-row">
      <button onClick={onMinus} className="p-4 hover:text-white">
        &#8722;
      </button>
      <div className="px-2 py-4">{amount}</div>
      <button onClick={onPlus} className="p-4 hover:text-white">
        &#43;
      </button>
    </div>
  )
}
