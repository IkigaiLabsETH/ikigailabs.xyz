import React, { FC } from 'react'

interface PercentageProps {
  amount: number
}

export const Percentage: FC<PercentageProps> = ({ amount }) => {
  const color = amount > 1 ? 'text-green-500' : 'text-red-500'
  const arrow = amount > 1 ? '↑' : '↓'
  const percentage = Math.abs((1 - amount) * 100).toFixed(2)

  return (
    <span className={`${color} font-bold text-sm`}>
      {arrow} {percentage}%
    </span>
  )
}
