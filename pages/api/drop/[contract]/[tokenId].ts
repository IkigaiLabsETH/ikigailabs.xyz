import { NextApiRequest, NextApiResponse } from 'next'
import { match } from 'ts-pattern'

import { BigNumber } from 'ethers'
import { getTWClient } from '../../../../common/web3'
import { Network } from '../../../../common/types'
import { isExtensionEnabled, detectFeatures } from '@thirdweb-dev/sdk'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contract, network, tokenId } = req.query
  if (!contract || !network || !tokenId) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }

  try {
    const client = getTWClient(network as Network)

    const clientContract = await client.getContract(contract as string)
    let result = {}

    if (isExtensionEnabled(clientContract.abi, 'ERC721', detectFeatures(clientContract.abi))) {
      console.log('ERC721')
      result = await clientContract?.erc721?.get(BigNumber.from(tokenId))
      console.log(result)
    }

    if (isExtensionEnabled(clientContract.abi, 'ERC1155', detectFeatures(clientContract.abi))) {
      console.log('ERC1155')
      result = await clientContract?.erc1155?.get(BigNumber.from(tokenId))
      console.log(result)
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
