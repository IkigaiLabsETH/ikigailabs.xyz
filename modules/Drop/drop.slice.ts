import { createAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'
import { append, assoc, lensPath, lensProp, map, pipe, prop, set } from 'ramda'

import { ClaimCondition, ContractMetadata, NFTMetadataOwner, TransactionResultWithId } from '../../common/types'
import { web3, Web3 } from '../../common/web3'

export const fetchDrop = createAction<{ contract: string }>('drop/fetch')

export const metadataAdapter = createEntityAdapter({})
export const tokensAdapter = createEntityAdapter({})
export const claimedSupplyAdapter = createEntityAdapter({})
export const unclaimedSupplyAdapter = createEntityAdapter({})
export const ownedTokenIdsAdapter = createEntityAdapter({})
export const claimConditionsAdapter = createEntityAdapter({})
export const claimsAdapter = createEntityAdapter({})

export const fetchDropMetadataTh = (web3: Web3) =>
  createAsyncThunk<{ id: string } & ContractMetadata, { contract: string }, { rejectValue: string }>(
    'drop/metadata/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.metadata.get())
        .then(assoc('id', contract))
        .catch(error => rejectWithValue(error.message)),
  )
export const fetchDropMetadata = fetchDropMetadataTh(web3)

export const fetchDropTokensTh = (web3: Web3) =>
  createAsyncThunk<{ id: string; tokens: any }, { contract: string }, { rejectValue: string }>(
    'drop/nfts/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.getAll())
        .then((nfts: NFTMetadataOwner[]) => ({
          tokens: map((nft: NFTMetadataOwner) => ({
            token: {
              contract,
              tokenId: nft.metadata.id.toString(),
              name: nft.metadata.name,
              description: nft.metadata.description,
              image: nft.metadata.image,
            },
            owner: nft.owner,
          }))(nfts),
          id: contract,
        }))
        .catch(error => rejectWithValue(error.message)),
  )
export const fetchDropTokens = fetchDropTokensTh(web3)

export const fetchDropClaimedSupplyTh = (web3: Web3) =>
  createAsyncThunk<{ id: string; claimedSupply: string }, { contract: string }, { rejectValue: string }>(
    'drop/unclaimedSupply/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.totalClaimedSupply())
        .then((claimedSupply: BigNumber) => ({ claimedSupply: claimedSupply.toString(), id: contract }))
        .catch((error: Error) => rejectWithValue(error.message)),
  )
export const fetchDropClaimedSupply = fetchDropClaimedSupplyTh(web3)

export const fetchDropUnclaimedSupplyTh = (web3: Web3) =>
  createAsyncThunk<{ id: string; unclaimedSupply: string }, { contract: string }, { rejectValue: string }>(
    'drop/claimedSupply/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.totalUnclaimedSupply())
        .then((unclaimedSupply: BigNumber) => ({ unclaimedSupply: unclaimedSupply.toString(), id: contract }))
        .catch((error: Error) => rejectWithValue(error.message)),
  )
export const fetchDropUnclaimedSupply = fetchDropUnclaimedSupplyTh(web3)

export const fetchDropOwnedTokenIds = createAsyncThunk<
  { id: string; tokens: string[] },
  { contract: string; wallet: string },
  { rejectValue: string }
>('drop/ownedTokenIds/fetch', ({ contract, wallet }, { rejectWithValue }) =>
  web3
    .getSignatureDrop(contract)
    .then(response => response.getOwnedTokenIds(wallet))
    .then((tokens: []) => ({ tokens: map((x: BigNumber) => x.toString())(tokens), id: contract }))
    .catch((error: Error) => rejectWithValue(error.message)),
)
export const fetchDropClaimConditionsTh = (web3: Web3) =>
  createAsyncThunk<{ id: string; claimConditions: ClaimCondition[] }, { contract: string }, { rejectValue: string }>(
    'drop/claimConditions/fetch',
    ({ contract }, { rejectWithValue }) =>
      web3
        .getSignatureDrop(contract)
        .then(response => response.claimConditions.getAll())
        .then((conditions: ClaimCondition[]) => ({
          claimConditions: map(
            (claimCondition: ClaimCondition) =>
              pipe(
                set(lensProp('startTime' as never), claimCondition.startTime.toISOString()),
                set(lensProp('price' as never), claimCondition.price.toString()),
                set(lensProp('waitInSeconds' as never), claimCondition.waitInSeconds.toString()),
                set(lensPath(['currencyMetadata', 'value'] as never), claimCondition.currencyMetadata.value.toString()),
              )(claimCondition) as ClaimCondition,
          )(conditions),
          id: contract,
        }))
        .catch(error => rejectWithValue(error.message)),
  )
export const fetchDropClaimConditions = fetchDropClaimConditionsTh(web3)

const claimTokenTh = (web3: Web3) =>
  createAsyncThunk<
    TransactionResultWithId<NFTMetadataOwner>[],
    { contract: string; quantity: number; address: string }
  >('drop/nft/claim', ({ contract, quantity, address }, { rejectWithValue }) =>
    web3
      .getSignatureDrop(contract)
      .then(response => response.claimTo(address, quantity))
      .catch((error: Error) => {
        console.log(error)
        return rejectWithValue(error.message)
      }),
  )

export const claimToken = claimTokenTh(web3)

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState: metadataAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDropMetadata.pending, state => {
        state.loading = 'pending'
      })
      .addCase(fetchDropMetadata.fulfilled, (state, action) => {
        const { payload } = action
        state.loading = 'succeeded'
        metadataAdapter.upsertOne(state, payload)
      })
      .addCase(fetchDropMetadata.rejected, state => {
        state.loading = 'failed'
      })
  },
})
export const tokensSlice = createSlice({
  name: 'tokens',
  initialState: tokensAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDropTokens.pending, state => {
        state.loading = 'pending'
      })
      .addCase(fetchDropTokens.fulfilled, (state, action) => {
        const { payload } = action
        state.loading = 'succeeded'
        tokensAdapter.upsertOne(state, payload)
      })
      .addCase(fetchDropTokens.rejected, state => {
        state.loading = 'failed'
      })
  },
})
export const claimedSupplySlice = createSlice({
  name: 'claimedSupply',
  initialState: claimedSupplyAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDropClaimedSupply.pending, state => {
        state.loading = 'pending'
      })
      .addCase(fetchDropClaimedSupply.fulfilled, (state, action) => {
        const { payload } = action
        state.loading = 'succeeded'
        claimedSupplyAdapter.upsertOne(state, payload)
      })
      .addCase(fetchDropClaimedSupply.rejected, state => {
        state.loading = 'failed'
      })
  },
})
export const unclaimedSupplySlice = createSlice({
  name: 'unclaimedSupply',
  initialState: unclaimedSupplyAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDropUnclaimedSupply.pending, state => {
        state.loading = 'pending'
      })
      .addCase(fetchDropUnclaimedSupply.fulfilled, (state, action) => {
        const { payload } = action
        state.loading = 'succeeded'
        unclaimedSupplyAdapter.upsertOne(state, payload)
      })
      .addCase(fetchDropUnclaimedSupply.rejected, state => {
        state.loading = 'failed'
      })
  },
})
export const ownedTokenIdsSlice = createSlice({
  name: 'ownedTokens',
  initialState: unclaimedSupplyAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDropOwnedTokenIds.pending, state => {
        state.loading = 'pending'
      })
      .addCase(fetchDropOwnedTokenIds.fulfilled, (state, action) => {
        const { payload } = action
        state.loading = 'succeeded'
        ownedTokenIdsAdapter.upsertOne(state, payload)
      })
      .addCase(fetchDropOwnedTokenIds.rejected, state => {
        state.loading = 'failed'
      })
  },
})
export const claimConditionsSlice = createSlice({
  name: 'claimConditions',
  initialState: claimConditionsAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDropClaimConditions.pending, state => {
        state.loading = 'pending'
      })
      .addCase(fetchDropClaimConditions.fulfilled, (state, action) => {
        const { payload } = action
        state.loading = 'succeeded'
        ownedTokenIdsAdapter.upsertOne(state, payload)
      })
      .addCase(fetchDropClaimConditions.rejected, state => {
        state.loading = 'failed'
      })
  },
})
export const claimsSlice = createSlice({
  name: 'claims',
  initialState: claimsAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(claimToken.pending, state => {
        state.loading = 'pending'
      })
      .addCase(claimToken.fulfilled, (state, action) => {
        const { payload } = action
        state.loading = 'succeeded'
        claimsAdapter.upsertOne(state, payload)
      })
      .addCase(claimToken.rejected, state => {
        state.loading = 'failed'
      })
  },
})

export const metadataReducer = metadataSlice.reducer
export const tokensReducer = tokensSlice.reducer
export const claimedSupplyReducer = claimedSupplySlice.reducer
export const unclaimedSupplyReducer = unclaimedSupplySlice.reducer
export const ownedTokenIdsReducer = ownedTokenIdsSlice.reducer
export const claimConditionsReducer = claimConditionsSlice.reducer
export const claimsReducer = claimsSlice.reducer
