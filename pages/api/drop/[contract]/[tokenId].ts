import { NextApiRequest, NextApiResponse } from 'next'
import { match } from 'ts-pattern'

import { BigNumber } from 'ethers'
import { getTWClient } from '../../../../common/web3'
import { Network } from '../../../../common/types'
import { getAllDetectedExtensionNames, isExtensionEnabled } from '@thirdweb-dev/sdk'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contract, network, type, tokenId } = req.query
  if (!contract || !network || !tokenId) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }

  try {
    const args: [string] = [contract as string]
    if (type) {
      args.push(type as string)
    }

    const client = getTWClient(network as Network)
    const clientContract = await client.getContract(...args)
    let result = {}

    if (isExtensionEnabled(clientContract.abi, 'ERC721')) {
      result = await clientContract.erc721.get(BigNumber.from(tokenId))
    }

    if (isExtensionEnabled(clientContract.abi, 'ERC1155')) {
      result = await clientContract?.erc1155?.get(BigNumber.from(tokenId))
    }
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  match(req.method)
    .with('GET', () => get(req, res))
    .otherwise(() => res.status(405).json({ error: 'Method Not Allowed' }))

export default handler
