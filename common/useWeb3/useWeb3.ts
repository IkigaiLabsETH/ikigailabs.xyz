import { useSDK } from '@thirdweb-dev/react'

export const useWeb3 = () => {
  const sdk = useSDK()

  const getBalance = (contract?: string) => sdk.wallet.balance(contract)

  const getNFT = ({ contract, tokenId }: { contract: string; tokenId: number }) => {
    const collection = sdk.getNFTCollection(contract)
    return collection.get(tokenId)
  }

  const getListing = ({ contract, listingId }: { contract: string; listingId: number }) => {
    const marketplaceContract = sdk.getMarketplace(contract)
    return marketplaceContract.getListing(listingId)
  }

  return {
    getBalance,
    getNFT,
    getListing,
  }
}
