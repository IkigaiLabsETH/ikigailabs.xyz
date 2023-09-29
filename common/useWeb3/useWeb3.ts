import { useSDK } from '@thirdweb-dev/react'
import { ContractType } from '@thirdweb-dev/sdk'
import { filter, propEq } from 'ramda'

export const useWeb3 = () => {
  const sdk = useSDK()

  const getBalance = (contract?: string) => sdk.wallet.balance(contract)

  // const getNFTFromCollection = ({ contract, tokenId }: { contract: string; tokenId: number }) =>
  //   sdk.getNFTCollection(contract).get(tokenId)

  // const getAsk = ({ contract, askId }: { contract: string; askId: number }) =>
  //   sdk.getMarketplace(contract).getAsk(askId)

  const getEditionDrop = ({ contract }: { contract: string }) => sdk.getEditionDrop(contract)

  // const getNFTFromEditionDrop = ({ contract, tokenId }: { contract: string; tokenId: number }) =>
  //   sdk.getEditionDrop(contract).get(tokenId)

  const getCollection = (contract: string) => sdk.getNFTDrop(contract)

  // const getNFTFromNFTDrop = (contract: string) => (tokenId: number) => sdk.getNFTDrop(contract).get(tokenId)

  // const getAllNFTsFromCollection = (contract: string) => sdk.getNFTDrop(contract).getAll()

  const getAllContractsByContractType = (wallet: string) => (contractType: ContractType) =>
    sdk.getContractList(wallet).then(filter(propEq('contractType', contractType)))

  return {
    getBalance,
    // getNFTFromCollection,
    // getAsk,
    getEditionDrop,
    // getNFTFromEditionDrop,
    getCollection,
    // getNFTFromNFTDrop,
    // getAllNFTsFromCollection,
    getAllContractsByContractType,
  }
}
