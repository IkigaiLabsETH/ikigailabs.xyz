import { NextApiRequest, NextApiResponse } from 'next'
import { match } from 'ts-pattern'
import { airtable } from '../../../common/airtable'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  return match(req.method)
    .with('GET', () => {
      const fields = airtable('Ikigai Labs V3').select({
        
        cellFormat: 'json',
      })
      res.status(200).json({ message: 'GET request to /api/cms/curated-collections' })
    })
    .otherwise(() => res.status(405).json({ message: 'Method not allowed' }))
}

export default handler