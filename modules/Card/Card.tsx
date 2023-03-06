import React, { FC } from 'react'

interface CardProps {
  children: React.ReactNode
}

export const Card: FC<CardProps> = ({ children }) => (
  <div className="border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">{children}</div>
)
