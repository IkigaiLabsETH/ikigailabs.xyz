import { collectionTokenApi } from './token.api'

export const selectCollectionToken = collectionTokenApi.endpoints.getTokenByContractAndTokenId.select
export const selectTokenActivity = collectionTokenApi.endpoints.getTokenActivity.select
export const selectTokenListings = collectionTokenApi.endpoints.getTokenListings.select
export const selectTokenOffers = collectionTokenApi.endpoints.getTokenOffers.select
