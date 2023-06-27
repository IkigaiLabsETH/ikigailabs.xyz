import { createAction } from '@reduxjs/toolkit'
import { Network } from '../../common/types'

export const mintSuccess = createAction<{id: number, transactionHash: string, network: Network}>('drop/mintSuccess')
