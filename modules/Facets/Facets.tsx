import { includes, map } from 'ramda'
import React, { FC } from 'react'

import { Facet as IFacet, FacetValue } from '../../common/types'

interface FacetProps {
  facets: IFacet[]
  onClick: (trait: string, facet: string) => void
}

export const Facets: FC<FacetProps> = ({ facets, onClick }) => (
  <ul className="grid grid-flow-col gap-4">
    {map(({ key, values, selected }: IFacet) => (
      <li key={key} className="border-r border-r-black last:border-0 pb-2 px-1">
        <div className="font-bold mb-4">{key}</div>
        <ul className="flex flex-row -ml-2">
          {map(({value, count}: FacetValue) => (
            <li
              key={value}
              className={`text-xs font-bold py-1 px-2 hover:text-yellow rounded-full transition-colors hover:cursor-pointer mr-2 ${
                includes(value, selected) ? 'text-white bg-black' : 'text-gray-700'
              }`}
              onClick={() => onClick(key, value)}
            >
              {value} {count}
            </li>
          ))(values)}
        </ul>
      </li>
    ))(facets)}
  </ul>
)
