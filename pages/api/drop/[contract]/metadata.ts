import { NextApiRequest, NextApiResponse } from 'next'
import { ChainId } from '@thirdweb-dev/sdk'

import { getTWClient } from '../../../../common/web3'
import { match } from 'ts-pattern'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contract, network, type } = req.query

  if (!contract || !network) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }
   
  try {
    const args: [string] = [contract as string]
    if (type) {
      args.push(type as string)
    }
    const client = getTWClient(ChainId[network as string])
    const response = await client
      .getContract(...args)
      .then(response => response.metadata.get())
      .catch(console.log)

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => match(req.method).with('GET', () => get(req, res)).otherwise(() => res.status(405).json({ error: 'Method Not Allowed' }))

export default handler
