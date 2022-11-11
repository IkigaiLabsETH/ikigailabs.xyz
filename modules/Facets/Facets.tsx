import { includes, map } from 'ramda'
import React, { FC } from 'react'

import { Facet as IFacet } from '../../common/types'

interface FacetProps {
  facets: IFacet[]
  onClick: (trait: string, facet: string) => void
}

export const Facets: FC<FacetProps> = ({ facets, onClick }) => (
  <ul className="grid grid-flow-col gap-4">
    {map(({ trait, values, selected }: IFacet) => (
      <li key={trait} className="border-r border-r-black last:border-0 pb-2 px-1">
        <div className="font-bold mb-4">{trait}</div>
        <ul className="flex flex-row -ml-2">
          {map((facet: string) => (
            <li
              key={facet}
              className={`text-xs font-bold py-1 px-2 hover:text-yellow rounded-full transition-colors hover:cursor-pointer mr-2 ${
                includes(facet, selected) ? 'text-white bg-black' : 'text-gray-700'
              }`}
              onClick={() => onClick(trait, facet)}
            >
              {facet}
            </li>
          ))(values)}
        </ul>
      </li>
    ))(facets)}
  </ul>
)
