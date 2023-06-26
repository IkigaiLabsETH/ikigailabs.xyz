import clsx from 'clsx'
import React, { FC } from 'react'

interface SkeletonLoaderProps {
  style?: 'dark' | 'light'
}

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({ style = 'dark' }) => {
  return (
    <div className="animate-pulse mt-1">
      <div className={clsx(`h-3 rounded-sm`, style === 'dark' ? `bg-slate-800` : `bg-slate-200`)}></div>
    </div>
  )
}
