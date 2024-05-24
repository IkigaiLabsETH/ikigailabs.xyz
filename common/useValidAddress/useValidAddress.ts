import { isAddress } from "thirdweb"

export const useValidAddress = (address: string) => {

  if (!address || !isAddress(String(address))) {
    return false
  }

  return true
}
