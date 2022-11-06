import { createEntityAdapter } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { CollectionActivity } from '../../../common/types'

export const collectionActivityAdapter = createEntityAdapter<CollectionActivity>({
  selectId: prop('contract'),
  sortComparer: (a, b) => a.contract.localeCompare(b.contract),
})
