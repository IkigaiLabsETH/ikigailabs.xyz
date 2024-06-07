import { NextApiRequest, NextApiResponse } from 'next'
import { path, sortBy } from 'ramda'
import { match } from 'ts-pattern'

import { delay } from '../../../../common/utils'

export const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSetId } = req.query

  if (!collectionSetId) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }
  const options = {
    headers: new Headers()
  }

  options.headers.set('x-api-key', process.env.ETH_RESERVOIR_API_KEY)

  try {
    const collections = await fetch(
      `https://api.reservoir.tools/collections/v7?collectionsSetId=${collectionSetId}`,
      options,
    ).then(res => res.json())
    
    while (collections.continuation) {
      const nextCollections = await fetch(
        `https://api.reservoir.tools/collections/v7?collectionsSetId=${collectionSetId}&continuation=${collections.continuation}`,
        options,
      ).then(res => res.json())
      await delay(250)
      collections.collections = collections.collections.concat(nextCollections.collections)
      collections.continuation = nextCollections.continuation
    }

    const tokens = []

    for (const collection of collections.collections) {
      await delay(400)
      const token = await fetch(
        `https://api.reservoir.tools/tokens/v7?collection=${collection.id}&sortBy=floorAskPrice&limit=1&flagStatus=0`,
        options,
      ).then((res: any) => res.json())
      .catch((error) => console.log('error', error.message))

      if (token?.tokens?.[0]) {
        tokens.push(token?.tokens?.[0])
      }
    }

    const sortedTokens = sortBy(path(['market', 'floorAsk', 'price', 'amount', 'decimal']), tokens)
    res.status(200).json(sortedTokens)
  } catch (error) {
    console.log('error', error.message)
    res.status(500).json({ error: error.message })
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  match(req.method)
    .with('GET', () => get(req, res))
    .otherwise(() => res.status(405).json({ message: 'Method not allowed' }))

export default handler
