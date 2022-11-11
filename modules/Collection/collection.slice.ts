import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'
import {
  add,
  always,
  collectBy,
  flatten,
  groupBy,
  lensPath,
  lensProp,
  map,
  path,
  pathOr,
  pipe,
  pluck,
  prop,
  set,
  tap,
  toPairs,
  tryCatch,
  uniq,
} from 'ramda'
import { RootState } from '../../common/redux/store'

import {
  ClaimCondition,
  ContractMetadata,
  ErrorType,
  NFTDropWithNFTS,
  NFTMetadataOwner,
  Status,
  TransactionResultWithId,
} from '../../common/types'
import { web3, Web3 } from '../../common/web3'

export const fetchCollection = createAction<{ contract: string }>('signtureDrop/fetch')

export const fetchCollectionMetadataTh = (web3: Web3) =>
  createAsyncThunk<ContractMetadata, { contract: string }, { rejectValue: string }>(
    'collection/metadata/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => {
          return response.metadata.get()
        })
        .catch(error => rejectWithValue(error.message)),
  )
export const fetchCollectionMetadata = fetchCollectionMetadataTh(web3)

export const fetchCollectionNFTsTh = (web3: Web3) =>
  createAsyncThunk<NFTMetadataOwner[], { contract: string }, { rejectValue: string }>(
    'collection/nfts/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.getAll())
        .then(
          map(
            (nft: NFTMetadataOwner) =>
              set(lensPath(['metadata', 'id'] as never), nft.metadata.id.toString())(nft) as NFTMetadataOwner,
          ),
        )
        .catch(error => rejectWithValue(error.message)),
  )
export const fetchCollectionNFTs = fetchCollectionNFTsTh(web3)

export const fetchCollectionClaimedSupplyTh = (web3: Web3) =>
  createAsyncThunk<string, { contract: string }, { rejectValue: string }>(
    'collection/unclaimedSupply/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.totalClaimedSupply())
        .then((claimedSupply: BigNumber) => claimedSupply.toString())
        .catch((error: Error) => rejectWithValue(error.message)),
  )
export const fetchCollectionClaimedSupply = fetchCollectionClaimedSupplyTh(web3)

export const fetchCollectionUnclaimedSupplyTh = (web3: Web3) =>
  createAsyncThunk<string, { contract: string }, { rejectValue: string }>(
    'collection/claimedSupply/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.totalUnclaimedSupply())
        .then((claimedSupply: BigNumber) => claimedSupply.toString())
        .catch((error: Error) => rejectWithValue(error.message)),
  )
export const fetchCollectionUnclaimedSupply = fetchCollectionUnclaimedSupplyTh(web3)

export const fetchCollectionOwnedTokenIds = createAsyncThunk<
  string[],
  { contract: string; wallet: string },
  { rejectValue: string }
>('collection/ownedTokenIds/fetch', ({ contract, wallet }, { rejectWithValue }) =>
  web3
    .getSignatureDrop(contract)
    .then(response => response.getOwnedTokenIds(wallet))
    .then(map((x: BigNumber) => x.toString()))
    .catch((error: Error) => rejectWithValue(error.message)),
)

export const fetchCollectionClaimConditionsTh = (web3: Web3) =>
  createAsyncThunk<ClaimCondition[], { contract: string }, { rejectValue: string }>(
    'collection/claimConditions/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.claimConditions.getAll())
        .then(
          map(
            (claimCondition: ClaimCondition) =>
              pipe(
                set(lensProp('startTime' as never), claimCondition.startTime.toISOString()),
                set(lensProp('price' as never), claimCondition.price.toString()),
                set(lensProp('waitInSeconds' as never), claimCondition.waitInSeconds.toString()),
                set(lensPath(['currencyMetadata', 'value'] as never), claimCondition.currencyMetadata.value.toString()),
              )(claimCondition) as ClaimCondition,
          ),
        )
        .catch(error => rejectWithValue(error.message)),
  )
export const fetchCollectionClaimConditions = fetchCollectionClaimConditionsTh(web3)

