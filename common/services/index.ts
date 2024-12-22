export * from './airtable'
export * from './ai'
export * from './ens'
export * from './http'
export * from './notification'
export * from './web3'

// Re-export instances for convenience
import { airtableService } from './airtable'
import { aiService } from './ai'
import { ensService } from './ens'
import { httpService } from './http'
import { notificationService } from './notification'
import { web3Service } from './web3'

export const services = {
  airtable: airtableService,
  ai: aiService,
  ens: ensService,
  http: httpService,
  notification: notificationService,
  web3: web3Service,
} as const 