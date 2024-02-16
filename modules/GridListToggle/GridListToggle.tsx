import clsx from 'clsx'
import React, { FC } from 'react'

interface GridListToggleProps {
  onToggle: (active: 'grid' | 'list') => void
  active: 'grid' | 'list'
}

export const GridListToggle: FC<GridListToggleProps> = ({ active, onToggle }) => {
  return (
    <div className="flex justify-end px-4 sm:px-6 lg:px-8">
      <div className="bg-white text-sm text-gray-500 leading-none border-2 border-black inline-flex p-0.5">
        <button
          className={clsx(
            'inline-flex items-center transition-all duration-300 ease-in focus:outline-none hover:text-black focus:text-black px-4 py-2 !outline-none !border-none font-bold',
            active === 'grid' && 'bg-yellow text-black',
          )}
          id="grid"
          onClick={() => onToggle('grid')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-current w-4 h-4 mr-2"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Grid</span>
        </button>
        <button
          className={clsx(
            'inline-flex items-center transition-all duration-300 ease-in focus:outline-none hover:text-black focus:text-black px-4 py-2 !outline-none !border-none font-bold',
            active === 'list' && 'bg-yellow text-black',
          )}
          id="list"
          onClick={() => onToggle('list')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-current w-4 h-4 mr-2"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <span>List</span>
        </button>
      </div>
    </div>
  )
}
