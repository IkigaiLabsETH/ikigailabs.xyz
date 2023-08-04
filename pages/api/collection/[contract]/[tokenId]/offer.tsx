import { NextApiRequest, NextApiResponse } from 'next'
import { match } from 'ts-pattern'

import { reservoirClient, walletClient } from '../../../../../common/web3'
import { Network } from '../../../../../common/types'

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, price, contract, tokenId, network } = req.body

  const client = reservoirClient(network as Network)

  return client?.actions
    .placeBid({
      bids: [
        {
          token: `${contract}:${tokenId}`,
          weiPrice: price,
          orderbook: 'reservoir',
          orderKind: 'seaport-v1.5',
        },
      ],
      wallet: walletClient(address),
      onProgress: steps => {
        console.log('steps', steps)
        // dispatch(interactionProgressAction(steps))
      },
    })
    .then((res: any) => {
      return res
    })
    .catch((err: any) => {
      console.log(err.response)
    })
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  match(req.method)
    .with('POST', () => post(req, res))
    .otherwise(() => res.status(405).json({ error: 'Method Not Allowed' }))

export default handler
