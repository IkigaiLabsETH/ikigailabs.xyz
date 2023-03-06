/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC, useEffect } from 'react'
import { map } from 'ramda'

import { Footer } from '../../modules/Footer'
import { withLayout } from '../../common/layouts/MainLayout/withLayout'
import { Layout } from '../../common/types'
import {
  collectionsApi,
  getCollectionsSetId,
  selectCollectionsBySetId,
} from '../../modules/Collections/collections.api'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { Link } from '../../modules/Link'
import { Eth } from '../../modules/Eth'
import { Percentage } from '../../modules/Percentage'

interface CollectionsProps {
  collectionsSetId: string
}

const Collections: FC<CollectionsProps> = ({ collectionsSetId }) => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectCollectionsBySetId(collectionsSetId))

  useEffect(() => {
    dispatch(collectionsApi.endpoints.getCollectionsBySetId.initiate(collectionsSetId))
  }, [collectionsSetId])

  return (
    <div className="flex items-center flex-col ">
      <Head>
        <title>LiveTheLifeTV - The future of Photography</title>
        <meta name="description" content="Live the life - Collections" />
        <link rel="icon" href="/assets/images/ltl-logo-white-small.png" />
      </Head>
      <h1 className="text-white text-8xl text-left p-8 w-full pt-32 max-w-screen-2xl">Collections</h1>
      <main className="w-full bg-white ">
        <div className="max-w-screen-2xl text-black mx-auto p-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 mt-8 sm:-mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      colSpan={2}
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Collection
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Volume
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Floor price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Supply
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {map((collection: any) => (
                    <tr key={collection.name} className="hover:bg-gray-50 p-1">
                      <td className="whitespace-nowrap py-4 pl-4 font-medium text-gray-900 sm:pl-0">
                        <img src={collection.image} alt={collection.name} className="h-12 w-12 rounded-full" />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 font-bold text-gray-900 sm:pl-0">
                        {collection.name}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-gray-500 sm:table-cell">
                        <span className="font-bold">
                          <Eth amount={collection.volume['1day']} />
                        </span>{' '}
                        <Percentage amount={collection.volumeChange['1day']} />
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-gray-500 lg:table-cell">
                        <span className="font-bold">
                          <Eth amount={collection.floorSale['1day']} />
                        </span>{' '}
                        <Percentage amount={collection.floorSaleChange['1day']} />
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-gray-500 lg:table-cell">
                        {collection.tokenCount}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right font-medium sm:pr-0">
                        <Link href={`/collection/${collection.id}`} title={collection.name}>
                          View &rarr;{' '}
                        </Link>
                      </td>
                    </tr>
                  ))(data?.collections || [])}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const collectionsSetId = await getCollectionsSetId()
  return { props: { collectionsSetId } }
}

export default withLayout(Layout.main)(Collections as any)
