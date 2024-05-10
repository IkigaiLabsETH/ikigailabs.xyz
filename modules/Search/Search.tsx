import React, { FC, useState } from 'react'

interface SearchProps {

}

export const Search:FC<SearchProps> = ({}) => {
  const [selectedChains, setSelectedChains] = useState([])
  const [query, setQuery] = useState('')

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      
      <button>Search</button>
    </div>
  )
}
