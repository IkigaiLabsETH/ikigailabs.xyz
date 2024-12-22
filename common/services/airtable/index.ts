import Airtable from 'airtable'

export class AirtableService {
  private base: Airtable.Base

  constructor() {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    })
    this.base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '')
  }

  async getRecords<T>(tableName: string, view = 'Grid view'): Promise<T[]> {
    try {
      const records = await this.base(tableName).select({ view }).all()
      return records.map(record => ({ id: record.id, ...record.fields })) as T[]
    } catch (error) {
      console.error(`Error fetching records from ${tableName}:`, error)
      return []
    }
  }

  async getRecord<T>(tableName: string, recordId: string): Promise<T | null> {
    try {
      const record = await this.base(tableName).find(recordId)
      return { id: record.id, ...record.fields } as T
    } catch (error) {
      console.error(`Error fetching record ${recordId} from ${tableName}:`, error)
      return null
    }
  }

  async createRecord<T>(tableName: string, fields: Partial<T>): Promise<T | null> {
    try {
      const record = await this.base(tableName).create([{ fields }])
      return { id: record[0].id, ...record[0].fields } as T
    } catch (error) {
      console.error(`Error creating record in ${tableName}:`, error)
      return null
    }
  }

  async updateRecord<T>(tableName: string, recordId: string, fields: Partial<T>): Promise<T | null> {
    try {
      const record = await this.base(tableName).update(recordId, fields)
      return { id: record.id, ...record.fields } as T
    } catch (error) {
      console.error(`Error updating record ${recordId} in ${tableName}:`, error)
      return null
    }
  }

  async deleteRecord(tableName: string, recordId: string): Promise<boolean> {
    try {
      await this.base(tableName).destroy(recordId)
      return true
    } catch (error) {
      console.error(`Error deleting record ${recordId} from ${tableName}:`, error)
      return false
    }
  }
}

export const airtableService = new AirtableService() 