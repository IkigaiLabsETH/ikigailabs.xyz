import React, { FC, ReactNode } from 'react'

interface TableProps {
  children: ReactNode
}

export const Table: FC<TableProps> = ({ children }) => (
  <table className="min-w-full divide-y divide-gray-200">{children}</table>
)
