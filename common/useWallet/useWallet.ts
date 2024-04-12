import { useActiveAccount } from 'thirdweb/react'

export const useWallet = () => {
  const account = useActiveAccount()
  const address = account?.address || ''
  return { address }
}
