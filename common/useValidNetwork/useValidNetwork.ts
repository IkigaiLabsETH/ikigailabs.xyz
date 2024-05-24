import { includes } from "ramda"
import { Network } from "../types"

export const useValidNetwork = (network: string) => {

  const supportedNetworks = [
    Network.MAINNET,
    Network.OPTIMISM,
    Network.POLYGON,
    Network.ARBITRUM,
    Network.MUMBAI,
    Network.ZORA,
    Network.BASE,
    Network.BLAST,
    Network.SCROLL,
    Network.SEPOLIA,
  ]

  return includes(network, supportedNetworks)
}
