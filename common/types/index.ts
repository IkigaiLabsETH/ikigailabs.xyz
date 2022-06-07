import { BigNumber } from '@ethersproject/bignumber'

export interface Token {
  symbol: string
  name: string
  value: BigNumber
  decimals: number
  displayValue: string
}
