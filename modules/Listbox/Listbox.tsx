import { FC, Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface LBProps {
  label: string
  items: {
    id: string
    name: string
  }[]
  defaultItem: number
  onSelect: (item: any) => void
}

export const LB: FC<LBProps> = ({ items, label, onSelect, defaultItem }) => {
  const [selected, setSelected] = useState(items[defaultItem])

  const onChange = (item: any) => {
    setSelected(item)
    onSelect(item)
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          { label && <Listbox.Label className="block text-md font-bold leading-6 text-gray-900 mb-2">{label}</Listbox.Label> }
          <div className="relative">
            <Listbox.Button className="relative without-ring w-full cursor-default bg-white py-2  pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-black sm:text-md sm:leading-6 border-b-2 border-black">
              <span className="block truncate font-bold">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto  bg-white py-1 text-md shadow-lg focus:outline-none">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-yellow ' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-black' : 'text-yellow',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
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
