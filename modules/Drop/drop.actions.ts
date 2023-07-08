import { createAction } from '@reduxjs/toolkit'
import { Network } from '../../common/types'

export const mintSuccess = createAction<{ tokenId: string; transactionHash: string; network: Network }>(
  'drop/mintSuccess',
)
