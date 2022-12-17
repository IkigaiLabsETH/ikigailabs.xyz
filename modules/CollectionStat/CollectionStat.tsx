import React, { FC } from 'react'

interface CollectionStatProps {
  label: string
  value: string
}

export const CollectionStat: FC<CollectionStatProps> = ({ label, value }) => (
  <div>
    <h4 className="text-xs uppercase tracking-widest m-0 grey">{label}</h4>
    <span className="font-bold text-2xl tracking-tight">{value}</span>
  </div>
)
