import { NextApiRequest, NextApiResponse } from 'next'
import { lensProp, set } from 'ramda'

import { getTWClient } from '../../../../common/web3'
import { Network } from '../../../../common/types'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, network } = req.query
  if (!address || !network) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }

  try {
    const client = getTWClient(network as Network)
    const balance = await client
      .getBalance(address as string)
      .then(response => set(lensProp('value' as never), response.value.toString())(response))
      .catch(console.log)

    res.status(200).json({ balance })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default handler
