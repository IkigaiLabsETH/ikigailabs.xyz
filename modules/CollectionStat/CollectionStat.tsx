import React, { FC } from 'react'

interface CollectionStatProps {
  label: string
  children: React.ReactNode
}

export const CollectionStat: FC<CollectionStatProps> = ({ label, children }) => (
  <div>
    <h4 className="text-xs uppercase tracking-widest m-0 grey">{label}</h4>
    <span className="font-bold text-2xl tracking-tight">{children}</span>
  </div>
)
