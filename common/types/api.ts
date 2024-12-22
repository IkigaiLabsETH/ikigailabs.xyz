export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ApiError {
  message: string
  code: string
  status: number
}

export interface ApiConfig {
  baseURL: string
  headers?: Record<string, string>
  timeout?: number
} 