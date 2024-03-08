import React, { FC } from 'react'
import { match } from 'ts-pattern'

interface WarningProps {
  type: 'flagged' | 'nsfw' | 'spam'
}

export const Warning: FC<WarningProps> = ({ type }) => {
  return (
    <div className="p-4 border-2 border-red-900 shadow-[6px_6px_0px_0px_rgba(127,28,29,1)] text-red-900 font-bold">
      {match(type)
        .with('flagged', () => <p className="mb-0">This item has been flagged and should not be traded</p>)
        .with('nsfw', () => <p className="mb-0">This item is not safe for work</p>)
        .with('spam', () => <p className="mb-0">This item is spam</p>)
        .exhaustive()}
    </div>
  )
}
