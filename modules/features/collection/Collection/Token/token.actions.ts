import { createAction } from '@reduxjs/toolkit'
import { Network } from '../../../common/types'

export const fetchCollectionToken = createAction<{ contract: string; tokenId: string; network: Network }>(
  'collection/token/fetch',
)
