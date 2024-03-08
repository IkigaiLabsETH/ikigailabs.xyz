import { NextApiRequest, NextApiResponse } from 'next'
import { match } from 'ts-pattern'

export const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  match(req.method)
    .with('GET', () => {
      fetch(`https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          res.status(200).json(data)
        })
        .catch(() => {
          res.status(500).json({ message: 'Error fetching data from Airtable' })
        })
    })
    .otherwise(() => res.status(405).json({ message: 'Method not allowed' }))

export default handler
