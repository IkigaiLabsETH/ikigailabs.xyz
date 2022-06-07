import { useSDK } from '@thirdweb-dev/react'

export const useWeb3 = () => {
  const sdk = useSDK()

  const getBalance = (contract?: string) => sdk.wallet.balance(contract)

  return {
    getBalance,
  }
}