const claimNFTTh = (web3: Web3) =>
  createAsyncThunk<
    TransactionResultWithId<NFTMetadataOwner>[],
    { contract: string; quantity: number; address: string }
  >('collection/nft/claim', ({ contract, quantity, address }, { rejectWithValue }) =>
    web3
      .getSignatureDrop(contract)
      .then(response => response.claimTo(address, quantity))
      .catch((error: Error) => rejectWithValue(error.message)),
  )

export const claimNFT = claimNFTTh(web3)

interface CollectionState {
  entities: NFTDropWithNFTS
  status: {
    nfts: Status
    metadata: Status
    claimedSupply: Status
    unclaimedSupply: Status
    ownedTokenIds: Status
    claim: Status
    claimConditions: Status
  }
  error: {
    nfts: ErrorType
    metadata: ErrorType
    claimedSupply: ErrorType
    unclaimedSupply: ErrorType
    ownedTokenIds: ErrorType
    claim: ErrorType
    claimConditions: ErrorType
  }
}

const initialState = {
  entities: {},
  status: {
    nfts: 'idle',
    metadata: 'idle',
    claimedSupply: 'idle',
    unclaimedSupply: 'idle',
    ownedTokenIds: 'idle',
    claim: 'idle',
    claimConditions: 'idle',
  },
  error: {
    nfts: null,
    metadata: null,
    claimedSupply: null,
    unclaimedSupply: null,
    ownedTokenIds: null,
    claim: null,
    claimConditions: null,
  },
} as CollectionState

// Then, handle actions in your reducers:
export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCollectionNFTs.pending, (state, action) => {
        state.status.nfts = 'loading'
      })
      .addCase(fetchCollectionNFTs.fulfilled, (state, action) => {
        const { payload } = action
        state.status.nfts = 'succeeded'
        // @ts-ignore
        state.entities.nfts = payload
        state.error.nfts = null
      })
      .addCase(fetchCollectionNFTs.rejected, (state, action) => {
        const { payload } = action
        state.status.nfts = 'failed'
        if (payload) {
          state.error.nfts = action.payload as string
        } else {
          state.error.nfts = action.error.message
        }
      })
      .addCase(fetchCollectionMetadata.pending, (state, action) => {
        state.status.metadata = 'loading'
      })
      .addCase(fetchCollectionMetadata.fulfilled, (state, action) => {
        const { payload } = action
        state.status.metadata = 'succeeded'
        // @ts-ignore
        state.entities.metadata = payload
        state.error.metadata = null
      })
      .addCase(fetchCollectionMetadata.rejected, (state, action) => {
        const { payload } = action
        state.status.metadata = 'failed'
        if (payload) {
          state.error.metadata = action.payload
        } else {
          state.error.metadata = action.error.message
        }
      })
      .addCase(fetchCollectionClaimedSupply.pending, (state, action) => {
        state.status.claimedSupply = 'loading'
      })
      .addCase(fetchCollectionClaimedSupply.fulfilled, (state, action) => {
        const { payload } = action
        state.status.claimedSupply = 'succeeded'
        // @ts-ignore
        state.entities.claimedSupply = payload
        state.error.claimedSupply = null
      })
      .addCase(fetchCollectionClaimedSupply.rejected, (state, action) => {
        const { payload } = action
        state.status.claimedSupply = 'failed'
        if (payload) {
          state.error.claimedSupply = action.payload
        } else {
          state.error.claimedSupply = action.error.message
        }
      })
      .addCase(fetchCollectionUnclaimedSupply.pending, (state, action) => {
        state.status.unclaimedSupply = 'loading'
      })
      .addCase(fetchCollectionUnclaimedSupply.fulfilled, (state, action) => {
        const { payload } = action
        state.status.unclaimedSupply = 'succeeded'
        // @ts-ignore
        state.entities.unclaimedSupply = payload
        state.error.unclaimedSupply = null
      })
      .addCase(fetchCollectionUnclaimedSupply.rejected, (state, action) => {
        const { payload } = action
        state.status.unclaimedSupply = 'failed'
        if (payload) {
          state.error.unclaimedSupply = action.payload
        } else {
          state.error.unclaimedSupply = action.error.message
        }
      })
      .addCase(fetchCollectionOwnedTokenIds.pending, (state, action) => {
        state.status.ownedTokenIds = 'loading'
      })
      .addCase(fetchCollectionOwnedTokenIds.fulfilled, (state, action) => {
        const { payload } = action
        state.status.ownedTokenIds = 'succeeded'
        // @ts-ignore
        state.entities.ownedTokenIds = payload
        state.error.ownedTokenIds = null
      })
      .addCase(fetchCollectionOwnedTokenIds.rejected, (state, action) => {
        const { payload } = action
        state.status.ownedTokenIds = 'failed'
        if (payload) {
          state.error.ownedTokenIds = action.payload
        } else {
          state.error.ownedTokenIds = action.error.message
        }
      })
      .addCase(claimNFT.pending, state => {
        state.status.claim = 'loading'
      })
      .addCase(claimNFT.fulfilled, state => {
        state.status.claim = 'succeeded'
      })
      .addCase(claimNFT.rejected, (state, action) => {
        const { payload } = action
        state.status.claim = 'failed'
        if (payload) {
          state.error.claim = action.payload as string
        } else {
          state.error.claim = action.error.message
        }
      })
      .addCase(fetchCollectionClaimConditions.pending, (state, action) => {
        state.status.claimConditions = 'loading'
      })
      .addCase(fetchCollectionClaimConditions.fulfilled, (state, action) => {
        const { payload } = action
        state.status.claimConditions = 'succeeded'
        // @ts-ignore
        state.entities.claimConditions = payload
        state.error.claimConditions = null
      })
      .addCase(fetchCollectionClaimConditions.rejected, (state, action) => {
        const { payload } = action
        state.status.claimConditions = 'failed'
        if (payload) {
          state.error.claimConditions = action.payload
        } else {
          state.error.claimConditions = action.error.message
        }
      })
  },
})

