import { useMemo } from 'react'
import { isAddress } from 'viem'

export function useValidAddress(address: string): boolean {
  return useMemo(() => {
    if (!address) return false
    return isAddress(address)
  }, [address])
} 