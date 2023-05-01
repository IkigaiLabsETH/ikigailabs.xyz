import React, { FC, ReactNode } from 'react'

interface BodyProps {
  children: ReactNode
}

export const Body: FC<BodyProps> = ({ children }) => (
  <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
)
