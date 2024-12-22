'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAddress } from 'viem'
import { useWallet } from '@/common/useWallet'
import { Profile } from '@/modules/Profile'

export default function ProfilePage() {
  const { address } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!address) return

    if (!isAddress(address)) {
      router.push(`/profile/${address}/collected/ethereum`)
      return
    }

    router.push(`/profile/${address}/collected/ethereum`)
  }, [address, router])

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Profile />
    </div>
  )
} 