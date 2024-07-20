import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAddress } from 'viem'

import { withLayout } from '../../../common/layouts'
import { Layout } from '../../../common/types'
import { InvalidAddress } from '../../../modules/InvalidAddress'

export const ProfilePage: FC = () => {
  const {
    push,
    query: { address },
  } = useRouter()

  useEffect(() => {
    if (address && isAddress(String(address))) {
      push(`/profile/${address}/collected/ethereum`)
    }
  }, [address, push])

  return (
    <div className="flex min-h-screen justify-center items-center">
      <InvalidAddress />
    </div>
  )
}

export default withLayout(Layout.main)(ProfilePage as any)
