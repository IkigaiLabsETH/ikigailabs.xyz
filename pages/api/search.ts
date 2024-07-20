import { NextApiRequest, NextApiResponse } from 'next'
import { match } from 'ts-pattern'
import { isAddress } from 'viem'
import { supportedChains } from '../../common/config'
import { filter, includes, isEmpty, map, pipe, pluck, reduce, split } from 'ramda'
import { ReservoirChain } from '../../common/config/chains'

export const handler = (req: NextApiRequest, res: NextApiResponse) =>
  match(req.method)
    .with('GET', async () => {
      const {
        query: { query, chains },
      } = req
      const chainList = pipe(split(','), map(parseInt))(chains as string)
      const selectedChains = isEmpty(chainList)
        ? supportedChains
        : filter((chain: ReservoirChain) => includes(chain.id)(chainList))(supportedChains)

      // Search by address
      if (isAddress(query as string)) {
        const result = await Promise.allSettled<{ status: string; value: any }>(
          map((chain: ReservoirChain) =>
            fetch(`${chain.reservoirBaseUrl}/collections/v7/?contract=${query}&excludeSpam=true`).then(response =>
              response.json(),
            ),
          )(selectedChains),
        )
        const collections = reduce(
          (acc, { status, value }) => {
            if (status === 'fulfilled') {
              return {
                collections: [...acc.collections, ...value.collections],
              }
            }
            return acc
          },
          { collections: [] },
        )(result)

        return res.json(collections)
      }

      // Search collections
      const selectedChainsIds = pluck('id')(selectedChains)
      const chainIdString = reduce((acc, chainId) => `${acc}&chains=${chainId}`, '')(selectedChainsIds)
      const result = await fetch(`https://api.reservoir.tools/collections/search/v1?prefix=${query}${chainIdString}`)
        .then(response => response.json())
        .catch(() => ({ collections: [] }))

      return res.json(result)
    })
    .otherwise(() => res.status(405).json({ message: 'Method not allowed' }))

export default handler
