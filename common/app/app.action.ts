import { createAction } from '@reduxjs/toolkit'
import { ParsedUrlQuery } from 'querystring'

export const changeRoute = createAction<string>('app/changeRoute')
export const initialPageLoad = createAction<string>('app/initialPageLoad')
