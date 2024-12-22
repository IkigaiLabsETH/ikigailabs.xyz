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