export const { reducer } = collectionSlice

// Other code such as selectors can use the imported `RootState` type
export const selectNfts = path(['collection', 'entities', 'nfts'])
export const selectNftsLoadingState = path(['collection', 'status', 'nfts'])

export const selectMetadata = path(['collection', 'entities', 'metadata'])
export const selectMetadataLoadingState = path(['collection', 'status', 'metadata'])

export const selectClaimedSupply = path(['collection', 'entities', 'claimedSupply'])
export const selectClaimedSupplyLoadingState = path(['collection', 'status', 'claimedSupply'])

export const selectUnclaimedSupply = path(['collection', 'entities', 'unclaimedSupply'])
export const selectUnclaimedSupplyLoadingState = path(['collection', 'status', 'unclaimedSupply'])

export const selectTotalSupply = (state: RootState) =>
  add(
    pathOr(0, ['collection', 'entities', 'claimedSupply'])(state),
    pathOr(0, ['collection', 'entities', 'unclaimedSupply'])(state),
  )

export const selectNftClaimConditions = path(['collection', 'entities', 'claimConditions'])
export const selectNftClaimConditionsLoadingState = path(['collection', 'status', 'claimConditions'])

export const selectClaimNFT = path(['collection', 'entities', 'claim'])
export const selectClaimNFTLoadingState = path(['collection', 'status', 'claim'])

export const selectOwnedTokenIds = path(['collection', 'entities', 'ownedTokenIds'])
export const selectOwnedTokenIdsLoadingState = path(['collection', 'status', 'ownedTokenIds'])
export const selectOwnedTokensAmount = pathOr(0, ['collection', 'entities', 'ownedTokenIds', 'length'])

export const selectCollectionAttributes = pipe(
  path(['collection', 'entities', 'nfts']),
  tryCatch(
    pipe(
      map(path(['metadata', 'attributes'])),
      flatten,
      collectBy(prop('trait_type')),
      map(
        /* @ts-ignore: disable-next-line */
        pipe(uniq, groupBy(prop('trait_type')), map(pluck('value')), toPairs, prop(0), item => ({
          trait: item[0],
          values: item[1],
        })),
      ),
    ),
    always([]),
  ),
)
