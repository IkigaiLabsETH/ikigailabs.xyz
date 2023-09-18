import React, { FC } from 'react'

interface UserListingsProps {
  Listings: any
}

export const UserListings:FC<UserListingsProps> = ({ Listings }) => {
  console.log('UserListings', Listings)
  return (<div></div>)
}
