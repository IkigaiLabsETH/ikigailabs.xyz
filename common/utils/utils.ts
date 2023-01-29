import { formatDuration, intervalToDuration } from 'date-fns'
import {
  addIndex,
  adjust,
  append,
  concat,
  curry,
  findIndex,
  gt,
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
  set,
  take,
  takeLast,
  when,
  without,
  __,
} from 'ramda'

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

export const formatAttributes = reduce(
  (acc, facet: { key: string; selected: string[] }) =>
    concat(reduce((acc, value: string) => concat(`&attributes[${facet.key}]=${value}`)(acc), '')(facet.selected))(acc),
  '',
)

export const addOrReplace = (array: any[], object: {}, prop: string) => pipe(
  findIndex(propEq(prop, object[prop])),
  index => index === -1 ? append(object, array) : adjust(index, () => object, array)
)(array)
