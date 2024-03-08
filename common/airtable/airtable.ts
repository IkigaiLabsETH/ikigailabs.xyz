import Airtable from 'airtable'

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: 'https://api.airtable.com',
})

export const airtable = Airtable.base(process.env.AIRTABLE_BASE_ID)
