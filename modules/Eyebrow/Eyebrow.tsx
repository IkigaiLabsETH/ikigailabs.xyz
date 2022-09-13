import React, { FC, ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
}

export const Eyebrow: FC<EyebrowProps> = ({ children }) => (
  <div className="tracking-[0.5rem] uppercase leading-10 text-gray-400 font-bold text-xs mb-4">{children}</div>
)
