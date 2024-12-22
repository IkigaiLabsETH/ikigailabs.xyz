import React, { FC, ReactNode } from 'react'

interface CellProps {
  children: ReactNode
}

export const Cell: FC<CellProps> = ({ children }) => (
  <td className="whitespace-nowrap py-4 pl-4 font-medium text-gray-700 sm:pl-1">{children}</td>
)
