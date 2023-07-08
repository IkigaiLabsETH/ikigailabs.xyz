import { match } from 'ts-pattern'
import type { NextApiRequest, NextApiResponse } from 'next'

import { table } from '../../common/spreadsheet'

const add = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { address },
  } = req

  try {
    const records = await table
      .select({
        fields: ['Address', 'Minted'],
        filterByFormula: `NOT({Address} != '${address}')`,
      })
      .all()

    if (records.length) {
      return res.status(400).json({
        success: false,
        error: 'User is already in allowlist',
      })
    }

    const createdRecords = await table.create([
      {
        fields: {
          Address: address,
        },
      },
    ])

    if (createdRecords.length) {
      return res.status(200).json({
        success: true,
        message: 'User added to allowlist',
        data: address,
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }

  return res.status(500).json({
    success: false,
  })
}

const allowlist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  return match(method)
    .with('POST', () => add(req, res))
    .otherwise(() => {})
}

export default allowlist
