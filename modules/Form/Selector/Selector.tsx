import { FC, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Option } from '../../../common/types'
import { equals } from 'ramda'

interface SelectorProps {
  options: Option[]
  onChange: (value: Option) => void
  selected: Option
  type?: 'ghost' | 'solid' | 'dark'
  title?: string
  style?: 'light' | 'dark'
}

export const Selector: FC<SelectorProps> = ({
  options,
  onChange,
  selected,
  type = 'solid',
  title,
  style = 'light',
}) => {
  return (
    <div className="max-w-xs">
      <Listbox value={selected} onChange={onChange}>
        {({ open }) => (
          <div className="flex items-center">
            {title ? (
              <div className="mr-4">
                <Listbox.Label
                  className={clsx(
                    equals(style, 'dark') ? 'text-yellow' : 'text-gray-900',
                    'block text-lg font-bold leading-6',
                  )}
                >
                  {title}
                </Listbox.Label>
              </div>
            ) : (
              <> </>
            )}
            <div className="relative w-60">
              <Listbox.Button
                className={clsx(
                  equals(style, 'dark')
                    ? 'ring-yellow-300 text-yellow bg-black border-b-yellow'
                    : 'ring-gray-300 text-gray-900 bg-white border-b-black',
                  'border-0 relative w-full cursor-default py-1.5 pr-10 text-left ring-0 ring-inset focus:outline-none sm:text-sm font-bold sm:leading-6',
                )}
              >
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className={clsx(equals(style, 'dark') ? 'text-yellow' : 'text-gray-400', 'h-5 w-5 ')}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm font-bold">
                {options.map(option => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-yellow text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4',
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={clsx('text-black mb-0 pb-0', selected ? 'font-semibold' : 'font-normal')}>
                            {option.name}
                          </p>
                          {selected ? (
                            <span className="text-black">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  )
}
