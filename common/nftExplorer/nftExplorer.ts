import { createClient } from '@reservoir0x/reservoir-kit-client'
import axios from 'axios'

export const explorerClient = createClient({
  apiBase: process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://api-goerli.reservoir.tools',
  apiKey: process.env.NEXT_EXPLORER_API_KEY || '',
  source: process.env.NEXT_EXPLORER_SOURCE || 'https://ikigai.com',
})

export const explorerApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://api-goerli.reservoir.tools',
  timeout: 3000,
})
