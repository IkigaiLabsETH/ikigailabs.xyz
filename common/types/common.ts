export type Network = 'ethereum' | 'polygon' | 'optimism'

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ErrorType = string | null | undefined

export enum Layout {
  main = 'main',
  skeleton = 'skeleton',
}

export interface Option {
  id: string | number
  name: string
} 