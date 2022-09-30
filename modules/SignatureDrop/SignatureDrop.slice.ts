import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'
import { add, lensPath, lensProp, map, path, pathOr, pipe, set, tap } from 'ramda'
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

export const fetchSignatureDrop = createAction<{ contract: string }>('signtureDrop/fetch')

export const fetchSignatureDropMetadataTh = (web3: Web3) =>
  createAsyncThunk<ContractMetadata, { contract: string }, { rejectValue: string }>(
    'signatureDrop/metadata/fetch',
    ({ contract }, { rejectWithValue }) => {
      console.log(web3)
      return web3
        .getSignatureDrop(contract)
        .then(response => {
          console.log(web3)
          return response.metadata.get()
        })
        .catch(error => rejectWithValue(error.message))
    }
  )
export const fetchSignatureDropMetadata = fetchSignatureDropMetadataTh(web3)

export const fetchSignatureDropNFTsTh = (web3: Web3) =>
  createAsyncThunk<NFTMetadataOwner[], { contract: string }, { rejectValue: string }>(
    'signatureDrop/nfts/fetch',
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
export const fetchSignatureDropNFTs = fetchSignatureDropNFTsTh(web3)

export const fetchSignatureDropClaimedSupplyTh = (web3: Web3) =>
  createAsyncThunk<string, { contract: string }, { rejectValue: string }>(
    'signatureDrop/unclaimedSupply/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.totalClaimedSupply())
        .then((claimedSupply: BigNumber) => claimedSupply.toString())
        .catch((error: Error) => rejectWithValue(error.message)),
  )
export const fetchSignatureDropClaimedSupply = fetchSignatureDropClaimedSupplyTh(web3)

export const fetchSignatureDropUnclaimedSupplyTh = (web3: Web3) =>
  createAsyncThunk<string, { contract: string }, { rejectValue: string }>(
    'signatureDrop/claimedSupply/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.totalUnclaimedSupply())
        .then((claimedSupply: BigNumber) => claimedSupply.toString())
        .catch((error: Error) => rejectWithValue(error.message)),
  )
export const fetchSignatureDropUnclaimedSupply = fetchSignatureDropUnclaimedSupplyTh(web3)

export const fetchSignatureDropOwnedTokenIds = createAsyncThunk<
  string[],
  { contract: string; wallet: string },
  { rejectValue: string }
>('signatureDrop/ownedTokenIds/fetch', ({ contract, wallet }, { rejectWithValue }) =>
  web3
    .getSignatureDrop(contract)
    .then(response => response.getOwnedTokenIds(wallet))
    .then(map((x: BigNumber) => x.toString()))
    .catch((error: Error) => rejectWithValue(error.message)),
)

export const fetchSignatureDropClaimConditionsTh = (web3: Web3) =>
  createAsyncThunk<ClaimCondition[], { contract: string }, { rejectValue: string }>(
    'signatureDrop/claimConditions/fetch',
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
export const fetchSignatureDropClaimConditions = fetchSignatureDropClaimConditionsTh(web3)

const claimNFTTh = (web3: Web3) =>
  createAsyncThunk<
    TransactionResultWithId<NFTMetadataOwner>[],
    { contract: string; quantity: number; address: string }
  >('signatureDrop/nft/claim', ({ contract, quantity, address }, { rejectWithValue }) =>
    web3
      .getSignatureDrop(contract)
      .then(response => response.claimTo(address, quantity))
      .catch((error: Error) => rejectWithValue(error.message)),
  )

export const claimNFT = claimNFTTh(web3)

interface SignatureDropState {
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
} as SignatureDropState

// Then, handle actions in your reducers:
export const signatureDropSlice = createSlice({
  name: 'signatureDrop',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSignatureDropNFTs.pending, (state, action) => {
        state.status.nfts = 'loading'
      })
      .addCase(fetchSignatureDropNFTs.fulfilled, (state, action) => {
        const { payload } = action
        state.status.nfts = 'succeeded'
        // @ts-ignore
        state.entities.nfts = payload
        state.error.nfts = null
      })
      .addCase(fetchSignatureDropNFTs.rejected, (state, action) => {
        const { payload } = action
        state.status.nfts = 'failed'
        if (payload) {
          state.error.nfts = action.payload as string
        } else {
          state.error.nfts = action.error.message
        }
      })
      .addCase(fetchSignatureDropMetadata.pending, (state, action) => {
        state.status.metadata = 'loading'
      })
      .addCase(fetchSignatureDropMetadata.fulfilled, (state, action) => {
        const { payload } = action
        state.status.metadata = 'succeeded'
        // @ts-ignore
        state.entities.metadata = payload
        state.error.metadata = null
      })
      .addCase(fetchSignatureDropMetadata.rejected, (state, action) => {
        const { payload } = action
        state.status.metadata = 'failed'
        if (payload) {
          state.error.metadata = action.payload
        } else {
          state.error.metadata = action.error.message
        }
      })
      .addCase(fetchSignatureDropClaimedSupply.pending, (state, action) => {
        state.status.claimedSupply = 'loading'
      })
      .addCase(fetchSignatureDropClaimedSupply.fulfilled, (state, action) => {
        const { payload } = action
        state.status.claimedSupply = 'succeeded'
        // @ts-ignore
        state.entities.claimedSupply = payload
        state.error.claimedSupply = null
      })
      .addCase(fetchSignatureDropClaimedSupply.rejected, (state, action) => {
        const { payload } = action
        state.status.claimedSupply = 'failed'
        if (payload) {
          state.error.claimedSupply = action.payload
        } else {
          state.error.claimedSupply = action.error.message
        }
      })
      .addCase(fetchSignatureDropUnclaimedSupply.pending, (state, action) => {
        state.status.unclaimedSupply = 'loading'
      })
      .addCase(fetchSignatureDropUnclaimedSupply.fulfilled, (state, action) => {
        const { payload } = action
        state.status.unclaimedSupply = 'succeeded'
        // @ts-ignore
        state.entities.unclaimedSupply = payload
        state.error.unclaimedSupply = null
      })
      .addCase(fetchSignatureDropUnclaimedSupply.rejected, (state, action) => {
        const { payload } = action
        state.status.unclaimedSupply = 'failed'
        if (payload) {
          state.error.unclaimedSupply = action.payload
        } else {
          state.error.unclaimedSupply = action.error.message
        }
      })
      .addCase(fetchSignatureDropOwnedTokenIds.pending, (state, action) => {
        state.status.ownedTokenIds = 'loading'
      })
      .addCase(fetchSignatureDropOwnedTokenIds.fulfilled, (state, action) => {
        const { payload } = action
        state.status.ownedTokenIds = 'succeeded'
        // @ts-ignore
        state.entities.ownedTokenIds = payload
        state.error.ownedTokenIds = null
      })
      .addCase(fetchSignatureDropOwnedTokenIds.rejected, (state, action) => {
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
      .addCase(fetchSignatureDropClaimConditions.pending, (state, action) => {
        state.status.claimConditions = 'loading'
      })
      .addCase(fetchSignatureDropClaimConditions.fulfilled, (state, action) => {
        const { payload } = action
        state.status.claimConditions = 'succeeded'
        // @ts-ignore
        state.entities.claimConditions = payload
        state.error.claimConditions = null
      })
      .addCase(fetchSignatureDropClaimConditions.rejected, (state, action) => {
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

export const { reducer } = signatureDropSlice

// Other code such as selectors can use the imported `RootState` type
export const selectNfts = path(['signatureDrop', 'entities', 'nfts'])
export const selectNftsLoadingState = path(['signatureDrop', 'status', 'nfts'])

export const selectMetadata = path(['signatureDrop', 'entities', 'metadata'])
export const selectMetadataLoadingState = path(['signatureDrop', 'status', 'metadata'])

export const selectClaimedSupply = path(['signatureDrop', 'entities', 'claimedSupply'])
export const selectClaimedSupplyLoadingState = path(['signatureDrop', 'status', 'claimedSupply'])

export const selectUnclaimedSupply = path(['signatureDrop', 'entities', 'unclaimedSupply'])
export const selectUnclaimedSupplyLoadingState = path(['signatureDrop', 'status', 'unclaimedSupply'])

export const selectTotalSupply = (state: RootState) =>
  add(
    pathOr(0, ['signatureDrop', 'entities', 'claimedSupply'])(state),
    pathOr(0, ['signatureDrop', 'entities', 'unclaimedSupply'])(state),
  )

export const selectNftClaimConditions = path(['signatureDrop', 'entities', 'claimConditions'])
export const selectNftClaimConditionsLoadingState = path(['signatureDrop', 'status', 'claimConditions'])

export const selectClaimNFT = path(['signatureDrop', 'entities', 'claim'])
export const selectClaimNFTLoadingState = path(['signatureDrop', 'status', 'claim'])

export const selectOwnedTokenIds = path(['signatureDrop', 'entities', 'ownedTokenIds'])
export const selectOwnedTokenIdsLoadingState = path(['signatureDrop', 'status', 'ownedTokenIds'])
export const selectOwnedTokensAmount = pathOr(0, ['signatureDrop', 'entities', 'ownedTokenIds', 'length'])
