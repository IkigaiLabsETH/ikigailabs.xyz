import Image from 'next/image'
import React, { FC } from 'react'

interface TextFieldProps {
  id: string
  label: string
  type: 'text' | 'number'
  step?: number
  valid?: boolean
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  eth?: boolean
  min?: number | null
  max?: number | null
}

export const TextField: FC<TextFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  step = 1,
  eth = false,
  valid = true,
  min = null,
  max = null,
}) => {
  const attributes = {
    id,
    label,
    type,
    value,
    onChange,
    // valid,
  }

  if (type === 'number') {
    step ? (attributes['step'] = step) : null
    min ? (attributes['min'] = min) : null
    max ? (attributes['max'] = max) : null
    eth ? (attributes['eth'] = eth) : null
  }

  return (
    <div className="mt-4 flex leading-6 text-black w-full mb-3">
      <label
        htmlFor={id}
        className="relative cursor-pointer bg-white font-bold p-3 text-xl text-black border-black border-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 w-full"
      >
        <span className="sr-only">{label}</span>
        <div className="flex">
          {eth ? <Image src="/assets/images/eth-diamond.png" className="w-5 h-5 pr-2 mt-2" alt="Eth" /> : null}
          {type === 'number' ? (
            <input
              {...attributes}
              className="w-full lg:text-xl block flex-1 border-0 bg-transparent py-1 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          ) : (
            <input
              id={id}
              name={id}
              type={type}
              value={value}
              onChange={onChange}
              className="w-full lg:text-xl block flex-1 border-0 bg-transparent py-1 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          )}
        </div>
      </label>
    </div>
  )
}
