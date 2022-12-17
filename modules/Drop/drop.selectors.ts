import { equals, pipe, pluck, prop, propOr, reject, uniq } from 'ramda'
import { RootState } from '../../common/redux/store'
import { claimedSupplyAdapter, metadataAdapter, tokensAdapter, unclaimedSupplyAdapter } from './drop.slice'

export const metadataSelectors = metadataAdapter.getSelectors(prop('dropMetadata'))
export const selectMetadataStatus = (state: RootState) => state.dropMetadata.loading

export const claimedSupplySelectors = claimedSupplyAdapter.getSelectors(prop('dropClaimedSupply'))
export const selectClaimedSupplyStatus = (state: RootState) => state.dropClaimedSupply.loading

export const unclaimedSupplySelectors = unclaimedSupplyAdapter.getSelectors(prop('dropUnclaimedSupply'))
export const selectUnclaimedSupplyStatus = (state: RootState) => state.dropUnclaimedSupply.loading

export const tokensSelectors = tokensAdapter.getSelectors(prop('dropTokens'))
export const selectUniqueOwnersCount = (state: RootState) => (contract: string) =>
  pipe(
    () => tokensSelectors.selectById(state, contract),
    propOr([], 'tokens'),
    pluck('owner'),
    uniq,
    (x: string[]) => reject(equals('0x0000000000000000000000000000000000000000'))(x),
    prop('length'),
  )()
export const selectTokensStatus = (state: RootState) => state.dropTokens.loading

export const claimConditionsSelectors = tokensAdapter.getSelectors(prop('dropClaimConditions'))
