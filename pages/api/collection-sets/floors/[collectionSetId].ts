import { NextApiRequest, NextApiResponse } from 'next'
import { map, path, sortBy } from 'ramda'
import { match } from 'ts-pattern'
import { Collection } from '../../../../common/types'

export const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSetId } = req.query

  if (!collectionSetId) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }

  try {
    const collections = await fetch(
      `https://api.reservoir.tools/collections/v7?collectionsSetId=${collectionSetId}`,
    ).then(res => res.json())
    while (collections.continuation) {
      const nextCollections = await fetch(
        `https://api.reservoir.tools/collections/v7?collectionsSetId=${collectionSetId}&continuation=${collections.continuation}`,
      ).then(res => res.json())
      collections.collections = collections.collections.concat(nextCollections.collections)
      collections.continuation = nextCollections.continuation
    }

    const tokens = []

    await Promise.allSettled(
      map(async (collection: Collection) => {
        const token = await fetch(
          `https://api.reservoir.tools/tokens/v7?collection=${collection.id}&sortBy=floorAskPrice&limit=1`,
        ).then(res => res.json())
        tokens.push(token.tokens[0])
      })(collections.collections),
    )

    const sortedTokens = sortBy(path(['market', 'floorAsk', 'price', 'amount', 'decimal']), tokens)

    res.status(200).json(sortedTokens)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  match(req.method)
    .with('GET', () => get(req, res))
    .otherwise(() => res.status(405).json({ message: 'Method not allowed' }))

export default handler
