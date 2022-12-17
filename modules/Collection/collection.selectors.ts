import { collectionApi } from './collection.api'

export const selectCollection = collectionApi.endpoints.getCollectionByContract.select
export const selectNFTS = collectionApi.endpoints.getCollectionTokensByContractWithAttributes.select
export const selectCollectionAttributes = collectionApi.endpoints.getCollectionAttributesByContract.select
export const selectCollectionActivity = collectionApi.endpoints.getCollectionActivityByContract.select
