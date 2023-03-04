import { includes, map } from 'ramda'
import React, { FC } from 'react'

import { Facet as IFacet, FacetValue } from '../../common/types'

interface FacetProps {
  facets: IFacet[]
  onClick: (trait: string, facet: string) => void
}

export const Facets: FC<FacetProps> = ({ facets, onClick }) => (
  <ul className="flex flex-col">
    {map(({ key, values, selected }: IFacet) => (
      <li key={key} className="border-r border-r-black last:border-0 pb-2 px-1">
        <div className="font-bold mb-4">{key}</div>
        { values && <ul className="flex flex-row flex-wrap mb-8">
          {map(({ value, count }: FacetValue) => (
            <li
              key={value}
              className={`text-xs font-bold py-1 px-2 group hover:text-yellow rounded-full transition-colors hover:cursor-pointer mr-2 -ml-2 ${
                includes(value, selected) ? 'text-white bg-black' : 'text-gray-700'
              }`}
              onClick={() => onClick(key, value)}
            >
              {value} <span className='text-gray-300 group-hover:text-yellow'>{count}</span>
            </li>
          ))(values)}
        </ul> }
      </li>
    ))(facets)}
  </ul>
)
