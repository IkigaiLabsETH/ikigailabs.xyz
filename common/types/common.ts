export type Network = 'ethereum' | 'polygon' | 'optimism'

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

export type Theme = 'light' | 'dark' | 'system'

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface User extends BaseEntity {
  address: string
  ensName?: string
  avatar?: string
  bio?: string
  twitter?: string
  website?: string
  isVerified: boolean
}

export interface Collection extends BaseEntity {
  name: string
  description: string
  image: string
  banner?: string
  network: Network
  address: string
  creator: string
  isVerified: boolean
  totalSupply?: number
  floorPrice?: number
  volume24h?: number
  volumeTotal?: number
}

export interface Activity extends BaseEntity {
  type: 'mint' | 'transfer' | 'sale' | 'list' | 'offer' | 'bid'
  network: Network
  collection: string
  tokenId: string
  from: string
  to: string
  price?: number
  timestamp: number
  transactionHash: string
}

export interface Settings {
  theme: Theme
  locale: string
  currency: string
  notifications: {
    email: boolean
    push: boolean
    discord: boolean
  }
}

export interface ApiConfig {
  baseURL: string
  headers?: Record<string, string>
  timeout?: number
}

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface ApiError {
  message: string
  code: string | number
  status: number
  data?: unknown
}

export interface PaginationParams {
  page?: number
  limit?: number
  cursor?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  hasMore: boolean
  nextCursor?: string
  total?: number
}

export interface ApiFilter {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like'
  value: string | number | boolean | Array<string | number>
}

export interface ApiSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface ApiQuery {
  filters?: ApiFilter[]
  sort?: ApiSort[]
  pagination?: PaginationParams
  search?: string
  include?: string[]
} 