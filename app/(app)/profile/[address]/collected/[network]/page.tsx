'use client'

import { Metadata } from 'next'
import { useParams } from 'next/navigation'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '@/common/constants'
import { useValidAddress } from '@/common/useValidAddress'
import { useValidNetwork } from '@/common/useValidNetwork'
import { Network } from '@/common/types'
import { NFTGrid } from '@/components/NFTGrid'
import { InvalidAddress } from '@/components/InvalidAddress'
import { InvalidNetwork } from '@/components/InvalidNetwork'
import { Loader } from '@/components/Loader'
import { useInfiniteLoading } from '@/hooks/useInfiniteLoading'
import { useAppSelector } from '@/store'
import { selectUserTokens } from '@/store/user'
import { isNil, isEmpty } from 'lodash'

export default function CollectedPage() {
  const params = useParams()
  const { address, network } = params
  const isValidAddress = useValidAddress(address as string)
  const isValidNetwork = useValidNetwork(network as Network)

  const { data: ownedTokens, status: ownedStatus } = useAppSelector(
    selectUserTokens({ address: address as string, network: network as Network })
  )

  const { ref: nftRef } = useInfiniteLoading(userApi.endpoints.getUserTokens.initiate, {
    address: address as string,
    continuation: ownedTokens?.continuation,
    network,
  })

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

  if (!isNil(ownedTokens?.tokens) && !isEmpty(ownedTokens?.tokens)) {
    return (
      <>
        <NFTGrid nfts={ownedTokens?.tokens} network={network as Network} />
        <div ref={nftRef} />
      </>
    )
  }

  if (ownedStatus !== 'pending' && isEmpty(ownedTokens?.tokens)) {
    return <div className="w-full text-center">No tokens found</div>
  }

  if (ownedStatus === 'pending') {
    return (
      <div className="w-full text-center">
        <Loader />
      </div>
    )
  }

  return null
} 