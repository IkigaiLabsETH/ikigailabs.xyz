import React, { FC } from 'react'

interface SkeletonLoaderProps {

}

export const SkeletonLoader:FC<SkeletonLoaderProps> = ({}) => (
  <div className='animate-pulse mt-1'>
    <div className='h-3 bg-slate-800 rounded-sm'></div>
  </div>
)
