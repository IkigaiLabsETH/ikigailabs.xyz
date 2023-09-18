import React, { FC } from 'react'

interface UserOffersProps {
  offers: any
}

export const UserOffers:FC<UserOffersProps> = ({ offers }) => {
  console.log('UserOffers', offers)
  return (<div></div>)
}
