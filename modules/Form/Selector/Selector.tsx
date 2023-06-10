import { FC, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface SelectorProps {
  options: string[]
  onChange: (value: string | number) => void
  selected: string
}

export const Selector: FC<SelectorProps> = ({ options, onChange, selected }) => {
    return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change selected network</Listbox.Label>
          <div className="relative">
            <div className="inline-flex divide-x divide-yellow border-2 border-black bg-yellow py-2">
              <div className="inline-flex justify-center items-center gap-x-1.5 bg-yellow px-3 py-2 text-black p-4 overflow-hidden font-semibold transition-all duration-150 ease-in-out">
                <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                <p className="font-semibold text-black mb-0 pb-0">{selected}</p>
              </div>
              <Listbox.Button className="inline-flex items-center bg-yellow p-2 hover:bg-yellow">
                <span className="sr-only">Change selected network</span>
                <ChevronDownIcon className="h-5 w-5 text-black" aria-hidden="true" />
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-black overflow-hidden bg-yellow shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-yellow text-black' : 'text-gray-900',
                        'cursor-default select-none p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={clsx('text-black mb-0 pb-0', selected ? 'font-semibold' : 'font-normal')}>{option}</p>
                          {selected ? (
                            <span className='text-black'>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
