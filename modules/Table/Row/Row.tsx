import React, { FC, ReactNode } from 'react'

interface RowProps {
  children: ReactNode
  key: string
}

export const Row:FC<RowProps> = ({ children, key }) => (
  <tr key={key} className="hover:bg-gray-50 p-1 pl-4">
    {children}
  </tr>
)
