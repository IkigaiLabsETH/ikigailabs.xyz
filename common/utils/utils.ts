import { ChainId } from '@thirdweb-dev/sdk'
import { formatDuration, intervalToDuration } from 'date-fns'
import {
  addIndex,
  adjust,
  append,
  concat,
  curry,
  findIndex,
  gt,
  identity,
  ifElse,
  includes,
  join,
  lensPath,
  lt,
  map,
  modulo,
  pipe,
  propEq,
  propSatisfies,
  reduce,
  replace,
  set,
  sortBy,
  splitEvery,
  take,
  takeLast,
  test,
  toPairs,
  when,
  without,
  __,
  toUpper,
  split,
  tail,
  cond,
  T,
} from 'ramda'
import { NFT, Network, Token } from '../types'

export const truncate = (length: number) =>
  when(
    propSatisfies(gt(__, length), 'length'),
    pipe((x: string) => [take(5, x), takeLast(3, x)], join('…')),
  )

export const truncateAddress = truncate(12)

export const formatAmount = (number: number) =>
  new Intl.NumberFormat(
    'en-US',
    gt(number)(1) || lt(number)(-1)
      ? {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }
      : {
          minimumFractionDigits: 2,
          maximumSignificantDigits: 2,
        },
  ).format(number)

export const getRemainingTime = (start: Date, end: Date) =>
  formatDuration(
    intervalToDuration({
      start: new Date(Date.now()),
      end: end,
    }),
  )

export const mapIndexed = addIndex(map)

export const isOdd = modulo(__, 2)

export const formatNFTMetadata = (metadata: any) =>
  set(lensPath(['metadata', 'id'] as never), metadata.metadata.id.toString())(metadata)

export const toggleListItem = curry((value, list) => ifElse(includes(value), without([value]), append(value))(list))

export const formatAttributes = pipe(
  toPairs,
  reduce((acc, facet: any) => {
    return concat(reduce((acc, value) => concat(`&attributes[${facet[0]}]=${value}`)(acc), '')(facet[1]))(acc)
  }, ''),
)

export const addOrReplace = (array: any[], object: {}, prop: string) =>
  pipe(findIndex(propEq(prop, object[prop])), index =>
    index === -1 ? append(object, array) : adjust(index, () => object, array),
  )(array)

export const shuffleArray = (strings: string[]) =>
  sortBy(
    identity,
    map(() => Math.random(), strings),
  )

export const batchArray = (strings: string[]) => (batchSize: number) =>
  map(splitEvery(batchSize), splitEvery(batchSize, strings))

export const replaceImageResolution = (resolution: number) => (url: string) =>
  cond([
    [test(/w=\d+/), replace(/w=\d+/, `w=${resolution}`)],
    [test(/width=\d+/), replace(/width=\d+/, `width=${resolution}`)],
    [T, identity],
  ])(url) as string

export const ethToWei = (eth: number) => eth * 10 ** 18

export const capitalize = replace(/^./, toUpper)

export const getChainIdFromNetwork = (network: Network) => {
  let capitalizedChain = capitalize(network)
  if (capitalizedChain === 'Ethereum') {
    capitalizedChain = 'Mainnet'
  }

  return ChainId[capitalizedChain]
}

export const formatDateAndTime = (dateTime: string | number) => {
  const dateObj = typeof dateTime === 'number' ? new Date(dateTime * 1000) : new Date(dateTime)
  return dateObj.toLocaleString('en-US')
}

export const isOwner = (address: string) => propEq('owner', address?.toLowerCase())
export const isMaker = (address: string) => propEq('maker', address?.toLowerCase())

export const getTokenDataFromTokenSetId = (tokenSetId: string) => pipe(split(':'), tail)(tokenSetId) as string[]
