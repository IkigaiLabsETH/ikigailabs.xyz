import React, { FC, ReactNode } from 'react'

interface SkeletonLayoutProps {
  children: ReactNode
}

export const SkeletonLayout: FC<SkeletonLayoutProps> = ({ children }) => <div className="w-full">{children}</div>
