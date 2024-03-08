import { NextApiRequest, NextApiResponse } from 'next'
import { match } from 'ts-pattern'

import { airtable } from '../../../common/airtable'
import { __, assoc, equals, isEmpty, map, pick, pipe, prop, propSatisfies, reject, uniq, when } from 'ramda'
import { renameKeys } from '../../../common/utils'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return match(req.method)
    .with('GET', () => {
      const { table } = req.query
      return airtable(table as string)
        .select({
          cellFormat: 'json',
        })
        .all()
        .then((records: any) => {
          const result = pipe(
            // @ts-ignore
            map(pick(['fields'])),
            map(prop('fields')),
            map(pick(['Category', 'CollectionID'])),
            uniq,
            map(
              renameKeys({
                CollectionID: 'id',
                Category: 'name',
              }),
            ),
            reject(isEmpty),
            when(propSatisfies(equals(__, 1), 'length'), map(assoc('name', 'All'))),
          )(records)
          res.status(200).json(result)
        })
        .catch(() => {
          res.status(500).json({ message: 'Error fetching data from Airtable' })
        })
    })
    .otherwise(() => res.status(405).json({ message: 'Method not allowed' }))
}

export default handler
