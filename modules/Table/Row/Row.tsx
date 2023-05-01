import React, { FC, ReactNode } from 'react'

interface RowProps {
  children: ReactNode
}

export const Row: FC<RowProps> = ({ children }) => <tr className="hover:bg-gray-50 p-1 pl-4">{children}</tr>
