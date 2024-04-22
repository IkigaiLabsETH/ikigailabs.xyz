import { createClient } from '@reservoir0x/reservoir-kit-client'
import axios from 'axios'

export const explorerClient = createClient({
  apiBase: process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://api-sepolia.reservoir.tools',
  apiKey: process.env.NEXT_NEXT_PUBLIC_RESERVOIR_KEY || '',
  source: process.env.NEXT_PUBLIC_EXPLORER_SOURCE || 'https://ikigailabs.xyz',
})

export const explorerApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://api-sepolia.reservoir.tools',
  timeout: 3000,
})
