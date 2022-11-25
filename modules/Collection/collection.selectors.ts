import { add, equals, path, pathOr, pick, pipe } from 'ramda'

import { COLLECTION_METADATA_FIELDS } from '../../common/constants'
import { RootState } from '../../common/redux/store'
import { collectionApi } from './collection.api'

export const selectClaimNFT = (state: RootState) => ({
  data: path(['collection', 'entities', 'claim'])(state),
  status: path(['collection', 'status', 'claim'])(state),
  error: path(['collection', 'error', 'claim'])(state),
})

export const selectCollection = (state: RootState) => ({
  data: pipe(pathOr([], ['collection', 'entities', 'metadata']), pick(COLLECTION_METADATA_FIELDS))(state),
  status: path(['collection', 'status', 'metadata'])(state),
  error: path(['collection', 'error', 'metadata'])(state),
})

export const selectCollectionStats = (contract: string) => (state: RootState) => {
  let status = 'idle'
  const { data: collectionApiCollectionData, status: collectionApiCollectionStatus } =
    collectionApi.endpoints.getCollectionByContract.select(contract)(state)
  const collectionData = equals(collectionApiCollectionStatus, 'fulfilled') ? collectionApiCollectionData[0] : []

  if (
    equals(path(['collection', 'status', 'claimedSupply'])(state), 'succeeded') &&
    equals(path(['collection', 'status', 'unclaimedSupply'])(state), 'succeeded') &&
    equals(collectionApiCollectionStatus, 'fulfilled')
  ) {
    status = 'succeeded'
  }

  if (
    equals(path(['collection', 'status', 'claimedSupply'])(state), 'loading') ||
    equals(path(['collection', 'status', 'unclaimedSupply'])(state), 'loading') ||
    equals(collectionApiCollectionStatus, 'loading')
  ) {
    status = 'loading'
  }

  if (
    equals(path(['collection', 'status', 'claimedSupply'])(state), 'failed') ||
    equals(path(['collection', 'status', 'unclaimedSupply'])(state), 'failed') ||
    equals(collectionApiCollectionStatus, 'rejected')
  ) {
    status = 'failed'
  }

  return {
    status,
    data: {
      claimed: pathOr(0, ['collection', 'entities', 'claimedSupply'])(state),
      supply: add(
        pathOr(0, ['collection', 'entities', 'claimedSupply'])(state),
        pathOr(0, ['collection', 'entities', 'unclaimedSupply'])(state),
      ),
      floor: {
        'price': pathOr(0, ['floorAsk', 'price', 'amount', 'decimal'])(collectionData),
        'currency': pathOr(0, ['floorAsk', 'price', 'currency', 'symbol'])(collectionData),
        '1day': pathOr(null, ['floorSaleChange', '1day'])(collectionApiCollectionData),
        '7day': pathOr(null, ['floorSaleChange', '7day'])(collectionApiCollectionData),
        '30day': pathOr(null, ['floorSaleChange', '30day'])(collectionApiCollectionData),
      },
      topOffer: {
        price: pathOr(0, ['topBid', 'price', 'amount', 'decimal'])(collectionData),
        currency: pathOr(0, ['topBid', 'price', 'currency', 'symbol'])(collectionData),
      },
    },
    error:
      path(['collection', 'error', 'claimedSupply'])(state) ||
      path(['collection', 'error', 'unclaimedSupply'])(state) ||
      null,
  }
}

export const selectNftClaimConditions = (state: RootState) => ({
  data: path(['collection', 'entities', 'claimConditions'])(state),
  status: path(['collection', 'status', 'claimConditions'])(state),
  error: path(['collection', 'error', 'claimConditions'])(state),
})

export const selectOwnedTokens = (state: RootState) => ({
  data: path(['collection', 'entities', 'ownedTokenIds'])(state),
  status: path(['collection', 'status', 'ownedTokenIds'])(state),
  error: path(['collection', 'error', 'ownedTokenIds'])(state),
})

export const selectNFTS = collectionApi.endpoints.getCollectionTokensByContractWithAttributes.select
export const selectCollectionActivity = collectionApi.endpoints.getCollectionActivityByContract.select
export const selectCollectionAttributes = collectionApi.endpoints.getCollectionAttributesByContract.select
