import { FC, useEffect } from "react"
import { useWallet } from "../../common/useWallet"
import { useRouter } from "next/router"
import { Profile } from "../../modules/Profile"
import { withLayout } from "../../common/layouts"
import { Layout } from "../../common/types"

export const ProfilePage: FC = () => {
  const { address, network } = useWallet()
  const { push } = useRouter()

  useEffect(() => {
    if (!address) return
    push(`/profile/${address}/collected/ethereum`)
  }, [address, push])

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Profile />
    </div>
  )
}

export default withLayout(Layout.main)(ProfilePage as any)
