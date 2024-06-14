import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAddress } from 'viem'

import { useWallet } from '../../common/useWallet'
import { Profile } from '../../modules/Profile'
import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import Head from 'next/head'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../common/constants'

export const ProfilePage: FC = () => {
  const { address } = useWallet()
  const { push, pathname } = useRouter()

  useEffect(() => {
    if (!address) return

    if (!isAddress(address)) {
      push(`/profile/${address}/collected/ethereum`)
      return
    }

    push(`/profile/${address}/collected/ethereum`)
  }, [address, push])

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Profile />
    </div>
  )
}

export default withLayout(Layout.main)(ProfilePage as any)
