import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'

interface HeaderCellProps {
  children: ReactNode
  colspan?: number
  hiddenOnSmall?: boolean
}

export const HeaderCell: FC<HeaderCellProps> = ({ children, colspan = 1, hiddenOnSmall = false }) => (
  <th
    scope="col"
    colSpan={colspan}
    className={clsx(
      'py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-1',
      hiddenOnSmall ? 'hidden lg:table-cell' : '',
    )}
  >
    {children}
  </th>
)
