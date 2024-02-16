import { Network, Option } from '../types'

export const COLLECTION_METADATA_FIELDS = ['name', 'description', 'image']

export const COLLECTION_SORTING_OPTIONS = [
  { id: 'floorAskPrice-asc', name: 'Floor: Low to high' },
  { id: 'floorAskPrice-desc', name: 'Floor: High to low' },
  { id: 'rarity-asc', name: 'Rare to common' },
  { id: 'rarity-desc', name: 'Common to rare' },
]

export const SUPPORTED_CURRENCY = [
  { id: 'ETH', name: 'ETH' },
  { id: 'USDC', name: 'USDC' },
]

export const NETWORK_OPTIONS = [
  {
    id: 'ethereum',
    name: 'Ethereum',
  },
  {
    id: 'goerli',
    name: 'Goerli',
  },
  {
    id: 'polygon',
    name: 'Polygon',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
  },
] as Option[]

export const EXPIRATION_DEFAULTS = [
  {
    id: '3600',
    name: '1 hour',
  },
  {
    id: '43200',
    name: '12 hours',
  },
  {
    id: '86400',
    name: '1 day',
  },
  {
    name: '3 days',
    id: '259200',
  },
  {
    id: '604800',
    name: '1 week',
  },
  {
    id: '2592000',
    name: '1 month',
  },
  {
    name: '3 months',
    id: '7776000',
  },
  {
    name: '6 months',
    id: '15552000',
  },
]
