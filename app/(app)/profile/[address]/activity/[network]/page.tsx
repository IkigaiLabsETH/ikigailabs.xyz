'use client'

import { useParams } from 'next/navigation'
import { useValidAddress } from '@/common/useValidAddress'
import { useValidNetwork } from '@/common/useValidNetwork'
import { Network } from '@/common/types'
import { InvalidAddress } from '@/components/InvalidAddress'
import { InvalidNetwork } from '@/components/InvalidNetwork'
import { UserActivity } from '@/components/UserActivity'

export default function ActivityPage() {
  const params = useParams()
  const { address, network } = params
  const isValidAddress = useValidAddress(address as string)
  const isValidNetwork = useValidNetwork(network as Network)

  if (!isValidAddress) {
    return (
      <div className="flex justify-center items-center h-full">
        <InvalidAddress />
      </div>
    )
  }

  if (!isValidNetwork) {
    return (
      <div className="flex justify-center items-center h-full">
        <InvalidNetwork />
      </div>
    )
  }

  return <UserActivity />
} 