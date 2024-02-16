import React, { FC } from 'react'
import { Body, Cell, HeaderCell, Row, Table, Head as THead } from '../Table'
import Image from 'next/image'
import { map, times } from 'ramda'
import { Eth } from '../Eth'
import { Percentage } from '../Percentage'
import Link from 'next/link'
import { Collection, Network } from '../../common/types'
import { SkeletonLoader } from '../SkeletonLoader'

interface CollectionsListProps {
  collections: Collection[]
  network: Network
  isLoading: boolean
}

export const CollectionsList: FC<CollectionsListProps> = ({ collections, network, isLoading }) => {
  return (
    <Table>
      <THead>
        <Row>
          <HeaderCell colspan={2}>Collection</HeaderCell>
          <HeaderCell>Volume</HeaderCell>
          <HeaderCell>Floor price</HeaderCell>
          <HeaderCell>Supply</HeaderCell>
          <HeaderCell>
            <span className="sr-only">Actions</span>
          </HeaderCell>
        </Row>
      </THead>
      <Body>
        {map((collection: any) => (
          <Row key={collection?.id}>
            <Cell>
              {collection?.image ? (
                <Image
                  src={collection?.image}
                  alt={collection?.name}
                  className="h-12 w-12 rounded-full"
                  width="48"
                  height="48"
                />
              ) : null}
            </Cell>
            <Cell>{collection?.name}</Cell>
            <Cell>
              <span className="font-bold">
                <Eth amount={collection?.volume['1day']} />
              </span>{' '}
              <Percentage amount={collection?.volumeChange['1day']} />
            </Cell>
            <Cell>
              <span className="font-bold">
                <Eth amount={collection?.floorSale['1day']} />
              </span>{' '}
              <Percentage amount={collection?.floorSaleChange['1day']} />
            </Cell>
            <Cell>{collection?.tokenCount}</Cell>
            <Cell>
              <Link href={`/${network}/${collection?.id}`} title={collection?.name}>
                View &rarr;{' '}
              </Link>
            </Cell>
          </Row>
        ))(collections || [])}
        {isLoading
          ? times((iterator: number) => (
              <Row key={iterator}>
                <Cell>
                  <SkeletonLoader style="light" />
                </Cell>
                <Cell>
                  <SkeletonLoader style="light" />
                </Cell>
                <Cell>
                  <SkeletonLoader style="light" />
                </Cell>
                <Cell>
                  <SkeletonLoader style="light" />
                </Cell>
                <Cell>
                  <SkeletonLoader style="light" />
                </Cell>
                <Cell>
                  <SkeletonLoader style="light" />
                </Cell>
              </Row>
            ))(10)
          : null}
      </Body>
    </Table>
  )
}
