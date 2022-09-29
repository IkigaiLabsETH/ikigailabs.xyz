import { formatDuration, intervalToDuration } from 'date-fns'
import {
  addIndex,
  append,
  findIndex,
  gt,
  ifElse,
  join,
  lensPath,
  lt,
  map,
  modulo,
  pipe,
  prop,
  propEq,
  propSatisfies,
  set,
  take,
  takeLast,
  update,
  when,
  __,
} from 'ramda'

import { NFTMetadataOwner } from '../types'

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

export const formatNFTMetadata = (metadata: NFTMetadataOwner) =>
  set(lensPath(['metadata', 'id'] as never), metadata.metadata.id.toString())(metadata)

export const addOrReplace = (x: string, value: any) =>
  ifElse(pipe(findIndex(propEq(x, prop(x, value))), lt(0)), append(value), array =>
    update(findIndex(propEq(x, prop(x, value)))(array), value, array),
  )
