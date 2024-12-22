import clsx from 'clsx'
import React, { FC } from 'react'

interface SkeletonLoaderProps {
  style?: 'dark' | 'light'
  height?: string
}

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({ style = 'dark', height = 'h-3' }) => {
  return (
    <div className="animate-pulse mt-1">
      <div className={clsx(height, `rounded-sm`, style === 'dark' ? `bg-slate-800` : `bg-slate-200`)}></div>
    </div>
  )
}
