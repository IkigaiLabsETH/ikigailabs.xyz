import Airtable from 'airtable'

// Authenticate
Airtable.configure({
  apiKey: process.env.NEXT_AIRTABLE_API_KEY,
})

const base = Airtable.base(process.env.NEXT_AIRTABLE_BASE_ID!)
export const table = base(process.env.NEXT_AIRTABLE_TABLE_NAME!)
