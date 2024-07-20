import { map, pick, pipe, prop, path, tap, uniq, curry, reject, isEmpty, when, propSatisfies, equals, __, assoc, groupBy, objOf, mapObjIndexed, lensProp, over, collectBy, flatten, reduce, append, join } from 'ramda'
import 'dotenv/config'
import Airtable from 'airtable'

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: 'https://api.airtable.com',
})

export const airtable = Airtable.base(process.env.AIRTABLE_BASE_ID)

export const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj)),
)

const options = {
  method: 'POST',
  headers: {accept: '*/*', 'content-type': 'application/json', 'x-api-key': process.env.ETH_RESERVOIR_API_KEY}
};

const createCollectionSets = () => {
  fetch(`https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
  })
    .then(response => response.json())
    .then(prop('tables'))
    .then((tables) => Promise.all(map(async (table) => {
      const records = await airtable(table.id).select({
        cellFormat: 'json',
      }).all()
      return {
        name: table.name, 
        records
      }
    })(tables)))
    .then(map((x) => over(lensProp('records'), 
      pipe(
        map(prop('fields')),
        collectBy(prop('Category')),
        map(reduce((acc, y) => {
          return {
            category: y.Category,
            contracts: append(y['Contract Address'], acc.contracts || []),
          }
        }, {})),
        ), x)))
    .then(map((network) => {
      const z = map(async record => {
        let collectionSetId = ''
        if (record.contracts) {
          const response = await fetch('https://api.reservoir.tools/collections-sets/v1', { ...options, body: JSON.stringify({ collections: record.contracts }) })
            .then(response => response.json())
            .catch((error) => {
              console.log('Error fetching data from Reservoir')
              console.log(error)
            })
          collectionSetId = response.collectionsSetId
        }
        return {
          network: network.name,
          name: record.category,
          contracts: record.contracts,
          collectionSetId,
        }
      })(network.records)
      return Promise.all(z)
    }))
    .then((x) => Promise.all(x))
    .then(console.log)
    .catch((error) => {
      console.log('Error fetching data from Airtable')
      console.log(error)
    })
}

createCollectionSets()
