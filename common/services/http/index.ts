import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ApiConfig, ApiResponse } from '@/common/types'

export class HttpService {
  private client: AxiosInstance

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      timeout: config.timeout || 10000,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          return Promise.reject({
            message: error.response.data.message || 'An error occurred',
            code: error.response.status,
            status: error.response.status,
          })
        }
        return Promise.reject({
          message: error.message || 'Network error',
          code: 'NETWORK_ERROR',
          status: 0,
        })
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config)
    return response.data
  }
}

export const httpService = new HttpService({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
}) 