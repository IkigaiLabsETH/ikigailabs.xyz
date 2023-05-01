import { map } from 'ramda'
import React, { FC, useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'

import { Facet as IFacet } from '../../common/types'
import { toggleListItem } from '../../common/utils'

interface FacetProps {
  facets: IFacet[]
  onUpdateFacets: (selection: Record<string, any>) => void
}

export const Facets: FC<FacetProps> = ({ facets, onUpdateFacets }) => {
  const [query, setQuery] = useState({})
  const [selection, setSelection] = useState({})

  const updateSelection = (key: string, value: string) => {
    const facetSelection = selection[key] || []
    setSelection({ ...selection, [key]: toggleListItem(value, facetSelection) })
  }
  const updateQuery = (key: string, value: string) => {
    setQuery({ ...query, [key]: value })
  }

  useEffect(() => {
    onUpdateFacets(selection)
  }, [selection])

  return (
    <ul className="flex flex-col">
      {map(({ key, values }: IFacet) => {
        const selectedValues =
          !query[key] || query[key] === ''
            ? values
            : values.filter(value => {
                return value.value.toLowerCase().includes(query[key].toLowerCase())
              })
        return (
          <li className="mb-4" key={key}>
            <Combobox as="div" value={''} onChange={value => updateSelection(key, value)}>
              <Combobox.Label className="block font-bold leading-6 text-gray-900">{key}</Combobox.Label>
              <ul className="flex flex-row flex-wrap my-2">
                {map((value: string) => (
                  <li
                    key={value}
                    className={`text-xs font-bold  text-yellow bg-black py-1 px-2 group hover:text-yellow rounded-full transition-colors hover:cursor-pointer m-1 mr-2`}
                    onClick={() => updateSelection(key, value)}
                  >
                    {value} &times;
                  </li>
                ))(selection[key] || [])}
              </ul>
              <div className="relative mt-2">
                <Combobox.Input
                  className="w-full border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  onChange={event => updateQuery(key, event.target.value)}
                  displayValue={() => query[key]}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {selectedValues?.length > 0 && (
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {selectedValues.map(value => (
                      <Combobox.Option
                        key={value.value}
                        value={value.value}
                        className={({ active }) =>
                          clsx(
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                            active ? 'bg-black text-yellow' : 'text-gray-900',
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <div className="flex">
                              <span className={clsx('truncate', selected && 'font-semibold')}>{value.value}</span>
                              <span
                                className={clsx(
                                  'ml-2 truncate text-gray-500',
                                  active ? 'text-gray-200' : 'text-gray-500',
                                )}
                              >
                                {value.count}
                              </span>
                            </div>

                            {selected && (
                              <span
                                className={clsx(
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                  active ? 'text-yellow' : 'text-black',
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </li>
        )
      })(facets)}
    </ul>
  )
}
