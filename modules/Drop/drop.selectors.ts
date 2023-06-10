import { equals, filter, last, pathOr, pipe, pluck, prop, propEq, propOr, reject, uniq } from 'ramda'

import { RootState } from '../../common/redux/store'
import { claimedSupplyAdapter, metadataAdapter, tokensAdapter, unclaimedSupplyAdapter } from './drop.slice'

export const metadataSelectors = metadataAdapter.getSelectors(prop('dropMetadata'))
export const selectMetadataById = (contract: string) => (state: RootState) =>
  metadataSelectors.selectById(state, contract)
export const selectMetadataStatus = (state: RootState) => state.dropMetadata.loading

export const claimedSupplySelectors = claimedSupplyAdapter.getSelectors(prop('dropClaimedSupply'))
export const selectClaimedSupplyById = (contract: string) => (state: RootState) =>
  claimedSupplySelectors.selectById(state, contract)
export const selectClaimedSupplyStatus = (state: RootState) => state.dropClaimedSupply.status

export const unclaimedSupplySelectors = unclaimedSupplyAdapter.getSelectors(prop('dropUnclaimedSupply'))
export const selectUnclaimedSupplyById = (contract: string) => (state: RootState) =>
  unclaimedSupplySelectors.selectById(state, contract)
export const selectUnclaimedSupplyStatus = (state: RootState) => state.dropUnclaimedSupply.status

export const tokensSelectors = tokensAdapter.getSelectors(prop('dropTokens'))
export const selectUniqueOwnersCount = (contract: string) => (state: RootState) =>
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
export const selectClaimConditionsStatus = (state: RootState) => state.dropClaimConditions.status

export const selectClaim = (state: RootState) => state.claims
export const selectClaimsForAddress = (address: string) =>
  pipe(pathOr([], ['claims', 'entities']), filter(propEq('address', address)))
export const selectLatestClaimForAddress = (address: string) =>
  pipe(pathOr([], ['claims', 'entities']), filter(propEq('address', address)), last)
export const selectClaimStatus = (state: RootState) => state.claims.status
