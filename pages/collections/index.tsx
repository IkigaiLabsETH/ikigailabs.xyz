/* eslint-disable react/function-component-definition */
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
import { Table, Head, HeaderCell, Row, Cell, Body } from '../../modules/Table'

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
        <title>Ikigai Labs - Shaped by Photography</title>
        <meta name="description" content="Live the life - Collections" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <h1 className="text-yellow text-8xl text-left p-8 w-full pt-32 max-w-screen-2xl">Collections</h1>
      <main className="w-full bg-white ">
        <div className="max-w-screen-2xl text-black mx-auto p-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 mt-8 sm:-mx-0">
              <Table>
                <Head>
                  <Row key='header'>
                    <HeaderCell
                      colspan={2}
                    >
                      Collection
                    </HeaderCell>
                    <HeaderCell
                      hiddenOnSmall={true}
                    >
                      Volume
                    </HeaderCell>
                    <HeaderCell
                      hiddenOnSmall={true}
                    >
                      Floor price
                    </HeaderCell>
                    <HeaderCell>
                      Supply
                    </HeaderCell>
                    <HeaderCell>
                      <span className="sr-only">Edit</span>
                    </HeaderCell>
                  </Row>
                </Head>
                <Body>
                  {map((collection: any) => (
                    <Row key={collection.name}>
                      <Cell>
                        <img src={collection.image} alt={collection.name} className="h-12 w-12 rounded-full" />
                      </Cell>
                      <Cell>
                        {collection.name}
                      </Cell>
                      <Cell>
                        <span className="font-bold">
                          <Eth amount={collection.volume['1day']} />
                        </span>{' '}
                        <Percentage amount={collection.volumeChange['1day']} />
                      </Cell>
                      <Cell>
                        <span className="font-bold">
                          <Eth amount={collection.floorSale['1day']} />
                        </span>{' '}
                        <Percentage amount={collection.floorSaleChange['1day']} />
                      </Cell>
                      <Cell>
                        {collection.tokenCount}
                      </Cell>
                      <Cell>
                        <Link href={`/collection/${collection.id}`} title={collection.name}>
                          View &rarr;{' '}
                        </Link>
                      </Cell>
                    </Row>
                  ))(data?.collections || [])}
                </Body>
              </Table>
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
