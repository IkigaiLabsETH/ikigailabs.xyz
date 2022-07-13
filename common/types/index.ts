import { BigNumber } from '@ethersproject/bignumber'
import { ContractType } from '@thirdweb-dev/sdk'

export interface Token {
  symbol: string
  name: string
  value: BigNumber
  decimals: number
  displayValue: string
}

export interface ContractDefinition {
  address: string
  contractType: ContractType
  metadata: () => Promise<any>
}

export type { ContractType, NFTMetadataOwner } from '@thirdweb-dev/sdk'
