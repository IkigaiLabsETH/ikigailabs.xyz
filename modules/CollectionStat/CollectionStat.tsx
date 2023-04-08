import React, { FC } from 'react'
import { SkeletonLoader } from '../SkeletonLoader'

interface CollectionStatProps {
  label: string
  children: React.ReactNode
  loading?: boolean
}

export const CollectionStat: FC<CollectionStatProps> = ({ label, children, loading = true }) => (
  <div>
    <h4 className="text-xs uppercase tracking-widest m-0 grey">{label}</h4>

    {loading ? <SkeletonLoader /> : <span className="font-bold text-2xl tracking-tight">{children}</span>}
  </div>
)
