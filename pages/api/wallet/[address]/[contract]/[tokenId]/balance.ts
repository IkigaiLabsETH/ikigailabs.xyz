import { NextApiRequest, NextApiResponse } from 'next'
import { getTWClient } from '../../../../../../common/web3'
import { ChainId } from '@thirdweb-dev/sdk'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contract, tokenId, address, network } = req.query

  if (!contract || !tokenId || !address || !network) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }

  try {
    const client = getTWClient(ChainId[network as string])
    const balance = await client
      .getContract(contract as string)
      .then(contract => contract.call('balanceOf', [ address, tokenId ]))

    res.status(200).json({ balance })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default handler
