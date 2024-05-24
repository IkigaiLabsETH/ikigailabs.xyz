import React, { FC } from 'react'

import { useWallet } from '../../common/useWallet'
import { Button } from '../Button'
import { useRouter } from 'next/router'

export const InvalidAddress: FC = () => {
  const { address } = useWallet()
  const router = useRouter()
  return (
    <div className='flex flex-col items-center'>
      <div className='text-xl'>This does not seem to be a valid address.</div>
      {address && (
        <Button className='mt-4 max-w-52' onClick={() => router.push(`/profile/${address}/collected/ethereum`)}>
          Go to your own profile
        </Button>
      )}
    </div>
  )
}