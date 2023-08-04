import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useAppDispatch } from '../redux/store'

export const useInfiniteLoading = (query: any, data: Record<string, any>) => {
  const dispatch = useAppDispatch()
  const { ref, inView } = useInView({
    threshold: 1.0,
  })

  useEffect(() => {
    inView && data.continuation && dispatch(query(data))
  }, [inView, dispatch, query, data])

  return { ref, inView }
}
