import { useMemo } from 'react'
import { Network } from '@/common/types'

const VALID_NETWORKS = ['ethereum', 'polygon', 'optimism'] as const

export function useValidNetwork(network: string): boolean {
  return useMemo(() => {
    if (!network) return false
    return VALID_NETWORKS.includes(network.toLowerCase() as Network)
  }, [network])
} 