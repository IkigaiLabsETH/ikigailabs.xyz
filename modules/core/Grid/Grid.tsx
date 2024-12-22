import React, { FC } from 'react'

interface GridProps {
  columns?: number
  children: React.ReactNode
}

export const Grid: FC<GridProps> = ({ columns = 4, children }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${columns} gap-6 max-w-screen-2xl p-8 pt-0 text-black`}
  >
    {children}
  </div>
)
